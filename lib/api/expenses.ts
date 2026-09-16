import { apiRequest } from './client';
import type { ExpenseItem } from './types';

export function listExpenses(params?: {
  search?: string;
  category?: string;
}) {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);

  const qs = query.toString();
  return apiRequest<{
    data: ExpenseItem[];
    aggregates: {
      totalThisMonth: number;
      highestCategory: { category: string; amount: number } | null;
      pendingReimbursements: number;
    };
  }>(`/expenses${qs ? `?${qs}` : ''}`);
}

export function createExpense(body: {
  date: string;
  category: string;
  description: string;
  amount: number;
  merchant?: string;
  paymentMethod?: string;
  receiptUrl?: string;
}) {
  return apiRequest<ExpenseItem>('/expenses', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function getExpense(id: string) {
  return apiRequest<ExpenseItem>(`/expenses/${id}`).catch(async () => {
    // Some backends only expose the list endpoint — fall back to it
    const res = await listExpenses();
    const found = res.data.find((exp) => exp.id === id);
    if (!found) {
      throw new Error("Expense not found");
    }
    return found;
  });
}

export function deleteExpense(id: string) {
  return apiRequest<{ id: string }>(`/expenses/${id}`, { method: 'DELETE' });
}

export function approveExpense(id: string) {
  return apiRequest<ExpenseItem>(`/expenses/${id}/approve`, { method: 'POST' });
}

export function rejectExpense(id: string) {
  return apiRequest<ExpenseItem>(`/expenses/${id}/reject`, { method: 'POST' });
}
