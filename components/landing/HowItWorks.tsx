import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, UserPlus, LineChart } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Create your account",
    description: "Sign up with email or Google. Choose a personal workspace or create a company—you’re in control from day one.",
    cta: "Get started free",
    href: "/register",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    icon: UserPlus,
    title: "Add finances (and optional team)",
    description: "Add invoices and expenses in one place. Running a company? Invite your team and assign roles.",
    cta: "See features",
    href: "#features",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  },
  {
    icon: LineChart,
    title: "Track & monitor",
    description: "View your dashboard, reports, and activity—whether you're solo or with your team.",
    cta: "View dashboard",
    href: "#features",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white font-onest" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy">
          Get up and running in minutes
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Whether you&apos;re solo or with a team—create your account, add your finances, and start tracking. No code, no hassle.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="group">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                <Image
                  src={step.image}
                  alt=""
                  width={400}
                  height={260}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <step.icon className="w-5 h-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  <Link
                    href={step.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {step.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
