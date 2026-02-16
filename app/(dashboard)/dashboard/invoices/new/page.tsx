"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { FormField } from "@/components/auth/FormField";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewInvoicePage() {
  const [clientName, setClientName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxPercent, setTaxPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 },
  ]);

  const addLine = () => {
    setLineItems((prev) => [
      ...prev,
      { id: String(Date.now()), description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeLine = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateLine = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = useMemo(
    () =>
      lineItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ),
    [lineItems]
  );
  const tax = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + tax - discountAmount;

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Invoices
      </Link>

      <h1 className="text-2xl font-bold text-navy mb-8">Create Invoice</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: form + line items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-navy">Details</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                label="Client Name"
                placeholder="Select or add client"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <FormField
                label="Invoice Date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
              <FormField
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy">Line Items</h2>
              <button
                type="button"
                onClick={addLine}
                className="inline-flex items-center gap-2 rounded-xl border border-navy text-navy font-medium px-3 py-2 text-sm hover:bg-navy/5"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-gray-100">
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium w-24">Qty</th>
                    <th className="pb-3 font-medium w-32">Unit Price</th>
                    <th className="pb-3 font-medium w-32">Total</th>
                    <th className="pb-3 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50">
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLine(item.id, "description", e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-navy placeholder:text-muted-foreground focus:border-navy focus:outline-none"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity || ""}
                          onChange={(e) => updateLine(item.id, "quantity", Number(e.target.value) || 0)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-navy focus:border-navy focus:outline-none"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={item.unitPrice || ""}
                          onChange={(e) => updateLine(item.id, "unitPrice", Number(e.target.value) || 0)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-navy focus:border-navy focus:outline-none"
                        />
                      </td>
                      <td className="py-2 font-medium text-navy">
                        ${(item.quantity * item.unitPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => removeLine(item.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove line"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Subtotal: ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} (real-time)</p>
          </div>
        </div>

        {/* Right: sticky summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-navy">Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-navy">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-muted-foreground">Tax (%)</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step="0.5"
                  value={taxPercent || ""}
                  onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                  className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-navy text-right focus:border-navy focus:outline-none"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax amount</span>
                <span className="font-medium text-navy">${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-muted-foreground">Discount</span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={discountAmount || ""}
                  onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                  className="w-24 rounded-lg border border-gray-200 px-2 py-1.5 text-navy text-right focus:border-navy focus:outline-none"
                />
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-semibold">
                <span className="text-navy">Grand Total</span>
                <span className="text-navy">${Math.max(0, grandTotal).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Notes</label>
              <textarea
                placeholder="Optional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none resize-none"
              />
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                className="w-full rounded-xl border-2 border-gray-200 text-navy font-semibold py-3 hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                type="button"
                className="w-full rounded-xl bg-navy text-white font-semibold py-3 hover:bg-navy/90"
              >
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
