import React, { type InputHTMLAttributes, forwardRef } from 'react';
import styles from './index.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, ...rest }, ref) => {
    return (
        <label className={styles.radiowrapper}>
            <input
                type="radio"
                className={styles.radio}
                ref={ref}
                {...rest}
            />
            {label}
        </label>
    );
});

Radio.displayName = 'Radio';

export default Radio;
