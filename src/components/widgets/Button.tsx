import React, { forwardRef } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    variant?: 'filled' | 'bordered' | 'text';
    shape?: 'rounded' | 'flat';
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            label,
            icon,
            iconPosition = 'left',
            variant = 'filled',
            shape = 'rounded',
            loading = false,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const baseClasses =
            'px-4 py-2 transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';

        const variantClasses =
            variant === 'bordered'
                ? 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
                : variant === 'text'
                    ? 'bg-transparent border-none text-blue-600 hover:underline'
                    : 'bg-blue-600 text-white hover:bg-blue-700';

        const shapeClass = shape === 'flat' ? 'rounded-none' : 'rounded-md';
        const disabledClass = 'disabled:opacity-50 disabled:cursor-not-allowed';

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${variantClasses} ${shapeClass} ${disabledClass} ${className}`}
                disabled={disabled || loading}
                {...props}
            >
                {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
                {loading && <FaSpinner className="animate-spin" />}
                {label}
                {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
            </button>
        );
    }
);
Button.displayName = 'Button';

export default Button;
