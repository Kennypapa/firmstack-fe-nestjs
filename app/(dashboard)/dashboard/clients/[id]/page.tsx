"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
} from "lucide-react";
import { deleteClient, getClient } from "@/lib/api/clients";
import { listInvoices } from "@/lib/api/invoices";
import type { ClientItem, InvoiceListItem } from "@/lib/api/types";
import { formatCurrency, formatInvoiceStatus } from "@/lib/format";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function initials(name: string) {
  return (
    name
      .split(" ")
      .map((p) => p[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2) || "?"
  );
}

function statusClass(status: string) {
  const key = status.toUpperCase();
  if (key === "PAID") return "bg-emerald-50 text-emerald-700";
  if (key === "OVERDUE") return "bg-red-50 text-red-700";
  if (key === "DRAFT") return "bg-gray-100 text-gray-600";
  return "bg-amber-50 text-amber-700";
}

function matchesClient(inv: InvoiceListItem, client: ClientItem) {
  const email = (client.email || "").trim().toLowerCase();
  const invEmail = (inv.client.email || "").trim().toLowerCase();
  if (email && invEmail && email === invEmail) return true;

  const name = client.name.trim().toLowerCase();
  const invName = (inv.client.name || "").trim().toLowerCase();
  return Boolean(name && invName && name === invName);
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [client, setClient] = useState<ClientItem | null>(null);
  const [invoices, setInvoices] = useState<InvoiceListItem[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getClient(id)
      .then((data) => {
        setClient(data);
        setError(null);
      })
      .catch(() => {
        setClient(null);
        setError("Client not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!client) return;
    let cancelled = false;
    setInvoicesLoading(true);

    const search = client.email?.trim() || client.name;
    listInvoices({ search: search || undefined })
      .then((res) => {
        if (cancelled) return;
        setInvoices(res.data.filter((inv) => matchesClient(inv, client)));
      })
      .catch(() => {
        if (!cancelled) setInvoices([]);
      })
      .finally(() => {
        if (!cancelled) setInvoicesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [client]);

  const handleDelete = async () => {
    try {
      await deleteClient(id);
      router.push("/dashboard/clients");
    } catch {
      setToast("Could not delete client.");
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-sm text-muted-foreground font-onest">
        Loading client…
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="w-full max-w-xl font-onest">
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Link>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl font-onest pb-10">
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-start gap-4 min-w-0">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy/[0.06] text-lg font-bold text-navy">
            {initials(client.name)}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-navy tracking-tight truncate">
              {client.name}
            </h1>
            {client.company && (
              <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {client.company}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Added {formatDate(client.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/clients/${client.id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
          <Link
            href={`/dashboard/invoices/templates?client=${encodeURIComponent(client.id)}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-navy/90 transition-colors"
          >
            Create invoice
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          <DetailRow
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={client.email || "—"}
          />
          <DetailRow
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={client.phone || "—"}
          />
          <DetailRow
            icon={<Building2 className="w-4 h-4" />}
            label="Company"
            value={client.company || "—"}
          />
          <DetailRow
            icon={<MapPin className="w-4 h-4" />}
            label="Billing address"
            value={client.address || "—"}
          />
          <DetailRow label="Notes" value={client.notes || "—"} />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-lg font-bold text-navy tracking-tight">
            Past invoices
          </h2>
          {!invoicesLoading && (
            <span className="text-xs font-medium text-muted-foreground">
              {invoices.length} total
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {invoicesLoading ? (
            <p className="px-5 py-8 text-sm text-muted-foreground">
              Loading invoices…
            </p>
          ) : invoices.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <FileText className="w-8 h-8 text-navy/25 mx-auto mb-2" />
              <p className="text-sm font-medium text-navy">No invoices yet</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Create the first invoice for {client.name}.
              </p>
              <Link
                href={`/dashboard/invoices/templates?client=${encodeURIComponent(client.id)}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-navy/90 transition-colors"
              >
                Create invoice
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <li key={inv.id}>
                  <Link
                    href={`/dashboard/invoices/${inv.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-navy truncate">
                        {inv.number}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {formatDate(inv.invoiceDate)}
                        {inv.dueDate ? ` · Due ${formatDate(inv.dueDate)}` : ""}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-navy tabular-nums shrink-0">
                      {formatCurrency(inv.grandTotal)}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass(inv.status)}`}
                    >
                      {formatInvoiceStatus(inv.status)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          Delete client
        </button>
      </div>

      {deleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setDeleteOpen(false)}
        >
          <div
            className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-navy">Delete client?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This removes {client.name} from your workspace.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="flex-1 rounded-xl border border-gray-200 text-navy font-medium py-2.5 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 text-white font-medium py-2.5 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-navy text-white px-4 py-3 shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-5 py-4">
      <p className="sm:w-36 shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-navy/50 pt-0.5 flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p className="text-sm font-medium text-navy whitespace-pre-wrap break-words">
        {value}
      </p>
    </div>
  );
}
