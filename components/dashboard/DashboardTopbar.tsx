"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useDashboardLayoutStore } from "@/stores/dashboard-layout";

interface DashboardTopbarProps {
  onMobileMenuClick: () => void;
}

export function DashboardTopbar({ onMobileMenuClick }: DashboardTopbarProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isEditing = useDashboardLayoutStore((s) => s.isEditing);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const firstName = user?.firstName?.trim() || "Kenny";
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Kenny Smith";
  const email = user?.email || "dev@firmstack.com";
  const initials =
    displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "KS";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 shrink-0 isolate">
      <div
        className="pointer-events-none absolute inset-0 -z-10 border-b border-navy/8 bg-white"
        aria-hidden
      />

      <div className="relative flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuClick}
            className="-ml-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-navy/5 hover:text-navy lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-navy sm:text-xl">
              Welcome {firstName}, <span aria-hidden>🥳</span>
            </h1>
            <p className="mt-0.5 truncate text-sm font-medium text-navy/75 sm:text-[15px]">
              {isEditing
                ? "Drag widgets to rearrange your dashboard."
                : "Here's what's happening with your finances today."}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-navy/5 hover:text-navy"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-8 w-px bg-navy/10 sm:block" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex min-w-[200px] items-center gap-3 rounded-full bg-[#e8f2ff] py-2 pl-2.5 pr-5 transition hover:bg-[#dceaff] sm:min-w-[240px] sm:pl-3 sm:pr-6"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#222e4d] text-xs font-bold text-white">
                {initials}
              </div>
              <div className="hidden min-w-0 flex-1 text-left sm:block">
                <p className="truncate text-sm font-semibold leading-tight text-navy">
                  {displayName}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-navy/60">{email}</p>
              </div>
              <ChevronDown
                className={`ml-auto hidden h-4 w-4 shrink-0 text-navy/45 transition-transform sm:block ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  aria-hidden
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-40 mt-1 w-48 rounded-xl border border-navy/8 bg-white py-1 shadow-lg">
                  <a
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-navy transition-colors hover:bg-navy/5"
                  >
                    Profile
                  </a>
                  <a
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-navy transition-colors hover:bg-navy/5"
                  >
                    Settings
                  </a>
                  <div className="my-1 border-t border-navy/8" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
