import { CSSProperties } from '@material-ui/styles';
import { IChatForm, ISerializedPost, LIMITS } from '@mull/types';
import { useFormik } from 'formik';
import { History } from 'history';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ROUTES } from '../../../../../src/constants';
import {
  CreatePostInput,
  PostAddedDocument,
  useCreatePostMutation,
  useDirectMessageHeaderQuery,
  useDirectMessageQuery,
  User,
  useUploadFileMutation,
} from '../../../../generated/graphql';
import { validateFileSize } from '../../../../utilities';
import { ChatHeader, ChatInput, Spinner } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';
import { useToast } from '../../../hooks/useToast';
import { chatInputOnBlur, chatInputOnFocus, updateChatContainerStyle } from '../common';

interface subscriptionData {
  subscriptionData: {
    data: {
      postAdded: Partial<ISerializedPost>;
    };
  };
}

export interface DirectMessageChatProps {
  history: History;
}

export const DirectMessageChat = ({ history }: DirectMessageChatProps) => {
  const [imageURLFile, setImageURLFile] = useState<string>('');
  const [file, setFile] = useState<File>(null);
  const { updateToast } = useToast();
  const { friendId } = useParams<{ friendId: string }>();
  const friendUserId = parseInt(friendId);
  const {
    data: headerData,
    loading: headerLoading,
    error: headerError,
  } = useDirectMessageHeaderQuery({ variables: { userId: friendUserId } });
  const {
    data: chatData,
    loading: chatLoading,
    error: chatError,
    subscribeToMore,
  } = useDirectMessageQuery({
    variables: {
      friendUserId,
    },
  });

  const [uploadFile] = useUploadFileMutation();
  const [createPostMutation] = useCreatePostMutation();

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const chatInputBot = useRef<string>('');

  const subToMore = () =>
    subscribeToMore({
      document: PostAddedDocument,
      variables: { channelId: chatData.getDirectMessageChannel.id },
      updateQuery: (prev, { subscriptionData }: subscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newPostItem = subscriptionData.data.postAdded;
        //Add the new message received from the subscriber
        return Object.assign({}, prev, {
          getDirectMessageChannel: {
            posts: [...prev.getDirectMessageChannel.posts, newPostItem],
          },
        });
      },
    });

  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageURLFile(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    formik.setFieldValue('imageFile', event.target.files[0]);
  };

  const handleCloseImage = () => {
    setImageURLFile('');
    setFile(null);
  };

  const formik = useFormik<IChatForm>({
    initialValues: {
      message: '',
      imageFile: '',
    },

    validationSchema: Yup.object({
      message: file
        ? Yup.string()
            .optional()
            .max(LIMITS.POST_MESSAGE, `A post must be at most ${LIMITS.POST_MESSAGE} characters.`)
        : Yup.string()
            .required()
            .test('no-whitespace', "Message can't be empty", (value) => !/^\s*$/.test(value))
            .max(LIMITS.POST_MESSAGE, `A post must be at most ${LIMITS.POST_MESSAGE} characters.`),
      imageFile: Yup.mixed().test('big-file', 'File size is too large', validateFileSize),
    }),

    onSubmit: async (_, { resetForm }) => {
      try {
        const uploadedFile = file
          ? (await uploadFile({ variables: { file: file } })).data.uploadFile
          : null;

        await createPostMutation({
          variables: {
            post: {
              channel: { id: chatData.getDirectMessageChannel.id },
              message: formik.values.message ? formik.values.message : '',
              media: uploadedFile
                ? { id: uploadedFile.id, mediaType: uploadedFile.mediaType }
                : null,
              createdTime: Date.now(),
            } as CreatePostInput,
          },
        });

        resetForm();
        handleCloseImage();
      } catch (err) {
        updateToast('Unable to send message', toast.TYPE.ERROR);
        console.error(err);
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      updateChatContainerStyle(setContainerStyle, containerRef);
    }, 200);
  }, []);

  useEffect(() => {
    updateChatContainerStyle(setContainerStyle, containerRef);
  }, [formik.values.message]);

  if (chatLoading) return <Spinner />;

  if (!chatData.getDirectMessageChannel || chatError || headerError) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return (
    <div
      className="page-container no-bot-nav with-sub-nav-and-header"
      style={containerStyle}
      ref={containerRef}
    >
      <div className="direct-message-chat">
        <ChatHeader
          isLoading={headerLoading}
          user={headerData.user as Partial<User>}
          history={history}
          isDirectMessage
        />
        <ChatBubbleList
          history={history}
          posts={chatData.getDirectMessageChannel.posts}
          subToMore={subToMore}
        />
        <ChatInput
          formik={formik}
          handleFileUpload={handleFileUpload}
          image={imageURLFile}
          handleCloseImage={handleCloseImage}
          onFocus={() => {
            chatInputOnFocus(chatInputBot, setContainerStyle, containerRef);
          }}
          onBlur={() => {
            chatInputOnBlur(chatInputBot, setContainerStyle, containerRef);
          }}
        />
      </div>
    </div>
  );
};

export default DirectMessageChat;
