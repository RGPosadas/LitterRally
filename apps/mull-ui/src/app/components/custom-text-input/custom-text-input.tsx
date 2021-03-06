import React, { ChangeEvent, ReactNode } from 'react';
import './custom-text-input.scss';

export interface CustomTextInputProps {
  title: string;
  value: string;
  fieldName: string;
  errorMessage?: string;
  hasErrors?: boolean;
  svgIcon?: ReactNode;
  type?: 'text' | 'password' | 'email';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
}

/**
 * This component renders a text input with a label. It supports validations
 * based on the values of hasErrors and errorMessage.
 * @param {string} title Label of the input
 * @param {string} value
 * @param {string} fieldName String to identify input
 * @param {boolean} hasErrors
 * @param {string} errorMessage
 * @param {ReactNode} svgIcon The svg in the text input
 * @param {password} password
 * @param {(event: ChangeEvent<HTMLInputElement>) => void} onChange Handler for when text is changed
 * @param {(event: ChangeEvent<MouseEventHandler>) => void} onClick Handler for when input is clicked
 * @param {boolean} readOnly Text inside input cannot be editted
 * @param {string} placeholder
 * @param {string} autoComplete
 */
export const CustomTextInput = ({
  title,
  value,
  fieldName,
  onChange,
  hasErrors = false,
  errorMessage = null,
  svgIcon,
  type = 'text',
  onClick,
  readOnly,
  placeholder,
  autoComplete,
}: CustomTextInputProps) => {
  return (
    <div className={`custom-text-input-container ${hasErrors ? 'error' : ''}`}>
      <label className="custom-text-input-label" htmlFor={fieldName}>
        {title}
      </label>
      <div className="custom-text-input-sub-container">
        <input
          className={`custom-text-input input-border ${hasErrors ? 'error' : ''}`}
          aria-label={fieldName}
          id={fieldName}
          name={fieldName}
          data-testid="custom-text-input"
          type={type}
          value={value}
          onChange={onChange}
          onClick={onClick}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <div className="custom-text-input-icon">{svgIcon ? svgIcon : null}</div>
      </div>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

export default CustomTextInput;
