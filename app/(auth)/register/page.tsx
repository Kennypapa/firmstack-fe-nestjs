"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/auth/FormField";
import { Mail, Lock, ArrowRight, Building2, User, Briefcase } from "lucide-react";

const WORKSPACE_KEY = "firmstack_workspace";

const passwordRules = [
  "One upper case letter [A-Z]",
  "One lower case letter [a-z]",
  "One digit [0-9]",
  "One special character [!@#$%^&*]",
  "Minimum 8 characters",
];

type WorkspaceType = "personal" | "company";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>("personal");
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
      <h1 className="text-2xl sm:text-3xl font-bold text-navy">
        Create your account
      </h1>
      <p className="mt-2 text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-navy font-medium hover:underline hover:text-navy/90">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            I want to use Firmstack as
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setWorkspaceType("personal")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 py-3 font-medium transition-colors ${
                workspaceType === "personal"
                  ? "border-navy bg-navy/5 text-navy"
                  : "border-gray-200 text-muted-foreground hover:border-gray-300"
              }`}
            >
              <User className="w-5 h-5" />
              Personal
            </button>
            <button
              type="button"
              onClick={() => setWorkspaceType("company")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 py-3 font-medium transition-colors ${
                workspaceType === "company"
                  ? "border-navy bg-navy/5 text-navy"
                  : "border-gray-200 text-muted-foreground hover:border-gray-300"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Company
            </button>
          </div>
        </div>

        {workspaceType === "company" && (
          <FormField
            label="Company name"
            type="text"
            placeholder="Enter your company name"
            value={form.companyName}
            onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
            icon={<Building2 className="w-5 h-5" />}
          />
        )}
        <FormField
          label="Email address"
          type="email"
          placeholder={workspaceType === "company" ? "Enter business email address" : "Enter your email address"}
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          icon={<Mail className="w-5 h-5" />}
        />
        <FormField
          label="Password"
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
        <ul className="text-xs text-muted-foreground space-y-1">
          {passwordRules.map((rule) => (
            <li key={rule}>• {rule}</li>
          ))}
        </ul>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 rounded border-gray-300 text-navy focus:ring-navy"
          />
          <span className="text-sm text-muted-foreground">
            I acknowledge that I have read and agree to the{" "}
            <Link href="#" className="text-navy font-medium hover:underline hover:text-navy/90">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-navy font-medium hover:underline hover:text-navy/90">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90 transition-colors"
        >
          Create account
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </AuthLayout>
  );
}
