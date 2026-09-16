"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Paperclip,
  X,
} from "lucide-react";
import {
  approveExpense,
  getExpense,
  rejectExpense,
} from "@/lib/api/expenses";
import type { ExpenseItem } from "@/lib/api/types";
import {
  formatExpenseStatus,
  fromExpenseCategory,
} from "@/lib/format";

type ExpenseStatus = "Approved" | "Pending" | "Rejected";

const statusConfig: Record<
  ExpenseStatus,
  { label: string; dot: string; className: string }
> = {
  Approved: {
    label: "Approved",
    dot: "bg-emerald-500",
    className: "bg-emerald-50 text-emerald-700",
  },
  Pending: {
    label: "Pending",
    dot: "bg-amber-500",
    className: "bg-amber-50 text-amber-700",
  },
  Rejected: {
    label: "Rejected",
    dot: "bg-red-500",
    className: "bg-red-50 text-red-700",
  },
};

function formatDate(iso: string) {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoney(amount: number) {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function loadExtras(id: string) {
  try {
    const all = JSON.parse(
      localStorage.getItem("firmstack-expense-extras") || "{}",
    ) as Record<
      string,
      {
        merchant?: string;
        paymentMethod?: string;
        hasReceipt?: boolean;
        receiptName?: string;
      }
    >;
    return all[id] || {};
  } catch {
    return {};
  }
}

function loadCachedRow(id: string): ExpenseItem | null {
  try {
    const raw = sessionStorage.getItem(`firmstack-expense-row:${id}`);
    if (!raw) return null;
    const row = JSON.parse(raw) as {
      id: string;
      date: string;
      category: string;
      description: string;
      amount: number;
      addedBy: string;
      status: string;
      merchant?: string;
      paymentMethod?: string;
      receiptUrl?: string | null;
    };
    return {
      id: row.id,
      date: row.date,
      category: row.category,
      description: row.description,
      amount: row.amount,
      addedBy: row.addedBy,
      status:
        row.status === "Approved"
          ? "APPROVED"
          : row.status === "Rejected"
            ? "REJECTED"
            : "PENDING",
      merchant: row.merchant,
      paymentMethod: row.paymentMethod,
      receiptUrl: row.receiptUrl === "attached" ? null : row.receiptUrl,
    };
  } catch {
    return null;
  }
}

export default function ExpenseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expense, setExpense] = useState<ExpenseItem | null>(null);
  const [extras, setExtras] = useState(loadExtras(id));
  const [acting, setActing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setExtras(loadExtras(id));

    const cached = loadCachedRow(id);
    if (cached && !cancelled) {
      setExpense(cached);
      setLoading(false);
    }

    getExpense(id)
      .then((data) => {
        if (!cancelled) {
          setExpense(data);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled && !cached) {
          setExpense(null);
          setError("Expense not found.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const status = formatExpenseStatus(expense?.status || "PENDING") as ExpenseStatus;
  const statusUi = statusConfig[status] || statusConfig.Pending;
  const merchant =
    expense?.merchant?.trim() || extras.merchant?.trim() || "—";
  const paymentMethod =
    expense?.paymentMethod?.trim() || extras.paymentMethod?.trim() || "—";
  const hasReceipt = Boolean(expense?.receiptUrl) || Boolean(extras.hasReceipt);
  const receiptUrl = expense?.receiptUrl || null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async () => {
    if (!expense || acting) return;
    setActing(true);
    try {
      const updated = await approveExpense(expense.id);
      setExpense(updated);
      showToast("Expense approved.");
    } catch {
      showToast("Could not approve expense.");
    } finally {
      setActing(false);
    }
  };

  const handleReject = async () => {
    if (!expense || acting) return;
    setActing(true);
    try {
      const updated = await rejectExpense(expense.id);
      setExpense(updated);
      showToast("Expense rejected.");
    } catch {
      showToast("Could not reject expense.");
    } finally {
      setActing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-sm text-muted-foreground font-onest">
        Loading expense…
      </div>
    );
  }

  if (error || !expense) {
    return (
      <div className="w-full max-w-xl font-onest">
        <Link
          href="/dashboard/expenses"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Expenses
        </Link>
        <p className="text-sm text-muted-foreground">
          {error || "Expense not found."}
        </p>
      </div>
    );
  }

  const rows = [
    { label: "Date", value: formatDate(expense.date) },
    { label: "Paid to", value: merchant },
    { label: "Category", value: fromExpenseCategory(expense.category) },
    { label: "Payment", value: paymentMethod },
    { label: "Amount", value: formatMoney(expense.amount) },
    { label: "Notes", value: expense.description?.trim() || "—" },
    { label: "Added by", value: expense.addedBy || "—" },
  ];

  return (
    <div className="w-full max-w-3xl font-onest pb-10">
      <Link
        href="/dashboard/expenses"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Expenses
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/40">
            Expense
          </p>
          <h1 className="text-2xl font-bold text-navy tracking-tight mt-1">
            EXP-{expense.id.slice(0, 6).toUpperCase()}
          </h1>
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusUi.className}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusUi.dot}`} />
              {statusUi.label}
            </span>
          </div>
        </div>

        {status === "Pending" && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={acting}
              onClick={handleReject}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-gray-50 disabled:opacity-60 transition-colors"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
            <button
              type="button"
              disabled={acting}
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 rounded-xl bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-navy/90 disabled:opacity-60 transition-colors"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-5 py-4"
            >
              <p className="sm:w-32 shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-navy/50 pt-0.5">
                {row.label}
              </p>
              <p className="text-sm font-medium text-navy whitespace-pre-wrap break-words">
                {row.value}
              </p>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-5 py-4">
            <p className="sm:w-32 shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-navy/50 pt-0.5">
              Receipt
            </p>
            <div className="min-w-0 flex-1">
              {receiptUrl && receiptUrl.startsWith("data:image") ? (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 max-w-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={receiptUrl}
                    alt="Receipt"
                    className="w-full max-h-72 object-contain"
                  />
                </div>
              ) : hasReceipt ? (
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                  <Paperclip className="w-4 h-4" />
                  {extras.receiptName || "Receipt attached"}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No receipt</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/expenses")}
          className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gray-50 transition-colors"
        >
          Back to list
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-navy text-white px-4 py-3 shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
