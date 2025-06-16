type WatermarkPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

type PDFOptions = {
    fontName?: string;
    fontSize?: number;
    textColor?: [number, number, number];
    headerBgColor?: [number, number, number];
    margin?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    colPadding?: number;
    rowGap?: number;
    align?: 'left' | 'center' | 'right';
    prettifyHeader?: boolean;
    headerHeight?: number;
    pageSize?: {
        width: number;
        height: number;
    };
    cellPaddingY?: number;
    watermark?: {
        text: string;
        fontSize?: number;
        color?: [number, number, number];
        position?: WatermarkPosition;
    };
};

export function exportToPDF(data: object[], filename = "report.pdf", options: PDFOptions = {}) {
    if (!data.length) return;

    const keys = Object.keys(data[0]);
    let {
        fontName = "Helvetica",
        fontSize = 12,
        textColor = [0, 0, 0],
        headerBgColor = [0.9, 0.9, 0.9],
        margin: {
            top = 40,
            bottom = 40,
            left = 40,
            right = 40,
        } = {},
        colPadding = 5,
        rowGap = 20,
        align = "center",
        prettifyHeader = true,
        headerHeight,
        pageSize,
        cellPaddingY = 0,
        watermark,
    } = options;

    const pageWidth = pageSize?.width ?? 595.28;
    const pageHeight = pageSize?.height ?? 841.89;
    const usableWidth = pageWidth - left - right;
    const totalCols = keys.length;
    const colWidth = usableWidth / totalCols;

    if (colWidth < 50 && fontSize > 8) fontSize = 8;

    const rowHeight = 25;
    headerHeight = headerHeight ?? rowHeight;

    const lines: string[] = ["%PDF-1.3"];
    const objects: string[] = [];

    // Font object
    objects.push(`1 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /${fontName}
>>
endobj`);

    const usedStream = buildContentStream(
        keys, data, pageWidth, pageHeight, rowHeight, headerHeight, colWidth,
        { top, left }, fontSize, textColor, headerBgColor,
        colPadding, rowGap, align, prettifyHeader, watermark, cellPaddingY
    );

    objects.push(`2 0 obj
<< /Length ${usedStream.length} >>
stream
${usedStream}
endstream
endobj`);

    objects.push(`3 0 obj
<< /Type /Page
   /Parent 4 0 R
   /MediaBox [0 0 ${pageWidth} ${pageHeight}]
   /Contents 2 0 R
   /Resources << /Font << /F1 1 0 R >> >>
>>
endobj`);

    objects.push(`4 0 obj
<< /Type /Pages
   /Kids [3 0 R]
   /Count 1
>>
endobj`);

    objects.push(`5 0 obj
<< /Type /Catalog
   /Pages 4 0 R
>>
endobj`);

    const offsets: number[] = [];
    let pos = lines.join("\n").length + 1;

    objects.forEach((obj) => {
        offsets.push(pos);
        lines.push(obj);
        pos += obj.length + 1;
    });

    const xrefPos = pos;
    lines.push("xref");
    lines.push(`0 ${objects.length + 1}`);
    lines.push("0000000000 65535 f ");
    offsets.forEach((offset) => {
        lines.push(offset.toString().padStart(10, "0") + " 00000 n ");
    });

    lines.push("trailer");
    lines.push(`<< /Size ${objects.length + 1}
   /Root 5 0 R
>>`);
    lines.push("startxref");
    lines.push(xrefPos.toString());
    lines.push("%%EOF");

    const blob = new Blob([lines.join("\n")], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function sanitize(text: string): string {
    return text.replace(/[()\n\r]/g, '');
}

function prettifyKey(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function drawTextRow(
    values: string[],
    y: number,
    colWidth: number,
    leftMargin: number,
    fontSize: number,
    colPadding: number,
    align: 'left' | 'center' | 'right',
    prettify = false
): string[] {
    return values.map((val, i) => {
        const value = prettify ? prettifyKey(val) : val;
        const avgCharWidth = fontSize * 0.5;
        const maxChars = Math.floor((colWidth - colPadding * 2) / avgCharWidth);
        const truncated = value.length > maxChars ? value.slice(0, maxChars - 3) + '...' : value;
        const textWidth = truncated.length * avgCharWidth;

        let x = leftMargin + i * colWidth + colPadding;
        if (align === 'center') {
            x = leftMargin + i * colWidth + (colWidth - textWidth) / 2;
        } else if (align === 'right') {
            x = leftMargin + (i + 1) * colWidth - textWidth - colPadding;
        }

        return `1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${sanitize(truncated)}) Tj`;
    });
}

function buildContentStream(
    keys: string[],
    data: object[],
    pageWidth: number,
    pageHeight: number,
    rowHeight: number,
    headerHeight: number,
    colWidth: number,
    margin: { top: number; left: number },
    fontSize: number,
    textColor: [number, number, number],
    headerBgColor: [number, number, number],
    colPadding: number,
    rowGap: number,
    align: 'left' | 'center' | 'right',
    prettifyHeader: boolean,
    watermark?: PDFOptions['watermark'],
    cellPaddingY: number = 0
): string {
    const lines: string[] = [];
    const yStart = pageHeight - margin.top;

    // Header background
    keys.forEach((_, i) => {
        const x = margin.left + i * colWidth;
        lines.push(`${headerBgColor.join(' ')} rg`);
        lines.push(`${x.toFixed(2)} ${(yStart - headerHeight + 5).toFixed(2)} ${colWidth.toFixed(2)} ${(headerHeight - 5).toFixed(2)} re f`);
    });

    lines.push('BT');
    lines.push(`/F1 ${fontSize} Tf`);
    lines.push(`${textColor.join(' ')} rg`);

    const headerTextY = yStart - (headerHeight / 2) + (fontSize / 2) - cellPaddingY;
    lines.push(...drawTextRow(keys, headerTextY, colWidth, margin.left, fontSize, colPadding, align, prettifyHeader));

    data.forEach((row, idx) => {
        const y = yStart - headerHeight - rowGap - idx * rowHeight + cellPaddingY;
        const values = keys.map(k => row[k] != null ? String(row[k]) : '');
        lines.push(...drawTextRow(values, y, colWidth, margin.left, fontSize, colPadding, align));
    });

    // Watermark
    if (watermark?.text) {
        const wmFontSize = watermark.fontSize ?? 48;
        const wmColor = watermark.color ?? [0.85, 0.85, 0.85];
        const wmTextWidth = watermark.text.length * wmFontSize * 0.5;
        const position = watermark.position ?? 'center';

        let wmX = 0, wmY = 0;
        switch (position) {
            case 'top-left':
                wmX = 50;
                wmY = pageHeight - 50;
                break;
            case 'top-right':
                wmX = pageWidth - wmTextWidth - 50;
                wmY = pageHeight - 50;
                break;
            case 'bottom-left':
                wmX = 50;
                wmY = 50;
                break;
            case 'bottom-right':
                wmX = pageWidth - wmTextWidth - 50;
                wmY = 50;
                break;
            case 'center':
            default:
                wmX = (pageWidth - wmTextWidth) / 2;
                wmY = pageHeight / 2;
        }

        lines.push(`/F1 ${wmFontSize} Tf`);
        lines.push(`${wmColor.join(' ')} rg`);
        lines.push(`1 0 0 1 ${wmX.toFixed(2)} ${wmY.toFixed(2)} Tm (${sanitize(watermark.text)}) Tj`);
    }

    lines.push('ET');
    return lines.join('\n');
}
