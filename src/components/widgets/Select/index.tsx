import React, { useState, useRef, useEffect } from 'react';
import type { UIEvent } from 'react';
import './index.css';
import { CaretIcon } from './CaretIcon';
import { Checkmark } from './Checkmark';
import clsx from 'clsx';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value?: Option | Option[] | null;
  onChange?: (value: Option | Option[] | null) => void;
  getSingleValue?: (value: Option | null) => void;
  options: Option[];
  placeholder?: string;
  prefixClass?: string;
  headerClass?: string;
  containerClass?: string;
  isMulti?: boolean;
  isCheckIcon?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  enableInfiniteScroll?: boolean;
  searchable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange = () => { },
  getSingleValue = () => { },
  options,
  placeholder = 'Select...',
  isMulti = false,
  isCheckIcon = true,
  onLoadMore,
  prefixClass = '',
  headerClass = '',
  containerClass = '',
  isLoadingMore = false,
  enableInfiniteScroll = false,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    if (isMulti) {
      const selectedValues = (value as Option[]) || [];
      const exists = selectedValues.some((item) => item.value === option.value);
      const newValue = exists
        ? selectedValues.filter((item) => item.value !== option.value)
        : [...selectedValues, option];
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
    getSingleValue(option);
  };

  const isSelected = (option: Option) => {
    if (isMulti) {
      return (value as Option[])?.some((item) => item.value === option.value);
    }
    return (value as Option)?.value === option.value;
  };

  const displayValue = () => {
    if (isMulti) {
      return (value as Option[])?.length
        ? (value as Option[]).map((v) => v.label).join(', ')
        : placeholder;
    }
    return (value as Option)?.label || placeholder;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!enableInfiniteScroll) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      onLoadMore?.();
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setIsOpen(false);
      setSearchTerm('');
      onChange(isMulti ? [] : null);
      getSingleValue(null);
    };
  }, []);

  return (
    <div className={clsx('select-container', prefixClass, containerClass)} ref={dropdownRef}>
      <div className={clsx('select-header', headerClass)} onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
        <span className={isMulti ? 'multiple-value' : 'single-value'}>{displayValue()}</span>
        <span className={`caret-icon arrow ${isOpen ? 'open' : ''}`}>
          <CaretIcon />
        </span>
      </div>

      {isOpen && (
        <div className="select-options" ref={optionsRef} onScroll={enableInfiniteScroll ? handleScroll : undefined}>
          {searchable && (
            <div className="select-search">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`select-option ${isSelected(option) ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {isSelected(option) && isCheckIcon && (
                  <span className="checkmark">
                    <Checkmark />
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="select-no-results">No options found</div>
          )}

          {enableInfiniteScroll && isLoadingMore && (
            <div className="select-loading">Loading more...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
