"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PortalTopBar } from "@/components/portal/PortalTopBar";
import { getAccessToken } from "@/lib/auth/session";
import { useAuthStore } from "@/stores/auth";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/portal/login";
  const { initialized, loadSession, loading } = useAuthStore();
  const [ready, setReady] = useState(isLogin);

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }

    if (!getAccessToken()) {
      router.replace("/portal/login");
      return;
    }

    if (!initialized) {
      loadSession().finally(() => setReady(true));
      return;
    }

    setReady(true);
  }, [isLogin, initialized, loadSession, router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-onest">
      {!isLogin && ready && !loading && <PortalTopBar />}
      <main className={!isLogin ? "pt-14 min-h-screen" : ""}>
        {ready && !loading ? children : null}
      </main>
    </div>
  );
}
