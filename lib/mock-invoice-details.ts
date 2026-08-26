import type { InvoiceTemplateMeta } from "./invoice-templates";
import { getTemplateById } from "./invoice-templates";

export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

export interface MockInvoiceDetail {
  id: string;
  status: InvoiceStatus;
  templateId: string;
  client: { name: string; email: string; address: string };
  invoiceDate: string;
  dueDate: string;
  lineItems: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  tax: number;
  taxPercent: number;
  discountAmount: number;
  grandTotal: number;
  notes: string;
  activity: { action: string; time: string; done: boolean }[];
}

/** Mock invoice records — each stores the template picked at creation time */
export const MOCK_INVOICE_DETAILS: Record<string, MockInvoiceDetail> = {
  "INV-028": {
    id: "INV-028",
    status: "Pending",
    templateId: "modern-blue",
    client: {
      name: "Acme Corp",
      email: "billing@acme.com",
      address: "123 Business St, NY 10001",
    },
    invoiceDate: "2026-03-01",
    dueDate: "2026-03-20",
    lineItems: [
      {
        id: "1",
        description: "Consulting services (10 hrs)",
        quantity: 10,
        unitPrice: 200,
      },
      {
        id: "2",
        description: "Software license - Annual",
        quantity: 1,
        unitPrice: 2200,
      },
    ],
    subtotal: 4200,
    tax: 0,
    taxPercent: 0,
    discountAmount: 0,
    grandTotal: 4200,
    notes: "Payment is due within 20 days. Thank you for your business.",
    activity: [
      { action: "Invoice created", time: "Mar 1, 2026 10:00 AM", done: true },
      { action: "Invoice sent to client", time: "Mar 1, 2026 10:05 AM", done: true },
      { action: "Client viewed invoice", time: "Mar 2, 2026 2:30 PM", done: true },
      { action: "Payment received", time: "Awaiting", done: false },
    ],
  },
  "INV-027": {
    id: "INV-027",
    status: "Paid",
    templateId: "minimal-gold",
    client: {
      name: "TechStart Inc",
      email: "pay@techstart.io",
      address: "88 Startup Ave, SF 94102",
    },
    invoiceDate: "2026-02-28",
    dueDate: "2026-03-15",
    lineItems: [
      {
        id: "1",
        description: "Product design sprint",
        quantity: 1,
        unitPrice: 2800,
      },
    ],
    subtotal: 2800,
    tax: 0,
    taxPercent: 0,
    discountAmount: 0,
    grandTotal: 2800,
    notes: "Paid via bank transfer. Thank you!",
    activity: [
      { action: "Invoice created", time: "Feb 28, 2026", done: true },
      { action: "Invoice sent to client", time: "Feb 28, 2026", done: true },
      { action: "Client viewed invoice", time: "Mar 1, 2026", done: true },
      { action: "Payment received", time: "Mar 5, 2026", done: true },
    ],
  },
  "INV-026": {
    id: "INV-026",
    status: "Overdue",
    templateId: "service-pro",
    client: {
      name: "Global Ltd",
      email: "finance@global.com",
      address: "500 Commerce Blvd, London",
    },
    invoiceDate: "2026-01-15",
    dueDate: "2026-02-10",
    lineItems: [
      {
        id: "1",
        description: "Implementation support",
        quantity: 30,
        unitPrice: 170,
      },
    ],
    subtotal: 5100,
    tax: 0,
    taxPercent: 0,
    discountAmount: 0,
    grandTotal: 5100,
    notes: "Please remit payment at your earliest convenience.",
    activity: [
      { action: "Invoice created", time: "Jan 15, 2026", done: true },
      { action: "Invoice sent to client", time: "Jan 15, 2026", done: true },
      { action: "Client viewed invoice", time: "Jan 20, 2026", done: true },
      { action: "Payment received", time: "Awaiting", done: false },
    ],
  },
};

export function getMockInvoiceById(id: string): MockInvoiceDetail {
  return (
    MOCK_INVOICE_DETAILS[id] ?? {
      ...MOCK_INVOICE_DETAILS["INV-028"],
      id,
    }
  );
}

export function getInvoiceTemplateMeta(invoice: MockInvoiceDetail): InvoiceTemplateMeta {
  return getTemplateById(invoice.templateId);
}
