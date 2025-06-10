import React, { type InputHTMLAttributes, forwardRef } from 'react';
import Styles from './checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string,
    prefixClass?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, prefixClass, ...rest }, ref) => {
    return (
        <label className={`${Styles.checkboxWrapper} ${prefixClass}`}>
            <input
                type="checkbox"
                className={Styles.checkbox}
                ref={ref}
                {...rest}
            />
            {label}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
