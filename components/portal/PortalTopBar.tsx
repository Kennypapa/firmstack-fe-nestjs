"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, User, LogOut } from "lucide-react";

export function PortalTopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 border-b border-gray-100 bg-white font-onest">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 max-w-4xl mx-auto">
        <Link href="/portal" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="FirmStack"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <span className="font-semibold text-navy hidden sm:inline">FirmStack</span>
        </Link>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-navy hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Alex</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy text-sm font-medium">
              A
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
              <Link
                href="/portal/profile"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-gray-50"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="w-4 h-4" />
                My Profile
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-gray-50"
                onClick={() => setDropdownOpen(false)}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
