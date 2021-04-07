import React, { ChangeEvent, ReactNode, useRef } from 'react';
import './mull-text-area.scss';

export interface MullTextAreaProps {
  inputRef?: React.MutableRefObject<HTMLDivElement>;
  title: string;
  fieldName: string;
  errorMessage?: string;
  hasErrors?: boolean;
  svgIcon?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLDivElement>) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  placeholder?: string;
}

export function MullTextArea({
  inputRef,
  title,
  fieldName,
  hasErrors = false,
  errorMessage = null,
  svgIcon,
  onChange,
  onClick,
  onFocus,
  onBlur,
  placeholder,
}: MullTextAreaProps) {
  const grower = useRef<HTMLDivElement>(null);
  return (
    <div className={`mull-text-area-container ${hasErrors ? 'error' : ''}`}>
      <label className="mull-text-area-label" htmlFor={fieldName}>
        {title}
      </label>
      <div className="mull-text-area-sub-container grow-wrap" ref={grower}>
        <div
          ref={inputRef}
          style={{ whiteSpace: 'pre-wrap' }}
          className={`mull-text-area input-border ${hasErrors ? 'error' : ''}`}
          id={fieldName}
          data-testid="mull-text-area"
          onInput={onChange}
          onClick={onClick}
          placeholder={placeholder}
          contentEditable={true}
          suppressContentEditableWarning={true}
          role="textbox"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div className="mull-text-area-icon">{svgIcon ? svgIcon : null}</div>
      </div>
      {hasErrors ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
}

export default MullTextArea;
