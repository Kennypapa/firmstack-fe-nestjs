"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  LayoutTemplate,
  ImagePlus,
  ArrowRight,
  Send,
} from "lucide-react";
import { InvoiceDocument } from "@/components/invoices/InvoiceDocument";
import { InvoiceDownloadMenu } from "@/components/invoices/InvoiceDownloadMenu";
import { InvoiceSignaturePad } from "@/components/invoices/InvoiceSignaturePad";
import { InvoiceSendSheet } from "@/components/invoices/InvoiceSendSheet";
import { ClientPicker } from "@/components/invoices/ClientPicker";
import {
  getTemplateById,
  getTemplateColor,
  loadTemplatePreference,
  saveTemplatePreference,
  templateHasSignature,
} from "@/lib/invoice-templates";
import {
  loadCompanyLogo,
  loadCompanyProfile,
} from "@/lib/company-branding";
import { CURRENCIES, getCurrencySymbol } from "@/lib/currencies";
import { getClient } from "@/lib/api/clients";
import type { ClientItem } from "@/lib/api/types";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

function NewInvoiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTemplate = searchParams.get("template");
  const urlColor = searchParams.get("color");
  const urlClient = searchParams.get("client");

  const [templateId, setTemplateId] = useState("firmstack");
  const [colorId, setColorId] = useState<string | null>(null);
  const template = getTemplateById(templateId);
  const selectedColor = getTemplateColor(template, colorId);
  const [companyName, setCompanyName] = useState("Firmstack");
  const [companyEmail, setCompanyEmail] = useState("invoices@firmstack.com");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [brandingReady, setBrandingReady] = useState(false);

  const refreshCompanyBranding = () => {
    const profile = loadCompanyProfile();
    setCompanyName(profile.name);
    setCompanyEmail(profile.email);
    setCompanyPhone(profile.phone);
    setCompanyAddress(profile.address);
    setCompanyTaxId(profile.taxId);
    setCompanyLogo(loadCompanyLogo());
    setBrandingReady(true);
  };

  useEffect(() => {
    if (urlTemplate) {
      setTemplateId(urlTemplate);
      if (urlColor) setColorId(urlColor);
      saveTemplatePreference(urlTemplate, urlColor ?? undefined);
    } else {
      const prefs = loadTemplatePreference();
      setTemplateId(prefs.templateId);
      setColorId(prefs.colorId);
    }
    refreshCompanyBranding();
  }, [urlTemplate, urlColor]);

  useEffect(() => {
    const onFocus = () => refreshCompanyBranding();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [linkedClientId, setLinkedClientId] = useState<string | null>(null);

  const applyClient = (client: ClientItem) => {
    setLinkedClientId(client.id);
    setClientName(client.name);
    setClientEmail(client.email || "");
    setClientAddress(client.address || "");
  };

  useEffect(() => {
    if (!urlClient) return;
    let cancelled = false;
    getClient(urlClient)
      .then((client) => {
        if (!cancelled) applyClient(client);
      })
      .catch(() => {
        /* ignore missing client */
      });
    return () => {
      cancelled = true;
    };
  }, [urlClient]);

  const templatesHref = linkedClientId || urlClient
    ? `/dashboard/invoices/templates?client=${encodeURIComponent(linkedClientId || urlClient || "")}`
    : "/dashboard/invoices/templates";
  const [invoiceNumber, setInvoiceNumber] = useState(() => {
    const d = new Date();
    const stamp = `${d.getFullYear().toString().slice(-2)}${String(
      d.getMonth() + 1
    ).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const seq = String(Math.floor(Math.random() * 900) + 100);
    return `INV-${stamp}-${seq}`;
  });
  const [poNumber, setPoNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxPercent, setTaxPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("Payment due within 20 days.");
  const [paymentInstructions, setPaymentInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [signerName, setSignerName] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [sendOpen, setSendOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const signatureEnabled = templateHasSignature(templateId);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  };

  const validateForSend = () => {
    if (!clientName.trim()) {
      setFormError("Add a client name before sending.");
      return false;
    }
    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      setFormError("Add a valid client email before sending.");
      return false;
    }
    const hasItem = lineItems.some(
      (item) => item.description.trim() && item.quantity > 0
    );
    if (!hasItem) {
      setFormError("Add at least one line item with a description.");
      return false;
    }
    if (signatureEnabled && !signatureImage) {
      setFormError("Draw a signature before sending this template.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const addLine = () =>
    setLineItems((prev) => [
      ...prev,
      { id: String(Date.now()), description: "", quantity: 1, unitPrice: 0 },
    ]);

  const removeLine = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateLine = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) =>
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

  const subtotal = useMemo(
    () =>
      lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [lineItems]
  );
  const tax = (subtotal * taxPercent) / 100;
  const grandTotal = Math.max(0, subtotal + tax - discountAmount);

  const currencySymbol = getCurrencySymbol(currency);

  const formatAmount = (val: number) =>
    `${currencySymbol}${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const previewData = {
    companyName,
    companyEmail,
    companyPhone: companyPhone || undefined,
    companyAddress: companyAddress || undefined,
    companyTaxId: companyTaxId || undefined,
    companyLogo,
    clientName,
    clientEmail,
    clientAddress: clientAddress || undefined,
    invoiceDate,
    dueDate,
    invoiceNumber,
    poNumber: poNumber || undefined,
    lineItems,
    subtotal,
    taxPercent,
    tax,
    discountAmount,
    grandTotal,
    notes,
    paymentTerms: paymentTerms || undefined,
    paymentInstructions: paymentInstructions || undefined,
    formatAmount,
    signatureImage: signatureEnabled ? signatureImage : null,
    signerName: signatureEnabled ? signerName : undefined,
  };

  const handleSaveDraft = () => {
    setFormError(null);
    showToast("Draft saved");
    window.setTimeout(() => {
      router.push("/dashboard/invoices");
    }, 600);
  };

  const handleOpenSend = () => {
    if (!validateForSend()) return;
    setSendOpen(true);
  };

  return (
    <div className="w-full font-onest">
      <div className="flex items-center justify-between mb-6">
        <Link
          href={templatesHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Template
        </Link>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors lg:hidden"
        >
          {showPreview ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="w-full lg:w-3/5 min-w-0 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-navy tracking-tight">
                Create Invoice
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Fill in the details and preview your invoice in real-time
              </p>
            </div>
            <Link
              href="/dashboard/invoices/templates"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-navy hover:bg-gray-50 transition-colors"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              {template.name}
            </Link>
          </div>

          {!companyLogo && brandingReady && (
            <Link
              href="/dashboard/settings"
              className="flex w-full items-center gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-left transition-colors hover:bg-amber-50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm">
                <ImagePlus className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-navy">
                  Upload your company logo in Settings
                </span>
                <span className="block text-xs text-navy/65">
                  It will show on this invoice automatically once saved.
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy">
                Settings
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          )}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
              Client & Details
            </h2>
            <ClientPicker onSelect={applyClient} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="client-name"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    setLinkedClientId(null);
                  }}
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
              <div className="relative">
                <input
                  type="email"
                  id="client-email"
                  value={clientEmail}
                  onChange={(e) => {
                    setClientEmail(e.target.value);
                    setLinkedClientId(null);
                  }}
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
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Billing address
                </label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => {
                    setClientAddress(e.target.value);
                    setLinkedClientId(null);
                  }}
                  placeholder="Street, city, country"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Invoice number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  PO / Reference
                </label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  placeholder="Optional"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
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
            <div className="max-w-[180px]">
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all appearance-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
                Line Items
              </h2>
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
              {lineItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateLine(item.id, "description", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="w-16">
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        updateLine(
                          item.id,
                          "quantity",
                          Number(e.target.value) || 0
                        )
                      }
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
                      onChange={(e) =>
                        updateLine(
                          item.id,
                          "unitPrice",
                          Number(e.target.value) || 0
                        )
                      }
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

          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
              Adjustments & Notes
            </h2>
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
                  onChange={(e) =>
                    setDiscountAmount(Number(e.target.value) || 0)
                  }
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Payment terms
              </label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                placeholder="e.g. Payment due within 20 days"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Payment instructions
              </label>
              <textarea
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                rows={2}
                placeholder="Bank name, account number, IBAN, or how to pay"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none resize-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Thank you message or extra notes"
                className="w-full min-h-[80px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none resize-y transition-all"
              />
            </div>
          </div>

          <InvoiceSignaturePad
            enabled={signatureEnabled}
            value={signatureImage}
            onChange={setSignatureImage}
            signerName={signerName}
            onSignerNameChange={setSignerName}
          />

          {formError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {formError}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pb-6">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-none rounded-xl border border-gray-200 text-navy font-semibold px-6 py-3 text-sm hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleOpenSend}
              className="flex-1 sm:flex-none rounded-xl bg-navy text-white font-semibold px-6 py-3 text-sm hover:bg-navy/90 transition-colors"
            >
              Send Invoice
            </button>
          </div>
        </div>

        <div
          className={`w-full lg:w-2/5 min-w-0 lg:self-stretch ${showPreview ? "block" : "hidden lg:block"}`}
        >
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Live Preview
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                  {template.name}
                </span>
                <InvoiceDownloadMenu data={previewData} />
                <button
                  type="button"
                  onClick={handleOpenSend}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
            {/* Desk surface + sharp paper sheet */}
            <div className="bg-[#e8eaef] border border-gray-300/70 p-4 sm:p-5">
              <div className="bg-white border border-gray-300 shadow-[0_12px_40px_rgba(34,46,77,0.14)] ring-1 ring-black/[0.04] overflow-hidden">
                <InvoiceDocument
                  templateId={templateId}
                  data={previewData}
                  accentColor={selectedColor.accent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <InvoiceSendSheet
        open={sendOpen}
        onClose={() => setSendOpen(false)}
        data={previewData}
        onSent={({ channel }) => {
          setSendOpen(false);
          const label =
            channel === "email"
              ? "Email opened"
              : channel === "whatsapp"
                ? "WhatsApp opened"
                : "Link copied";
          showToast(`${label} · Invoice marked as sent`);
          window.setTimeout(() => {
            router.push(`/dashboard/invoices/${invoiceNumber}`);
          }, 700);
        }}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-xl bg-navy text-white text-sm font-medium px-4 py-2.5 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default function NewInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-sm text-muted-foreground font-onest">
          Loading...
        </div>
      }
    >
      <NewInvoiceContent />
    </Suspense>
  );
}
