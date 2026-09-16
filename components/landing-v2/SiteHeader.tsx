"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FirmstackLogo } from "./ui/FirmstackLogo";

const nav = [
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "AI Invoice", soon: true },
] as const;

function SoonBadge() {
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white" style={{ backgroundColor: "#ff6233" }}>
      Soon
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-white/70 font-onest backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <FirmstackLogo />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            "soon" in item && item.soon ? (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy/55"
                title="AI Invoice — coming soon"
              >
                {item.label}
                <SoonBadge />
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-navy/70 transition hover:text-navy"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/login"
            className="lv2-shimmer-btn rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:brightness-105"
          >
            Login
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/5 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) =>
              "soon" in item && item.soon ? (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy/55"
                >
                  {item.label}
                  <SoonBadge />
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-navy"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/login"
              className="lv2-shimmer-btn rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:brightness-105"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
