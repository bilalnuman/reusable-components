import {
    type TextareaHTMLAttributes,
    forwardRef,
    memo,
} from "react";
import styles from "./index.module.css"

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
    wrapperClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    label,
    error,
    required,
    className = "",
    wrapperClassName = "",
    labelClassName = "",
    errorClassName = "",
    ...props
}, ref) => {
    return (
        <div className={`${styles.textareaContainer} ${wrapperClassName}`}>
            {label && (
                <label htmlFor={label} className={`${styles.textareaLabel}  ${labelClassName}`}>
                    {label} {required && error && <span className={styles.stars}>*</span>}
                </label>
            )}
            <textarea
                ref={ref}
                id={label}
                className={`${styles.textareaWrapper} ${className} ${error && styles.error}`}
                {...props}
            />
            {error && (
                <p className={`${styles.error} ${errorClassName}`}>
                    {error}
                </p>
            )}
        </div>
    );
});

TextArea.displayName = "TextArea";
export default memo(TextArea);
