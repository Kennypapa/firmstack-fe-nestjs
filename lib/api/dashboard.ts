import { apiRequest } from './client';
import type { DashboardSummary, ChartPoint, ActivityItem } from './types';

export function getSummary() {
  return apiRequest<DashboardSummary>('/dashboard/summary');
}

export function getCharts(period = '6m') {
  return apiRequest<{
    revenueVsExpenses: ChartPoint[];
    profitTrend: ChartPoint[];
  }>(`/dashboard/charts?period=${period}`);
}

export function getActivity(limit = 5) {
  return apiRequest<ActivityItem[]>(`/dashboard/activity?limit=${limit}`);
}
