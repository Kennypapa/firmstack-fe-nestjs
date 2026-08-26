"use client";

import { useState } from "react";
import { Check, Link2, Send, X } from "lucide-react";
import type { InvoiceDocumentData } from "@/components/invoices/invoice-preview-types";
import { FileFormatIcon } from "@/components/invoices/FileFormatIcon";
import { downloadInvoiceExport } from "@/lib/invoice-export";

export type SendFormat = "pdf" | "link";
export type SendChannel = "email" | "whatsapp" | "copy";

interface InvoiceSendSheetProps {
  open: boolean;
  onClose: () => void;
  data: InvoiceDocumentData;
  onSent: (payload: { format: SendFormat; channel: SendChannel }) => void;
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"
      />
      <path
        fill="#fff"
        d="M17.47 14.38c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.29-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.49c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.81 2.77 4.39 3.88 1.54.67 2.15.72 2.92.61.47-.07 1.53-.62 1.75-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3z"
      />
    </svg>
  );
}

function GmailLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M3 5.5A2.5 2.5 0 0 1 5.5 3H7v7.6L3 7.3V5.5Z" />
      <path fill="#34A853" d="M21 5.5V7.3l-4 3.3V3h1.5A2.5 2.5 0 0 1 21 5.5Z" />
      <path fill="#FBBC04" d="M21 7.3V18.5a2.5 2.5 0 0 1-2.5 2.5H17V10.6l4-3.3Z" />
      <path fill="#C5221F" d="M3 7.3l4 3.3V21H5.5A2.5 2.5 0 0 1 3 18.5V7.3Z" />
      <path fill="#4285F4" d="M7 10.6 12 14.5l5-3.9V3H7v7.6Z" />
    </svg>
  );
}

function CopyLinkLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#3388ff" />
      <path
        d="M10.2 13.8a2.4 2.4 0 0 1 0-3.4l1.5-1.5a2.4 2.4 0 1 1 3.4 3.4l-.7.7"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13.8 10.2a2.4 2.4 0 0 1 0 3.4l-1.5 1.5a2.4 2.4 0 1 1-3.4-3.4l.7-.7"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function buildShareUrl(invoiceNumber: string) {
  if (typeof window === "undefined") return `/dashboard/invoices/${invoiceNumber}`;
  return `${window.location.origin}/dashboard/invoices/${invoiceNumber}`;
}

function buildShareMessage(data: InvoiceDocumentData, shareUrl: string) {
  const total = data.formatAmount(data.grandTotal);
  return `Hi ${data.clientName || "there"},\n\nPlease find invoice ${data.invoiceNumber} for ${total}.\n\nView / pay here: ${shareUrl}\n\nThank you.`;
}

export function InvoiceSendSheet({
  open,
  onClose,
  data,
  onSent,
}: InvoiceSendSheetProps) {
  const [format, setFormat] = useState<SendFormat>("pdf");
  const [channel, setChannel] = useState<SendChannel>("email");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const shareUrl = buildShareUrl(data.invoiceNumber);
  const message = buildShareMessage(data, shareUrl);

  const handleConfirm = async () => {
    setSending(true);
    try {
      if (format === "pdf" && channel !== "copy") {
        downloadInvoiceExport("pdf", data);
      }

      if (channel === "copy") {
        const text = format === "link" ? shareUrl : message;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }

      if (channel === "email") {
        const subject = encodeURIComponent(
          `Invoice ${data.invoiceNumber} from ${data.companyName ?? "Firmstack"}`
        );
        const body = encodeURIComponent(
          format === "pdf"
            ? `${message}\n\n(A PDF of this invoice was downloaded — please attach it to this email before sending.)`
            : message
        );
        const to = encodeURIComponent(data.clientEmail || "");
        window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");
      }

      if (channel === "whatsapp") {
        const text = encodeURIComponent(
          format === "pdf"
            ? `${message}\n\n(I’ve also downloaded a PDF to attach if needed.)`
            : message
        );
        window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
      }

      onSent({ format, channel });
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-onest"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div>
            <h2 className="text-lg font-bold text-navy tracking-tight">
              Send invoice
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose what to send and how to share {data.invoiceNumber}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-1 -mt-1 rounded-lg text-muted-foreground hover:bg-gray-50 hover:text-navy transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              What to send
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat("pdf")}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition-colors ${
                  format === "pdf"
                    ? "border-navy bg-navy/[0.04] ring-1 ring-navy/20"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <FileFormatIcon format="pdf" />
                <span>
                  <span className="block text-sm font-semibold text-navy">PDF</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Download & attach
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setFormat("link")}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition-colors ${
                  format === "link"
                    ? "border-navy bg-navy/[0.04] ring-1 ring-navy/20"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="w-5 h-6 rounded bg-[#3388ff] flex items-center justify-center shrink-0">
                  <Link2 className="w-3 h-3 text-white" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">Link</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Shareable page URL
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              How to send
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 transition-colors ${
                  channel === "email"
                    ? "border-navy bg-navy/[0.04] ring-1 ring-navy/20"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <GmailLogo className="w-7 h-7" />
                <span className="text-xs font-semibold text-navy">Email</span>
              </button>
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 transition-colors ${
                  channel === "whatsapp"
                    ? "border-navy bg-navy/[0.04] ring-1 ring-navy/20"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <WhatsAppLogo className="w-7 h-7" />
                <span className="text-xs font-semibold text-navy">WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setChannel("copy")}
                className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 transition-colors ${
                  channel === "copy"
                    ? "border-navy bg-navy/[0.04] ring-1 ring-navy/20"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {copied ? (
                  <span className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                ) : (
                  <CopyLinkLogo className="w-7 h-7" />
                )}
                <span className="text-xs font-semibold text-navy">
                  {copied ? "Copied" : "Copy link"}
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {channel === "email" && format === "pdf" && (
                <>Opens your email app and downloads the PDF so you can attach it.</>
              )}
              {channel === "email" && format === "link" && (
                <>
                  Opens your email app with the invoice link ready to send to{" "}
                  <span className="font-medium text-navy">
                    {data.clientEmail || "the client"}
                  </span>
                  .
                </>
              )}
              {channel === "whatsapp" && (
                <>
                  Opens WhatsApp with a prefilled message
                  {format === "pdf"
                    ? " (PDF downloads for optional attach)."
                    : " including the link."}
                </>
              )}
              {channel === "copy" && (
                <>
                  Copies the {format === "link" ? "invoice link" : "share message"}{" "}
                  to your clipboard.
                </>
              )}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 text-navy font-semibold px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={sending}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold px-4 py-2.5 text-sm hover:bg-navy/90 transition-colors disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              {channel === "copy" ? "Copy & continue" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
