import DataTable, { type Column } from "@src/components/widgets/DataTable";
import { useState } from "react";

interface Person {
    id: number;
    name: string;
    last_name: string;
    age: number;
    country: string;
    actions: string;
}

const data: Person[] = [
    { id: 1, name: 'Alice', last_name: "Ali", age: 25, country: 'USA', actions: '' },
    { id: 2, name: 'Bob', age: 30, last_name: "Ali", country: 'UK', actions: '' },
    { id: 3, name: 'Charlie', age: 35, last_name: "Ali", country: 'Canada', actions: '' },
    { id: 4, name: 'Demo', age: 35, last_name: "Ali", country: 'Actions', actions: '' },
];

const columns: Column<Person>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name', editable: true },
    { key: 'last_name', label: 'Last Name', editable: true },
    {
        key: 'age',
        label: 'Age',
        renderCell: (value) => <em>{value} yrs</em>,
        editable:true
    },
    {
        key: 'country',
        label: 'Country',
        renderHeader: () => <strong style={{ color: 'blue' }}>Country</strong>,
        renderCell: (value) => <span style={{ color: 'green' }}>{value}</span>,
    },
    {
        key: 'actions',
        label: 'Actions',
        renderHeader: () => <strong>Actions</strong>,
        renderCell: (_, row) => (
            <div>
                <button onClick={() => alert(`Edit ${row.name}`)}>Edit</button>{' '}
                <button onClick={() => alert(`Delete ${row.name}`)}>Delete</button>
            </div>
        ),
    },
];



const Table = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    return (
        <div>
            <DataTable columns={columns} data={data} columnVisibility searchAble columnPosition
                columnVisibilitLable="Column visibility"
                pagination
                totalPages={20}
                currentPage={currentPage}
                onPageChange={(page: number) => setCurrentPage(page)}
                variant="classic"
                inlineEdit
                onEdit={(row) => console.log(row)}
                onRowSelectChange={(ids) => console.log(ids)}
            />
        </div>
    );
};

export default Table;
