"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Plus,
  GripVertical,
  Pin,
  Settings,
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
import { useDashboardLayoutStore } from "@/stores/dashboard-layout";
import { useDashboardDataStore, type MetricCard } from "@/stores/dashboard-data";
import { formatRelativeTime } from "@/lib/format";

const activityColors: Record<string, string> = {
  invoice: "bg-navy",
  expense: "bg-amber-500",
  settings: "bg-gray-400",
  payment: "bg-emerald-500",
  team: "bg-violet-500",
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 text-sm">
      <p className="font-medium text-navy mb-1.5">{label}</p>
      {payload.map((item: any) => (
        <div key={item.name} className="flex items-center gap-2 text-[13px]">
          <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
          <span className="text-muted-foreground">{item.name}:</span>
          <span className="font-medium text-navy">
            ${(item.value / 1000).toFixed(1)}k
          </span>
        </div>
      ))}
    </div>
  );
}

function WidgetShell({
  children,
  className = "",
  compactHandle = false,
  pinned = false,
}: {
  children: React.ReactNode;
  className?: string;
  compactHandle?: boolean;
  pinned?: boolean;
}) {
  const isEditing = useDashboardLayoutStore((s) => s.isEditing);

  return (
    <div className="relative h-full">
      {pinned && (
        <div
          className="absolute -top-2.5 left-1/2 z-20 -translate-x-1/2 pointer-events-none"
          aria-hidden
        >
          <Pin
            className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] rotate-[18deg]"
            strokeWidth={1.5}
          />
        </div>
      )}
      <div
        className={`relative h-full rounded-2xl border border-gray-100 bg-white overflow-hidden flex flex-col ${
          pinned ? "rounded-tr-none" : ""
        } ${isEditing ? "shadow-sm" : ""} ${className}`}
      >
        {pinned && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 z-10 border-solid border-t-0 border-l-0 border-r-[28px] border-b-[28px] border-r-[#f0f2f6] border-b-[#d4d9e2]"
            style={{
              filter: "drop-shadow(-2px 2px 2px rgba(34, 46, 77, 0.12))",
            }}
          />
        )}
        {isEditing && (
          <div
            className={`drag-handle cursor-grab active:cursor-grabbing flex items-center gap-1.5 bg-white border-b border-gray-100 text-[11px] font-medium text-muted-foreground shrink-0 ${
              compactHandle ? "px-2 py-1 justify-center" : "px-3 py-1.5"
            }`}
          >
            <GripVertical className="w-3.5 h-3.5" />
            {!compactHandle && "Drag to move"}
          </div>
        )}
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

type MetricCardType = MetricCard;

function MetricCardWidget({ card }: { card: MetricCardType }) {
  return (
    <WidgetShell compactHandle>
      <div className="p-4 sm:p-5 h-full flex flex-col justify-between hover:shadow-md hover:shadow-gray-100 transition-all">
        <div className="flex items-start justify-between gap-2">
          <div className={`p-2 rounded-xl ${card.bg}`}>
            <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
          </div>
          <span
            className={`inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ${card.changeBg}`}
          >
            {card.trend === "up" && <ArrowUpRight className="w-3 h-3" />}
            {card.change}
          </span>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            {card.label}
          </p>
          <p className="mt-0.5 text-xl sm:text-2xl font-bold text-navy tracking-tight">
            {card.value}
          </p>
        </div>
      </div>
    </WidgetShell>
  );
}

export function TotalRevenueWidget() {
  const card = useDashboardDataStore((s) => s.summaryCards[0]);
  return <MetricCardWidget card={card} />;
}

export function TotalExpensesWidget() {
  const card = useDashboardDataStore((s) => s.summaryCards[1]);
  return <MetricCardWidget card={card} />;
}

export function NetProfitWidget() {
  const card = useDashboardDataStore((s) => s.summaryCards[2]);
  return <MetricCardWidget card={card} />;
}

export function TotalInvoicesWidget() {
  const card = useDashboardDataStore((s) => s.summaryCards[3]);
  return <MetricCardWidget card={card} />;
}

export function RevenueChartWidget() {
  const chartData = useDashboardDataStore((s) => s.chartData);
  const [chartView, setChartView] = useState<"bar" | "area">("bar");

  return (
    <WidgetShell>
      <div className="p-4 sm:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h2 className="text-[15px] sm:text-base font-semibold text-navy">
              Revenue vs Expenses
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Last 6 months</p>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              type="button"
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
              type="button"
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
        <div className="flex-1 min-h-[180px] w-full">
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
                <Bar dataKey="revenue" fill="#222e4d" name="Revenue" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="expenses" fill="#f59e0b" name="Expenses" radius={[6, 6, 0, 0]} maxBarSize={32} />
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
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#222e4d" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} fill="url(#expGrad)" name="Expenses" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-100 shrink-0">
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
    </WidgetShell>
  );
}

export function ProfitTrendWidget() {
  const profitData = useDashboardDataStore((s) => s.profitData);
  const netProfit = useDashboardDataStore((s) => s.summaryCards[2]?.value ?? "$0");
  const netChange = useDashboardDataStore((s) => s.summaryCards[2]?.change ?? "0%");

  return (
    <WidgetShell>
      <div className="p-4 sm:p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[15px] font-semibold text-navy">Profit Trend</h3>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            {netChange}
          </span>
        </div>
        <p className="text-2xl font-bold text-navy tracking-tight">{netProfit}</p>
        <p className="text-xs text-muted-foreground mb-2">This month</p>
        <div className="flex-1 min-h-[80px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitData}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#profitGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetShell>
  );
}

export function QuickActionsWidget() {
  const actions = [
    {
      href: "/dashboard/invoices/templates",
      label: "New Invoice",
      icon: FileText,
      iconBg: "bg-navy",
      iconColor: "text-white",
      primary: true,
    },
    {
      href: "/dashboard/expenses",
      label: "Add Expense",
      icon: DollarSign,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      primary: false,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      iconBg: "bg-gray-100",
      iconColor: "text-navy",
      primary: false,
    },
    {
      href: "/dashboard/employees",
      label: "Add Member",
      icon: Plus,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      primary: false,
    },
  ] as const;

  return (
    <WidgetShell compactHandle>
      <div className="p-3 sm:p-4 h-full flex flex-col">
        <h3 className="text-sm font-semibold text-navy mb-2 shrink-0">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 content-start">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-[11px] font-semibold text-center leading-tight transition-all ${
                action.primary
                  ? "bg-navy text-white shadow-sm shadow-navy/20 hover:bg-navy/90"
                  : "bg-[#f0f2f6] text-navy hover:border-navy/15 hover:bg-[#e8ebf2]"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  action.primary ? "bg-white/15" : action.iconBg
                }`}
              >
                <action.icon
                  className={`w-3.5 h-3.5 ${action.primary ? "text-white" : action.iconColor}`}
                />
              </span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

export function RecentActivityWidget() {
  const recentActivity = useDashboardDataStore((s) => s.recentActivity);

  return (
    <WidgetShell pinned>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-navy">Recent Activity</h2>
          <span className="text-xs font-medium text-muted-foreground">Latest</span>
        </div>
        <ul className="space-y-5">
          {recentActivity.length === 0 && (
            <li className="text-sm text-muted-foreground">No activity yet.</li>
          )}
          {recentActivity.map((item, i) => (
            <li key={i} className="flex gap-3">
              <div className="relative mt-1.5">
                <div className={`w-2 h-2 rounded-full ${activityColors[item.type] || "bg-gray-400"}`} />
                {i < recentActivity.length - 1 && (
                  <div className="absolute top-2.5 left-[3px] w-px h-[calc(100%+12px)] bg-gray-100" />
                )}
              </div>
              <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1a2338] leading-tight">
                    {item.user}
                  </p>
                  <p className="text-xs font-normal text-gray-600 mt-0.5 leading-snug">
                    {item.action}
                  </p>
                </div>
                <p className="shrink-0 text-[11px] font-medium text-gray-500 flex items-center gap-1 pt-0.5">
                  <Clock className="w-3 h-3" />
                  {formatRelativeTime(item.time)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WidgetShell>
  );
}

export function RecentInvoicesWidget() {
  return (
    <WidgetShell pinned>
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
        <p className="text-sm text-muted-foreground py-4">Open invoices to see recent activity here.</p>
      </div>
    </WidgetShell>
  );
}

export function RecentExpensesWidget() {
  return (
    <WidgetShell pinned>
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
        <p className="text-sm text-muted-foreground py-4">Open expenses to see recent activity here.</p>
      </div>
    </WidgetShell>
  );
}
