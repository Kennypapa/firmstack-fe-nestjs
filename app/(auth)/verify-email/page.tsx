"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <AuthLayout tagline="Your email is verified. You’re all set to get started.">
      <div className="text-center">
        <div className="inline-flex p-4 rounded-full bg-primary/10">
          <Mail className="w-12 h-12 text-primary" />
        </div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-navy">
          Verify your email
        </h1>
        <p className="mt-3 text-muted-foreground">
          We’ve sent a verification link to your email. Click the link to verify your account and complete sign up.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Didn’t receive the email? Check your spam folder or{" "}
          <button type="button" className="text-primary font-medium hover:underline">
            resend link
          </button>
          .
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-xl border-2 border-navy text-navy font-semibold py-3.5 hover:bg-navy hover:text-white transition-colors"
        >
          Go to login
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="mt-6 text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
