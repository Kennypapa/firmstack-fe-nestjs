import {
  clearSession,
  getAccessToken,
  getWorkspaceId,
} from '@/lib/auth/session';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = RequestInit & {
  workspace?: boolean;
  auth?: boolean;
};

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
    'http://localhost:3000/api/v1'
  );
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { workspace = true, auth = true, headers, ...init } = options;
  const reqHeaders = new Headers(headers);

  if (auth) {
    const token = getAccessToken();
    if (token) {
      reqHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  if (workspace) {
    const workspaceId = getWorkspaceId();
    if (workspaceId) {
      reqHeaders.set('X-Workspace-Id', workspaceId);
    }
  }

  if (init.body && !reqHeaders.has('Content-Type')) {
    reqHeaders.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: reqHeaders,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearSession();
    }

    const message =
      (data as { message?: string | string[] })?.message ??
      response.statusText;

    throw new ApiError(
      Array.isArray(message) ? message.join(', ') : String(message),
      response.status,
      data,
    );
  }

  return data as T;
}
