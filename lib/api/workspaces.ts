import { apiRequest } from './client';

export function completeOnboarding(body: {
  industry?: string;
  size?: string;
  planId: 'FREE' | 'PRO' | 'ENTERPRISE';
  employee?: { name: string; email: string; role: 'Admin' | 'Member' };
}) {
  return apiRequest('/onboarding/complete', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function getSettings() {
  return apiRequest<{
    companyName: string;
    companyEmail: string | null;
    currency: string;
    timezone: string;
  }>('/workspace/settings');
}

export function updateSettings(body: {
  companyName: string;
  companyEmail?: string;
  currency?: string;
  timezone?: string;
}) {
  return apiRequest('/workspace/settings', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function getNotifications() {
  return apiRequest<Record<string, boolean>>('/workspace/notifications');
}

export function updateNotifications(body: Record<string, boolean>) {
  return apiRequest('/workspace/notifications', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function getBilling() {
  return apiRequest('/billing');
}
