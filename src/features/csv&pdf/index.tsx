import { exportToCSV } from "@lib/exportCSV";
import { exportToPDF } from "@src/lib/exportPDF";

const data = [
    {
        name: 'Alice',
        last_name: 'Smith',
        phone_number_nu: 8574784874,
        actions: 'delete',
        cuontry: 'Pakistan',
        city: 'Lahore',
        age: 28,
        status: 'success',
        provence: 'punjab',
        location: "karachi"
    },
    {
        name: 'Alice1',
        last_name: 'Smith1',
        phone_number: 8574784875,
        actions: 'delete1',
        cuontry: 'Pakistan1',
        city: 'Lahore1',
        age: 29,
        status: 'success1',
        provence: 'punjab1',
        location: "karachi1"
    },
];



export default function ExportButtons() {
    return (
        <div>
            <button onClick={() => exportToCSV(data, 'users.csv')}>Export CSV</button>
            <button onClick={() =>
                exportToPDF(data, 'final-report.pdf', {
                    fontSize: 10,
                    headerHeight: 40,
                    cellPaddingY: 6,
                    pageSize: { width: 1200, height: 841.89 },
                    rowGap: 20,
                    colPadding: 5,
                    margin: { top: 10, left: 30, right: 30, bottom: 50 },
                    align: 'center',
                    prettifyHeader: true,
                    watermark: {
                        text: 'Bilal',
                        fontSize: 60,
                        color: [0.9, 0.9, 0.9],
                        position: 'center'
                    }
                })
            }>Export PDF</button>
        </div >
    );
}
