import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    forwardRef,
} from 'react';
import './index.css';
import { CaretIcon } from './CaretIcon';

export interface DropdownOption {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
}

export interface DropdownProps {
    name?: string;
    value?: string | number;
    onChange: (value: string | number) => void;
    options: DropdownOption[];
    iconPosition?: 'left' | 'right';
    placeholder?: string;
    animated?: boolean;
    icon?: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
    name,
    value,
    onChange,
    options,
    iconPosition = 'left',
    placeholder = 'Select',
    animated = false,
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    const handleSelect = useCallback((option: DropdownOption) => {
        onChange(option.value);
        setIsOpen(false);
    }, [onChange]);

    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            className="dropdown"
            tabIndex={0}
            ref={(el) => {
                containerRef.current = el;
                if (typeof ref === 'function') ref(el);
                else if (ref) ref.current = el;
            }}
        >
            <div
                className="dropdown-toggle"
                onClick={toggleDropdown}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selectedOption?.label || placeholder}</span>
                <span className={`dropdown-caret ${isOpen ? 'open' : ''}`}>
                    <CaretIcon />
                </span>
            </div>

            <ul
                className={`dropdown-menu${isOpen ? ' open' : ''}${animated ? ' animated' : ''
                    }`}
                role="listbox"
                aria-label={name}
            >
                {options.map((option) => (
                    <li
                        key={option.value}
                        role="option"
                        aria-selected={option.value === value}
                        className={`dropdown-item${option.value === value ? ' selected' : ''
                            }`}
                        onClick={() => handleSelect(option)}
                        style={{
                            justifyContent:
                                option.icon && iconPosition === 'right' ? 'space-between' : 'flex-start',
                        }}
                    >
                        {option.icon && iconPosition === 'left' && (
                            <span className="icon">{option.icon}</span>
                        )}
                        <span>{option.label}</span>
                        {option.icon && iconPosition === 'right' && (
                            <span className="icon">{option.icon}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
