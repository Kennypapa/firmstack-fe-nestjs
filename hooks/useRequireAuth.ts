'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth/session';
import { useAuthStore } from '@/stores/auth';

export function useRequireAuth() {
  const router = useRouter();
  const { initialized, loadSession, loading } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      if (!getAccessToken()) {
        router.replace('/login');
        return;
      }
      loadSession();
    }
  }, [initialized, loadSession, router]);

  useEffect(() => {
    if (initialized && !getAccessToken()) {
      router.replace('/login');
    }
  }, [initialized, router]);

  return { ready: initialized && !loading && !!getAccessToken() };
}
