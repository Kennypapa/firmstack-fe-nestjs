"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  UserPlus,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

const WORKSPACE_KEY = "firmstack_workspace";

const steps = [
  { id: 1, title: "Company details", icon: Building2 },
  { id: 2, title: "Add team member", icon: UserPlus },
  { id: 3, title: "Choose plan", icon: CreditCard },
];

const plans = [
  { id: "free", name: "Free", price: "$0", desc: "Up to 3 users, core features", badge: "Popular" },
  { id: "pro", name: "Pro", price: "Custom", desc: "Unlimited users, full access", badge: null },
  { id: "enterprise", name: "Enterprise", price: "Contact", desc: "SSO, SLA, dedicated support", badge: null },
];

function FirmstackLogoWhite() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
        <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
        <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
        <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.4" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-white">
        Firm<span className="text-white/70">stack</span>
      </span>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [company, setCompany] = useState({ name: "", industry: "", size: "" });
  const [employee, setEmployee] = useState({ email: "", name: "", role: "Staff" });
  const [addEmployee, setAddEmployee] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>("free");

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(WORKSPACE_KEY, "company");
    }
    router.push("/dashboard");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const workspace = window.sessionStorage.getItem(WORKSPACE_KEY);
    if (workspace === "personal") {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex font-onest bg-gray-50">
      {/* Left: branding + stepper */}
      <div className="hidden lg:flex lg:w-[45%] bg-navy flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(51,136,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(123,191,255,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative flex flex-col h-full p-10 xl:p-14">
          <Link href="/" className="inline-flex shrink-0 w-fit">
            <FirmstackLogoWhite />
          </Link>

          <p className="mt-12 text-white/80 text-xl font-medium max-w-sm leading-relaxed">
            A few more details and you&apos;re ready to track revenue, expenses, and profit.
          </p>

          {/* Stepper */}
          <div className="mt-10 flex flex-col gap-1">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-start gap-4">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all ${
                      step > s.id
                        ? "border-primary bg-primary text-white"
                        : step === s.id
                          ? "border-white bg-white text-navy"
                          : "border-white/20 text-white/40"
                    }`}
                  >
                    {step > s.id ? (
                      <Check className="w-5 h-5" strokeWidth={2.5} />
                    ) : (
                      <s.icon className="w-4 h-4" />
                    )}
                  </span>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-8 mt-1 rounded-full transition-colors ${
                        step > s.id ? "bg-primary" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
                {/* Text */}
                <div className="pt-2">
                  <p
                    className={`font-semibold text-sm transition-colors ${
                      step >= s.id ? "text-white" : "text-white/40"
                    }`}
                  >
                    {s.title}
                  </p>
                  {step === s.id && (
                    <p className="text-xs text-white/50 mt-0.5">Current step</p>
                  )}
                  {step > s.id && (
                    <p className="text-xs text-primary/70 mt-0.5">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-auto pt-6 flex items-center gap-6 text-white/30 text-xs">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="3" y="5" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 5V3.5C5 2.4 5.9 1.5 7 1.5C8.1 1.5 9 2.4 9 3.5V5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Secure setup
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4.5 7L6.5 9L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Takes 2 minutes
            </span>
          </div>
        </div>
      </div>

      {/* Right: steps content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 bg-white">
        <div className="w-full max-w-[440px] mx-auto">
          {/* Mobile step indicator */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  step >= s.id ? "bg-navy" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-navy tracking-tight">Company details</h1>
                <p className="mt-1 text-muted-foreground text-[15px]">
                  Tell us a bit about your company
                </p>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                className="space-y-5"
              >
                {/* Company name */}
                <div className="relative">
                  <input
                    type="text"
                    id="ob-name"
                    value={company.name}
                    onChange={(e) => setCompany((p) => ({ ...p, name: e.target.value }))}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
                    placeholder="Company name"
                  />
                  <label htmlFor="ob-name" className={`absolute left-4 transition-all duration-200 pointer-events-none ${company.name || focusedField === "name" ? "top-2 text-[11px] font-semibold tracking-wide uppercase" : "top-1/2 -translate-y-1/2 text-[15px]"} ${focusedField === "name" ? "text-navy" : "text-muted-foreground"}`}>Company name</label>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "name" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
                </div>

                {/* Industry */}
                <div className="relative">
                  <input
                    type="text"
                    id="ob-industry"
                    value={company.industry}
                    onChange={(e) => setCompany((p) => ({ ...p, industry: e.target.value }))}
                    onFocus={() => setFocusedField("industry")}
                    onBlur={() => setFocusedField(null)}
                    className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
                    placeholder="Industry"
                  />
                  <label htmlFor="ob-industry" className={`absolute left-4 transition-all duration-200 pointer-events-none ${company.industry || focusedField === "industry" ? "top-2 text-[11px] font-semibold tracking-wide uppercase" : "top-1/2 -translate-y-1/2 text-[15px]"} ${focusedField === "industry" ? "text-navy" : "text-muted-foreground"}`}>Industry (optional)</label>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "industry" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
                </div>

                {/* Company size */}
                <div className="relative">
                  <input
                    type="text"
                    id="ob-size"
                    value={company.size}
                    onChange={(e) => setCompany((p) => ({ ...p, size: e.target.value }))}
                    onFocus={() => setFocusedField("size")}
                    onBlur={() => setFocusedField(null)}
                    className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
                    placeholder="Company size"
                  />
                  <label htmlFor="ob-size" className={`absolute left-4 transition-all duration-200 pointer-events-none ${company.size || focusedField === "size" ? "top-2 text-[11px] font-semibold tracking-wide uppercase" : "top-1/2 -translate-y-1/2 text-[15px]"} ${focusedField === "size" ? "text-navy" : "text-muted-foreground"}`}>Company size (optional)</label>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "size" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-navy text-white font-semibold text-[15px] overflow-hidden transition-all hover:shadow-lg hover:shadow-navy/20 active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-navy tracking-tight">Add your first team member</h1>
                <p className="mt-1 text-muted-foreground text-[15px]">
                  Optional — you can invite more people later
                </p>
              </div>
              <div className="space-y-5">
                {/* Toggle */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-5 h-5">
                    <input
                      type="checkbox"
                      checked={addEmployee}
                      onChange={(e) => setAddEmployee(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white peer-checked:bg-navy peer-checked:border-navy transition-all group-hover:border-gray-400" />
                    <svg className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-navy group-hover:text-primary transition-colors select-none">
                    Add a team member now
                  </span>
                </label>

                {addEmployee && (
                  <>
                    {/* Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="ob-emp-name"
                        value={employee.name}
                        onChange={(e) => setEmployee((p) => ({ ...p, name: e.target.value }))}
                        onFocus={() => setFocusedField("empName")}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
                        placeholder="Name"
                      />
                      <label htmlFor="ob-emp-name" className={`absolute left-4 transition-all duration-200 pointer-events-none ${employee.name || focusedField === "empName" ? "top-2 text-[11px] font-semibold tracking-wide uppercase" : "top-1/2 -translate-y-1/2 text-[15px]"} ${focusedField === "empName" ? "text-navy" : "text-muted-foreground"}`}>Full name</label>
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "empName" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        id="ob-emp-email"
                        value={employee.email}
                        onChange={(e) => setEmployee((p) => ({ ...p, email: e.target.value }))}
                        onFocus={() => setFocusedField("empEmail")}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] placeholder-transparent outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300"
                        placeholder="Email"
                        autoComplete="email"
                      />
                      <label htmlFor="ob-emp-email" className={`absolute left-4 transition-all duration-200 pointer-events-none ${employee.email || focusedField === "empEmail" ? "top-2 text-[11px] font-semibold tracking-wide uppercase" : "top-1/2 -translate-y-1/2 text-[15px]"} ${focusedField === "empEmail" ? "text-navy" : "text-muted-foreground"}`}>Email address</label>
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "empEmail" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
                    </div>

                    {/* Role select */}
                    <div className="relative">
                      <select
                        id="ob-emp-role"
                        value={employee.role}
                        onChange={(e) => setEmployee((p) => ({ ...p, role: e.target.value }))}
                        onFocus={() => setFocusedField("empRole")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full h-14 px-4 pt-5 pb-2 rounded-2xl border-2 border-gray-200 bg-white text-navy text-[15px] outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_4px_rgba(34,46,77,0.08)] hover:border-gray-300 appearance-none cursor-pointer"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                      </select>
                      <label htmlFor="ob-emp-role" className="absolute left-4 top-2 text-[11px] font-semibold tracking-wide uppercase text-muted-foreground pointer-events-none">Role</label>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-navy transition-all duration-300 ${focusedField === "empRole" ? "w-[calc(100%-2rem)]" : "w-0"}`} />
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 text-navy font-semibold py-3.5 px-6 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="group relative flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-navy text-white font-semibold text-[15px] overflow-hidden transition-all hover:shadow-lg hover:shadow-navy/20 active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      Continue
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-navy tracking-tight">Choose your plan</h1>
                <p className="mt-1 text-muted-foreground text-[15px]">
                  Start free — upgrade anytime
                </p>
              </div>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left rounded-2xl border-2 p-5 transition-all ${
                      selectedPlan === plan.id
                        ? "border-navy bg-navy/[0.04] shadow-[0_0_0_4px_rgba(34,46,77,0.08)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy">{plan.name}</p>
                          {plan.badge && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider bg-navy/10 text-navy px-2 py-0.5 rounded-full">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{plan.desc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-navy text-lg">{plan.price}</span>
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedPlan === plan.id
                              ? "border-navy bg-navy"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPlan === plan.id && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 text-navy font-semibold py-3.5 px-6 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="group relative flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-navy text-white font-semibold text-[15px] overflow-hidden transition-all hover:shadow-lg hover:shadow-navy/20 active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      Get started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
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
