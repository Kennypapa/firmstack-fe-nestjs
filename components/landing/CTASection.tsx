import Link from "next/link";
import { ArrowRight, Shield, Users, Eye, BarChart3 } from "lucide-react";

const highlights = [
  {
    icon: Eye,
    label: "Clear profit visibility",
    desc: "See exactly where your money goes each month.",
  },
  {
    icon: Users,
    label: "Solo or team",
    desc: "Works for freelancers and growing teams alike.",
  },
  {
    icon: BarChart3,
    label: "Full activity audit",
    desc: "Every action logged for complete accountability.",
  },
  {
    icon: Shield,
    label: "Secure & isolated",
    desc: "Your data is encrypted and tenant-isolated.",
  },
];

export function CTASection() {
  return (
    <section className="relative font-onest">
      {/* Curved top transition from white to navy */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-white" />
      <svg
        className="relative w-full h-16 sm:h-20 lg:h-24 text-navy"
        viewBox="0 0 1440 96"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 96H1440V24C1440 24 1140 0 720 0C300 0 0 24 0 24V96Z"
          fill="currentColor"
        />
      </svg>

      {/* Main CTA content */}
      <div className="bg-navy relative overflow-hidden">
        {/* Decorative elements */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 20% 20%, rgba(51,136,255,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(123,191,255,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Floating grid dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-16 lg:pb-24">
          {/* Top: heading + CTA centered */}
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] text-white/90 text-sm font-medium px-4 py-1.5 mb-6 border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7bbfff] animate-pulse" />
              For individuals &amp; businesses
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Take control of your
              <br className="hidden sm:block" />
              <span className="text-[#7bbfff]"> financial operations</span>
            </h2>
            <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              One place for invoices, expenses, and cash flow—whether
              you&apos;re solo or part of a team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-white text-navy font-semibold px-7 py-3.5 hover:bg-white/90 transition-all shadow-lg shadow-black/10"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/15 text-white font-semibold px-7 py-3.5 hover:bg-white/[0.06] transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom: 4 highlight cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="group relative rounded-2xl p-6 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.08] flex items-center justify-center mb-4 group-hover:bg-white/[0.12] transition-colors">
                  <item.icon className="w-5 h-5 text-[#7bbfff]" />
                </div>
                <h3 className="text-white font-semibold text-[15px] leading-snug">
                  {item.label}
                </h3>
                <p className="mt-1.5 text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
