"use client";

import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 72 : 256; // w-64 = 16rem = 256px

  return (
    <div className="min-h-screen flex bg-white font-onest">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <div
        className="flex-1 flex flex-col min-w-0 transition-[margin] duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <DashboardTopbar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
