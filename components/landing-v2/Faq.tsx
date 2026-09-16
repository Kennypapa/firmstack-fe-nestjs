"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FadeIn } from "./ui/FadeIn";

const faqs = [
  {
    q: "Can I send invoices by email and WhatsApp?",
    a: "Yes. Create the invoice, choose PDF or a shareable link, then send via email, WhatsApp, or copy to clipboard.",
  },
  {
    q: "Do templates include signatures?",
    a: "Yes. Every Firmstack invoice template includes an authorized signature block, plus logo, bill-to, dates, line items, and totals.",
  },
  {
    q: "Can I download a PDF?",
    a: "Yes — download as PDF (and other formats from the export menu) anytime from create or invoice detail.",
  },
  {
    q: "Is Firmstack only for freelancers?",
    a: "No. Freelancers, contractors, agencies, and small finance teams all use it to standardize how they invoice.",
  },
  {
    q: "Do I need design skills?",
    a: "No. Pick a template, fill the form, and Firmstack handles the layout so every invoice looks consistent.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-4 py-20 font-onest sm:px-6 lg:py-24">
      <div className="absolute inset-0 bg-[#f4f7fb]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(123,191,255,0.18), transparent 60%), radial-gradient(40% 40% at 90% 80%, rgba(51,136,255,0.08), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            FAQ
          </p>
          <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-navy/65">
            Straight answers about creating and sending invoices.
          </p>
        </FadeIn>

        
        <FadeIn delay={0.08} className="mt-16 sm:mt-20">
          <div className="overflow-hidden rounded-2xl border border-navy/[0.07] bg-white/90 shadow-[0_20px_50px_-30px_rgba(34,46,77,0.35)] backdrop-blur-sm">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              const isLast = i === faqs.length - 1;
              return (
                <div
                  key={item.q}
                  className={isLast ? "" : "border-b border-navy/[0.06]"}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[#f8fafc] sm:px-6 sm:py-6"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                        isOpen
                          ? "border-primary bg-primary text-white"
                          : "border-navy/10 bg-white text-navy/55"
                      }`}
                    >
                      <Plus
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={2.25}
                      />
                    </span>
                    <span
                      className={`flex-1 text-[15px] font-semibold leading-snug sm:text-base ${
                        isOpen ? "text-navy" : "text-navy/85"
                      }`}
                    >
                      {item.q}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed text-navy/65 sm:px-6 sm:pb-6 sm:pl-[4.25rem]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
