import { apiRequest } from './client';
import type { InvoiceListItem } from './types';

export function listInvoices(params?: {
  search?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}) {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.status) query.set('status', params.status);
  if (params?.fromDate) query.set('fromDate', params.fromDate);
  if (params?.toDate) query.set('toDate', params.toDate);

  const qs = query.toString();
  return apiRequest<{
    data: InvoiceListItem[];
    aggregates: {
      totalInvoiced: number;
      paid: number;
      pending: number;
      overdue: number;
    };
  }>(`/invoices${qs ? `?${qs}` : ''}`);
}

export function getInvoice(id: string) {
  return apiRequest<InvoiceListItem & { lineItems: unknown[]; activity: unknown[] }>(
    `/invoices/${id}`,
  );
}

export function deleteInvoice(id: string) {
  return apiRequest<{ id: string }>(`/invoices/${id}`, { method: 'DELETE' });
}

export function sendInvoice(id: string) {
  return apiRequest(`/invoices/${id}/send`, { method: 'POST' });
}

export function getPublicLink(id: string) {
  return apiRequest<{ url: string; token: string }>(
    `/invoices/${id}/public-link`,
  );
}

export function getPdfUrl(id: string) {
  const base =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
    'http://localhost:3000/api/v1';
  return `${base}/invoices/${id}/pdf`;
}

export function createInvoice(body: Record<string, unknown>) {
  return apiRequest<InvoiceListItem>('/invoices', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function updateInvoice(id: string, body: Record<string, unknown>) {
  return apiRequest<InvoiceListItem>(`/invoices/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function resendInvoice(id: string) {
  return apiRequest(`/invoices/${id}/resend`, { method: 'POST' });
}
