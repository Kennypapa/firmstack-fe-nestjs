import type { InvoiceDocumentData } from "@/components/invoices/invoice-preview-types";

export type InvoiceExportFormatId =
  | "pdf"
  | "docx"
  | "doc"
  | "txt"
  | "csv"
  | "xlsx"
  | "html";

export interface InvoiceExportFormat {
  id: InvoiceExportFormatId;
  label: string;
  description: string;
  extension: string;
  mime: string;
}

export const INVOICE_EXPORT_FORMATS: InvoiceExportFormat[] = [
  {
    id: "pdf",
    label: "PDF",
    description: "Best for sending and printing",
    extension: "pdf",
    mime: "application/pdf",
  },
  {
    id: "docx",
    label: "Word (DOCX)",
    description: "Editable Microsoft Word file",
    extension: "docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    id: "doc",
    label: "Word (DOC)",
    description: "Legacy Word document",
    extension: "doc",
    mime: "application/msword",
  },
  {
    id: "txt",
    label: "Plain Text (TXT)",
    description: "Simple text file",
    extension: "txt",
    mime: "text/plain;charset=utf-8",
  },
  {
    id: "csv",
    label: "CSV",
    description: "Spreadsheet-friendly line items",
    extension: "csv",
    mime: "text/csv;charset=utf-8",
  },
  {
    id: "xlsx",
    label: "Excel (XLSX)",
    description: "Microsoft Excel workbook",
    extension: "xlsx",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    id: "html",
    label: "HTML",
    description: "Web page format",
    extension: "html",
    mime: "text/html;charset=utf-8",
  },
];

function triggerDownload(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildPlainText(data: InvoiceDocumentData): string {
  const lines = [
    `INVOICE ${data.invoiceNumber}`,
    `${data.companyName ?? "Company"} <${data.companyEmail ?? ""}>`,
    "",
    `Bill to: ${data.clientName}`,
    data.clientEmail,
    data.clientAddress ?? "",
    "",
    `Issued: ${data.invoiceDate}`,
    `Due: ${data.dueDate}`,
    "",
    "Line items",
    "Description,Qty,Unit Price,Total",
    ...data.lineItems.map(
      (item) =>
        `"${item.description}",${item.quantity},${data.formatAmount(item.unitPrice)},${data.formatAmount(item.quantity * item.unitPrice)}`
    ),
    "",
    `Subtotal: ${data.formatAmount(data.subtotal)}`,
    ...(data.taxPercent > 0
      ? [`Tax (${data.taxPercent}%): ${data.formatAmount(data.tax)}`]
      : []),
    ...(data.discountAmount > 0
      ? [`Discount: -${data.formatAmount(data.discountAmount)}`]
      : []),
    `Total due: ${data.formatAmount(data.grandTotal)}`,
    "",
    data.notes,
  ];
  return lines.filter(Boolean).join("\n");
}

function buildCsv(data: InvoiceDocumentData): string {
  const rows = [
    ["Description", "Quantity", "Unit Price", "Total"],
    ...data.lineItems.map((item) => [
      item.description,
      String(item.quantity),
      data.formatAmount(item.unitPrice),
      data.formatAmount(item.quantity * item.unitPrice),
    ]),
    [],
    ["Subtotal", "", "", data.formatAmount(data.subtotal)],
    ["Total Due", "", "", data.formatAmount(data.grandTotal)],
  ];
  return rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function buildHtml(data: InvoiceDocumentData): string {
  const rows = data.lineItems
    .map(
      (item) =>
        `<tr><td>${item.description}</td><td>${item.quantity}</td><td>${data.formatAmount(item.unitPrice)}</td><td>${data.formatAmount(item.quantity * item.unitPrice)}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Invoice ${data.invoiceNumber}</title>
  <style>
    body { font-family: system-ui, sans-serif; color: #222e4d; padding: 32px; }
    h1 { margin: 0 0 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; font-size: 14px; }
    th { background: #f3f4f6; }
    .totals { margin-top: 16px; text-align: right; }
  </style>
</head>
<body>
  <h1>Invoice ${data.invoiceNumber}</h1>
  <p>${data.companyName ?? "Company"} · ${data.companyEmail ?? ""}</p>
  <p><strong>Bill to:</strong> ${data.clientName} (${data.clientEmail})</p>
  <p>Issued: ${data.invoiceDate} · Due: ${data.dueDate}</p>
  <table>
    <thead><tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="totals">
    <p>Subtotal: ${data.formatAmount(data.subtotal)}</p>
    <p><strong>Total due: ${data.formatAmount(data.grandTotal)}</strong></p>
  </div>
  <p>${data.notes}</p>
</body>
</html>`;
}

function buildRtf(data: InvoiceDocumentData): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/{/g, "\\{").replace(/}/g, "\\}");
  const lines = data.lineItems
    .map(
      (item) =>
        `${esc(item.description)}\\tab ${item.quantity}\\tab ${esc(data.formatAmount(item.unitPrice))}\\tab ${esc(data.formatAmount(item.quantity * item.unitPrice))}\\line`
    )
    .join("\n");

  return `{\\rtf1\\ansi
{\\b Invoice ${esc(data.invoiceNumber)}}\\line
${esc(data.companyName ?? "Company")}\\line
Bill to: ${esc(data.clientName)}\\line
Issued: ${esc(data.invoiceDate)}\\tab Due: ${esc(data.dueDate)}\\line\\line
${lines}\\line
Subtotal: ${esc(data.formatAmount(data.subtotal))}\\line
{\\b Total due: ${esc(data.formatAmount(data.grandTotal))}}\\line
${esc(data.notes)}\\line
}`;
}

/** Mock export until API-backed document generation is wired up */
export function downloadInvoiceExport(
  formatId: InvoiceExportFormatId,
  data: InvoiceDocumentData
) {
  const format =
    INVOICE_EXPORT_FORMATS.find((f) => f.id === formatId) ??
    INVOICE_EXPORT_FORMATS[0];
  const filename = `${data.invoiceNumber}.${format.extension}`;

  switch (formatId) {
    case "txt":
      triggerDownload(filename, buildPlainText(data), format.mime);
      return;
    case "csv":
      triggerDownload(filename, buildCsv(data), format.mime);
      return;
    case "html":
      triggerDownload(filename, buildHtml(data), format.mime);
      return;
    case "doc":
    case "docx":
      triggerDownload(
        `${data.invoiceNumber}.${formatId === "doc" ? "doc" : "docx"}`,
        buildRtf(data),
        "application/rtf"
      );
      return;
    case "pdf": {
      const html = buildHtml(data);
      const printWindow = window.open("", "_blank", "noopener,noreferrer");
      if (!printWindow) {
        triggerDownload(`${data.invoiceNumber}.html`, html, "text/html;charset=utf-8");
        return;
      }
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      return;
    }
    case "xlsx":
    default:
      triggerDownload(
        `${data.invoiceNumber}.csv`,
        buildCsv(data),
        "text/csv;charset=utf-8"
      );
  }
}
