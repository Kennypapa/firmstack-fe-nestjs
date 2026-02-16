import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] font-onest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Gradient blob background – modern SaaS style (no stock image) */}
            <div className="relative max-w-xl mx-auto">
              <div
                className="absolute -inset-4 rounded-3xl opacity-90"
                style={{
                  background: "linear-gradient(135deg, rgba(51, 136, 255, 0.12) 0%, rgba(34, 46, 77, 0.06) 50%, rgba(51, 136, 255, 0.08) 100%)",
                }}
              />
              <div
                className="absolute -top-12 -right-8 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: "rgba(51, 136, 255, 0.25)" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-56 h-56 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: "rgba(34, 46, 77, 0.2)" }}
              />
              {/* Browser frame mockup matching dashboard */}
              <div className="relative rounded-2xl bg-white shadow-2xl shadow-navy/10 ring-1 ring-black/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/90">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-[11px] text-muted-foreground font-medium">app.firmstack.com/dashboard</span>
                  </div>
                </div>
                <div className="p-3 space-y-3 bg-gray-50/30">
                  <div>
                    <h3 className="text-sm font-bold text-navy">Dashboard</h3>
                    <p className="text-[10px] text-muted-foreground">Here&apos;s an overview of your finances this month.</p>
                  </div>
                  {/* Four metric cards – same as dashboard */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Total Revenue (This Month)", value: "$42,580", Icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                      { label: "Total Expenses (This Month)", value: "$18,240", Icon: TrendingDown, color: "text-red-600", bg: "bg-red-500/10" },
                      { label: "Net Profit", value: "$24,340", Icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
                      { label: "Total Invoices", value: "28", Icon: FileText, color: "text-navy", bg: "bg-navy/10" },
                    ].map((card) => (
                      <div key={card.label} className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm">
                        <div className={`inline-flex p-1.5 rounded-lg ${card.bg}`}>
                          <card.Icon className={`w-3.5 h-3.5 ${card.color}`} />
                        </div>
                        <p className="mt-2 text-[9px] font-medium text-muted-foreground leading-tight line-clamp-2">{card.label}</p>
                        <p className="mt-0.5 text-xs font-bold text-navy">{card.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Revenue vs Expenses – bar chart with month labels + legend */}
                  <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm">
                    <p className="text-xs font-semibold text-navy mb-2">Revenue vs Expenses</p>
                    <div className="flex items-end gap-1 h-14">
                      {[
                        { month: "Jan", rev: 32, exp: 18 },
                        { month: "Feb", rev: 38, exp: 22 },
                        { month: "Mar", rev: 35, exp: 19 },
                        { month: "Apr", rev: 42, exp: 21 },
                        { month: "May", rev: 45, exp: 24 },
                        { month: "Jun", rev: 43, exp: 18 },
                      ].map((d) => {
                        const maxVal = 45;
                        const revH = (d.rev / maxVal) * 100;
                        const expH = (d.exp / maxVal) * 100;
                        return (
                          <div key={d.month} className="flex-1 flex flex-col items-center gap-0.5">
                            <div className="w-full flex items-end justify-center gap-0.5 h-10">
                              <div className="w-1/2 min-w-[3px] rounded-t bg-primary" style={{ height: `${revH}%` }} />
                              <div className="w-1/2 min-w-[3px] rounded-t bg-red-500" style={{ height: `${expH}%` }} />
                            </div>
                            <span className="text-[8px] font-medium text-muted-foreground">{d.month}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-4 mt-2 justify-center text-[9px]">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-primary" /> Revenue</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-500" /> Expenses</span>
                    </div>
                  </div>
                  {/* Recent Invoices + Recent Expenses tables (no Recent Activity) */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                      <div className="px-2 py-1.5 border-b border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-semibold text-navy">Recent Invoices</p>
                        <span className="text-[9px] text-primary font-medium">View all</span>
                      </div>
                      <table className="w-full text-[9px]">
                        <thead>
                          <tr className="bg-gray-50/80 text-muted-foreground">
                            <th className="px-2 py-1 text-left font-medium">Invoice</th>
                            <th className="px-2 py-1 text-left font-medium">Client</th>
                            <th className="px-2 py-1 text-left font-medium">Amount</th>
                            <th className="px-2 py-1 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-50">
                            <td className="px-2 py-1 font-medium text-navy">INV-028</td>
                            <td className="px-2 py-1 text-muted-foreground">Acme Corp</td>
                            <td className="px-2 py-1 text-navy">$4,200</td>
                            <td className="px-2 py-1"><span className="rounded bg-amber-500/10 text-amber-700 px-1">Pending</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                      <div className="px-2 py-1.5 border-b border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-semibold text-navy">Recent Expenses</p>
                        <span className="text-[9px] text-primary font-medium">View all</span>
                      </div>
                      <table className="w-full text-[9px]">
                        <thead>
                          <tr className="bg-gray-50/80 text-muted-foreground">
                            <th className="px-2 py-1 text-left font-medium">Category</th>
                            <th className="px-2 py-1 text-left font-medium">Amount</th>
                            <th className="px-2 py-1 text-left font-medium">Added by</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-50">
                            <td className="px-2 py-1 font-medium text-navy">Office</td>
                            <td className="px-2 py-1 text-navy">$320</td>
                            <td className="px-2 py-1 text-muted-foreground">You</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-[1.1]">
              Financial control for growing businesses
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Track revenue, expenses, and profit in one place. Get role-based access, activity logs, and clear visibility—so your team stays accountable and your numbers stay clear.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white text-gray-800 font-semibold px-6 py-3.5 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Join with Google
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-6 py-3.5 hover:bg-navy/90 transition-colors shadow-lg shadow-navy/25"
              >
                Start free trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-navy" aria-hidden />
                Secure & multi-tenant
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-navy" aria-hidden />
                Role-based access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
