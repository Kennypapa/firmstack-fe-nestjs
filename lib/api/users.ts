import { apiRequest } from './client';
import type { UserProfile } from './types';

export function markDashboardTourSeen() {
  return apiRequest<UserProfile & { phone?: string | null }>(
    '/users/me/dashboard-tour',
    {
      method: 'PATCH',
      workspace: false,
    },
  );
}
