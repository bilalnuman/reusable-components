import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import './index.css';
import { Icon } from './icons';

interface DatePickerProps {
    name?: string;
    multiple?: boolean;
    rangeOnly?: boolean;
    value?: Date | Date[] | null;
    onChange?: (val: Date[] | Date | null) => void;
    onBlur?: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_RANGE = 100;
const START_YEAR = CURRENT_YEAR - 50;

const formatDateForInput = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const parseDateFromInput = (input: string): Date | null => {
    const parts = input.split('-');
    if (parts.length !== 3) return null;
    const [year, month, day] = parts.map(Number);
    if (
        !year || isNaN(year) ||
        !month || isNaN(month) || month < 1 || month > 12 ||
        !day || isNaN(day) || day < 1 || day > 31
    ) return null;
    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    ) {
        return date;
    }
    return null;
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
    ({ name, rangeOnly = true, multiple = false, value, onChange = () => { }, onBlur }, ref) => {
        const isControlled = value !== undefined;
        const [selectedDates, setSelectedDates] = useState<Date[]>(
            Array.isArray(value) ? value : value ? [value] : []
        );

        const [startDate, setStartDate] = useState<Date | null>(null);
        const [tempDates, setTempDates] = useState<Date[]>([]);
        const [showPicker, setShowPicker] = useState(false);
        const [currentDate, setCurrentDate] = useState(new Date());
        const [inputValue, setInputValue] = useState('');

        const pickerRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        const normalizeDate = (date: Date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d;
        };
        useEffect(() => {
            if (!isControlled || value == null) {
                setSelectedDates([]);
                setInputValue('');
                return;
            }

            if (multiple && Array.isArray(value)) {
                setSelectedDates(value);
            } else if (!multiple && value instanceof Date) {
                setSelectedDates([value]);
                setInputValue(formatDateForInput(value));
            }
        }, [value, multiple]);

        const triggerChange = (dates: Date[]) => {
            if (!isControlled) setSelectedDates(dates);

            if (multiple) {
                const output = rangeOnly
                    ? dates.length > 0 ? [dates[0], dates[dates.length - 1]] : null
                    : dates.length > 0 ? dates : null;
                onChange?.(output);
            } else {
                onChange?.(dates[0] ?? null);
            }
        };

        const getDaysInMonth = (year: number, month: number) =>
            new Date(year, month + 1, 0).getDate();
        const getFirstDayOfMonth = (year: number, month: number) =>
            new Date(year, month, 1).getDay();

        const handleClear = () => {
            triggerChange([]);
            setTempDates([]);
            setStartDate(null);
            setCurrentDate(new Date());
            setShowPicker(false);
            setInputValue('');
        };

        const handleSetDates = () => {
            triggerChange([...tempDates]);
            setStartDate(null);
            setShowPicker(false);
        };

        const handleDateClick = (day: number) => {
            const clickedDate = normalizeDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));

            if (multiple) {
                if (startDate === null) {
                    setStartDate(clickedDate);
                    setTempDates([clickedDate]);
                } else {
                    const start = normalizeDate(startDate);
                    if (clickedDate < start) {
                        setStartDate(clickedDate);
                        setTempDates([clickedDate]);
                    } else {
                        const range: Date[] = [];
                        let temp = new Date(start);
                        while (temp <= clickedDate) {
                            range.push(new Date(temp));
                            temp.setDate(temp.getDate() + 1);
                        }
                        setTempDates(range);
                    }
                }
            } else {
                triggerChange([clickedDate]);
                setInputValue(formatDateForInput(clickedDate));
                setShowPicker(false);
            }
        };

        const handleSelectToday = () => {
            const today = normalizeDate(new Date());
            setCurrentDate(today);

            if (multiple) {
                setStartDate(today);
                setTempDates([today]);
            } else {
                triggerChange([today]);
                setInputValue(formatDateForInput(today));
                setShowPicker(false);
            }
        };

        const isDateSelected = (day: number) => {
            const dateToCheck = normalizeDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
            const list = multiple && tempDates.length > 0 ? tempDates : selectedDates;
            return list.some(d => d.toDateString() === dateToCheck.toDateString());
        };

        const isDateDisabled = (day: number) => {
            if (!multiple || !startDate) return false;
            const dateToCheck = normalizeDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
            return dateToCheck < normalizeDate(startDate);
        };

        const handleInputBlur = () => {
            onBlur?.();
            if (!multiple) {
                const parsedDate = parseDateFromInput(inputValue);
                if (parsedDate) {
                    triggerChange([normalizeDate(parsedDate)]);
                    setCurrentDate(parsedDate);
                    setInputValue(formatDateForInput(parsedDate));
                } else {
                    if (selectedDates.length > 0) {
                        setInputValue(formatDateForInput(selectedDates[0]));
                    } else {
                        setInputValue('');
                    }
                }
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setInputValue(val);

            if (!multiple) {
                const parsedDate = parseDateFromInput(val);
                if (parsedDate) {
                    triggerChange([normalizeDate(parsedDate)]);
                    setCurrentDate(parsedDate);
                }
            }
        };

        const renderCalendar = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const daysInMonth = getDaysInMonth(year, month);
            const firstDay = getFirstDayOfMonth(year, month);
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

            const days = [];

            for (let i = firstDay - 1; i >= 0; i--) {
                const day = daysInPrevMonth - i;
                days.push(
                    <div key={`prev-${day}`} className="datepicker-day disabled" aria-disabled="true">
                        {day}
                    </div>
                );
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const isSelected = isDateSelected(day);
                const isDisabled = isDateDisabled(day);
                days.push(
                    <div
                        key={`day-${day}`}
                        className={`datepicker-day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                        onClick={() => !isDisabled && handleDateClick(day)}
                        role="gridcell"
                        aria-selected={isSelected}
                        aria-disabled={isDisabled}
                    >
                        {day}
                    </div>
                );
            }

            return days;
        };

        const datesToShow = multiple && tempDates.length > 0 ? tempDates : selectedDates;
        let selectedText = '';
        if (datesToShow.length === 1) {
            selectedText = formatDateForInput(datesToShow[0]);
        } else if (datesToShow.length > 1) {
            const sorted = [...datesToShow].sort((a, b) => a.getTime() - b.getTime());
            selectedText = `${formatDateForInput(sorted[0])} - ${formatDateForInput(sorted[sorted.length - 1])}`;
        }

        useEffect(() => {
            if (multiple) {
                setInputValue(selectedText);
            }
        }, [selectedText, multiple]);
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    pickerRef.current &&
                    !pickerRef.current.contains(event.target as Node)
                ) {
                    setShowPicker(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="datepicker-container">
                <div className='datepicker-input-wrapper'>
                    <input
                        type="text"
                        name={name}
                        ref={inputRef}
                        className="datepicker-input"
                        value={inputValue}
                        onFocus={() => setShowPicker(true)}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={multiple ? 'Select dates...' : 'YYYY-MM-DD'}
                        readOnly={multiple}
                        aria-haspopup="grid"
                        aria-expanded={showPicker}
                        aria-label="Date picker input"
                    />
                    <button  onFocus={() => setShowPicker(true)} className='icon'><Icon name='calender' /></button>
                </div>

                {showPicker && (
                    <div className="datepicker-popup" role="dialog" aria-modal="true"  ref={pickerRef}>
                        <div className="datepicker-header">
                            <button type='button'
                                onClick={() =>
                                    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()))
                                }
                                aria-label="Previous year"
                            >
                                <Icon name="doubleCaret" />
                            </button>
                            <button type='button'
                                onClick={() =>
                                    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
                                }
                                aria-label="Previous month"
                            >
                                <Icon name="caret" />
                            </button>
                            <div className="datepicker-header-selectors">
                                <select
                                    value={currentDate.getMonth()}
                                    onChange={(e) => {
                                        const newDate = new Date(currentDate);
                                        newDate.setMonth(parseInt(e.target.value));
                                        setCurrentDate(newDate);
                                    }}
                                    aria-label="Select month"
                                >
                                    {[
                                        'Jan',
                                        'Feb',
                                        'Mar',
                                        'Apr',
                                        'May',
                                        'Jun',
                                        'Jul',
                                        'Aug',
                                        'Sep',
                                        'Oct',
                                        'Nov',
                                        'Dec',
                                    ].map((m, i) => (
                                        <option key={m} value={i}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={currentDate.getFullYear()}
                                    onChange={(e) => {
                                        const newDate = new Date(currentDate);
                                        newDate.setFullYear(parseInt(e.target.value));
                                        setCurrentDate(newDate);
                                    }}
                                    aria-label="Select year"
                                >
                                    {Array.from({ length: YEAR_RANGE }, (_, i) => {
                                        const y = START_YEAR + i;
                                        return (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button type='button'
                                onClick={() =>
                                    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
                                }
                                aria-label="Next month"
                            >
                                <Icon name="caret" />
                            </button>
                            <button type='button'
                                onClick={() =>
                                    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()))
                                }
                                aria-label="Next year"
                            >
                                <Icon name="doubleCaret" />
                            </button>
                        </div>

                        <div className="datepicker-weekdays" role="row">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="datepicker-weekday" role="columnheader">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="datepicker-grid" role="grid">
                            {renderCalendar()}
                        </div>

                        <div className="datepicker-footer">
                            <button type='button' onClick={handleClear} className="datepicker-clear">
                                Clear
                            </button>
                            <button type='button' onClick={handleSelectToday} className="datepicker-today">
                                Today
                            </button>
                            {multiple && tempDates.length > 0 && (
                                <button type='button' onClick={handleSetDates} className="datepicker-set">
                                    Set Dates
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

export default DatePicker;
