"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/auth/FormField";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API integration later; for now redirect to dashboard (full navigation so it always works)
    window.location.href = "/dashboard";
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl sm:text-3xl font-bold text-navy">
        Welcome to Firmstack{" "}
        <span className="inline-block" role="img" aria-label="wave">
          👋
        </span>
      </h1>
      <p className="mt-2 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Create account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <FormField
          label="Email address"
          type="email"
          placeholder="Enter business email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
        />
        <FormField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm font-medium text-primary hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3.5 hover:bg-primary/90 transition-colors"
        >
          Login
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </AuthLayout>
  );
}