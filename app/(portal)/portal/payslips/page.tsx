"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { listPayslips } from "@/lib/api/portal";

type Payslip = {
  id: string;
  month: string;
  year: number;
  downloadUrl: string | null;
};

export default function PortalPayslipsPage() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPayslips()
      .then(setPayslips)
      .catch(() => setPayslips([]))
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? (
          <p className="px-6 py-8 text-center text-muted-foreground text-sm">
            Loading payslips…
          </p>
        ) : payslips.length === 0 ? (
          <p className="px-6 py-8 text-center text-muted-foreground text-sm">
            No payslips available yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {payslips.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="font-medium text-navy">
                  {item.month} {item.year}
                </span>
                {item.downloadUrl ? (
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-navy text-navy font-medium px-4 py-2 text-sm hover:bg-navy/5 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Not available
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
