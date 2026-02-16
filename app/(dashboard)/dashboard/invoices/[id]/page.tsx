"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Mail, Calendar, Clock } from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";
interface MockInvoice {
  id: string;
  status: InvoiceStatus;
  client: { name: string; email: string };
  invoiceDate: string;
  dueDate: string;
  lineItems: { description: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
  activity: { user: string; action: string; time: string }[];
}
// Mock – replace with API fetch by id
const mockInvoice: MockInvoice = {
  id: "INV-028",
  status: "Pending",
  client: { name: "Acme Corp", email: "billing@acme.com" },
  invoiceDate: "2025-02-13",
  dueDate: "2025-02-20",
  lineItems: [
    { description: "Consulting services", quantity: 10, unitPrice: 200, total: 2000 },
    { description: "Software license", quantity: 1, unitPrice: 2200, total: 2200 },
  ],
  subtotal: 4200,
  tax: 0,
  discount: 0,
  grandTotal: 4200,
  activity: [
    { user: "You", action: "Invoice created", time: "Feb 13, 2025 10:00" },
    { user: "You", action: "Invoice sent to client", time: "Feb 13, 2025 10:05" },
  ],
};

const statusConfig = {
  Paid: "bg-emerald-500/10 text-emerald-700",
  Pending: "bg-amber-500/10 text-amber-700",
  Overdue: "bg-red-500/10 text-red-700",
  Draft: "bg-gray-500/10 text-gray-600",
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const inv = mockInvoice; // In real app: fetch by id

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Invoices
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">{inv.id}</h1>
          <span
            className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[inv.status]}`}
          >
            {inv.status}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/invoices/${id}/edit`}
            className="rounded-xl border-2 border-navy text-navy font-semibold px-4 py-2.5 hover:bg-navy/5"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy mb-4">Client Information</h2>
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-navy/10 p-2.5">
              <Building2 className="w-5 h-5 text-navy" />
            </div>
            <div>
              <p className="font-medium text-navy">{inv.client.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Mail className="w-4 h-4" />
                {inv.client.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Invoice date: {inv.invoiceDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Due date: {inv.dueDate}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy mb-4">Payment Status</h2>
          <p className="text-muted-foreground">
            {inv.status === "Paid"
              ? "This invoice has been paid."
              : inv.status === "Pending"
              ? "Awaiting payment from client."
              : inv.status === "Overdue"
              ? "This invoice is past due."
              : "Draft — not yet sent."}
          </p>
          <p className="mt-3 text-xl font-bold text-navy">
            Grand Total: ${inv.grandTotal.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-navy px-6 py-4 border-b border-gray-100">
          Line Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-left">
                <th className="px-6 py-3 font-medium text-navy">Description</th>
                <th className="px-6 py-3 font-medium text-navy">Qty</th>
                <th className="px-6 py-3 font-medium text-navy">Unit Price</th>
                <th className="px-6 py-3 font-medium text-navy">Total</th>
              </tr>
            </thead>
            <tbody>
              {inv.lineItems.map((line, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-6 py-3 text-navy">{line.description}</td>
                  <td className="px-6 py-3 text-muted-foreground">{line.quantity}</td>
                  <td className="px-6 py-3 text-muted-foreground">${line.unitPrice.toLocaleString()}</td>
                  <td className="px-6 py-3 font-medium text-navy">${line.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-6 text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-navy">${inv.subtotal.toLocaleString()}</span>
        </div>
        <div className="px-6 py-2 flex justify-end gap-6 text-sm">
          <span className="text-muted-foreground">Grand Total</span>
          <span className="font-bold text-navy">${inv.grandTotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-navy mb-4">Activity Timeline</h2>
        <ul className="space-y-4">
          {inv.activity.map((item, i) => (
            <li key={i} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-navy mt-2 shrink-0" />
              <div>
                <p className="text-sm text-navy">
                  <span className="font-medium">{item.user}</span> — {item.action}
                </p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
