import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    type ClipboardEvent,
} from 'react';
import clsx from 'clsx';
import "./index.css"

interface OTPInputProps {
    length?: number;
    value?: string[];
    onChange?: (val: string[]) => void;
    error?: string;
    disabled?: boolean;
    name?: string;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
    ({ length = 6, value, onChange, error, disabled = false }, ref) => {
        const inputRefs = useRef<HTMLInputElement[]>([]);
        const [internalValues, setInternalValues] = useState<string[]>(
            Array(length).fill('')
        );

        const isControlled = value !== undefined && typeof onChange === 'function';
        const currentValues = isControlled ? value : internalValues;

        const setValues = (newValues: string[]) => {
            if (isControlled) onChange?.(newValues);
            else setInternalValues(newValues);
        };

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            index: number
        ) => {
            const val = e.target.value.replace(/\D/g, ''); 
            if (val.length === 1) {
                const updated = [...currentValues];
                updated[index] = val;
                setValues(updated);
                if (index < length - 1) {
                    inputRefs.current[index + 1]?.focus();
                }
            }
        };

        const handleKeyDown = (
            e: React.KeyboardEvent<HTMLInputElement>,
            index: number
        ) => {
            if (e.key === 'Backspace') {
                const updated = [...currentValues];
                if (updated[index]) {
                    updated[index] = '';
                    setValues(updated);
                } else if (index > 0) {
                    updated[index - 1] = '';
                    setValues(updated);
                    inputRefs.current[index - 1]?.focus();
                }
            }
        };

        const handlePaste = (
            e: ClipboardEvent<HTMLInputElement>,
            index: number
        ) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
            if (!pasted) return;

            const updated = [...currentValues];
            let currentIndex = index;

            for (const char of pasted) {
                if (currentIndex >= length) break;
                updated[currentIndex] = char;
                currentIndex++;
            }

            setValues(updated);

            const focusIndex = Math.min(index + pasted.length, length - 1);
            inputRefs.current[focusIndex]?.focus();
        };

        useEffect(() => {
            if (!isControlled) {
                setInternalValues(Array(length).fill(''));
            }
        }, [length]);

        return (
            <>
                <div className="otp-input-group" ref={ref}>
                    {Array.from({ length }).map((_, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                if (el) inputRefs.current[i] = el;
                            }}

                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={currentValues[i] || ''}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={(e) => handlePaste(e, i)}
                            className={clsx('otp-input', { error })}
                            disabled={disabled}
                        />
                    ))}
                </div>
                {error && <p className="otp-error">{error}</p>}
            </>
        );
    }
);
