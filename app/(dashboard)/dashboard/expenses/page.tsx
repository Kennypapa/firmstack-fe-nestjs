"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  DollarSign,
  TrendingUp,
  Clock,
  Pencil,
  Trash2,
  Upload,
  X,
  Paperclip,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TableActionMenu } from "@/components/ui/TableActionMenu";
import {
  approveExpense,
  createExpense,
  deleteExpense,
  listExpenses,
} from "@/lib/api/expenses";
import {
  formatExpenseStatus,
  fromExpenseCategory,
  toExpenseCategory,
} from "@/lib/format";

const PAGE_SIZE = 5;

type ExpenseStatus = "Approved" | "Pending" | "Rejected";

interface Expense {
  id: string;
  ref: string;
  date: string;
  merchant: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  hasReceipt: boolean;
  addedBy: string;
  status: ExpenseStatus;
}

const categories = ["Office", "Software", "Travel", "Marketing", "Other"];

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
  const d = new Date(`${iso}T12:00:00`);
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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [aggregates, setAggregates] = useState({
    totalThisMonth: 0,
    highestCategory: null as { category: string; amount: number } | null,
    pendingReimbursements: 0,
  });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const loadExpenses = () => {
    setLoading(true);
    listExpenses({
      search: search || undefined,
      category:
        categoryFilter === "All"
          ? undefined
          : toExpenseCategory(categoryFilter),
    })
      .then((res) => {
        setExpenses(
          res.data.map((exp) => ({
            id: exp.id,
            ref: `EXP-${exp.id.slice(0, 6).toUpperCase()}`,
            date: exp.date.slice(0, 10),
            merchant: fromExpenseCategory(exp.category),
            category: fromExpenseCategory(exp.category),
            description: exp.description,
            amount: exp.amount,
            paymentMethod: "—",
            hasReceipt: Boolean(exp.receiptUrl),
            addedBy: exp.addedBy,
            status: formatExpenseStatus(exp.status) as ExpenseStatus,
          })),
        );
        setAggregates(res.aggregates);
      })
      .catch(() => setExpenses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExpenses();
  }, [search, categoryFilter]);

  const filtered = expenses;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const totalMonth = aggregates.totalThisMonth;
  const pendingReimb = aggregates.pendingReimbursements;
  const topCategory =
    aggregates.highestCategory
      ? fromExpenseCategory(aggregates.highestCategory.category)
      : "—";

  return (
    <div className="space-y-6 font-onest">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Expenses</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px] sm:min-w-[320px] sm:max-w-md lg:max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by ID, merchant, category, description…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-navy focus:outline-none"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-4 py-2.5 hover:bg-navy/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-navy/10 p-2.5">
              <DollarSign className="w-5 h-5 text-navy" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total This Month
              </p>
              <p className="text-xl font-bold text-navy">{formatMoney(totalMonth)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Highest Category
              </p>
              <p className="text-xl font-bold text-navy">{topCategory}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-2.5">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Reimbursements
              </p>
              <p className="text-xl font-bold text-navy">
                {formatMoney(pendingReimb)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-12">
                  #
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  Expense ID
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  Merchant
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider min-w-[160px]">
                  Description
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  Payment
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Receipt
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  Added by
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No expenses found. Add your first expense to get started.
                  </td>
                </tr>
              ) : (
                paged.map((exp, index) => {
                  const status = statusConfig[exp.status];
                  const rowNumber = pageStart + index + 1;
                  return (
                    <tr
                      key={exp.id}
                      className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-muted-foreground tabular-nums">
                        {rowNumber}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-navy whitespace-nowrap">
                          <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {exp.ref}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                        {formatDate(exp.date)}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-navy whitespace-nowrap">
                        {exp.merchant}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex px-2 py-0.5 rounded-lg bg-gray-100 text-navy text-xs font-medium">
                          {exp.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground max-w-[220px] truncate">
                        {exp.description}
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold text-navy whitespace-nowrap tabular-nums">
                        {formatMoney(exp.amount)}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                        {exp.paymentMethod}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {exp.hasReceipt ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                            <Paperclip className="w-3.5 h-3.5" />
                            Attached
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            None
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                        {exp.addedBy}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end">
                          <TableActionMenu
                            isOpen={activeMenu === exp.id}
                            onToggle={() =>
                              setActiveMenu(
                                activeMenu === exp.id ? null : exp.id
                              )
                            }
                            onClose={() => setActiveMenu(null)}
                            ariaLabel={`Actions for ${exp.ref}`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenu(null);
                                setModalOpen(true);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenu(null);
                                setDeleteConfirm(exp.id);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </TableActionMenu>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-navy">
              {filtered.length === 0 ? 0 : pageStart + 1}
            </span>
            –
            <span className="font-medium text-navy">
              {Math.min(pageStart + PAGE_SIZE, filtered.length)}
            </span>{" "}
            of <span className="font-medium text-navy">{filtered.length}</span>{" "}
            expenses
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`min-w-[32px] h-8 rounded-lg text-xs font-medium transition-colors ${
                    n === currentPage
                      ? "bg-navy text-white"
                      : "text-navy hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <AddExpenseModal
          onClose={() => setModalOpen(false)}
          onSave={async (data) => {
            await createExpense(data);
            setModalOpen(false);
            loadExpenses();
            setToast("Expense saved successfully.");
            setTimeout(() => setToast(null), 3000);
          }}
          onSaveAndAddAnother={async (data) => {
            await createExpense(data);
            loadExpenses();
            setToast("Expense saved. Add another below.");
            setTimeout(() => setToast(null), 3000);
          }}
          categories={categories}
        />
      )}

      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-navy">Delete expense?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl border border-gray-200 text-navy font-medium py-2.5 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!deleteConfirm) return;
                  try {
                    await deleteExpense(deleteConfirm);
                    loadExpenses();
                    setToast("Expense deleted.");
                    setTimeout(() => setToast(null), 3000);
                  } catch {
                    /* ignore */
                  }
                  setDeleteConfirm(null);
                }}
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

function AddExpenseModal({
  onClose,
  onSave,
  onSaveAndAddAnother,
  categories,
}: {
  onClose: () => void;
  onSave: (data: {
    date: string;
    category: string;
    description: string;
    amount: number;
  }) => Promise<void>;
  onSaveAndAddAnother: (data: {
    date: string;
    category: string;
    description: string;
    amount: number;
  }) => Promise<void>;
  categories: string[];
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [merchant, setMerchant] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Company card");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);

  const buildPayload = () => ({
    date,
    category: toExpenseCategory(category),
    description: description.trim() || merchant.trim() || category,
    amount: parseFloat(amount),
  });

  const handleSubmit = async (
    e: React.FormEvent,
    andAnother = false,
  ) => {
    e.preventDefault();
    if (!amount || Number.isNaN(parseFloat(amount))) return;
    setSaving(true);
    try {
      const payload = buildPayload();
      if (andAnother) {
        await onSaveAndAddAnother(payload);
        setAmount("");
        setMerchant("");
        setDescription("");
      } else {
        await onSave(payload);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="rounded-2xl bg-white shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto font-onest"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-navy">Add Expense</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form
          className="p-6 space-y-5"
          onSubmit={(e) => handleSubmit(e, false)}
        >
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Amount
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Merchant / Vendor
            </label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="e.g. Staples, Uber"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Payment method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            >
              <option>Company card</option>
              <option>Personal card</option>
              <option>Bank transfer</option>
              <option>Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Upload Receipt (optional)
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              className={`border-2 border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground transition-colors ${
                dragOver
                  ? "border-navy bg-navy/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              Drag and drop or click to upload
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-navy text-white font-semibold py-3 hover:bg-navy/90 disabled:opacity-60"
            >
              Save
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={(e) => handleSubmit(e, true)}
              className="w-full rounded-xl border-2 border-navy text-navy font-semibold py-3 hover:bg-navy/5 disabled:opacity-60"
            >
              Save & Add Another
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
