import React, { ChangeEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { cloneDeep } from 'lodash';
import { History } from 'history';

import {
  MullButton,
  CustomFileUpload,
  PillOptions,
  CustomTextInput,
  CustomTimePicker,
} from './../../components';
import DateCalendar from './date-calendar/date-calendar';
import { EventPage } from './../event-page/event-page';
import { useToast } from '../../hooks/useToast';

import { EventRestriction, EventRestrictionMap, IEvent, IMedia } from '@mull/types';
import { DAY_IN_MILLISECONDS } from '../../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPencilAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './create-event.scss';

export interface CreateEventProps {
  history: History;
}

// Mutation to create events
const CREATE_EVENT = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      mediaType
    }
  }
`;

/**
 * This component renders the create event page
 * @param {History} history
 */
const CreateEventPage = ({ history }: CreateEventProps) => {
  // GraphQL mutation hook to create events
  const [createEvent] = useMutation<IEvent>(CREATE_EVENT);
  const [uploadFile] = useMutation<{ uploadFile: IMedia }>(UPLOAD_PHOTO);
  // Uploaded Image File
  const [imageURLFile, setImageURLFile] = useState<string>(null); // Path of uploaded image on client, to be used in image previews
  const [file, setFile] = useState<File>(null); // Uploaded image file blob
  const [isInReview, setIsInReview] = useState<boolean>(false); // Show either form or review page
  const [payload, setPayload] = useState<Partial<IEvent>>(null);
  const { notifyToast, updateToast } = useToast();
  /**
   * Handles image file uploads
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setImageURLFile(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    formik.setFieldValue('imageFile', event.target.files[0]);
  };

  /**
   * Adds time to a Date object
   * @param {string} time Time in HH:MM format
   * @param {Date} date Date object
   */
  const addTimeToDate = (time: string, date: Date) => {
    const [hour, minute] = time.split(':');
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
  };

  const formik = useFormik({
    initialValues: {
      activeRestriction: EventRestriction.NONE,
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: '',
      eventTitle: '',
      description: '',
      location: '',
      imageFile: '',
    },

    validationSchema: Yup.object({
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .nullable()
        .test('maxEventLength', 'Event length cannot be over 30 days.', function (endDate) {
          if (!endDate) return true;
          const diff = Math.abs(+endDate - +this.parent.startDate);
          return diff <= 30 * DAY_IN_MILLISECONDS;
        }),
      startTime: Yup.string().required('Start Time is required.'),
      endTime: Yup.string().required('End Time is required.'),
      eventTitle: Yup.string()
        .required('Event Title is required.')
        .max(65, 'Event Title length must be under 65 characters.'),
      activeRestriction: Yup.number().min(0).max(2),
      description: Yup.string()
        .required('Event Description is required.')
        .max(5000, 'Event Description must be under 5000 characters.'),
      location: Yup.string().required('Event Location is required.'),
      imageFile: Yup.mixed().required('Image is required.'),
    }),

    onSubmit: async (values) => {
      if (!values.endDate) values.endDate = cloneDeep(values.startDate);
      addTimeToDate(values.startTime, values.startDate);
      addTimeToDate(values.endTime, values.endDate);
      try {
        var uploadedFile = await uploadFile({ variables: { file: file } });
        if (uploadedFile instanceof Error) {
          throw uploadedFile;
        }
      } catch (err) {
        updateToast(toast.TYPE.ERROR, 'Fatal Error: Event Not Created');
        console.error(err);
        return;
      }
      const imageMedia: IMedia = {
        id: uploadedFile.data.uploadFile.id,
        mediaType: uploadedFile.data.uploadFile.mediaType,
      };
      setPayload({
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,
        title: values.eventTitle,
        restriction: values.activeRestriction,
        image: imageMedia,
      });
      setIsInReview(true);
    },
  });

  /**
   * Handles the change of the event restriction.
   * @param idx Index of Active Restriction
   */
  const handleRestrictions = (idx: number) => {
    formik.setFieldValue('activeRestriction', idx);
  };

  const handleReviewButton = async () => {
    const errors = await formik.validateForm();
    if (isEmpty(errors)) {
      if (!formik.values.endDate) formik.values.endDate = cloneDeep(formik.values.startDate);
      addTimeToDate(formik.values.startTime, formik.values.startDate);
      addTimeToDate(formik.values.endTime, formik.values.endDate);
      setPayload({
        startDate: formik.values.startDate,
        endDate: formik.values.endDate,
        description: formik.values.description,
        title: formik.values.eventTitle,
        restriction: formik.values.activeRestriction,
        image: null,
      });
      setIsInReview(true);
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<FormikValues>>(errors, true));
    }
  };

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      {isInReview ? (
        <EventPage
          event={payload}
          prevPage={'Edit'}
          onBackButtonClick={() => setIsInReview(false)}
          buttonType={'submit'}
          eventImageURL={imageURLFile}
        />
      ) : (
        <div className="page-container">
          <div className="create-event">
            <p className="create-event-text">Create Event</p>
            <CustomFileUpload
              imageURL={imageURLFile}
              hasErrors={formik.touched.imageFile && !!formik.errors.imageFile}
              errorMessage={formik.errors.imageFile}
              handleFileUpload={handleFileUpload}
              fieldName="imageFile"
            />
            <DateCalendar
              startDate={formik.values.startDate}
              endDate={formik.values.endDate}
              hasErrors={formik.touched.endDate && !!formik.errors.endDate}
              errorMessage={formik.errors.endDate as string}
              onStartDateChange={(date) => {
                formik.setFieldValue('startDate', date);
                formik.setFieldValue('endDate', null);
              }}
              onEndDateChange={(date) => {
                formik.setFieldValue('endDate', date);
              }}
            />
            <CustomTimePicker
              label="Start Time"
              fieldName="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              hasErrors={formik.touched.startTime && !!formik.errors.startTime}
              errorMessage={formik.errors.startTime}
            />
            <CustomTimePicker
              label="End Time"
              fieldName="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              hasErrors={formik.touched.endTime && !!formik.errors.endTime}
              errorMessage={formik.errors.endTime}
            />
            <CustomTextInput
              title="Event Title"
              fieldName="eventTitle"
              value={formik.values.eventTitle}
              onChange={formik.handleChange}
              hasErrors={formik.touched.eventTitle && !!formik.errors.eventTitle}
              errorMessage={formik.errors.eventTitle}
              svgIcon={<FontAwesomeIcon icon={faPencilAlt} />}
            />
            <CustomTextInput
              title="Description"
              fieldName="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              hasErrors={formik.touched.description && !!formik.errors.description}
              errorMessage={formik.errors.description}
              svgIcon={<FontAwesomeIcon icon={faAlignLeft} />}
            />
            <CustomTextInput
              title="Location"
              fieldName="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              hasErrors={formik.touched.location && !!formik.errors.location}
              errorMessage={formik.errors.location}
              svgIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            />
            <PillOptions
              options={EventRestrictionMap}
              onChange={handleRestrictions}
              active={formik.values.activeRestriction}
            />
            <MullButton className="create-event-button" type="button" onClick={handleReviewButton}>
              Done
            </MullButton>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateEventPage;
