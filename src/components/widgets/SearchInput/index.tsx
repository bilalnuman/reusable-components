import {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
    type ForwardRefRenderFunction,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import Styles from './index.module.css';

export interface SearchInputProps {
    placeholder?: string;
    onChange?: (value: string) => void;
    iconSize?: string;
    stroke?: string;
    fill?: string;
    prefixClass?: string;
    paramName?: string;
    delayTime?: number;
}

export interface SearchInputRef {
    clear: () => void;
}

function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const SearchInput: ForwardRefRenderFunction<SearchInputRef, SearchInputProps> = (
    {
        placeholder = 'Search...',
        fill,
        prefixClass,
        iconSize,
        stroke,
        onChange,
        paramName = 'search',
        delayTime = 500,
    },
    ref
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get(paramName) || '');
    const [isFocused, setIsFocused] = useState(false);
    const debouncedQuery = useDebounce(query, delayTime);

    useEffect(() => {
        if (debouncedQuery) {
            searchParams.set(paramName, debouncedQuery);
        } else {
            searchParams.delete(paramName);
        }
        setSearchParams(searchParams);

        if (onChange) {
            onChange(debouncedQuery);
        }
    }, [debouncedQuery]);
    useImperativeHandle(ref, () => ({
        clear() {
            if (query !== '') {
                setQuery('');
            }
        }

    }));

    return (
        <div className={`${Styles.Searchcontainer} ${isFocused ? Styles.focused : ''} ${prefixClass || ''}`}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
            />
            <span>
                <svg
                    stroke={stroke || 'currentColor'}
                    fill={fill || 'currentColor'}
                    strokeWidth="0"
                    version="1.1"
                    id="search"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    height={iconSize || '1.3em'}
                    width={iconSize || '1.3em'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
              c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
              M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
              z"></path>
                    </g>
                </svg>
            </span>
        </div>
    );
};

export default forwardRef(SearchInput);
