import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    variant?: 'filled' | 'bordered';
    shape?: 'rounded' | 'flat';
    loading?: boolean;
}


const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    iconPosition = 'left',
    variant = 'filled',
    shape = 'rounded',
    loading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseClasses =
        'px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition flex items-center justify-center gap-2';

    const variantClasses =
        variant === 'bordered'
            ? 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed';

    const shapeClass = shape === 'flat' ? 'rounded-none' : 'rounded-md';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${shapeClass} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
            {loading && <FaSpinner className='animate-spin' />}
            {label}
            {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
        </button>
    );
};

export default Button;
