import React, { type InputHTMLAttributes, forwardRef } from 'react';
import './index.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, ...rest }, ref) => {
    return (
        <label className="radio-wrapper">
            <input
                type="radio"
                className="radio"
                ref={ref}
                {...rest}
            />
            {label}
        </label>
    );
});

Radio.displayName = 'Radio';

export default Radio;
