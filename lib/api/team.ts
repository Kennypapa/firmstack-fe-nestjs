import { apiRequest } from './client';
import type { TeamMember } from './types';

export function listTeam() {
  return apiRequest<TeamMember[]>('/team');
}

export function inviteMember(body: { email: string; role: 'Admin' | 'Member' }) {
  return apiRequest<TeamMember>('/team/invite', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function updateRole(id: string, role: 'Admin' | 'Member') {
  return apiRequest<TeamMember>(`/team/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
}

export function resendInvite(id: string) {
  return apiRequest<{ id: string; resent: boolean }>(
    `/team/${id}/resend-invite`,
    { method: 'POST' },
  );
}

export function removeMember(id: string) {
  return apiRequest<{ id: string; removed: boolean }>(`/team/${id}`, {
    method: 'DELETE',
  });
}
