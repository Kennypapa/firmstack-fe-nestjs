"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { submitLeave } from "@/lib/api/portal";
import { ApiError } from "@/lib/api/client";

export default function PortalLeavePage() {
  const [submitted, setSubmitted] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitLeave({
        leaveType,
        fromDate,
        toDate,
        reason,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to submit request.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
          <p className="text-lg font-medium text-navy">
            Your leave request has been submitted.
          </p>
          <Link
            href="/portal"
            className="mt-6 inline-block text-sm font-medium text-navy hover:underline"
          >
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <h1 className="text-2xl font-bold text-navy mb-8">Request Leave</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">
            Leave Type
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
          >
            <option value="">Select type</option>
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none resize-none"
            placeholder="Brief reason for your leave request"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90 transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
