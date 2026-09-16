"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  Send,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TableActionMenu } from "@/components/ui/TableActionMenu";
import { listInvoices, deleteInvoice } from "@/lib/api/invoices";
import { formatInvoiceStatus } from "@/lib/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

/* ─── Types ─── */
type InvoiceRow = {
  uuid: string;
  id: string;
  client: string;
  email: string;
  amount: number;
  dueDate: string;
  status: StatusKey;
};

const PAGE_SIZE = 5;

const statusConfig = {
  Paid: { label: "Paid", dot: "bg-emerald-500", className: "bg-emerald-50 text-emerald-700" },
  Pending: { label: "Pending", dot: "bg-amber-500", className: "bg-amber-50 text-amber-700" },
  Overdue: { label: "Overdue", dot: "bg-red-500", className: "bg-red-50 text-red-700" },
  Draft: { label: "Draft", dot: "bg-gray-400", className: "bg-gray-100 text-gray-600" },
};
type StatusKey = keyof typeof statusConfig;

const now = new Date();
const defaultRange = {
  startDate: new Date(now.getFullYear(), 0, 1),
  endDate: new Date(now.getFullYear(), 11, 31),
  key: "selection",
};

/* ─── Empty table body ─── */
function EmptyRecords() {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 text-center">
      <svg
        viewBox="0 0 64 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14"
        aria-hidden
      >
        <path
          d="M6 18.5C6 16.015 8.015 14 10.5 14H24.2c.8 0 1.55.38 2.02 1.02L28.5 18H53.5C55.985 18 58 20.015 58 22.5V46c0 2.485-2.015 4.5-4.5 4.5H10.5C8.015 50.5 6 48.485 6 46V18.5Z"
          stroke="#222e4d"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M6 22.5H58"
          stroke="#222e4d"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M24 30.5L28.5 35M28.5 30.5L24 35"
          stroke="#222e4d"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M35.5 30.5L40 35M40 30.5L35.5 35"
          stroke="#222e4d"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M27 41c2.2-2.4 7.8-2.4 10 0"
          stroke="#222e4d"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M50 8.5l2.2-3.2M54.5 11l3.5-1.2M53 15.5l3.2 1.8"
          stroke="#222e4d"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-sm font-medium text-navy/70">No record yet</p>
    </div>
  );
}

function TableEmpty({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-14">
        <EmptyRecords />
      </td>
    </tr>
  );
}

/* ─── Page ─── */
export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState(defaultRange);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pickerMonths, setPickerMonths] = useState(1);
  const [showPickerRanges, setShowPickerRanges] = useState(true);
  const [pickerPos, setPickerPos] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const [aggregates, setAggregates] = useState({
    totalInvoiced: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
  });
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pickerOpen) {
      setPickerPos(null);
      return;
    }

    const updateLayout = () => {
      const anchor = pickerRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const sidebarGutter = isDesktop ? 280 : 16;
      const available = Math.max(280, window.innerWidth - sidebarGutter - 16);

      const months = available >= 780 ? 2 : 1;
      const showRanges = available >= 560;
      setPickerMonths(months);
      setShowPickerRanges(showRanges);

      // Approx width of picker content (ranges + months) so we never need scroll
      const estimatedWidth =
        (showRanges ? 226 : 0) + months * 278 + 20;
      const width = Math.min(estimatedWidth, available);

      let right = Math.max(16, window.innerWidth - rect.right);
      const leftEdge = window.innerWidth - right - width;
      if (leftEdge < sidebarGutter) {
        right = Math.max(16, window.innerWidth - sidebarGutter - width);
      }

      setPickerPos({
        top: rect.bottom + 8,
        right,
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, true);
    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout, true);
    };
  }, [pickerOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (pickerRef.current?.contains(target)) return;
      if (pickerPanelRef.current?.contains(target)) return;
      setPickerOpen(false);
    }
    if (pickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [pickerOpen]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const statusParam =
      statusFilter === "All"
        ? undefined
        : statusFilter.toUpperCase();

    listInvoices({
      search: search || undefined,
      status: statusParam,
      fromDate: dateRange.startDate
        ? format(dateRange.startDate, "yyyy-MM-dd")
        : undefined,
      toDate: dateRange.endDate
        ? format(dateRange.endDate, "yyyy-MM-dd")
        : undefined,
    })
      .then((res) => {
        if (cancelled) return;
        setInvoices(
          res.data.map((inv) => ({
            uuid: inv.id,
            id: inv.number,
            client: inv.client.name,
            email: inv.client.email,
            amount: inv.grandTotal,
            dueDate: inv.dueDate.slice(0, 10),
            status: formatInvoiceStatus(inv.status) as StatusKey,
          })),
        );
        setAggregates(res.aggregates);
      })
      .catch(() => {
        if (!cancelled) setInvoices([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, statusFilter, dateRange]);

  const filtered = invoices;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, dateRange]);

  const totalInvoiced = aggregates.totalInvoiced;
  const paid = aggregates.paid;
  const pending = aggregates.pending;
  const overdue = aggregates.overdue;

  const summaryCards = [
    { label: "Total Invoiced", value: totalInvoiced, icon: FileText, bg: "bg-navy/[0.06]", color: "text-navy" },
    { label: "Paid", value: paid, icon: DollarSign, bg: "bg-emerald-50", color: "text-emerald-600" },
    { label: "Pending", value: pending, icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
    { label: "Overdue", value: overdue, icon: AlertCircle, bg: "bg-red-50", color: "text-red-600" },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy tracking-tight">Invoices</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and track all your invoices
            </p>
          </div>
          <Link
            href="/dashboard/invoices/templates"
            className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm hover:bg-navy/90 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            Create Invoice
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 focus:outline-none transition-all"
            />
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm shadow-navy/[0.03]">
            {["All", "Paid", "Pending", "Overdue", "Draft"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === s
                    ? "bg-navy text-white shadow-sm"
                    : "text-muted-foreground hover:bg-gray-50 hover:text-navy"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white pl-3 pr-3 py-2 text-xs font-medium text-navy hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              {format(dateRange.startDate, "MMM d")} – {format(dateRange.endDate, "MMM d, yyyy")}
            </button>
            {pickerOpen &&
              pickerPos &&
              createPortal(
                <div
                  ref={pickerPanelRef}
                  className={`firmstack-date-picker fixed z-[100] rounded-xl border border-gray-200 bg-white p-2 shadow-xl ${
                    showPickerRanges ? "" : "firmstack-date-picker--no-ranges"
                  }`}
                  style={{
                    top: pickerPos.top,
                    right: pickerPos.right,
                  }}
                >
                  <DateRangePicker
                    ranges={[dateRange]}
                    onChange={(item) =>
                      setDateRange({ ...item.selection, key: "selection" })
                    }
                    months={pickerMonths}
                    direction="horizontal"
                    rangeColors={["#222e4d"]}
                    showDateDisplay={false}
                    staticRanges={showPickerRanges ? undefined : []}
                    inputRanges={showPickerRanges ? undefined : []}
                  />
                  <div className="mt-2 flex justify-end border-t border-gray-100 pt-2">
                    <button
                      type="button"
                      onClick={() => setPickerOpen(false)}
                      className="rounded-lg bg-navy px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-navy/90"
                    >
                      Apply
                    </button>
                  </div>
                </div>,
                document.body
              )}
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md hover:shadow-gray-100/80 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-lg font-bold text-navy mt-0.5">
                  ${card.value.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-visible">
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">Loading invoices…</div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto overflow-y-visible">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-14">
                      #
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Due Date
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
                    <TableEmpty colSpan={7} />
                  ) : (
                    paged.map((inv, rowIndex) => {
                      const rowNumber = pageStart + rowIndex + 1;
                      return (
                        <tr
                          key={inv.uuid}
                          className="border-t border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                          onClick={() => router.push(`/dashboard/invoices/${inv.uuid}`)}
                        >
                          <td className="px-5 py-3.5 text-sm font-medium text-gray-500 tabular-nums">
                            {rowNumber}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-semibold text-navy">{inv.id}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div>
                              <p className="font-medium text-navy">{inv.client}</p>
                              <p className="text-[11px] text-muted-foreground">{inv.email}</p>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-navy">
                            ${inv.amount.toLocaleString()}
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">
                            {format(new Date(inv.dueDate), "MMM d, yyyy")}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                statusConfig[inv.status as StatusKey].className
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  statusConfig[inv.status as StatusKey].dot
                                }`}
                              />
                              {statusConfig[inv.status as StatusKey].label}
                            </span>
                          </td>
                          <td
                            className="px-5 py-3.5 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="inline-flex justify-end">
                              <TableActionMenu
                                isOpen={activeMenu === inv.uuid}
                                onToggle={() =>
                                  setActiveMenu(activeMenu === inv.uuid ? null : inv.uuid)
                                }
                                onClose={() => setActiveMenu(null)}
                                ariaLabel={`Actions for ${inv.id}`}
                              >
                                <Link
                                  href={`/dashboard/invoices/${inv.uuid}`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" /> View
                                </Link>
                                <Link
                                  href={`/dashboard/invoices/${inv.uuid}/edit`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" /> Edit
                                </Link>
                                <button
                                  type="button"
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors w-full"
                                >
                                  <Send className="w-3.5 h-3.5" /> Resend
                                </button>
                                <button
                                  type="button"
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors w-full"
                                >
                                  <Download className="w-3.5 h-3.5" /> Download PDF
                                </button>
                                <div className="border-t border-gray-100 my-1" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteConfirm(inv.uuid);
                                    setActiveMenu(null);
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
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

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-gray-50 overflow-visible">
              {filtered.length === 0 ? (
                <div className="px-6 py-14">
                  <EmptyRecords />
                </div>
              ) : (
                paged.map((inv, rowIndex) => {
                  const rowNumber = pageStart + rowIndex + 1;
                  return (
                    <div
                      key={inv.uuid}
                      className="flex items-center justify-between gap-3 p-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <span className="text-xs font-medium text-gray-500 tabular-nums w-5 shrink-0">
                        {rowNumber}
                      </span>
                      <Link
                        href={`/dashboard/invoices/${inv.uuid}`}
                        className="flex items-center justify-between flex-1 min-w-0"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-navy text-sm">{inv.client}</p>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                statusConfig[inv.status as StatusKey].className
                              }`}
                            >
                              {statusConfig[inv.status as StatusKey].label}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {inv.id} &middot; Due {format(new Date(inv.dueDate), "MMM d")}
                          </p>
                        </div>
                        <p className="font-bold text-navy text-sm shrink-0 ml-3">
                          ${inv.amount.toLocaleString()}
                        </p>
                      </Link>
                      <div className="shrink-0">
                        <TableActionMenu
                          isOpen={activeMenu === inv.uuid}
                          onToggle={() =>
                            setActiveMenu(activeMenu === inv.uuid ? null : inv.uuid)
                          }
                          onClose={() => setActiveMenu(null)}
                          ariaLabel={`Actions for ${inv.id}`}
                        >
                          <Link
                            href={`/dashboard/invoices/${inv.uuid}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </Link>
                          <Link
                            href={`/dashboard/invoices/${inv.id}/edit`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteConfirm(inv.id);
                              setActiveMenu(null);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </TableActionMenu>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination — inside white card */}
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
                of <span className="font-medium text-navy">{filtered.length}</span> invoices
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
          </>
        )}
      </div>

      {/* Delete modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div
            className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-navy text-center mt-4">Delete invoice?</h3>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              This action cannot be undone. The invoice will be permanently removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl border border-gray-200 text-navy font-medium py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!deleteConfirm) return;
                  try {
                    await deleteInvoice(deleteConfirm);
                    setInvoices((prev) => prev.filter((i) => i.uuid !== deleteConfirm));
                  } catch {
                    /* ignore */
                  }
                  setDeleteConfirm(null);
                }}
                className="flex-1 rounded-xl bg-red-600 text-white font-medium py-2.5 text-sm hover:bg-red-700 transition-colors"
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
