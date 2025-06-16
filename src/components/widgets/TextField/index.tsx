import React, { useState, forwardRef } from 'react';
import styles from "./index.module.css"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    name?: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'time' | 'number';
    icon?: React.ReactNode;
    error?: string;
    isFloating?: boolean;
    required?: boolean;
    inputClass?: string;
    inputContainer?: string;
    floatLabelClass?: string;
    containerClass?: string;
    iconClass?: string;
    errorClass?: string;
    handleTogglePassword?: (type: string) => void
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
    id,
    label,
    name,
    type = 'text',
    icon,
    error,
    isFloating = false,
    required = false,
    inputClass = '',
    floatLabelClass = '',
    containerClass = '',
    inputContainer = '',
    iconClass = '',
    errorClass = '',
    value,
    onChange,
    onBlur,
    handleTogglePassword,
    ...rest
}, ref) => {
    const [focused, setFocused] = useState(false);
    const handleFocus = () => setFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        setFocused(false);
    };
    const isActive = focused || (!!value && value !== '');

    return (
        <div className={`${styles.container}${containerClass}`}>
            {isFloating ? (
                <label
                    htmlFor={id || name}
                    className={`${isFloating ? styles.floatLabel : ""} ${error?styles.floatError:""} ${floatLabelClass} ${isActive? styles.focusd:""}`}
                >
                    {label}
                    {required && error ? <sup className='required'>*</sup> : null}
                </label>
            ) : (
                <label
                    htmlFor={id || name}
                    className={styles.nonFloatingLabel}
                >
                    {label}
                    {required && error ? <sup className='required'>*</sup> : null}
                </label>
            )}

            <div className={`${styles.inputContainer} ${inputContainer} ${focused && styles.focusdwring} ${error && styles.error}`}>
                <input
                    id={id || name}
                    name={name}
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isFloating ? ' ' : label}

                    className={`${inputClass} ${styles.input} ${error && styles.error} ${styles.icon}`}
                    {...rest}
                    autoComplete={type === "password" ? 'new-password' : type === "email" ? "username" : null}
                />

                {handleTogglePassword && icon && (
                    <button
                        type="button"
                        className={`${styles.fieldIcon} ${iconClass}`}
                        onClick={() => handleTogglePassword(name)}
                    >
                        {icon}
                    </button>
                )}
            </div>

            {error && (
                <p className={`${styles.error} ${errorClass}`}>
                    {error}
                </p>
            )}
        </div>
    );
});

TextField.displayName = 'TextField';
export default TextField;
