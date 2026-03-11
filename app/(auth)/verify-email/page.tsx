"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Mail, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <AuthLayout tagline="Almost there — just verify your email to complete sign up.">
      <div className="text-center">
        {/* Animated mail icon */}
        <div className="inline-flex p-5 rounded-2xl bg-primary/[0.06] relative">
          <Mail className="w-10 h-10 text-primary" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">1</span>
          </span>
        </div>

        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          Check your inbox
        </h1>
        <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed max-w-sm mx-auto">
          We&apos;ve sent a verification link to your email. Click the link to
          verify your account and complete sign up.
        </p>

        <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              resend link
            </button>
          </p>
        </div>

        <Link
          href="/login"
          className="group mt-8 relative w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-navy text-white font-semibold text-[15px] overflow-hidden transition-all hover:shadow-lg hover:shadow-navy/20 active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            Go to login
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <p className="mt-6 text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/login" className="font-semibold text-navy hover:text-primary transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
