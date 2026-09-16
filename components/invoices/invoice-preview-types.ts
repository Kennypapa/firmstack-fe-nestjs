export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceDocumentData {
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyTaxId?: string;
  companyLogo?: string | null;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  clientCompany?: string;
  invoiceDate: string;
  dueDate: string;
  invoiceNumber: string;
  poNumber?: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxPercent: number;
  tax: number;
  discountAmount: number;
  grandTotal: number;
  notes: string;
  paymentTerms?: string;
  /** Bank details / how to pay */
  paymentInstructions?: string;
  formatAmount: (val: number) => string;
  /** Drawn signature as a data URL (PNG) */
  signatureImage?: string | null;
  /** Name shown under the signature line */
  signerName?: string;
  signerTitle?: string;
}

const galleryLineItems: InvoiceLineItem[] = [
  { id: "1", description: "Consulting (10 hrs)", quantity: 10, unitPrice: 150 },
  { id: "2", description: "Software license", quantity: 1, unitPrice: 2400 },
  { id: "3", description: "API integration", quantity: 1, unitPrice: 1850 },
  { id: "4", description: "Travel & expenses", quantity: 1, unitPrice: 494.5 },
  { id: "5", description: "Support retainer", quantity: 1, unitPrice: 600 },
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
  companyPhone: "+1 (415) 555-0142",
  companyAddress: "88 Market St, San Francisco, CA",
  companyTaxId: "VAT · US-884422",
  clientName: "Acme Corp",
  clientEmail: "billing@acme.com",
  clientAddress: "123 Business St, New York, NY",
  invoiceDate: "2026-03-01",
  dueDate: "2026-03-20",
  invoiceNumber: "INV-028",
  poNumber: "PO-4412",
  lineItems: galleryLineItems,
  subtotal: gallerySubtotal,
  taxPercent: 0,
  tax: 0,
  discountAmount: 0,
  grandTotal: gallerySubtotal,
  notes: "Thank you for your business.",
  paymentTerms: "Payment due within 20 days.",
  paymentInstructions: "Bank transfer · Acct 8821993 · Firmstack Inc",
  formatAmount: formatUsd,
  signerName: "Alex Morgan",
  signerTitle: "Founder",
};

/** Sample data for template gallery cards */
export const SAMPLE_INVOICE_DATA: InvoiceDocumentData = {
  ...GALLERY_INVOICE_DATA,
  lineItems: galleryLineItems.slice(0, 2),
  subtotal: 3900,
  grandTotal: 3900,
};
