"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Pencil,
  Copy,
  CheckCircle,
  Circle,
  LayoutTemplate,
} from "lucide-react";
import { InvoiceDocument } from "@/components/invoices/InvoiceDocument";
import { InvoiceDownloadMenu } from "@/components/invoices/InvoiceDownloadMenu";
import { loadCompanyLogo, loadCompanyProfile } from "@/lib/company-branding";
import { getInvoiceTemplateMeta } from "@/lib/mock-invoice-details";
import type { InvoiceStatus } from "@/lib/mock-invoice-details";
import { loadTemplatePreference } from "@/lib/invoice-templates";
import { getInvoice, getPublicLink, resendInvoice } from "@/lib/api/invoices";
import { formatInvoiceStatus, formatRelativeTime } from "@/lib/format";

const statusConfig: Record<InvoiceStatus, { label: string; dot: string; bg: string }> = {
  Paid: { label: "Paid", dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700" },
  Pending: { label: "Pending", dot: "bg-amber-500", bg: "bg-amber-50 text-amber-700" },
  Overdue: { label: "Overdue", dot: "bg-red-500", bg: "bg-red-50 text-red-700" },
  Draft: { label: "Draft", dot: "bg-gray-400", bg: "bg-gray-100 text-gray-600" },
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inv, setInv] = useState<{
    id: string;
    number: string;
    status: InvoiceStatus;
    client: { name: string; email: string; address?: string | null };
    from: { name: string; email: string };
    invoiceDate: string;
    dueDate: string;
    lineItems: {
      id: string;
      description: string;
      quantity: number;
      unitPrice: number;
    }[];
    subtotal: number;
    taxPercent: number;
    tax: number;
    discountAmount: number;
    grandTotal: number;
    notes?: string | null;
    activity: { action: string; time: string; done: boolean }[];
  } | null>(null);

  const [companyName, setCompanyName] = useState("Firmstack");
  const [companyEmail, setCompanyEmail] = useState("invoices@firmstack.com");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState("modern-blue");

  useEffect(() => {
    const profile = loadCompanyProfile();
    setCompanyName(profile.name);
    setCompanyEmail(profile.email);
    setCompanyLogo(loadCompanyLogo());
    setTemplateId(loadTemplatePreference().templateId);
  }, []);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((data) => {
        setInv({
          id: data.id,
          number: data.number,
          status: formatInvoiceStatus(data.status) as InvoiceStatus,
          client: data.client,
          from: (data as { from?: { name: string; email: string } }).from ?? {
            name: companyName,
            email: companyEmail,
          },
          invoiceDate: data.invoiceDate.slice(0, 10),
          dueDate: data.dueDate.slice(0, 10),
          lineItems: (data.lineItems as {
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
          }[]) ?? [],
          subtotal: (data as { subtotal?: number }).subtotal ?? data.grandTotal,
          taxPercent: (data as { taxPercent?: number }).taxPercent ?? 0,
          tax: (data as { tax?: number }).tax ?? 0,
          discountAmount: (data as { discount?: number }).discount ?? 0,
          grandTotal: data.grandTotal,
          notes: (data as { notes?: string }).notes,
          activity: (
            (data.activity as { action: string; time: string; done: boolean }[]) ??
            []
          ).map((item) => ({
            ...item,
            time: formatRelativeTime(item.time),
          })),
        });
      })
      .catch(() => setError("Invoice not found"))
      .finally(() => setLoading(false));
  }, [id, companyName, companyEmail]);

  if (loading) {
    return (
      <div className="p-12 text-center text-muted-foreground text-sm">
        Loading invoice…
      </div>
    );
  }

  if (error || !inv) {
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard/invoices"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>
        <p className="text-red-600">{error ?? "Invoice not found"}</p>
      </div>
    );
  }

  const template = getInvoiceTemplateMeta({
    id: inv.number,
    status: inv.status,
    templateId,
    client: {
      name: inv.client.name,
      email: inv.client.email,
      address: inv.client.address ?? "",
    },
    invoiceDate: inv.invoiceDate,
    dueDate: inv.dueDate,
    lineItems: inv.lineItems,
    subtotal: inv.subtotal,
    tax: inv.tax,
    taxPercent: inv.taxPercent,
    discountAmount: inv.discountAmount,
    grandTotal: inv.grandTotal,
    notes: inv.notes ?? "",
    activity: inv.activity,
  });

  const formatAmount = (val: number) =>
    `$${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const documentData = useMemo(
    () => ({
      companyName,
      companyEmail,
      companyLogo,
      clientName: inv.client.name,
      clientEmail: inv.client.email,
      clientAddress: inv.client.address ?? undefined,
      invoiceDate: inv.invoiceDate,
      dueDate: inv.dueDate,
      invoiceNumber: inv.number,
      lineItems: inv.lineItems,
      subtotal: inv.subtotal,
      taxPercent: inv.taxPercent,
      tax: inv.tax,
      discountAmount: inv.discountAmount,
      grandTotal: inv.grandTotal,
      notes: inv.notes ?? "",
      formatAmount,
    }),
    [companyName, companyEmail, companyLogo, inv]
  );

  return (
    <div className="w-full space-y-6">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Invoices
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-navy tracking-tight">{inv.number}</h1>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusConfig[inv.status].bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[inv.status].dot}`} />
            {statusConfig[inv.status].label}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-navy">
            <LayoutTemplate className="w-3 h-3" />
            {template.name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={async () => {
              const link = await getPublicLink(id);
              await navigator.clipboard.writeText(link.url);
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>
          <InvoiceDownloadMenu data={documentData} />
          <button
            type="button"
            onClick={() => resendInvoice(id)}
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

      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
        {/* Invoice — full template width, sharp paper edges (no size cap) */}
        <div className="w-full lg:w-[62%] lg:min-w-0 shrink-0">
          <div className="bg-white border border-gray-300 shadow-[0_12px_40px_rgba(34,46,77,0.12)] ring-1 ring-black/[0.04]">
            <InvoiceDocument templateId={templateId} data={documentData} />
          </div>
        </div>

        {/* Sidebar — centered in the remaining space */}
        <div className="w-full lg:flex-1 flex justify-center min-w-0">
          <div className="w-full max-w-[340px] space-y-5">
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
                      <div
                        className={`w-px h-8 ${item.done ? "bg-emerald-200" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-sm font-medium ${item.done ? "text-navy" : "text-muted-foreground"}`}
                    >
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
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
              Client
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy/[0.06] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-navy">
                  {inv.client.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{inv.client.name}</p>
                <p className="text-[11px] text-muted-foreground">{inv.client.email}</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
              Payment
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-navy">
                  {formatAmount(inv.grandTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusConfig[inv.status].bg}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusConfig[inv.status].dot}`}
                  />
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
    </div>
  );
}
