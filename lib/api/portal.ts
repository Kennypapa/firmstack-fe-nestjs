import { apiRequest } from './client';

export function portalLogin(body: { email: string; password: string }) {
  return apiRequest<{ accessToken: string; user: { email: string } }>(
    '/portal/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(body),
      auth: false,
      workspace: false,
    },
  );
}

export function getPortalMe() {
  return apiRequest<{ greeting: string; links: { label: string; path: string }[]; workspace?: string }>(
    '/portal/me',
  );
}

export function getPortalProfile() {
  return apiRequest<{
    fullName: string;
    email: string;
    department: string;
    role: string;
  }>('/portal/profile');
}

export function clockIn() {
  return apiRequest('/portal/time-entries/clock-in', { method: 'POST' });
}

export function clockOut() {
  return apiRequest('/portal/time-entries/clock-out', { method: 'POST' });
}

export function getTodayClock() {
  return apiRequest<{
    clockedIn: boolean;
    clockInTime?: string;
    clockOutTime?: string;
  }>('/portal/time-entries/today');
}

export function submitLeave(body: {
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
}) {
  return apiRequest('/portal/leave-requests', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function listPayslips() {
  return apiRequest<
    { id: string; month: string; year: number; downloadUrl: string | null }[]
  >('/portal/payslips');
}
