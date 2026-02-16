"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/auth/FormField";
import { Lock, ArrowRight, CheckCircle } from "lucide-react";

const passwordRules = [
  "One upper case letter [A-Z]",
  "One lower case letter [a-z]",
  "One digit [0-9]",
  "One special character [!@#$%^&*]",
  "Minimum 8 characters",
];

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reset, setReset] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API integration later (use token from URL query)
    setReset(true);
  };

  if (reset) {
    return (
      <AuthLayout tagline="Your password has been updated. You can now sign in with your new password.">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full bg-navy/10">
            <CheckCircle className="w-12 h-12 text-navy" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-navy">Password reset</h1>
          <p className="mt-2 text-muted-foreground">
            Your password has been updated successfully. You can now sign in with your new password.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90 transition-colors"
          >
            Go to login
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout tagline="Choose a new password. Make it strong and unique.">
      <h1 className="text-2xl sm:text-3xl font-bold text-navy">
        Set new password
      </h1>
      <p className="mt-2 text-muted-foreground">
        Enter your new password below. You’ll use it to sign in from now on.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField
          label="New password"
          type={showPassword ? "text" : "password"}
          placeholder="Minimum 8 characters"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          icon={<Lock className="w-5 h-5" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm font-medium text-navy hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />
        <FormField
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm((p) => ({ ...p, confirmPassword: e.target.value }))
          }
          icon={<Lock className="w-5 h-5" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-sm font-medium text-navy hover:underline"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          }
        />
        <ul className="text-xs text-muted-foreground space-y-1">
          {passwordRules.map((rule) => (
            <li key={rule}>• {rule}</li>
          ))}
        </ul>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90 transition-colors"
        >
          Reset password
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center">
          <Link href="/login" className="text-sm font-medium text-navy hover:underline hover:text-navy/90">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
