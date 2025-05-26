import React, { useState, useRef, useEffect } from 'react';
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
    onChange: (value: any) => void;
    options: DropdownOption[];
    iconPosition?: 'left' | 'right';
    placeholder?: string;
    animated?: boolean;
    icon?: string,
}

const Dropdown: React.FC<DropdownProps> = ({
    name,
    value,
    onChange,
    options,
    iconPosition = 'left',
    placeholder = 'Select',
    icon = '',
    animated = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (option: DropdownOption) => {
        onChange(option.value);
        setIsOpen(false);
    };

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={toggleDropdown}>
                <span>{selectedOption?.label || placeholder}</span>
                <span style={{ transition: "ease-in-out 300ms", transform: `rotate(${isOpen ? "180deg" : "0deg"})` }}><CaretIcon /></span>
            </div>

            <ul className={`dropdown-menu ${isOpen ? 'open' : ''} ${animated ? 'animated' : ''}`}>
                {options.map((option) => (
                    <li
                        key={option.value}
                        className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
                        onClick={() => handleSelect(option)}
                        style={{display:"flex", justifyContent:iconPosition === "right"?"space-between":"start"}}
                    >
                        {option.icon && iconPosition === 'left' && <span className="icon">{option.icon}</span>}
                        <span>{option.label}</span>
                        {option.icon && iconPosition === 'right' && <span className="icon">{option.icon}</span>}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Dropdown;
