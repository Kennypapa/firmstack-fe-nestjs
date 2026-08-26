export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceDocumentData {
  companyName?: string;
  companyEmail?: string;
  companyLogo?: string | null;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  invoiceDate: string;
  dueDate: string;
  invoiceNumber: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxPercent: number;
  tax: number;
  discountAmount: number;
  grandTotal: number;
  notes: string;
  formatAmount: (val: number) => string;
  /** Drawn signature as a data URL (PNG) */
  signatureImage?: string | null;
  /** Name shown under the signature line */
  signerName?: string;
  signerTitle?: string;
}

const galleryLineItems: InvoiceLineItem[] = [
  { id: "1", description: "Consulting (10 hrs)", quantity: 10, unitPrice: 200 },
  { id: "2", description: "Software license", quantity: 1, unitPrice: 2200 },
  { id: "3", description: "API integration", quantity: 8, unitPrice: 220 },
  { id: "4", description: "Travel & expenses", quantity: 1, unitPrice: 384.5 },
];

const gallerySubtotal = galleryLineItems.reduce(
  (sum, item) => sum + item.quantity * item.unitPrice,
  0
);

const formatUsd = (val: number) =>
  `$${val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/** Richer sample data for template gallery previews */
export const GALLERY_INVOICE_DATA: InvoiceDocumentData = {
  companyName: "Firmstack",
  companyEmail: "invoices@firmstack.com",
  clientName: "Acme Corp",
  clientEmail: "billing@acme.com",
  clientAddress: "123 Business St, NY",
  invoiceDate: "2026-03-01",
  dueDate: "2026-03-20",
  invoiceNumber: "INV-028",
  lineItems: galleryLineItems,
  subtotal: gallerySubtotal,
  taxPercent: 0,
  tax: 0,
  discountAmount: 0,
  grandTotal: gallerySubtotal,
  notes: "Payment due within 20 days.",
  formatAmount: formatUsd,
};

/** Sample data for template gallery cards */
export const SAMPLE_INVOICE_DATA: InvoiceDocumentData = {
  companyName: "Firmstack",
  companyEmail: "invoices@firmstack.com",
  clientName: "Acme Corp",
  clientEmail: "billing@acme.com",
  clientAddress: "123 Business St, NY",
  invoiceDate: "2026-03-01",
  dueDate: "2026-03-20",
  invoiceNumber: "INV-028",
  lineItems: [
    {
      id: "1",
      description: "Consulting services",
      quantity: 10,
      unitPrice: 200,
    },
    {
      id: "2",
      description: "Software license",
      quantity: 1,
      unitPrice: 220,
    },
  ],
  subtotal: 2220,
  taxPercent: 0,
  tax: 0,
  discountAmount: 0,
  grandTotal: 2220,
  notes: "Payment is due within 20 days. Thank you.",
  formatAmount: formatUsd,
};
