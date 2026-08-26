import { create } from 'zustand';
import * as authApi from '@/lib/api/auth';
import {
  clearSession,
  setAccessToken,
  setWorkspaceId,
} from '@/lib/auth/session';
import type { AuthMeResponse, UserProfile } from '@/lib/api/types';

interface AuthState {
  user: UserProfile | null;
  workspaces: AuthMeResponse['workspaces'];
  loading: boolean;
  initialized: boolean;
  setSession: (token: string) => Promise<void>;
  loadSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  workspaces: [],
  loading: false,
  initialized: false,

  setSession: async (token: string) => {
    setAccessToken(token);
    const me = await authApi.getMe();
    if (me.workspaces[0]) {
      setWorkspaceId(me.workspaces[0].id);
    }
    set({
      user: me,
      workspaces: me.workspaces,
      initialized: true,
    });
  },

  loadSession: async () => {
    set({ loading: true });
    try {
      const me = await authApi.getMe();
      if (me.workspaces[0] && !localStorage.getItem('firmstack_workspace_id')) {
        setWorkspaceId(me.workspaces[0].id);
      }
      set({
        user: me,
        workspaces: me.workspaces,
        initialized: true,
        loading: false,
      });
    } catch {
      clearSession();
      set({
        user: null,
        workspaces: [],
        initialized: true,
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore */
    }
    clearSession();
    set({ user: null, workspaces: [], initialized: true });
  },
}));
