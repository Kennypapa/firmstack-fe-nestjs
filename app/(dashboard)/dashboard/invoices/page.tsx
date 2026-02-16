"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import {
  Search,
  Plus,
  Calendar,
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Mock data – replace with API later
const mockInvoices = [
  { id: "INV-028", client: "Acme Corp", amount: 4200, dueDate: "2025-02-20", status: "Pending" as const },
  { id: "INV-027", client: "TechStart Inc", amount: 2800, dueDate: "2025-02-15", status: "Paid" as const },
  { id: "INV-026", client: "Global Ltd", amount: 5100, dueDate: "2025-02-10", status: "Overdue" as const },
  { id: "INV-025", client: "Design Co", amount: 1950, dueDate: "2025-02-05", status: "Paid" as const },
  { id: "INV-024", client: "Beta Agency", amount: 3200, dueDate: "2025-03-01", status: "Draft" as const },
];

const statusConfig = {
  Paid: { label: "Paid", className: "bg-emerald-500/10 text-emerald-700" },
  Pending: { label: "Pending", className: "bg-amber-500/10 text-amber-700" },
  Overdue: { label: "Overdue", className: "bg-red-500/10 text-red-700" },
  Draft: { label: "Draft", className: "bg-gray-500/10 text-gray-600" },
};

type StatusKey = keyof typeof statusConfig;

const now = new Date();
const defaultRange = {
  startDate: new Date(now.getFullYear(), 0, 1),
  endDate: new Date(now.getFullYear(), 11, 31),
  key: "selection",
};

export default function InvoicesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState(defaultRange);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    }
    if (pickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [pickerOpen]);

  const filtered = mockInvoices.filter((inv) => {
    const matchSearch =
      !search ||
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    const invDue = inv.dueDate;
    const from = dateRange.startDate ? format(dateRange.startDate, "yyyy-MM-dd") : null;
    const to = dateRange.endDate ? format(dateRange.endDate, "yyyy-MM-dd") : null;
    const matchDate = !from || !to || (invDue >= from && invDue <= to);
    return matchSearch && matchStatus && matchDate;
  });

  // Mock summary – in real app derive from API
  const totalInvoiced = mockInvoices.reduce((s, i) => s + i.amount, 0);
  const paid = mockInvoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = mockInvoices.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const overdue = mockInvoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Invoices</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by client or invoice ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Draft">Draft</option>
          </select>
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white pl-3 pr-4 py-2.5 text-sm text-navy hover:bg-gray-50 focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none min-w-[220px] justify-between"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-left">
                  {format(dateRange.startDate, "dd/MM/yyyy")} – {format(dateRange.endDate, "dd/MM/yyyy")}
                </span>
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${pickerOpen ? "rotate-180" : ""}`} />
            </button>
            {pickerOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                <DateRangePicker
                  ranges={[dateRange]}
                  onChange={(item) => setDateRange({ ...item.selection, key: "selection" })}
                  months={2}
                  direction="horizontal"
                  rangeColors={["var(--navy)", "#222e4d"]}
                  showDateDisplay={false}
                />
                <div className="flex justify-end border-t border-gray-100 pt-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setPickerOpen(false)}
                    className="rounded-lg bg-navy text-white text-sm font-medium px-4 py-2 hover:bg-navy/90"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-4 py-2.5 hover:bg-navy/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Invoice
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-navy/10 p-2.5">
              <FileText className="w-5 h-5 text-navy" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Invoiced</p>
              <p className="text-xl font-bold text-navy">${totalInvoiced.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2.5">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paid</p>
              <p className="text-xl font-bold text-navy">${paid.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-2.5">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-xl font-bold text-navy">${pending.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-500/10 p-2.5">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <p className="text-xl font-bold text-navy">${overdue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-left">
                <th className="px-6 py-3 font-medium text-navy">Invoice ID</th>
                <th className="px-6 py-3 font-medium text-navy">Client Name</th>
                <th className="px-6 py-3 font-medium text-navy">Amount</th>
                <th className="px-6 py-3 font-medium text-navy">Due Date</th>
                <th className="px-6 py-3 font-medium text-navy">Status</th>
                <th className="px-6 py-3 font-medium text-navy text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No invoices match your filters. Try adjusting search or filters, or create your first invoice.
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-t border-gray-100 hover:bg-gray-50/50 cursor-pointer"
                    onClick={() => router.push(`/dashboard/invoices/${inv.id}`)}
                  >
                    <td className="px-6 py-3 font-medium text-navy">{inv.id}</td>
                    <td className="px-6 py-3 text-muted-foreground">{inv.client}</td>
                    <td className="px-6 py-3 font-medium text-navy">${inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 text-muted-foreground">{inv.dueDate}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusConfig[inv.status as StatusKey].className
                        }`}
                      >
                        {statusConfig[inv.status as StatusKey].label}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/invoices/${inv.id}`}
                          className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy"
                          aria-label="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/invoices/${inv.id}/edit`}
                          className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(inv.id)}
                          className="p-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setDeleteConfirm(null)}>
          <div
            className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-navy">Delete invoice?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This action cannot be undone. The invoice will be permanently removed.
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
                onClick={() => {
                  // API delete; for now just close
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
    </div>
  );
}
