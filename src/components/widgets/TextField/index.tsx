import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './index.css';

interface FloatingInputProps {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'time';
    icon?: React.ReactNode;
    error?: string;
    isFloating?: boolean;
    inputClass?: string;
    floatLabelClass?: string;
    containerClass?: string;
    iconClass?: string;
    errorClass?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    name?: string;
}

const TextField = forwardRef<HTMLInputElement, FloatingInputProps>(({
    id,
    label,
    type,
    icon,
    error,
    isFloating = false,
    value = '',
    inputClass = '',
    floatLabelClass = '',
    containerClass = '',
    iconClass = '',
    errorClass = '',
    onChange,
    onBlur,
    name,
}, ref) => {
    return (
        <div className={clsx('textfield-container', containerClass)}>
            <input
                id={id}
                ref={ref}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={isFloating ? ' ' : label}
                className={clsx(
                    'textfield-input',
                    inputClass,
                    error && 'textfield-input-error'
                )}
            />

            {isFloating && (
                <label
                    htmlFor={id}
                    className={clsx(
                        'textfield-label label-default',
                        floatLabelClass
                    )}
                >
                    {label}
                </label>
            )}

            {icon && (
                <span className={clsx('textfield-icon', iconClass)}>
                    {icon}
                </span>
            )}

            {error && (
                <p className={clsx('textfield-error', errorClass)}>
                    {error}
                </p>
            )}
        </div>
    );
});

TextField.displayName = 'TextField';

export default TextField;
