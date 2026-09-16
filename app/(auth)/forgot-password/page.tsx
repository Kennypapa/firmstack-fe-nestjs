"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";

import { forgotPassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to send reset link.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tagline="We'll send you a secure link to reset your password. No stress.">
      {submitted ? (
        <div className="text-center">
          <div className="inline-flex p-5 rounded-2xl bg-primary/[0.06]">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-navy tracking-tight">
            Check your email
          </h1>
          <p className="mt-3 text-[15px] font-medium text-navy">{email}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/login"
            className="group mt-8 relative w-full flex items-center justify-center gap-2 h-14 fs-btn-navy-shimmer rounded-full text-white font-semibold text-[15px] shadow-lg shadow-navy/25 transition hover:brightness-105 active:scale-[0.98]"
          >
            <span className="relative flex items-center gap-2">
              Back to login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
              Forgot password?
            </h1>
            <p className="mt-2 text-muted-foreground text-[15px]">
              No worries — enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            
            <div className="relative">
              <input
                type="email"
                id="forgot-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
                placeholder="Email"
                autoComplete="email"
              />
              <label
                htmlFor="forgot-email"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  email || focusedField === "email"
                    ? "top-2 text-[11px] font-semibold tracking-wide uppercase"
                    : "top-1/2 -translate-y-1/2 text-[15px]"
                } ${focusedField === "email" ? "text-navy" : "text-muted-foreground"}`}
              >
                Email address
              </label>
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${
                  focusedField === "email" ? "w-[calc(100%-2rem)]" : "w-0"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 h-14 fs-btn-navy-shimmer rounded-full text-white font-semibold text-[15px] shadow-lg shadow-navy/25 transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
            >
              <span className="relative flex items-center gap-2">
                {loading ? "Sending..." : "Send reset link"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <p className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}
