import { faImages, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent } from 'react';
import './custom-file-upload.scss';

export interface CustomFileUploadProps {
  className: string;
  hasErrors: boolean;
  errorMessage: string;
  imageURL: string;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
  displayPencilIcon?: boolean;
}

export const CustomFileUpload = ({
  className,
  imageURL,
  hasErrors,
  errorMessage,
  handleFileUpload,
  fieldName,
  displayPencilIcon,
}: CustomFileUploadProps) => {
  return (
    <div className="custom-file-upload-container">
      <label htmlFor={fieldName} className={`${imageURL ? 'image-uploaded' : ''}`}>
        {imageURL ? (
          <img className="custom-file-upload-image" src={imageURL} alt="Event" />
        ) : (
          <div className={`button ${className}`}>
            <FontAwesomeIcon className="custom-file-upload-icon" icon={faImages} />
          </div>
        )}
        {displayPencilIcon && (
          <FontAwesomeIcon className="custom-file-upload-pencil-icon button" icon={faPencilAlt} />
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
