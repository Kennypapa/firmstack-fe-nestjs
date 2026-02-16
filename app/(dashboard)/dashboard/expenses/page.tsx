"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

// Mock data
const mockExpenses = [
  { id: "1", date: "2025-02-13", category: "Office", description: "Supplies", amount: 320, addedBy: "You", status: "Approved" as const },
  { id: "2", date: "2025-02-12", category: "Software", description: "Subscription", amount: 149, addedBy: "Sarah", status: "Pending" as const },
  { id: "3", date: "2025-02-11", category: "Travel", description: "Client meeting", amount: 580, addedBy: "Mike", status: "Approved" as const },
  { id: "4", date: "2025-02-10", category: "Marketing", description: "Ads", amount: 420, addedBy: "You", status: "Pending" as const },
];

const categories = ["Office", "Software", "Travel", "Marketing", "Other"];
const statusConfig = {
  Approved: "bg-emerald-500/10 text-emerald-700",
  Pending: "bg-amber-500/10 text-amber-700",
};

export default function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = mockExpenses.filter((exp) => {
    const matchSearch =
      !search ||
      exp.description.toLowerCase().includes(search.toLowerCase()) ||
      exp.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || exp.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalMonth = mockExpenses.reduce((s, i) => s + i.amount, 0);
  const pendingReimb = mockExpenses.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const topCategory = "Office";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Expenses</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search expenses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-navy focus:outline-none"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
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
              <p className="text-sm font-medium text-muted-foreground">Total This Month</p>
              <p className="text-xl font-bold text-navy">${totalMonth.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Highest Category</p>
              <p className="text-xl font-bold text-navy">{topCategory}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-2.5">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Reimbursements</p>
              <p className="text-xl font-bold text-navy">${pendingReimb.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-left">
                <th className="px-6 py-3 font-medium text-navy">Date</th>
                <th className="px-6 py-3 font-medium text-navy">Category</th>
                <th className="px-6 py-3 font-medium text-navy">Description</th>
                <th className="px-6 py-3 font-medium text-navy">Amount</th>
                <th className="px-6 py-3 font-medium text-navy">Added By</th>
                <th className="px-6 py-3 font-medium text-navy">Status</th>
                <th className="px-6 py-3 font-medium text-navy text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    No expenses found. Add your first expense to get started.
                  </td>
                </tr>
              ) : (
                filtered.map((exp) => (
                  <tr key={exp.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-6 py-3 text-muted-foreground">{exp.date}</td>
                    <td className="px-6 py-3 font-medium text-navy">{exp.category}</td>
                    <td className="px-6 py-3 text-muted-foreground">{exp.description}</td>
                    <td className="px-6 py-3 font-medium text-navy">${exp.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 text-muted-foreground">{exp.addedBy}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[exp.status]}`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(exp.id)}
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

      {/* Add Expense Modal */}
      {modalOpen && (
        <AddExpenseModal
          onClose={() => setModalOpen(false)}
          onSave={() => {
            setModalOpen(false);
            setToast("Expense saved successfully.");
            setTimeout(() => setToast(null), 3000);
          }}
          onSaveAndAddAnother={() => {
            setToast("Expense saved. Add another below.");
            setTimeout(() => setToast(null), 3000);
          }}
          categories={categories}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setDeleteConfirm(null)}>
          <div className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-navy">Delete expense?</h3>
            <p className="mt-2 text-sm text-muted-foreground">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-gray-200 text-navy font-medium py-2.5 hover:bg-gray-50">Cancel</button>
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl bg-red-600 text-white font-medium py-2.5 hover:bg-red-700">Delete</button>
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
  onSave: () => void;
  onSaveAndAddAnother: () => void;
  categories: string[];
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="rounded-2xl bg-white shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-navy">Add Expense</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form
          className="p-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Amount</label>
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
            <label className="block text-sm font-medium text-navy mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Upload Receipt (optional)</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              className={`border-2 border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground transition-colors ${
                dragOver ? "border-navy bg-navy/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              Drag and drop or click to upload
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button type="submit" className="w-full rounded-xl bg-navy text-white font-semibold py-3 hover:bg-navy/90">
              Save
            </button>
            <button
              type="button"
              onClick={() => { onSaveAndAddAnother(); }}
              className="w-full rounded-xl border-2 border-navy text-navy font-semibold py-3 hover:bg-navy/5"
            >
              Save & Add Another
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
