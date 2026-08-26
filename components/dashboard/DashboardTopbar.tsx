"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useAuthStore } from "@/stores/auth";

interface DashboardTopbarProps {
  onMobileMenuClick: () => void;
}

export function DashboardTopbar({ onMobileMenuClick }: DashboardTopbarProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "User";
  const initials =
    displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 h-16 shrink-0 isolate">
      {/* Glass layer — pointer-events-none so it never blocks the sidebar */}
      <div
        className="absolute inset-0 -z-10 border-b border-white/50 bg-white/65 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/55 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_rgba(34,46,77,0.04)] pointer-events-none"
        aria-hidden
      />

      <div className="relative h-full flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 -ml-1 rounded-lg text-muted-foreground hover:bg-white/70 hover:text-navy transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-56 lg:w-72 pl-9 pr-4 py-2 rounded-xl border border-white/60 bg-white/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy/10 focus:border-navy/30 focus:bg-white/80 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="sm:hidden p-2 rounded-lg text-muted-foreground hover:bg-white/70 hover:text-navy transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 rounded-lg text-muted-foreground hover:bg-white/70 hover:text-navy transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white/80" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 pl-2 pr-1 py-1.5 rounded-xl hover:bg-white/70 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                <span className="text-xs font-bold text-navy">{initials}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-navy leading-tight">{displayName}</p>
                <p className="text-[11px] text-muted-foreground">{user?.email}</p>
              </div>
              <ChevronDown
                className={`hidden sm:block w-4 h-4 text-muted-foreground transition-transform ${
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
                <div className="absolute right-0 top-full mt-1 py-1 w-48 rounded-xl shadow-lg border border-white/60 bg-white/90 backdrop-blur-xl z-40">
                  <a
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-navy hover:bg-white/80 transition-colors"
                  >
                    Profile
                  </a>
                  <a
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-navy hover:bg-white/80 transition-colors"
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-100/80 my-1" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors"
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
