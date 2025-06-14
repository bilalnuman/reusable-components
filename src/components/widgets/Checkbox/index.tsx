import React, { type InputHTMLAttributes, forwardRef } from 'react';
import styles from './index.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...rest }, ref) => {
    return (
        <label className={styles.checkboxwrapper}>
            <input
                type="checkbox"
                className={styles.checkbox}
                ref={ref}
                {...rest}
            />
            {label}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
