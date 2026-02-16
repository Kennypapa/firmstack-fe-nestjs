"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PortalClockPage() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedInAt, setClockedInAt] = useState<string | null>(null);

  const handleToggle = () => {
    if (clockedIn) {
      setClockedIn(false);
      setClockedInAt(null);
    } else {
      setClockedIn(true);
      setClockedInAt(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
        <p className="text-sm font-medium text-muted-foreground">Current Status</p>
        <p className="mt-2 text-2xl font-bold text-navy">
          {clockedIn ? `Clocked In at ${clockedInAt}` : "Not Clocked In"}
        </p>
        <button
          type="button"
          onClick={handleToggle}
          className="mt-8 w-full max-w-xs mx-auto rounded-xl bg-navy text-white font-semibold py-4 text-lg hover:bg-navy/90 transition-colors"
        >
          {clockedIn ? "CLOCK OUT" : "CLOCK IN"}
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-navy mb-4">Today</p>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            Clock In: {clockedInAt ?? "—"}
          </p>
          <p className="text-muted-foreground">
            Clock Out: —
          </p>
        </div>
      </div>
    </div>
  );
}
