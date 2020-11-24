import React, { ChangeEvent } from 'react';

import './custom-file-upload.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

export interface CustomFileUploadProps {
  hasErrors: boolean;
  errorMessage: string;
  imageURL: string;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
}

export const CustomFileUpload = ({
  imageURL,
  hasErrors,
  errorMessage,
  handleFileUpload,
  fieldName,
}: CustomFileUploadProps) => {
  return (
    <div className="custom-file-upload-container">
      <label
        htmlFor={fieldName}
        className={`custom-file-upload ${imageURL ? 'image-uploaded' : ''}`}
      >
        {imageURL ? (
          <img className="custom-file-upload-image" src={imageURL} alt="Event" />
        ) : (
          <div className="custom-file-upload-icon-container">
            <FontAwesomeIcon className="custom-file-upload-icon" icon={faImages} />
          </div>
        )}
      </label>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
      <input
        className="custom-file-upload-input"
        id={fieldName}
        type="file"
        onChange={handleFileUpload}
        accept="image/*"
        data-testid="file"
      />
    </div>
  );
};

export default CustomFileUpload;