"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { LayoutGrid, Plus, RotateCcw, Check, Hand } from "lucide-react";
import { useDashboardLayoutStore } from "@/stores/dashboard-layout";
import { DashboardTour } from "@/components/dashboard/DashboardTour";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

const DashboardGrid = dynamic(
  () =>
    import("@/components/dashboard/DashboardGrid").then((m) => ({
      default: m.DashboardGrid,
    })),
  {
    ssr: false,
    loading: () => <DashboardSkeleton />,
  }
);

export default function DashboardPage() {
  const isEditing = useDashboardLayoutStore((s) => s.isEditing);
  const setEditing = useDashboardLayoutStore((s) => s.setEditing);
  const resetLayout = useDashboardLayoutStore((s) => s.resetLayout);

  return (
    <div className="w-full font-onest">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold tracking-tight text-navy sm:text-lg">
          Here&apos;s an overview of what&apos;s happening with your account.
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => resetLayout()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
            >
              <Check className="h-4 w-4" />
              Done
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              id="tour-customize"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gray-50"
            >
              <LayoutGrid className="h-4 w-4" />
              Customize
            </button>
            <Link
              id="tour-new-invoice"
              href="/dashboard/invoices/templates"
              className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
            >
              <Plus className="h-4 w-4" />
              New Invoice
            </Link>
          </>
        )}
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-navy/15 bg-[#e8ebf2] px-4 py-3 text-sm text-navy">
          <LayoutGrid className="h-4 w-4 shrink-0 text-navy/70" />
          <p className="min-w-0 flex-1">
            <span className="font-semibold">Customize mode is on.</span> Drag
            the handle on each widget to move it. Layout is kept in app memory
            for this session.
          </p>
          <Hand className="h-7 w-7 shrink-0 text-navy/70" />
        </div>
      )}

      <DashboardGrid />
      <DashboardTour />
    </div>
  );
}
