"use client";

import { useState } from "react";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";

interface DashboardTopbarProps {
  onMobileMenuClick: () => void;
}

export function DashboardTopbar({ onMobileMenuClick }: DashboardTopbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMobileMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-56 lg:w-72 pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy/10 focus:border-navy transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          type="button"
          className="sm:hidden p-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          type="button"
          className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
              <span className="text-xs font-bold text-navy">U</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-navy leading-tight">User</p>
              <p className="text-[11px] text-muted-foreground">user@company.com</p>
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
                className="fixed inset-0 z-10"
                aria-hidden
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 py-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20">
                <a
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                >
                  Profile
                </a>
                <a
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-navy hover:bg-gray-50 transition-colors"
                >
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1" />
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
