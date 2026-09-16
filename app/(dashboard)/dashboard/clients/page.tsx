"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Contact,
  Mail,
  Building2,
  Trash2,
  Pencil,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TableActionMenu } from "@/components/ui/TableActionMenu";
import { deleteClient, listClients } from "@/lib/api/clients";
import type { ClientItem } from "@/lib/api/types";

const PAGE_SIZE = 8;

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
      <p className="text-sm font-medium text-navy/70">No clients yet</p>
      <p className="text-xs text-muted-foreground max-w-xs">
        Add your first client to reuse their details on invoices.
      </p>
    </div>
  );
}

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

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listClients({ search: search || undefined })
      .then(setClients)
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(clients.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paged = clients.slice(pageStart, pageStart + PAGE_SIZE);

  const withEmail = clients.filter((c) => c.email).length;
  const withCompany = clients.filter((c) => c.company).length;

  const handleDelete = async (id: string) => {
    try {
      await deleteClient(id);
      setDeleteConfirm(null);
      setToast("Client deleted.");
      setTimeout(() => setToast(null), 3000);
      load();
    } catch {
      setToast("Could not delete client.");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="space-y-6 w-full font-onest">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy tracking-tight">Clients</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Save contacts once and reuse them on invoices
            </p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm hover:bg-navy/90 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-80 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search clients…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-navy/10 p-2.5">
              <Contact className="w-5 h-5 text-navy" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total clients</p>
              <p className="text-xl font-bold text-navy">{clients.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">With email</p>
              <p className="text-xl font-bold text-navy">{withEmail}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-2.5">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Companies</p>
              <p className="text-xl font-bold text-navy">{withCompany}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white overflow-visible">
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Loading clients…
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto overflow-y-visible">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-14">
                      #
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Added
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-14">
                        <EmptyRecords />
                      </td>
                    </tr>
                  ) : (
                    paged.map((client, index) => {
                      const rowNumber = pageStart + index + 1;
                      return (
                        <tr
                          key={client.id}
                          className="border-t border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                          onClick={() =>
                            router.push(`/dashboard/clients/${client.id}`)
                          }
                        >
                          <td className="px-5 py-3.5 text-sm font-medium text-gray-500 tabular-nums">
                            {rowNumber}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-xs font-bold text-navy">
                                {initials(client.name)}
                              </span>
                              <span className="font-semibold text-navy truncate">
                                {client.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">
                            {client.email || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                            {client.phone || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-navy font-medium">
                            {client.company || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                            {formatDate(client.createdAt)}
                          </td>
                          <td
                            className="px-5 py-3.5 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="inline-flex justify-end">
                              <TableActionMenu
                                isOpen={activeMenu === client.id}
                                onToggle={() =>
                                  setActiveMenu(
                                    activeMenu === client.id ? null : client.id,
                                  )
                                }
                                onClose={() => setActiveMenu(null)}
                                ariaLabel={`Actions for ${client.name}`}
                              >
                                <Link
                                  href={`/dashboard/clients/${client.id}`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" /> View
                                </Link>
                                <Link
                                  href={`/dashboard/invoices/templates?client=${encodeURIComponent(client.id)}`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                                >
                                  <FileText className="w-3.5 h-3.5" /> Create invoice
                                </Link>
                                <Link
                                  href={`/dashboard/clients/${client.id}/edit`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" /> Edit
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteConfirm(client.id);
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

            <div className="md:hidden divide-y divide-gray-50">
              {clients.length === 0 ? (
                <div className="px-6 py-14">
                  <EmptyRecords />
                </div>
              ) : (
                paged.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() =>
                      router.push(`/dashboard/clients/${client.id}`)
                    }
                    className="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-xs font-bold text-navy">
                      {initials(client.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-navy truncate">
                        {client.name}
                      </span>
                      <span className="block text-xs text-muted-foreground truncate">
                        {client.email || client.phone || "No contact info"}
                      </span>
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5 border-t border-gray-100">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-navy">
                  {clients.length === 0 ? 0 : pageStart + 1}
                </span>
                –
                <span className="font-medium text-navy">
                  {Math.min(pageStart + PAGE_SIZE, clients.length)}
                </span>{" "}
                of <span className="font-medium text-navy">{clients.length}</span>{" "}
                clients
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
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
                    ),
                  )}
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

      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-navy">Delete client?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This removes the client from your workspace. Past invoices are not
              deleted.
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
                onClick={() => handleDelete(deleteConfirm)}
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
