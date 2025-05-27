import React, { type TextareaHTMLAttributes, forwardRef } from 'react';
import "./index.css"

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ ...props }, ref) => {
    return <textarea className='textarea-wrapper' ref={ref} {...props} />;
});

TextArea.displayName = 'TextArea';

export default TextArea;
