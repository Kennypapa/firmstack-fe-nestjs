"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const summaryCards = [
  {
    label: "Total Revenue (This Month)",
    value: "$42,580",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Total Expenses (This Month)",
    value: "$18,240",
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-500/10",
  },
  {
    label: "Net Profit",
    value: "$24,340",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Total Invoices",
    value: "28",
    icon: FileText,
    color: "text-navy",
    bg: "bg-navy/10",
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

const recentActivity = [
  { user: "You", action: "Created invoice #INV-028", time: "2 min ago" },
  { user: "Sarah", action: "Added expense: Office supplies", time: "1 hour ago" },
  { user: "You", action: "Updated company settings", time: "3 hours ago" },
  { user: "Mike", action: "Marked invoice #INV-025 as paid", time: "Yesterday" },
  { user: "You", action: "Invited new team member", time: "2 days ago" },
];

const recentInvoices = [
  { id: "INV-028", client: "Acme Corp", amount: "$4,200", status: "Pending", date: "Today" },
  { id: "INV-027", client: "TechStart Inc", amount: "$2,800", status: "Paid", date: "Yesterday" },
  { id: "INV-026", client: "Global Ltd", amount: "$5,100", status: "Pending", date: "Nov 10" },
  { id: "INV-025", client: "Design Co", amount: "$1,950", status: "Paid", date: "Nov 8" },
];

const recentExpenses = [
  { category: "Office", amount: "$320", by: "You", date: "Today" },
  { category: "Software", amount: "$149", by: "Sarah", date: "Yesterday" },
  { category: "Travel", amount: "$580", by: "Mike", date: "Nov 9" },
  { category: "Marketing", amount: "$420", by: "You", date: "Nov 8" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-muted-foreground mt-0.5">
          Here’s an overview of your finances this month.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className={`inline-flex p-2.5 rounded-xl ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-navy">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy mb-4">
            Revenue vs Expenses
          </h2>
          <div className="h-80 min-h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f4f4f5",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3388ff" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          <ul className="space-y-4">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm text-navy">
                    <span className="font-medium">{item.user}</span> {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy">Recent Invoices</h2>
            <a
              href="/dashboard/invoices"
              className="text-sm font-medium text-navy hover:underline"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 text-left">
                  <th className="px-6 py-3 font-medium text-navy">Invoice</th>
                  <th className="px-6 py-3 font-medium text-navy">Client</th>
                  <th className="px-6 py-3 font-medium text-navy">Amount</th>
                  <th className="px-6 py-3 font-medium text-navy">Status</th>
                  <th className="px-6 py-3 font-medium text-navy">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv) => (
                  <tr key={inv.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-6 py-3 font-medium text-navy">{inv.id}</td>
                    <td className="px-6 py-3 text-muted-foreground">{inv.client}</td>
                    <td className="px-6 py-3 text-navy">{inv.amount}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          inv.status === "Paid"
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "bg-amber-500/10 text-amber-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{inv.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy">Recent Expenses</h2>
            <a
              href="/dashboard/expenses"
              className="text-sm font-medium text-navy hover:underline"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 text-left">
                  <th className="px-6 py-3 font-medium text-navy">Category</th>
                  <th className="px-6 py-3 font-medium text-navy">Amount</th>
                  <th className="px-6 py-3 font-medium text-navy">Added by</th>
                  <th className="px-6 py-3 font-medium text-navy">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((exp, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-6 py-3 font-medium text-navy">{exp.category}</td>
                    <td className="px-6 py-3 text-navy">{exp.amount}</td>
                    <td className="px-6 py-3 text-muted-foreground">{exp.by}</td>
                    <td className="px-6 py-3 text-muted-foreground">{exp.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
