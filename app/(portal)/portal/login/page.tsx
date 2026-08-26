"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { portalLogin } from "@/lib/api/portal";
import { useAuthStore } from "@/stores/auth";
import { ApiError } from "@/lib/api/client";

export default function PortalLoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await portalLogin({ email, password });
      await setSession(result.accessToken);
      router.push("/portal");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
      <div className="w-full max-w-[400px]">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="FirmStack"
              width={140}
              height={44}
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-navy text-center">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}
          <p className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm font-medium text-navy hover:underline">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
