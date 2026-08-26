"use client";

import { useEffect, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useDashboardDataStore } from "@/stores/dashboard-data";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = useRequireAuth();
  const loadDashboard = useDashboardDataStore((s) => s.load);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (ready) {
      loadDashboard();
    }
  }, [ready, loadDashboard]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f6] text-navy">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f6] font-onest">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Padding (not margin) so the content box never sits under the sidebar */}
      <div
        className={`min-h-screen flex flex-col relative z-0 transition-[padding] duration-200 ${
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"
        }`}
      >
        <DashboardTopbar onMobileMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
