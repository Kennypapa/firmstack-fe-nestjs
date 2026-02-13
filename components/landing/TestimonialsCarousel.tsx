"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Firmstack has helped our team increase visibility into revenue and expenses. We finally have one place for invoices, expenses, and profit—and the role-based access keeps everything accountable.",
    attribution: "Finance Lead, Mid-size SaaS",
  },
  {
    quote:
      "We moved off spreadsheets in a week. The activity logs alone are worth it. We know who added what and when, and our monthly profit view is always up to date.",
    attribution: "Operations Manager, Professional Services",
  },
  {
    quote:
      "Clean, simple, and secure. Multi-tenant by design so we can scale without worrying about data mixing. Exactly what we needed for financial control.",
    attribution: "CTO, Growing Startup",
  },
];

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const len = testimonials.length;

  const goPrev = () => setActiveIndex((i) => (i - 1 + len) % len);
  const goNext = () => setActiveIndex((i) => (i + 1) % len);

  return (
    <section className="py-16 lg:py-24 bg-[#f1f5f9] font-onest">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="p-2 rounded-full border border-gray-200 bg-white text-navy hover:bg-gray-50 transition-colors shrink-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 min-w-0 text-center">
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-4" aria-hidden />
            <blockquote className="text-xl sm:text-2xl text-navy font-medium leading-relaxed">
              {testimonials[activeIndex].quote}
            </blockquote>
            <p className="mt-6 text-muted-foreground">
              {testimonials[activeIndex].attribution}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={goNext}
            className="p-2 rounded-full border border-gray-200 bg-white text-navy hover:bg-gray-50 transition-colors shrink-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
