export function exportToCSV(data: object[], filename: string = 'data.csv') {
    if (!data.length) return;

    const keys = Object.keys(data[0]).map(key=>key.replace("_"," "));
    const csvRows = [
        keys.join(','),
        ...data.map(row =>
            keys.map(k => `"${String(row[k] ?? '').replace(/"/g, '""')}"`).join(',')
        )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
