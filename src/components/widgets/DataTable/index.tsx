import React, { useState, useMemo, useRef, useEffect } from 'react';
import Styles from './dataTable.module.css';
import Pagination from '../Pagination';
import Checkbox from './Checkbox/index';

interface EditTypes {
    id: number | string,
    value: number | string,
    field: string
}

export interface Column<T> {
    key: keyof T;
    label: string;
    visible?: boolean;
    editable?: boolean;
    renderHeader?: () => React.ReactNode;
    renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    searchAble?: boolean;
    columnVisibility?: boolean;
    inlineEdit?: boolean;
    headerSticky?: boolean;
    columnPosition?: boolean;
    columnVisibilitLable?: string;
    pagination?: boolean;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    onEdit?: (row: EditTypes) => void;
    onRowSelectChange?: (selected: Set<number>) => void;
    variant?: "basic" | "classic";
    paginationClassName?: string;
}

type SortConfig<T> = {
    key: keyof T;
    direction: 'asc' | 'desc';
} | null;

function DataTable<T extends Record<string, any>>({
    columns,
    data,
    searchAble = false,
    columnVisibility = false,
    headerSticky = false,
    columnPosition = false,
    inlineEdit = false,
    columnVisibilitLable = "Set column visibility",
    pagination,
    variant,
    totalPages,
    currentPage = 1,
    paginationClassName,
    onPageChange,
    onRowSelectChange,
    onEdit
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [isColVisible, setIsColVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
    const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
    const columnRef = useRef<HTMLDivElement>(null);
    const dragItem = useRef<string | null>(null);

    const [localData, setLocalData] = useState<T[]>(data);

    const initialVisibility = useMemo(
        () =>
            columns.reduce((acc, col) => {
                acc[col.key as string] = col.visible !== false;
                return acc;
            }, {} as Record<string, boolean>),
        [columns]
    );

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(initialVisibility);
    const [columnOrder, setColumnOrder] = useState(columns.map((col) => col.key as string));

    const [editingCell, setEditingCell] = useState<{ rowIndex: number; key: string } | null>(null);
    const [editedValue, setEditedValue] = useState('');

    const handleSort = (key: keyof T) => {
        setSortConfig((prev) =>
            prev?.key === key
                ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                : { key, direction: 'asc' }
        );
    };

    const handleToggleColumn = (key: keyof T) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [key as string]: !prev[key as string],
        }));
    };

    const handleResetColumns = () => {
        setVisibleColumns(initialVisibility);
    };

    const filteredData = useMemo(() => {
        return localData.filter((row) =>
            Object.values(row).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, localData]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;
        const { key, direction } = sortConfig;
        return [...filteredData].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    const handleClickOutside = (event: MouseEvent) => {
        if (columnRef.current && !columnRef.current.contains(event.target as Node)) {
            setIsColVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDragStart = (key: string) => {
        dragItem.current = key;
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (key: string) => {
        const dragged = dragItem.current;
        if (!dragged || dragged === key) return;

        const oldIndex = columnOrder.indexOf(dragged);
        const newIndex = columnOrder.indexOf(key);

        const newOrder = [...columnOrder];
        newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, dragged);

        setColumnOrder(newOrder);
        dragItem.current = null;
    };

    const handleCellClick = (rowIndex: number, key: string, currentValue: string) => {
        setEditingCell({ rowIndex, key });
        setEditedValue(currentValue);
    };

    const handleSaveEdit = (rowIndex: number, key: string, id: string | number) => {
        const updatedData = [...localData];
        updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: editedValue };
        setLocalData(updatedData);
        setEditingCell(null);
        onEdit({ id: id, value: editedValue, field: key })
    };

    const handleCancelEdit = () => {
        setEditingCell(null);
    };




    const handleToggleAll = () => {
        if (selectedRowIds.size === data.length) {
            setSelectedRowIds(new Set());
        } else {
            setSelectedRowIds(new Set(data.map((row) => row.id)));
        }
    };

    const handleToggleRow = (id: number) => {
        setSelectedRowIds((prev) => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (onRowSelectChange) {
            onRowSelectChange(selectedRowIds);
        }
    }, [selectedRowIds]);



    return (
        <div>
            <div className={Styles.tableControls}>
                {searchAble && (
                    <div className={Styles.tableInputContainer}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                )}
                {columnVisibility && (
                    <div ref={columnRef} className={Styles.columnsContainer}>
                        <button onClick={() => setIsColVisible(!isColVisible)}>{columnVisibilitLable}</button>
                        {isColVisible && (
                            <div className={Styles.columnToggleContainer}>
                                <ul className={Styles.columnToggle}>
                                    {columns.map((col) => (
                                        <li key={col.key as string}>
                                            <Checkbox
                                                label={col.label}
                                                prefixClass='column-checkbox'
                                                checked={visibleColumns[col.key as string]}
                                                onChange={() => handleToggleColumn(col.key)}
                                            />
                                        </li>
                                    ))}
                                    {JSON.stringify(visibleColumns) !== JSON.stringify(initialVisibility) && (
                                        <li className={Styles.btnLi}>
                                            <button
                                                type="button"
                                                className={Styles.visibilityResetBtn}
                                                onClick={handleResetColumns}
                                            >
                                                Reset
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={Styles.tableContainer}>
                <table className={Styles.dataTable}>
                    <thead>
                        <tr>
                            <th style={{ width: "20px" }}>
                                <Checkbox
                                    checked={selectedRowIds.size === data.length}
                                    onChange={handleToggleAll}
                                />

                            </th>
                            {columnOrder
                                .filter((key) => visibleColumns[key])
                                .map((key) => {
                                    const col = columns.find((c) => c.key === key)!;
                                    return (
                                        <th
                                            key={key}
                                            onClick={() => handleSort(col.key)}
                                            draggable={columnPosition}
                                            onDragStart={() => handleDragStart(key)}
                                            onDragOver={handleDragOver}
                                            onDrop={() => handleDrop(key)}
                                            className={`${headerSticky ? Styles.stickyHeader : ''} ${columnPosition ? Styles.draggableHeader : ''}`}
                                        >
                                            {col.renderHeader ? col.renderHeader() : col.label}
                                            {sortConfig?.key === col.key &&
                                                (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>
                                    <Checkbox
                                        checked={selectedRowIds.has(row.id)}
                                        onChange={() => handleToggleRow(row.id)}
                                    />
                                </td>
                                {columnOrder
                                    .filter((key) => visibleColumns[key])
                                    .map((key) => {
                                        const col = columns.find((c) => c.key === key)!;
                                        const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.key === key;

                                        return (
                                            <td key={key}>
                                                {col.renderCell ? (
                                                    col.renderCell(row[col.key], row)
                                                ) : isEditing ? (
                                                    <input
                                                        className={Styles.editInput}
                                                        type="text"
                                                        value={editedValue}
                                                        onChange={(e) => setEditedValue(e.target.value)}
                                                        onBlur={() => handleSaveEdit(rowIndex, key, row.id)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleSaveEdit(rowIndex, key, row.id);
                                                            if (e.key === 'Escape') handleCancelEdit();
                                                        }}
                                                        autoFocus
                                                    />
                                                ) : inlineEdit && col.editable ? (
                                                    <span tabIndex={0} className={Styles.inlineEditable} onClick={() => handleCellClick(rowIndex, key, String(row[col.key]))}>
                                                        {String(row[col.key])}
                                                    </span>
                                                ) : (
                                                    String(row[col.key])
                                                )}
                                            </td>
                                        );
                                    })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    variant={variant}
                    className={paginationClassName}
                />
            )}
        </div>
    );
}

export default DataTable;
