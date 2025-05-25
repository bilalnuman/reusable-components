import React from 'react';
import clsx from 'clsx';

const dateTimeFields = ["date", "time"]

interface FloatingInputProps {
    id: string;
    label: string;
    type: 'text' | 'date' | 'datetime-local' | 'time';
    icon?: React.ReactNode;
    error?: string;
    isFloating?: boolean;
    inputClass?: string;
    floatLabelClass?: string,
    containerClass?: string
    iconClass?: string,
    errorClass?: string,
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    name?: string;
}

const TextField: React.FC<FloatingInputProps> = ({
    id,
    label,
    type,
    icon,
    error,
    inputClass = '',
    floatLabelClass = '',
    containerClass = '',
    iconClass = '',
    errorClass = '',
    isFloating = false,
    value = '',
    onChange,
    onBlur,
    name,
}) => {
    return (
        <div className={clsx("relative w-full", containerClass)}>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={clsx(
                    'block px-2.5 w-full rounded border appearance-none focus:outline-none focus:ring focus:ring-blue-400 peer',
                    inputClass,
                    error ? 'border-red-500' : 'border-gray-300'
                )}
                placeholder={isFloating ? ' ' : label}
            />

            {isFloating &&
                <label
                    htmlFor={id}
                    className={clsx(`absolute text-gray-500 bg-white duration-300 transform scale-75bg-white top-2 z-10 origin-[0] left-2
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-2.5
                    peer-placeholder-shown:top-[-1px]
                    peer-focus:top-2
                      peer-focus:w-fit
                      peer-focus:h-fit
                    peer-focus:scale-75
                    peer-focus:-translate-y-[22px]
                    peer-focus:text-blue-600
                    peer-not-placeholder-shown:top-1
                    peer-not-placeholder-shown:scale-75
                    peer-not-placeholder-shown:-translate-y-5`,
                        dateTimeFields.includes(type) && !value ? "w-1/2 h-[80%]" : " -translate-y-[22px]",
                        floatLabelClass)}
                >
                    {label}
                </label>}
            {icon && (
                <span className={clsx("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400", iconClass)}>
                    {icon}
                </span>
            )}

            {/* Error */}
            {error && <p className={clsx("mt-1 text-sm text-red-600", errorClass)}>{error}</p>}
        </div>
    );
};

export default TextField;
