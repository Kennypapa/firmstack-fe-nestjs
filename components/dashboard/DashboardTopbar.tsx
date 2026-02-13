"use client";

import { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";

export function DashboardTopbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">U</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-navy">User</p>
              <p className="text-xs text-muted-foreground">user@company.com</p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
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
                  className="block px-4 py-2 text-sm text-navy hover:bg-gray-50"
                >
                  Profile
                </a>
                <a
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-navy hover:bg-gray-50"
                >
                  Settings
                </a>
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
