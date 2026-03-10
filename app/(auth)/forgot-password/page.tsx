"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/auth/FormField";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthLayout tagline="We’ll send you a secure link to reset your password. No stress.">
      <h1 className="text-2xl sm:text-3xl font-bold text-navy">
        Forgot password?
      </h1>
      <p className="mt-2 text-muted-foreground">
        Enter your email and we’ll send you a link to reset your password.
      </p>

      {submitted ? (
        <div className="mt-8 p-6 rounded-2xl bg-navy/5 border border-navy/20">
          <div className="flex items-center gap-3 text-navy">
            <CheckCircle className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-semibold text-navy">Check your email</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                We’ve sent a reset link to <strong>{email}</strong>. Click the link to set a new password.
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline hover:text-navy/90"
          >
            Back to login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <FormField
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5" />}
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90 transition-colors"
          >
            Send reset link
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center">
            <Link href="/login" className="text-sm font-medium text-navy hover:underline hover:text-navy/90">
              Back to login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
