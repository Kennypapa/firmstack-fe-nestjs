"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "#resources" },
];


function FirmstackLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Icon mark — layered blocks representing a "stack" */}
      <svg 
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Bottom layer */}
        <rect x="2" y="22" width="28" height="6" rx="1.5" fill="#222e4d" />
        {/* Middle layer */}
        <rect x="4" y="14" width="24" height="6" rx="1.5" fill="#3388ff" />
        {/* Top layer */}
        <rect x="6" y="6" width="20" height="6" rx="1.5" fill="#7bbfff" />
        {/* Accent bar on top layer */}
        <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.6" />
      </svg>
      {/* Wordmark */}
      <span className="text-xl font-bold tracking-tight text-navy">
        Firm<span className="text-primary">stack</span>
      </span>
    </div>
  );
}


export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 font-onest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center shrink-0">
            <FirmstackLogo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center justify-center rounded-lg border-2 border-navy/20 text-navy text-sm font-semibold px-5 py-2.5 hover:bg-navy/5 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-navy text-white text-sm font-semibold px-5 py-2.5 hover:bg-navy/90 transition-colors"
            >
              Sign In
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 text-navy"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-navy font-medium hover:text-primary"
                onClick={() => setMobileOpen(false)} 
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg border-2 border-navy/20 text-navy text-sm font-semibold px-5 py-2.5 mt-2 w-fit hover:bg-navy/5"
              onClick={() => setMobileOpen(false)}
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-navy text-white text-sm font-semibold px-5 py-2.5 mt-2 w-fit hover:bg-navy/90"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
