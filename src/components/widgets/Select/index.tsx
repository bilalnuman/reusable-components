import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
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
  value?: string | string[] | null;
  onChange?: (value: string | string[] | null) => void;
  getSingleValue?: (value: Option | null) => void;
  options: Option[];
  placeholder?: string;
  prefixClass?: string;
  headerClass?: string;
  containerClass?: string;
  isMulti?: boolean;
  required?: boolean;
  isCheckIcon?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  enableInfiniteScroll?: boolean;
  searchable?: boolean;
  error?: string;
  label?: string
}

// ForwardRef starts here
const Select = forwardRef<HTMLDivElement, SelectProps>(({
  value,
  onChange,
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
  required = false,
  error = '',
  label
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

  const selectedValues = isMulti
    ? options.filter((o) => (value as string[])?.includes(o.value))
    : options.find((o) => o.value === value) || null;

  const handleSelect = (option: Option) => {
    if (isMulti) {
      const selected = new Set(value as string[]);
      if (selected.has(option.value)) {
        selected.delete(option.value);
      } else {
        selected.add(option.value);
      }
      const newValue = Array.from(selected);
      onChange?.(newValue);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
    getSingleValue(option);
  };

  const isSelected = (option: Option) => {
    if (isMulti) {
      return (value as string[])?.includes(option.value);
    }
    return value === option.value;
  };

  const displayValue = () => {
    if (isMulti) {
      return (selectedValues as Option[])?.length
        ? (selectedValues as Option[]).map((v) => v.label).join(', ')
        : <span className='placeholder'>{placeholder}</span>;
    }
    return (selectedValues as Option)?.label || <span className='placeholder'>{placeholder}</span>;
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

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setIsOpen(false);
      setSearchTerm('');
      getSingleValue(null);
    };
  }, []);

  return (
    <div className={clsx('select-container', prefixClass, containerClass)} ref={dropdownRef}>
      {label ? <div className='select-label'>{label}
         {required && error?<sup className='required'>*</sup>:null}
      </div> : null}
      <div
        className={clsx('select-header', headerClass, error ? "error-border" : "")}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span className={isMulti ? 'multiple-value' : 'single-value'}>{displayValue()}</span>
        <span className={`caret-icon arrow ${isOpen ? 'open' : ''}`}>
          <CaretIcon fill='#9ca2b0' />
        </span>
      </div>

      {isOpen && (
        <div
          className="select-options"
          ref={optionsRef}
          onScroll={enableInfiniteScroll ? handleScroll : undefined}
        >
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
      {error && <div className="error">{error}</div>}
    </div>
  );
});

export default Select;
