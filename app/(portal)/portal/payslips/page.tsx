"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

const mockPayslips = [
  { month: "January", year: 2026 },
  { month: "December", year: 2025 },
  { month: "November", year: 2025 },
  { month: "October", year: 2025 },
];

export default function PortalPayslipsPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <h1 className="text-2xl font-bold text-navy mb-8">Payslips</h1>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {mockPayslips.map((item) => (
            <li
              key={`${item.month}-${item.year}`}
              className="flex items-center justify-between px-6 py-4"
            >
              <span className="font-medium text-navy">
                {item.month} {item.year}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-navy text-navy font-medium px-4 py-2 text-sm hover:bg-navy/5 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
