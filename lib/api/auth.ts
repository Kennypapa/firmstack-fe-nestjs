import { apiRequest } from './client';
import type {
  AuthMeResponse,
  LoginResponse,
  RegisterResponse,
} from './types';

export function login(body: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    auth: false,
    workspace: false,
  });
}

export function register(body: {
  workspaceType: 'personal' | 'company';
  companyName?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  agreedToTerms: boolean;
}) {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
    auth: false,
    workspace: false,
  });
}

export function logout() {
  return apiRequest<{ message: string }>('/auth/logout', {
    method: 'POST',
    workspace: false,
  });
}

export function getMe() {
  return apiRequest<AuthMeResponse>('/auth/me', { workspace: false });
}

export function forgotPassword(email: string) {
  return apiRequest<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
    auth: false,
    workspace: false,
  });
}

export function resetPassword(body: { token: string; password: string }) {
  return apiRequest<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(body),
    auth: false,
    workspace: false,
  });
}

export function verifyEmail(token: string) {
  return apiRequest<{ message: string }>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
    auth: false,
    workspace: false,
  });
}
