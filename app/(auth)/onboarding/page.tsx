"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/auth/FormField";
import {
  Building2,
  UserPlus,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Mail,
  User,
  Check,
} from "lucide-react";

const steps = [
  { id: 1, title: "Company details", icon: Building2 },
  { id: 2, title: "Add team member", icon: UserPlus },
  { id: 3, title: "Choose plan", icon: CreditCard },
];

const plans = [
  { id: "free", name: "Free", price: "$0", desc: "Up to 3 users, core features" },
  { id: "pro", name: "Pro", price: "Custom", desc: "Unlimited users, full access" },
  { id: "enterprise", name: "Enterprise", price: "Contact", desc: "SSO, SLA, dedicated support" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState({ name: "", industry: "", size: "" });
  const [employee, setEmployee] = useState({ email: "", name: "", role: "Staff" });
  const [addEmployee, setAddEmployee] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>("free");

  const handleFinish = () => {
    // API integration later
    router.push("/"); // Dashboard when ready: /dashboard
  };

  return (
    <div className="min-h-screen flex font-onest bg-gray-50">
      {/* Left: branding - reuse AuthLayout style on large screens */}
      <div className="hidden lg:flex lg:w-[45%] bg-navy flex-col p-10 xl:p-14">
        <Link href="/" className="inline-flex shrink-0">
          <Image
            src="/logo.png"
            alt="Firmstack"
            width={160}
            height={44}
            className="h-9 w-auto object-contain object-left brightness-0 invert opacity-95"
          />
        </Link>
        <p className="mt-12 text-white text-xl font-medium max-w-sm">
          A few more details and you’re ready to track revenue, expenses, and profit.
        </p>
        <div className="mt-10 flex flex-col gap-3">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 ${
                step >= s.id ? "text-white" : "text-white/50"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                  step > s.id
                    ? "border-white bg-white"
                    : step === s.id
                    ? "border-white bg-white"
                    : "border-white/50"
                }`}
              >
                {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
              </span>
              <span className="font-medium">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: steps */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 bg-white">
        <div className="w-full max-w-[440px] mx-auto">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-navy">Company details</h1>
              <p className="mt-1 text-muted-foreground">
                Tell us a bit about your company.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="mt-8 space-y-5"
              >
                <FormField
                  label="Company name"
                  placeholder="e.g. Acme Inc"
                  value={company.name}
                  onChange={(e) =>
                    setCompany((p) => ({ ...p, name: e.target.value }))
                  }
                  icon={<Building2 className="w-5 h-5" />}
                />
                <FormField
                  label="Industry (optional)"
                  placeholder="e.g. Professional services"
                  value={company.industry}
                  onChange={(e) =>
                    setCompany((p) => ({ ...p, industry: e.target.value }))
                  }
                />
                <FormField
                  label="Company size (optional)"
                  placeholder="e.g. 1-10"
                  value={company.size}
                  onChange={(e) =>
                    setCompany((p) => ({ ...p, size: e.target.value }))
                  }
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-navy">Add your first team member</h1>
              <p className="mt-1 text-muted-foreground">
                Optional. You can invite more people later from Settings.
              </p>
              <div className="mt-8 space-y-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addEmployee}
                    onChange={(e) => setAddEmployee(e.target.checked)}
                    className="rounded border-gray-300 text-navy focus:ring-navy"
                  />
                  <span className="text-sm font-medium text-navy">
                    Add a team member now
                  </span>
                </label>
                {addEmployee && (
                  <>
                    <FormField
                      label="Name"
                      placeholder="Full name"
                      value={employee.name}
                      onChange={(e) =>
                        setEmployee((p) => ({ ...p, name: e.target.value }))
                      }
                      icon={<User className="w-5 h-5" />}
                    />
                    <FormField
                      label="Email"
                      type="email"
                      placeholder="colleague@company.com"
                      value={employee.email}
                      onChange={(e) =>
                        setEmployee((p) => ({ ...p, email: e.target.value }))
                      }
                      icon={<Mail className="w-5 h-5" />}
                    />
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Role
                      </label>
                      <select
                        value={employee.role}
                        onChange={(e) =>
                          setEmployee((p) => ({ ...p, role: e.target.value }))
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-navy focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </div>
                  </>
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 text-navy font-semibold py-3.5 px-6 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold text-navy">Choose your plan</h1>
              <p className="mt-1 text-muted-foreground">
                Start free. Upgrade anytime.
              </p>
              <div className="mt-8 space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left rounded-xl border-2 p-4 transition-colors ${
                      selectedPlan === plan.id
                        ? "border-navy bg-navy/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-navy">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">{plan.desc}</p>
                      </div>
                      <span className="font-bold text-navy">{plan.price}</span>
                    </div>
                  </button>
                ))}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 text-navy font-semibold py-3.5 px-6 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy/90"
                  >
                    Get started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
