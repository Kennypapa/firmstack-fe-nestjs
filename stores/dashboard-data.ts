import { create } from 'zustand';
import * as dashboardApi from '@/lib/api/dashboard';
import { formatCurrency } from '@/lib/format';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
} from 'lucide-react';

type MetricCard = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: typeof TrendingUp;
  color: string;
  bg: string;
  changeBg: string;
};

interface DashboardDataState {
  summaryCards: MetricCard[];
  chartData: { name: string; revenue: number; expenses: number }[];
  profitData: { name: string; profit: number }[];
  recentActivity: {
    user: string;
    action: string;
    time: string;
    type: string;
  }[];
  loading: boolean;
  loaded: boolean;
  load: () => Promise<void>;
}

const defaultCards: MetricCard[] = [
  {
    label: 'Total Revenue',
    value: '$0',
    change: '0%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    changeBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Total Expenses',
    value: '$0',
    change: '0%',
    trend: 'up',
    icon: TrendingDown,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    changeBg: 'bg-amber-50 text-amber-700',
  },
  {
    label: 'Net Profit',
    value: '$0',
    change: '0%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-navy',
    bg: 'bg-navy/[0.06]',
    changeBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Total Invoices',
    value: '0',
    change: '0 pending',
    trend: 'neutral',
    icon: FileText,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    changeBg: 'bg-violet-50 text-violet-700',
  },
];

export const useDashboardDataStore = create<DashboardDataState>((set, get) => ({
  summaryCards: defaultCards,
  chartData: [],
  profitData: [],
  recentActivity: [],
  loading: false,
  loaded: false,

  load: async () => {
    if (get().loading) return;
    set({ loading: true });

    try {
      const [summary, charts, activity] = await Promise.all([
        dashboardApi.getSummary(),
        dashboardApi.getCharts('6m'),
        dashboardApi.getActivity(5),
      ]);

      set({
        summaryCards: [
          {
            ...defaultCards[0],
            value: formatCurrency(summary.totalRevenue),
            change: summary.totalRevenueChange,
          },
          {
            ...defaultCards[1],
            value: formatCurrency(summary.totalExpenses),
            change: summary.totalExpensesChange,
          },
          {
            ...defaultCards[2],
            value: formatCurrency(summary.netProfit),
            change: summary.netProfitChange,
          },
          {
            ...defaultCards[3],
            value: String(summary.totalInvoices),
            change: `${summary.pendingInvoices} pending`,
          },
        ],
        chartData: charts.revenueVsExpenses.map((p) => ({
          name: p.name,
          revenue: p.revenue ?? 0,
          expenses: p.expenses ?? 0,
        })),
        profitData: charts.profitTrend.map((p) => ({
          name: p.name,
          profit: p.profit ?? 0,
        })),
        recentActivity: activity,
        loaded: true,
        loading: false,
      });
    } catch {
      set({ loading: false, loaded: true });
    }
  },
}));

export type { MetricCard };
