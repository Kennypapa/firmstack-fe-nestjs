import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const callouts = [
  "Clear profit visibility",
  "Solo or team",
  "Full activity audit",
  "Secure & isolated",
];

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-white font-onest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0 rounded-full overflow-hidden ring-4 ring-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
                alt="Financial control"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            {callouts.map((text, i) => {
              const positions = [
                "top-0 right-0 lg:right-0",
                "top-1/4 -right-4 lg:right-0",
                "bottom-1/4 -left-4 lg:left-0",
                "bottom-0 left-0 lg:left-0",
              ];
              return (
                <div
                  key={text}
                  className={`absolute ${positions[i]} bg-white/95 backdrop-blur rounded-xl px-4 py-2 shadow-lg border border-gray-100 text-sm font-medium text-navy`}
                >
                  <Sparkles className="inline-block w-4 h-4 text-primary mr-1 -mt-0.5" aria-hidden />
                  {text}
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              For individuals and businesses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              One place for invoices, expenses, and cash flow—whether you&apos;re solo or part of a team. Get started free and add your finances in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-6 py-3.5 hover:bg-navy/90 transition-colors"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 hover:bg-navy/5 transition-colors"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
