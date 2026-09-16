"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ArrowRight, Eye, EyeOff, CheckCircle, Check } from "lucide-react";

const passwordRules = [
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One digit", regex: /[0-9]/ },
  { label: "One special character", regex: /[!@#$%^&*]/ },
  { label: "Minimum 8 characters", regex: /.{8,}/ },
];

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reset, setReset] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReset(true);
  };

  if (reset) {
    return (
      <AuthLayout tagline="Your password has been updated. You can now sign in with your new password.">
        <div className="text-center">
          <div className="inline-flex p-5 rounded-2xl bg-emerald-500/[0.08]">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-navy tracking-tight">
            Password updated
          </h1>
          <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Link
            href="/login"
            className="group mt-8 relative w-full flex items-center justify-center gap-2 h-14 fs-btn-navy-shimmer rounded-full text-white font-semibold text-[15px] shadow-lg shadow-navy/25 transition hover:brightness-105 active:scale-[0.98]"
          >
            <span className="relative flex items-center gap-2">
              Go to login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout tagline="Choose a new password. Make it strong and unique.">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          Set new password
        </h1>
        <p className="mt-2 text-muted-foreground text-[15px]">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="reset-password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            className="peer w-full h-14 px-4 pt-5 pb-2 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
            placeholder="New password"
            autoComplete="new-password"
          />
          <label
            htmlFor="reset-password"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              form.password || focusedField === "password"
                ? "top-2 text-[11px] font-semibold tracking-wide uppercase"
                : "top-1/2 -translate-y-1/2 text-[15px]"
            } ${focusedField === "password" ? "text-navy" : "text-muted-foreground"}`}
          >
            New password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors p-0.5"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "password" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
        </div>

        
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            id="reset-confirm"
            value={form.confirmPassword}
            onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
            className="peer w-full h-14 px-4 pt-5 pb-2 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
            placeholder="Confirm password"
            autoComplete="new-password"
          />
          <label
            htmlFor="reset-confirm"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              form.confirmPassword || focusedField === "confirm"
                ? "top-2 text-[11px] font-semibold tracking-wide uppercase"
                : "top-1/2 -translate-y-1/2 text-[15px]"
            } ${focusedField === "confirm" ? "text-navy" : "text-muted-foreground"}`}
          >
            Confirm password
          </label>
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors p-0.5"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "confirm" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
        </div>

        
        <div className="grid grid-cols-5 gap-1.5">
          {passwordRules.map((rule) => {
            const passes = rule.regex.test(form.password);
            return (
              <div
                key={rule.label}
                className={`h-1 rounded-full transition-colors duration-300 ${passes ? "bg-navy" : "bg-gray-200"}`}
                title={rule.label}
              />
            );
          })}
        </div>
        <ul className="space-y-1.5">
          {passwordRules.map((rule) => {
            const passes = rule.regex.test(form.password);
            return (
              <li key={rule.label} className="flex items-center gap-2 text-xs">
                <span
                  className={`flex items-center justify-center w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                    passes ? "bg-navy text-white" : "border border-gray-300 text-transparent"
                  }`}
                >
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                </span>
                <span className={passes ? "text-navy" : "text-muted-foreground"}>
                  {rule.label}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          type="submit"
          className="group relative w-full flex items-center justify-center gap-2 h-14 fs-btn-navy-shimmer rounded-full text-white font-semibold text-[15px] shadow-lg shadow-navy/25 transition hover:brightness-105 active:scale-[0.98]"
        >
          <span className="relative flex items-center gap-2">
            Reset password
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <p className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
          >
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
