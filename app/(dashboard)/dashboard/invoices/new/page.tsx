"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff } from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewInvoicePage() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxPercent, setTaxPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 },
  ]);

  const addLine = () =>
    setLineItems((prev) => [...prev, { id: String(Date.now()), description: "", quantity: 1, unitPrice: 0 }]);

  const removeLine = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateLine = (id: string, field: keyof LineItem, value: string | number) =>
    setLineItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const subtotal = useMemo(() => lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), [lineItems]);
  const tax = (subtotal * taxPercent) / 100;
  const grandTotal = Math.max(0, subtotal + tax - discountAmount);

  const currencySymbol = currency === "EUR" ? "\u20AC" : currency === "GBP" ? "\u00A3" : "$";

  const formatAmount = (val: number) =>
    `${currencySymbol}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const invoiceNumber = "INV-029";

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/invoices"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors lg:hidden"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── LEFT: Form ─── */}
        <div className="flex-1 min-w-0 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-navy tracking-tight">Create Invoice</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Fill in the details and preview your invoice in real-time</p>
          </div>

          {/* Client details */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">Client & Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Client name */}
              <div className="relative">
                <input
                  type="text"
                  id="client-name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  onFocus={() => setFocusedField("clientName")}
                  onBlur={() => setFocusedField(null)}
                  className="peer w-full h-12 px-4 pt-5 pb-1 rounded-xl border border-gray-200 bg-white text-navy text-sm placeholder-transparent outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                  placeholder="Client name"
                />
                <label
                  htmlFor="client-name"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    clientName || focusedField === "clientName"
                      ? "top-1.5 text-[10px] font-semibold tracking-wide uppercase"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${focusedField === "clientName" ? "text-navy" : "text-muted-foreground"}`}
                >
                  Client name
                </label>
              </div>
              {/* Client email */}
              <div className="relative">
                <input
                  type="email"
                  id="client-email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  onFocus={() => setFocusedField("clientEmail")}
                  onBlur={() => setFocusedField(null)}
                  className="peer w-full h-12 px-4 pt-5 pb-1 rounded-xl border border-gray-200 bg-white text-navy text-sm placeholder-transparent outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                  placeholder="Client email"
                />
                <label
                  htmlFor="client-email"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    clientEmail || focusedField === "clientEmail"
                      ? "top-1.5 text-[10px] font-semibold tracking-wide uppercase"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${focusedField === "clientEmail" ? "text-navy" : "text-muted-foreground"}`}
                >
                  Client email
                </label>
              </div>
              {/* Invoice date */}
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
              {/* Due date */}
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
            </div>
            {/* Currency */}
            <div className="max-w-[180px]">
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all appearance-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (&euro;)</option>
                <option value="GBP">GBP (&pound;)</option>
              </select>
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">Line Items</h2>
              <button
                type="button"
                onClick={addLine}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-navy/80 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
            </div>

            <div className="space-y-2">
              {lineItems.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateLine(item.id, "description", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="w-16">
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) => updateLine(item.id, "quantity", Number(e.target.value) || 0)}
                      className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm text-navy text-center focus:border-navy focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="Price"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateLine(item.id, "unitPrice", Number(e.target.value) || 0)}
                      className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm text-navy text-right focus:border-navy focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-sm font-medium text-navy">
                      {formatAmount(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(item.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tax, discount, notes */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">Adjustments & Notes</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Tax (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={taxPercent || ""}
                  onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Discount ({currencySymbol})
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={discountAmount || ""}
                  onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Payment terms, thank you message, etc."
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none resize-none transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-6">
            <button
              type="button"
              className="flex-1 sm:flex-none rounded-xl border border-gray-200 text-navy font-semibold px-6 py-3 text-sm hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="flex-1 sm:flex-none rounded-xl bg-navy text-white font-semibold px-6 py-3 text-sm hover:bg-navy/90 transition-colors"
            >
              Send Invoice
            </button>
          </div>
        </div>

        {/* ─── RIGHT: Live Preview ─── */}
        <div className={`lg:w-[420px] shrink-0 ${showPreview ? "block" : "hidden lg:block"}`}>
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Live Preview
              </h3>
              <span className="text-[10px] text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                Updates in real-time
              </span>
            </div>

            {/* Invoice document */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Invoice header */}
              <div className="bg-navy px-6 py-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden>
                        <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
                        <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
                        <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
                      </svg>
                      <span className="text-sm font-bold">Firmstack</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">INVOICE</p>
                    <p className="text-white/60 text-[11px] mt-0.5">{invoiceNumber}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Bill to + dates */}
                <div className="flex justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Bill to</p>
                    <p className="text-sm font-medium text-navy mt-1">
                      {clientName || "Client name"}
                    </p>
                    {clientEmail && (
                      <p className="text-[11px] text-muted-foreground">{clientEmail}</p>
                    )}
                  </div>
                  <div className="text-right text-[11px] space-y-1">
                    <div>
                      <span className="text-muted-foreground">Date: </span>
                      <span className="text-navy font-medium">
                        {invoiceDate || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due: </span>
                      <span className="text-navy font-medium">
                        {dueDate || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Line items table */}
                <div>
                  <div className="flex text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-gray-100 pb-2">
                    <span className="flex-1">Description</span>
                    <span className="w-10 text-center">Qty</span>
                    <span className="w-16 text-right">Price</span>
                    <span className="w-20 text-right">Total</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {lineItems.map((item) => (
                      <div key={item.id} className="flex py-2 text-[12px]">
                        <span className="flex-1 text-navy truncate">
                          {item.description || "Item description"}
                        </span>
                        <span className="w-10 text-center text-muted-foreground">
                          {item.quantity}
                        </span>
                        <span className="w-16 text-right text-muted-foreground">
                          {formatAmount(item.unitPrice)}
                        </span>
                        <span className="w-20 text-right font-medium text-navy">
                          {formatAmount(item.quantity * item.unitPrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-3 space-y-1.5 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-navy font-medium">{formatAmount(subtotal)}</span>
                  </div>
                  {taxPercent > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax ({taxPercent}%)</span>
                      <span className="text-navy font-medium">{formatAmount(tax)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-red-600 font-medium">-{formatAmount(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                    <span className="font-bold text-navy text-sm">Total Due</span>
                    <span className="font-bold text-navy text-sm">{formatAmount(grandTotal)}</span>
                  </div>
                </div>

                {/* Notes */}
                {notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                    <p className="text-[11px] text-navy/80 leading-relaxed">{notes}</p>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center pt-2 border-t border-gray-50">
                  <p className="text-[10px] text-muted-foreground">
                    Thank you for your business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
