"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  MoreHorizontal,
  Clock,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

/* ─── Mock data ─── */

const summaryCards = [
  {
    label: "Total Revenue",
    value: "$42,580",
    change: "+12.5%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    changeBg: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Total Expenses",
    value: "$18,240",
    change: "+3.2%",
    trend: "up" as const,
    icon: TrendingDown,
    color: "text-amber-600",
    bg: "bg-amber-50",
    changeBg: "bg-amber-50 text-amber-700",
  },
  {
    label: "Net Profit",
    value: "$24,340",
    change: "+18.3%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-navy",
    bg: "bg-navy/[0.06]",
    changeBg: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Total Invoices",
    value: "28",
    change: "4 pending",
    trend: "neutral" as const,
    icon: FileText,
    color: "text-violet-600",
    bg: "bg-violet-50",
    changeBg: "bg-violet-50 text-violet-700",
  },
];

const chartData = [
  { name: "Jan", revenue: 32000, expenses: 18000 },
  { name: "Feb", revenue: 38000, expenses: 22000 },
  { name: "Mar", revenue: 35000, expenses: 19000 },
  { name: "Apr", revenue: 42000, expenses: 21000 },
  { name: "May", revenue: 45000, expenses: 24000 },
  { name: "Jun", revenue: 42580, expenses: 18240 },
];

const profitData = [
  { name: "Jan", profit: 14000 },
  { name: "Feb", profit: 16000 },
  { name: "Mar", profit: 16000 },
  { name: "Apr", profit: 21000 },
  { name: "May", profit: 21000 },
  { name: "Jun", profit: 24340 },
];

const recentActivity = [
  { user: "You", action: "Created invoice #INV-028", time: "2 min ago", type: "invoice" },
  { user: "Sarah", action: "Added expense: Office supplies", time: "1 hour ago", type: "expense" },
  { user: "You", action: "Updated company settings", time: "3 hours ago", type: "settings" },
  { user: "Mike", action: "Marked #INV-025 as paid", time: "Yesterday", type: "payment" },
  { user: "You", action: "Invited new team member", time: "2 days ago", type: "team" },
];

const recentInvoices = [
  { id: "INV-028", client: "Acme Corp", amount: "$4,200", status: "Pending", date: "Today" },
  { id: "INV-027", client: "TechStart Inc", amount: "$2,800", status: "Paid", date: "Yesterday" },
  { id: "INV-026", client: "Global Ltd", amount: "$5,100", status: "Pending", date: "Nov 10" },
  { id: "INV-025", client: "Design Co", amount: "$1,950", status: "Paid", date: "Nov 8" },
];

const recentExpenses = [
  { category: "Office", amount: "$320", by: "You", date: "Today", icon: "O" },
  { category: "Software", amount: "$149", by: "Sarah", date: "Yesterday", icon: "S" },
  { category: "Travel", amount: "$580", by: "Mike", date: "Nov 9", icon: "T" },
  { category: "Marketing", amount: "$420", by: "You", date: "Nov 8", icon: "M" },
];

/* ─── Custom tooltip ─── */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 text-sm">
      <p className="font-medium text-navy mb-1.5">{label}</p>
      {payload.map((item: any) => (
        <div key={item.name} className="flex items-center gap-2 text-[13px]">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: item.color }}
          />
          <span className="text-muted-foreground">{item.name}:</span>
          <span className="font-medium text-navy">
            ${(item.value / 1000).toFixed(1)}k
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Activity dot colors ─── */

const activityColors: Record<string, string> = {
  invoice: "bg-navy",
  expense: "bg-amber-500",
  settings: "bg-gray-400",
  payment: "bg-emerald-500",
  team: "bg-violet-500",
};

/* ─── Page ─── */

export default function DashboardPage() {
  const [chartView, setChartView] = useState<"bar" | "area">("bar");

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">
            Good morning, User
          </h1>
          <p className="text-muted-foreground text-[15px] mt-0.5">
            Here&apos;s what&apos;s happening with your finances today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 hover:shadow-md hover:shadow-gray-100 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-xl ${card.bg}`}>
                <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
              </div>
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${card.changeBg}`}
              >
                {card.trend === "up" && <ArrowUpRight className="w-3 h-3" />}
                {card.change}
              </span>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground font-medium">
              {card.label}
            </p>
            <p className="mt-0.5 text-xl sm:text-2xl font-bold text-navy tracking-tight">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart section */}
      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Revenue vs Expenses chart */}
        <div className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[15px] sm:text-base font-semibold text-navy">
                Revenue vs Expenses
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Last 6 months</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setChartView("bar")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  chartView === "bar"
                    ? "bg-white text-navy shadow-sm"
                    : "text-muted-foreground hover:text-navy"
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartView("area")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  chartView === "area"
                    ? "bg-white text-navy shadow-sm"
                    : "text-muted-foreground hover:text-navy"
                }`}
              >
                Area
              </button>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === "bar" ? (
                <BarChart data={chartData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.02)" }} />
                  <Bar
                    dataKey="revenue"
                    fill="#222e4d"
                    name="Revenue"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#f59e0b"
                    name="Expenses"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              ) : (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#222e4d" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#222e4d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#222e4d"
                    strokeWidth={2}
                    fill="url(#revGrad)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#expGrad)"
                    name="Expenses"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-5 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-navy" />
              <span className="text-xs text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-amber-500" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
          </div>
        </div>

        {/* Profit trend + quick actions */}
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          {/* Profit trend mini chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-semibold text-navy">Profit Trend</h3>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +18.3%
              </span>
            </div>
            <p className="text-2xl font-bold text-navy tracking-tight">$24,340</p>
            <p className="text-xs text-muted-foreground mb-3">This month</p>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#profitGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
            <h3 className="text-[15px] font-semibold text-navy mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/dashboard/invoices/new"
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-navy/20 hover:bg-navy/[0.02] transition-all text-sm font-medium text-navy"
              >
                <FileText className="w-4 h-4 text-navy/60" />
                New Invoice
              </Link>
              <Link
                href="/dashboard/expenses"
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-navy/20 hover:bg-navy/[0.02] transition-all text-sm font-medium text-navy"
              >
                <DollarSign className="w-4 h-4 text-navy/60" />
                Add Expense
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-navy/20 hover:bg-navy/[0.02] transition-all text-sm font-medium text-navy"
              >
                <TrendingUp className="w-4 h-4 text-navy/60" />
                Settings
              </Link>
              <Link
                href="/dashboard/employees"
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-navy/20 hover:bg-navy/[0.02] transition-all text-sm font-medium text-navy"
              >
                <Plus className="w-4 h-4 text-navy/60" />
                Add Member
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Activity + Tables */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-navy">Recent Activity</h2>
            <span className="text-xs font-medium text-muted-foreground">
              Latest
            </span>
          </div>
          <ul className="space-y-3">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="relative mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${activityColors[item.type] || "bg-gray-400"}`} />
                  {i < recentActivity.length - 1 && (
                    <div className="absolute top-2.5 left-[3px] w-px h-[calc(100%+4px)] bg-gray-100" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy leading-snug">
                    <span className="font-semibold">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground/70 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Invoices */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-4 sm:px-5 py-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-navy">Recent Invoices</h2>
            <Link
              href="/dashboard/invoices"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="px-4 sm:px-5 pb-4 space-y-2">
            {recentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy">{inv.client}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {inv.id} &middot; {inv.date}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-sm font-semibold text-navy">{inv.amount}</p>
                  <span
                    className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 ${
                      inv.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-4 sm:px-5 py-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-navy">Recent Expenses</h2>
            <Link
              href="/dashboard/expenses"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="px-4 sm:px-5 pb-4 space-y-2">
            {recentExpenses.map((exp, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-navy/[0.06] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-navy">{exp.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy">{exp.category}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {exp.by} &middot; {exp.date}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-navy shrink-0 ml-3">
                  {exp.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
