"use client";

import Link from "next/link";
import {
  FileSpreadsheet,
  MessageSquare,
  Cloud,
  BarChart3,
  Database,
  Zap,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    Icon: FileSpreadsheet,
    title: "Export to spreadsheets",
    description: "One-click export so you can analyze or share data in the tools you already use.",
  },
  {
    Icon: Database,
    title: "Sync with your accounting stack",
    description: "Connect to your ledger and keep books in sync without manual re-entry.",
  },
  {
    Icon: MessageSquare,
    title: "Slack and team notifications",
    description: "Get alerts when invoices are paid or expenses need approval.",
  },
  {
    Icon: Zap,
    title: "API for custom workflows",
    description: "Build automations and connect Firmstack to your own systems.",
  },
  {
    Icon: Cloud,
    title: "Bank and payment feeds",
    description: "Bring in transactions and reconcile with your revenue and expenses.",
  },
  {
    Icon: BarChart3,
    title: "Automated reporting",
    description: "Scheduled reports and dashboards that stay in sync with your numbers.",
  },
];

export function Integrations() {
  return (
    <section className="py-16 lg:py-24 bg-navy font-onest" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Integrations
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15]">
              How Firmstack fits your stack
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
              More than a dashboard—Firmstack connects to the tools you use every day. Whether you&apos;re solo or on a team, export, sync, and automate so your finances stay in sync.
            </p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-white/40 text-white font-semibold px-5 py-2.5 hover:bg-white hover:text-navy transition-colors"
            >
              See integrations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <item.Icon className="w-5 h-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-white/70 leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
