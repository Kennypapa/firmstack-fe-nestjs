"use client";

import { usePathname } from "next/navigation";
import { PortalTopBar } from "@/components/portal/PortalTopBar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/portal/login";

  return (
    <div className="min-h-screen bg-[#f8fafc] font-onest">
      {!isLogin && <PortalTopBar />}
      <main className={!isLogin ? "pt-14 min-h-screen" : ""}>
        {children}
      </main>
    </div>
  );
}
