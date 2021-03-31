import { IChatForm, ISerializedPost } from '@mull/types';
import { useFormik } from 'formik';
import React, { ChangeEvent, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ROUTES } from '../../../../../src/constants';
import {
  CreatePostInput,
  Event,
  PostAddedDocument,
  useChannelByEventIdQuery,
  useCreatePostMutation,
  useUploadFileMutation,
} from '../../../../generated/graphql';
import { ChatInput } from '../../../components';
import ChatBubbleList from '../../../components/chat-bubble-list/chat-bubble-list';
import UserContext from '../../../context/user.context';
import { useToast } from '../../../hooks/useToast';

interface subscriptionData {
  subscriptionData: {
    data: {
      postAdded: Partial<ISerializedPost>;
    };
  };
}

export interface EventChatProps {
  eventId: number;
  channelName: string;
  restrictChatInput: boolean;
}

export const EventChat = ({ eventId, channelName, restrictChatInput }: EventChatProps) => {
  const { updateToast } = useToast();
  const [createPostMutation] = useCreatePostMutation();

  const [imageURLFile, setImageURLFile] = useState<string>('');
  const [uploadFile] = useUploadFileMutation();
  const [file, setFile] = useState<File>(null);

  const { userId } = useContext(UserContext);
  const { data, loading, error, subscribeToMore } = useChannelByEventIdQuery({
    variables: {
      eventId, //TODO: Replace with dynamic event ID
      channelName,
    },
  });

  const isEventHost = (event: Event) => {
    if (restrictChatInput) {
      return event.host.id === userId || event.coHosts.some((coHost) => coHost.id === userId);
    }
    return true;
  };

  const subToMore = () =>
    subscribeToMore({
      document: PostAddedDocument,
      variables: { channelId: data.getChannelByEventId.id },
      updateQuery: (prev, { subscriptionData }: subscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newPostItem = subscriptionData.data.postAdded;
        //Add the new message received from the subscriber
        return Object.assign({}, prev, {
          getChannelByEventId: {
            posts: [...prev.getChannelByEventId.posts, newPostItem],
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
      message: file ? Yup.string().optional() : Yup.string().required(),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const uploadedFile = file
          ? (await uploadFile({ variables: { file: file } })).data.uploadFile
          : null;

        const post = createPostMutation({
          variables: {
            post: {
              channel: { id: data.getChannelByEventId.id },
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
  if (error) {
    return <Redirect to={ROUTES.LOGIN} />;
  }
  if (loading) return <div className="page-container">Loading...</div>;
  if (data) {
    return (
      <div className="event-chat">
        <ChatBubbleList posts={data.getChannelByEventId.posts} subToMore={subToMore} />
        {isEventHost(data.getChannelByEventId.event as Event) && (
          <ChatInput
            formik={formik}
            handleFileUpload={handleFileUpload}
            image={imageURLFile}
            handleCloseImage={handleCloseImage}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default EventChat;
