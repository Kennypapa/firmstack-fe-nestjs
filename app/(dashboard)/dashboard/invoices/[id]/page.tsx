"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Send,
  Pencil,
  Copy,
  CheckCircle,
  Circle,
} from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

interface MockInvoice {
  id: string;
  status: InvoiceStatus;
  client: { name: string; email: string; address: string };
  from: { name: string; email: string };
  invoiceDate: string;
  dueDate: string;
  lineItems: { description: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  taxPercent: number;
  discount: number;
  grandTotal: number;
  notes: string;
  activity: { action: string; time: string; done: boolean }[];
}

const mockInvoice: MockInvoice = {
  id: "INV-028",
  status: "Pending",
  client: { name: "Acme Corp", email: "billing@acme.com", address: "123 Business St, NY 10001" },
  from: { name: "Firmstack", email: "invoices@firmstack.com" },
  invoiceDate: "2026-03-01",
  dueDate: "2026-03-20",
  lineItems: [
    { description: "Consulting services (10 hrs)", quantity: 10, unitPrice: 200, total: 2000 },
    { description: "Software license - Annual", quantity: 1, unitPrice: 2200, total: 2200 },
  ],
  subtotal: 4200,
  tax: 0,
  taxPercent: 0,
  discount: 0,
  grandTotal: 4200,
  notes: "Payment is due within 20 days. Thank you for your business.",
  activity: [
    { action: "Invoice created", time: "Mar 1, 2026 10:00 AM", done: true },
    { action: "Invoice sent to client", time: "Mar 1, 2026 10:05 AM", done: true },
    { action: "Client viewed invoice", time: "Mar 2, 2026 2:30 PM", done: true },
    { action: "Payment received", time: "Awaiting", done: false },
  ],
};

const statusConfig: Record<InvoiceStatus, { label: string; dot: string; bg: string }> = {
  Paid: { label: "Paid", dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700" },
  Pending: { label: "Pending", dot: "bg-amber-500", bg: "bg-amber-50 text-amber-700" },
  Overdue: { label: "Overdue", dot: "bg-red-500", bg: "bg-red-50 text-red-700" },
  Draft: { label: "Draft", dot: "bg-gray-400", bg: "bg-gray-100 text-gray-600" },
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const inv = mockInvoice;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Invoices
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-navy tracking-tight">{inv.id}</h1>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusConfig[inv.status].bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[inv.status].dot}`} />
            {statusConfig[inv.status].label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resend</span>
          </button>
          <Link
            href={`/dashboard/invoices/${id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── Invoice document ─── */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Navy header */}
            <div className="bg-navy px-6 sm:px-8 py-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
                      <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
                      <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
                      <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
                    </svg>
                    <span className="font-bold">Firmstack</span>
                  </div>
                  <p className="text-white/60 text-xs">{inv.from.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold tracking-tight">INVOICE</p>
                  <p className="text-white/60 text-sm mt-0.5">{inv.id}</p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-6">
              {/* Bill to + dates */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Bill to</p>
                  <p className="text-base font-semibold text-navy mt-1">{inv.client.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{inv.client.email}</p>
                  <p className="text-xs text-muted-foreground">{inv.client.address}</p>
                </div>
                <div className="sm:text-right space-y-2 text-sm">
                  <div className="flex sm:justify-end items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Issued: <span className="text-navy font-medium">{inv.invoiceDate}</span></span>
                  </div>
                  <div className="flex sm:justify-end items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Due: <span className="text-navy font-medium">{inv.dueDate}</span></span>
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div>
                <div className="flex text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-gray-100 pb-2.5">
                  <span className="flex-1">Description</span>
                  <span className="w-16 text-center">Qty</span>
                  <span className="w-24 text-right">Unit Price</span>
                  <span className="w-24 text-right">Total</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {inv.lineItems.map((line, i) => (
                    <div key={i} className="flex py-3 text-sm">
                      <span className="flex-1 text-navy">{line.description}</span>
                      <span className="w-16 text-center text-muted-foreground">{line.quantity}</span>
                      <span className="w-24 text-right text-muted-foreground">${line.unitPrice.toLocaleString()}</span>
                      <span className="w-24 text-right font-medium text-navy">${line.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-navy font-medium">${inv.subtotal.toLocaleString()}</span>
                  </div>
                  {inv.taxPercent > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax ({inv.taxPercent}%)</span>
                      <span className="text-navy font-medium">${inv.tax.toLocaleString()}</span>
                    </div>
                  )}
                  {inv.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-red-600 font-medium">-${inv.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-bold text-navy">Amount Due</span>
                    <span className="font-bold text-navy text-lg">${inv.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {inv.notes && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-sm text-navy/80 leading-relaxed">{inv.notes}</p>
                </div>
              )}

              <div className="text-center border-t border-gray-100 pt-4">
                <p className="text-xs text-muted-foreground">
                  Generated by Firmstack &middot; Thank you for your business
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right sidebar ─── */}
        <div className="space-y-5">
          {/* Status timeline */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
              Timeline
            </h3>
            <div className="space-y-0">
              {inv.activity.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {item.done ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                    )}
                    {i < inv.activity.length - 1 && (
                      <div className={`w-px h-8 ${item.done ? "bg-emerald-200" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${item.done ? "text-navy" : "text-muted-foreground"}`}>
                      {item.action}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">Client</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy/[0.06] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-navy">{inv.client.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{inv.client.name}</p>
                <p className="text-[11px] text-muted-foreground">{inv.client.email}</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">Payment</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-navy">${inv.grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusConfig[inv.status].bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[inv.status].dot}`} />
                  {statusConfig[inv.status].label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due date</span>
                <span className="text-navy font-medium">{inv.dueDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
