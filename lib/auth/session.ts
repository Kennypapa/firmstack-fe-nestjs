const TOKEN_KEY = 'firmstack_access_token';
const WORKSPACE_KEY = 'firmstack_workspace_id';

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getWorkspaceId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(WORKSPACE_KEY);
}

export function setWorkspaceId(id: string) {
  localStorage.setItem(WORKSPACE_KEY, id);
}

export function clearWorkspaceId() {
  localStorage.removeItem(WORKSPACE_KEY);
}

export function clearSession() {
  clearAccessToken();
  clearWorkspaceId();
}
