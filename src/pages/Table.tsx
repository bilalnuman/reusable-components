import DataTable, { type Column } from "@src/components/widgets/DataTable";

interface Person {
    id: number;
    name: string;
    age: number;
    country: string;
    actions: string;
}

const data: Person[] = [
    { id: 1, name: 'Alice', age: 25, country: 'USA', actions: '' },
    { id: 2, name: 'Bob', age: 30, country: 'UK', actions: '' },
    { id: 3, name: 'Charlie', age: 35, country: 'Canada', actions: '' },
    { id: 4, name: 'Demo', age: 35, country: 'Actions', actions: '' },
];

const columns: Column<Person>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    {
        key: 'age',
        label: 'Age',
        renderCell: (value) => <em>{value} yrs</em>,
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
    return (
        <div>
            <h1>Custom Column Render DataTable</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Table;
