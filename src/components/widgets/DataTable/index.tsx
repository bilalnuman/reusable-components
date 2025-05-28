// components/DataTable.tsx
import React, { useState, useMemo } from 'react';
import './index.css'; // Import CSS

export interface Column<T> {
    key: keyof T;
    label: string;
    visible?: boolean;
    renderHeader?: () => React.ReactNode;
    renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

type SortConfig<T> = {
    key: keyof T;
    direction: 'asc' | 'desc';
} | null;

function DataTable<T extends Record<string, any>>({
    columns,
    data,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
        () =>
            columns.reduce((acc, col) => {
                acc[col.key as string] = col.visible !== false;
                return acc;
            }, {} as Record<string, boolean>)
    );

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

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            Object.values(row).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

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

    return (
        <div>
            {/* Controls */}
            <div className="table-controls">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="column-toggle">
                    {columns.map((col) => (
                        <label key={col.key as string}>
                            <input
                                type="checkbox"
                                checked={visibleColumns[col.key as string]}
                                onChange={() => handleToggleColumn(col.key)}
                            />{' '}
                            {col.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns
                                .filter((col) => visibleColumns[col.key as string])
                                .map((col) => (
                                    <th
                                        key={col.key as string}
                                        onClick={() => handleSort(col.key)}
                                    >
                                        {col.renderHeader ? col.renderHeader() : col.label}
                                        {sortConfig?.key === col.key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                                    </th>

                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns
                                    .filter((col) => visibleColumns[col.key as string])
                                    .map((col) => (
                                        <td key={col.key as string}>
                                            {col.renderCell
                                                ? col.renderCell(row[col.key], row)
                                                : String(row[col.key])}
                                        </td>

                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;
