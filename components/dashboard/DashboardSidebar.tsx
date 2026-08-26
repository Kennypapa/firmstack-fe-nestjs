"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const WORKSPACE_KEY = "firmstack_workspace";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, companyOnly: false },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText, companyOnly: false },
  { href: "/dashboard/expenses", label: "Expenses", icon: CreditCard, companyOnly: false },
  { href: "/dashboard/employees", label: "Employees", icon: Users, companyOnly: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, companyOnly: false },
];

function FirmstackLogoWhite({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
        <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
        <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
        <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.4" />
      </svg>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
        <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
        <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
        <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.4" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-white">
        Firm<span className="text-white/60">stack</span>
      </span>
    </div>
  );
}

interface DashboardSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function DashboardSidebar({
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isCompanyUser, setIsCompanyUser] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const workspace = window.sessionStorage.getItem(WORKSPACE_KEY);
    setIsCompanyUser(workspace !== "personal");
  }, []);

  const mainNav = mainNavItems.filter(
    (item) => !item.companyOnly || isCompanyUser
  );

  const sidebarContent = (
    <>
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(51, 136, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(123, 191, 255, 0.08) 0%, transparent 50%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
          <Link href="/dashboard" className="flex items-center shrink-0 min-w-0">
            <FirmstackLogoWhite collapsed={collapsed} />
          </Link>
          {/* Close on mobile, collapse on desktop */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onMobileClose();
              } else {
                onCollapsedChange(!collapsed);
              }
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="hidden lg:block">
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </span>
            <span className="lg:hidden">
              <X className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-3 space-y-0.5 min-h-0 overflow-y-auto scrollbar-hide">
          {mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                } ${collapsed ? "justify-center lg:justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : ""}`} />
                {!collapsed && <span className="font-medium text-[14px]">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-3 border-t border-white/10 space-y-0.5 ${collapsed ? "flex flex-col items-center" : ""}`}>
          <Link
            href="/dashboard/profile"
            onClick={onMobileClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            title={collapsed ? "Profile" : undefined}
          >
            <User className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium text-[14px]">Profile</span>}
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium text-[14px]">Logout</span>}
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 z-50 flex-col h-screen overflow-hidden text-white bg-navy transition-all duration-200 ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 z-50 flex flex-col h-screen w-72 overflow-hidden text-white bg-navy transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
