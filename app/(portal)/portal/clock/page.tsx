"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clockIn, clockOut, getTodayClock } from "@/lib/api/portal";

export default function PortalClockPage() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const loadStatus = () => {
    getTodayClock()
      .then((data) => {
        setClockedIn(data.clockedIn);
        setClockInTime(data.clockInTime ?? null);
        setClockOutTime(data.clockOutTime ?? null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const formatTime = (iso?: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleToggle = async () => {
    setBusy(true);
    try {
      if (clockedIn) {
        await clockOut();
      } else {
        await clockIn();
      }
      loadStatus();
    } finally {
      setBusy(false);
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
          {loading
            ? "Loading…"
            : clockedIn
              ? `Clocked In at ${formatTime(clockInTime)}`
              : "Not Clocked In"}
        </p>
        <button
          type="button"
          onClick={handleToggle}
          disabled={loading || busy}
          className="mt-8 w-full max-w-xs mx-auto rounded-xl bg-navy text-white font-semibold py-4 text-lg hover:bg-navy/90 transition-colors disabled:opacity-60"
        >
          {clockedIn ? "CLOCK OUT" : "CLOCK IN"}
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-navy mb-4">Today</p>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            Clock In: {formatTime(clockInTime)}
          </p>
          <p className="text-muted-foreground">
            Clock Out: {formatTime(clockOutTime)}
          </p>
        </div>
      </div>
    </div>
  );
}
