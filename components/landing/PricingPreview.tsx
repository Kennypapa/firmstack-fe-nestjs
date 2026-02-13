import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with core features",
    features: ["Up to 3 users", "Invoices & expenses", "Basic dashboard", "Activity log"],
    cta: "Start free",
    href: "/register",
    primary: false,
  },
  {
    name: "Pro",
    price: "Custom",
    period: "per month",
    description: "For growing teams",
    features: ["Unlimited users", "Full RBAC", "Reports & export", "Priority support"],
    cta: "Start free trial",
    href: "/register",
    primary: true,
  },
  {
    name: "Enterprise",
    price: "Contact",
    period: "us",
    description: "Scale and compliance",
    features: ["Everything in Pro", "SSO & audit", "Dedicated support", "SLA"],
    cta: "Contact sales",
    href: "/pricing",
    primary: false,
  },
];

export function PricingPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white font-onest" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy text-center">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-xl mx-auto">
          Start free. Upgrade when you need more users and features.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border-2 p-8 ${
                plan.primary
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-gray-100 bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold text-navy">{plan.name}</h3>
              <p className="mt-1 text-muted-foreground">{plan.description}</p>
              <p className="mt-4">
                <span className="text-3xl font-bold text-navy">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-navy">
                    <Check className="w-5 h-5 text-primary shrink-0" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 flex items-center justify-center gap-2 w-full rounded-xl py-3 font-semibold transition-colors ${
                  plan.primary
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
