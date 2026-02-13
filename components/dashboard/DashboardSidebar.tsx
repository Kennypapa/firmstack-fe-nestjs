"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  BarChart3,
  ClipboardList,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/expenses", label: "Expenses", icon: CreditCard },
  { href: "/dashboard/employees", label: "Employees", icon: Users },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/activity", label: "Activity Logs", icon: ClipboardList },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function DashboardSidebar({ collapsed, onCollapsedChange }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-20 flex flex-col h-screen overflow-hidden text-white transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Beautiful sidebar background */}
      <div className="absolute inset-0 bg-navy" aria-hidden />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(51, 136, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(123, 191, 255, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
        {collapsed ? (
          <Link href="/dashboard" className="flex items-center justify-center w-full shrink-0">
            <Image
              src="/logo-icon.png"
              alt="Firmstack"
              width={36}
              height={36}
              className="h-9 w-9 object-contain brightness-0 invert opacity-95"
            />
          </Link>
        ) : (
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0 min-w-0">
            <Image
              src="/logo.png"
              alt="Firmstack"
              width={140}
              height={40}
              className="h-7 w-auto object-contain object-left brightness-0 invert opacity-95"
            />
          </Link>
        )}
        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 py-3 px-3 space-y-0.5 min-h-0 overflow-y-auto scrollbar-hide">
        {mainNav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive ? "bg-primary text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className={`p-3 border-t border-white/10 space-y-0.5 ${collapsed ? "flex flex-col items-center" : ""}`}>
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          title={collapsed ? "Profile" : undefined}
        >
          <User className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Profile</span>}
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </Link>
      </div>
      </div>
    </aside>
  );
}
