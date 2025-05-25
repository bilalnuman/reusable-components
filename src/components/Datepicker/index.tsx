import { useState, useEffect, useRef } from 'react';
import './index.css';
import { FiCalendar } from 'react-icons/fi';
import { Icon } from './icons';

interface DatePickerProps {
    multiple: boolean;
    onChange: (val: Date[]) => void;
}

const DatePicker = ({ multiple = false, onChange }: DatePickerProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [tempDates, setTempDates] = useState<Date[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const pickerRef = useRef<HTMLDivElement>(null);

    // Normalize date to midnight (00:00:00) to avoid time offset issues
    const normalizeDate = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    useEffect(() => {
        if (!multiple && selectedDates.length === 1) {
            setInputValue(selectedDates[0].toLocaleDateString());
        }
    }, [selectedDates, multiple]);

    const getDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) =>
        new Date(year, month, 1).getDay();

    const handleClear = () => {
        setSelectedDates([]);
        setTempDates([]);
        setStartDate(null);
        setCurrentDate(new Date());
        setShowPicker(false);
        setInputValue('');
        onChange([]);
    };

    const handleSetDates = () => {
        setSelectedDates([...tempDates]);
        onChange([...tempDates]);
        setStartDate(null);
        setShowPicker(false);
    };

    const handleDateClick = (day: number) => {
        const clickedDate = normalizeDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        );

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
            setSelectedDates([clickedDate]);
            setInputValue(clickedDate.toLocaleDateString());
            onChange([clickedDate]);
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
            setSelectedDates([today]);
            setInputValue(today.toLocaleDateString());
            onChange([today]);
            setShowPicker(false);
        }
    };

    const isDateSelected = (day: number) => {
        const dateToCheck = normalizeDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        );
        const list = multiple && tempDates.length > 0 ? tempDates : selectedDates;
        return list.some(
            (d) =>
                d.getDate() === dateToCheck.getDate() &&
                d.getMonth() === dateToCheck.getMonth() &&
                d.getFullYear() === dateToCheck.getFullYear()
        );
    };

    const isDateDisabled = (day: number) => {
        if (!multiple || !startDate) return false;
        const dateToCheck = normalizeDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        );
        return dateToCheck < normalizeDate(startDate);
    };


    const handleInputBlur = () => {
        if (!multiple) {
            const parsed = Date.parse(inputValue);
            if (!isNaN(parsed)) {
                const newDate = normalizeDate(new Date(parsed));
                setSelectedDates([newDate]);
                setCurrentDate(newDate);
                onChange([newDate]);
            } else {
                setInputValue('');
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

        // Previous month days (disabled)
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            days.push(
                <div key={`prev-${day}`} className="datepicker-day disabled">
                    {day}
                </div>
            );
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = isDateSelected(day);
            const isDisabled = isDateDisabled(day);

            days.push(
                <div
                    key={`day-${day}`}
                    className={`datepicker-day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''
                        }`}
                    onClick={() => !isDisabled && handleDateClick(day)}
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
        selectedText = datesToShow[0].toLocaleDateString();
    } else if (datesToShow.length > 1) {
        const sorted = [...datesToShow].sort((a, b) => a.getTime() - b.getTime());
        selectedText = `${sorted[0].toLocaleDateString()} - ${sorted[sorted.length - 1].toLocaleDateString()}`;
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false)
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    return (
        <div className="datepicker-wrapper" ref={pickerRef}>
            <div className="datepicker-input-wrapper"
                onBlur={handleInputBlur}
                onClick={() => setShowPicker(!showPicker)}
            >
                <input
                    type="text"
                    value={multiple ? selectedText : inputValue}
                    onChange={(e) => !multiple && setInputValue(e.target.value)}
                    placeholder="Select date(s)"
                    className="datepicker-input"
                    readOnly={multiple}
                />
                <span className='icon'>
                    <Icon name='calender' />
                </span>
            </div>

            {showPicker && (
                <div className="datepicker-container">
                    <div className="datepicker-header">
                        <button className='double-back' onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()))}><Icon name='doubleCaret' /></button>
                        <button className='back' onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}><Icon name='caret' /></button>

                        <div className="datepicker-header-selectors">
                            <select
                                value={currentDate.getMonth()}
                                onChange={(e) => {
                                    const newDate = new Date(currentDate);
                                    newDate.setMonth(parseInt(e.target.value));
                                    setCurrentDate(newDate);
                                }}
                            >
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                                    <option key={m} value={i}>{m}</option>
                                ))}
                            </select>
                            <select
                                value={currentDate.getFullYear()}
                                onChange={(e) => {
                                    const newDate = new Date(currentDate);
                                    newDate.setFullYear(parseInt(e.target.value));
                                    setCurrentDate(newDate);
                                }}
                            >
                                {Array.from({ length: 100 }, (_, i) => {
                                    const y = new Date().getFullYear() - 50 + i;
                                    return <option key={y} value={y}>{y}</option>;
                                })}
                            </select>
                        </div>

                        <button className='next' onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}><Icon name='caret' /></button>
                        <button className='double-next' onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()))}><Icon name='doubleCaret' /></button>
                    </div>

                    <div className="datepicker-weekdays">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="datepicker-weekday">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="datepicker-grid">{renderCalendar()}</div>

                    <div className="datepicker-footer">
                        <button onClick={handleClear} className="datepicker-clear">
                            Clear
                        </button>
                        <button onClick={handleSelectToday} className="datepicker-today">
                            Today
                        </button>
                        {multiple && tempDates.length > 0 && (
                            <button onClick={handleSetDates} className="datepicker-set">
                                Set Dates
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
