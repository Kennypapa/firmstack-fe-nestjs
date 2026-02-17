"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "I needed one place for my invoices and expenses without the complexity of big software. Firmstack gives me a clear dashboard and reports—perfect for staying on top of my finances solo.",
    attribution: "Freelance Consultant",
  },
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-[#f0f4f8] font-onest overflow-hidden testimonials-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <span
            className="absolute left-1/2 -translate-x-1/2 -top-2 text-[5rem] sm:text-[6rem] font-serif text-white/90 select-none pointer-events-none leading-none z-0"
            aria-hidden
          >
            &ldquo;
          </span>

          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={600}
            loop={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              el: ".testimonials-pagination",
              clickable: true,
              bulletClass: "testimonial-bullet",
              bulletActiveClass: "testimonial-bullet-active",
            }}
            className="testimonials-swiper"
            onSwiper={setSwiperInstance}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="pt-12 pb-4 px-2 sm:px-6 relative z-10">
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl text-navy font-medium leading-relaxed text-center">
                    {t.quote}
                  </blockquote>
                  <p className="mt-8 text-center text-muted-foreground font-medium">
                    {t.attribution}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md text-navy hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center -translate-x-1/2 lg:translate-x-0 lg:left-4 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md text-navy hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center translate-x-1/2 lg:translate-x-0 lg:right-4 cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="testimonials-pagination flex justify-center gap-2 !relative !mt-8" />
        </div>
      </div>

      <style jsx global>{`
        .testimonials-section .testimonial-bullet {
          width: 0.5rem;
          height: 0.5rem;
          background: #d1d5db;
          opacity: 1;
          border-radius: 9999px;
          transition: width 0.3s ease, background 0.3s ease;
          cursor: pointer;
          margin: 0 0.25rem;
          border: none;
          padding: 0;
        }
        .testimonials-section .testimonial-bullet-active {
          width: 2rem;
          background: var(--primary, #3388ff);
        }
      `}</style>
    </section>
  );
}
