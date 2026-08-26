"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { LayoutGrid, Plus, RotateCcw, Check, Hand } from "lucide-react";
import { useDashboardLayoutStore } from "@/stores/dashboard-layout";

const DashboardGrid = dynamic(
  () =>
    import("@/components/dashboard/DashboardGrid").then((m) => m.DashboardGrid),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 rounded-2xl border border-gray-100 bg-white animate-pulse" />
    ),
  }
);

export default function DashboardPage() {
  const isEditing = useDashboardLayoutStore((s) => s.isEditing);
  const setEditing = useDashboardLayoutStore((s) => s.setEditing);
  const resetLayout = useDashboardLayoutStore((s) => s.resetLayout);

  return (
    <div className="w-full font-onest">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">
            Good morning, User
          </h1>
          <p className="text-navy text-[15px] mt-0.5">
            {isEditing
              ? "Drag widgets to rearrange your dashboard."
              : "Here's what's happening with your finances today."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => resetLayout()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-navy text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors"
              >
                <Check className="w-4 h-4" />
                Done
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-navy text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <LayoutGrid className="w-4 h-4" />
                Customize
              </button>
              <Link
                href="/dashboard/invoices/templates"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Invoice
              </Link>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-navy/15 bg-[#e8ebf2] px-4 py-3 text-sm text-navy">
          <LayoutGrid className="w-4 h-4 shrink-0 text-navy/70" />
          <p className="flex-1 min-w-0">
            <span className="font-semibold">Customize mode is on.</span>{" "}
            Drag the handle on each widget to move it. Layout is kept in app memory for this session.
          </p>
          <Hand className="w-7 h-7 shrink-0 text-navy/70" />
        </div>
      )}

      <DashboardGrid />
    </div>
  );
}
