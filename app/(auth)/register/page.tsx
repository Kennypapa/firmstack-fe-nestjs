"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ArrowRight, Eye, EyeOff, User, Briefcase, Check } from "lucide-react";

const WORKSPACE_KEY = "firmstack_workspace";

const passwordRules = [
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One digit", regex: /[0-9]/ },
  { label: "One special character", regex: /[!@#$%^&*]/ },
  { label: "Minimum 8 characters", regex: /.{8,}/ },
];

type WorkspaceType = "personal" | "company";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>("personal");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(WORKSPACE_KEY, workspaceType);
    }
    if (workspaceType === "personal") {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  const tagline =
    workspaceType === "company"
      ? "Create your company, invite your team, and take control of your finances—in one place."
      : "Track invoices, expenses, and cash flow in one place—built for individuals.";

  return (
    <AuthLayout tagline={tagline}>
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-muted-foreground text-[15px]">
          Get started for free — no credit card required
        </p>
      </div>

      {/* Social login */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#222e4d" aria-hidden>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Workspace type toggle */}
        <div>
          <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            I want to use Firmstack as
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["personal", "company"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setWorkspaceType(type)}
                className={`relative flex items-center justify-center gap-2.5 rounded-2xl border-2 py-3.5 font-medium transition-all ${
                  workspaceType === type
                    ? "border-navy bg-navy/[0.04] text-navy shadow-[0_0_0_4px_rgba(34,46,77,0.08)]"
                    : "border-gray-200 text-muted-foreground hover:border-gray-300"
                }`}
              >
                {type === "personal" ? (
                  <User className="w-[18px] h-[18px]" />
                ) : (
                  <Briefcase className="w-[18px] h-[18px]" />
                )}
                {type === "personal" ? "Personal" : "Company"}
                {workspaceType === type && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-navy flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Company name — floating label */}
        {workspaceType === "company" && (
          <div className="relative">
            <input
              type="text"
              id="reg-company"
              value={form.companyName}
              onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
              className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
              placeholder="Company name"
            />
            <label
              htmlFor="reg-company"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                form.companyName || focusedField === "company"
                  ? "top-2 text-[11px] font-semibold tracking-wide uppercase"
                  : "top-1/2 -translate-y-1/2 text-[15px]"
              } ${focusedField === "company" ? "text-navy" : "text-muted-foreground"}`}
            >
              Company name
            </label>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "company" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
          </div>
        )}

        {/* Email — floating label */}
        <div className="relative">
          <input
            type="email"
            id="reg-email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
            placeholder="Email"
            autoComplete="email"
          />
          <label
            htmlFor="reg-email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              form.email || focusedField === "email"
                ? "top-2 text-[11px] font-semibold tracking-wide uppercase"
                : "top-1/2 -translate-y-1/2 text-[15px]"
            } ${focusedField === "email" ? "text-navy" : "text-muted-foreground"}`}
          >
            {workspaceType === "company" ? "Business email address" : "Email address"}
          </label>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "email" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
        </div>

        {/* Password — floating label */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="reg-password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            className="peer w-full h-14 px-4 pt-5 pb-2 pr-12 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
            placeholder="Password"
            autoComplete="new-password"
          />
          <label
            htmlFor="reg-password"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              form.password || focusedField === "password"
                ? "top-2 text-[11px] font-semibold tracking-wide uppercase"
                : "top-1/2 -translate-y-1/2 text-[15px]"
            } ${focusedField === "password" ? "text-navy" : "text-muted-foreground"}`}
          >
            Password
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

        {/* Password strength indicators */}
        <div className="grid grid-cols-5 gap-1.5">
          {passwordRules.map((rule) => {
            const passes = rule.regex.test(form.password);
            return (
              <div
                key={rule.label}
                className={`h-1 rounded-full transition-colors duration-300 ${
                  passes ? "bg-navy" : "bg-gray-200"
                }`}
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
                    passes
                      ? "bg-navy text-white"
                      : "border border-gray-300 text-transparent"
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

        {/* Terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group pt-1">
          <div className="relative w-5 h-5 mt-0.5">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white peer-checked:bg-navy peer-checked:border-navy transition-all group-hover:border-gray-400" />
            <svg
              className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
            >
              <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">
            I agree to the{" "}
            <Link href="#" className="font-medium text-navy hover:text-primary transition-colors">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-medium text-navy hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="group relative w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-navy text-white font-semibold text-[15px] overflow-hidden transition-all hover:shadow-lg hover:shadow-navy/20 active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            Create account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-navy hover:text-primary transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
