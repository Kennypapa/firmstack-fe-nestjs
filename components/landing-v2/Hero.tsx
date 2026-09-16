"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { HeroInvoicePaper } from "./ui/HeroInvoicePaper";

const avatars = [
  { src: "/landing/user-freelancer.png", alt: "Freelancer" },
  { src: "/landing/user-consultant.png", alt: "Consultant" },
  { src: "/landing/user-agency.png", alt: "Agency" },
  { src: "/landing/user-contractor.png", alt: "Contractor" },
  { src: "/landing/user-finance-team.png", alt: "Finance" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#fbfcfe] font-onest">
      
      <div className="absolute inset-0 bg-[#fbfcfe]" />

      
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(51, 136, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(51, 136, 255, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 40% 35%, transparent 20%, black 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 40% 35%, transparent 20%, black 75%)",
        }}
        aria-hidden
      />
      
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 46, 77, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 46, 77, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 90%)",
        }}
        aria-hidden
      />

      
      <div
        className="pointer-events-none absolute -left-24 bottom-[-10%] h-[55%] w-[45%] rounded-full blur-3xl"
        style={{ background: "rgba(123, 191, 255, 0.28)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-[-5%] h-[48%] w-[40%] rounded-full blur-3xl"
        style={{ background: "rgba(51, 136, 255, 0.16)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[15%] bottom-0 h-40 blur-2xl"
        style={{
          background:
            "linear-gradient(to top, rgba(123, 191, 255, 0.22), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <motion.h1
            className="text-balance text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            The easiest way to create &amp; send invoices
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-base text-navy/65 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
          >
            Pick a template, fill the details, send as PDF or link — and get
            paid faster.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
          >
            <Link
              href="/signup"
              className="lv2-shimmer-btn rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:brightness-105"
            >
              Create Invoice Now
            </Link>
            <Link
              href="#templates"
              className="rounded-full border border-navy/10 bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm transition hover:border-navy/20"
            >
              Browse Templates
            </Link>
          </motion.div>

          
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease }}
          >
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <Image
                  key={a.src}
                  src={a.src}
                  alt={a.alt}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-navy/55">
                <span className="font-semibold text-navy/80">4.9/5</span> from
                freelancers &amp; firms
              </p>
            </div>
          </motion.div>
        </div>

        
        <motion.div
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          initial={reduce ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease }}
        >
          <div className="relative">
            
            <div
              className="absolute inset-0 rounded-sm bg-[#f5d76e] shadow-md ring-1 ring-amber-700/15"
              style={{ transform: "translate(14px, 16px) rotate(2.8deg)" }}
              aria-hidden
            />
            <div
              className="absolute inset-0 rounded-sm bg-[#7bbfff] shadow-md ring-1 ring-primary/25"
              style={{ transform: "translate(7px, 8px) rotate(1.4deg)" }}
              aria-hidden
            />

            <motion.div
              className="hero-paper relative overflow-visible rounded-sm bg-white shadow-[0_28px_80px_rgba(34,46,77,0.14)] ring-1 ring-black/[0.06]"
              initial={reduce ? false : { y: 24, rotate: 2 }}
              animate={{ y: 0, rotate: -0.5 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 16,
                delay: 0.22,
              }}
            >
              <div className="relative aspect-[4/5] min-h-[420px] overflow-visible sm:min-h-[480px] lg:min-h-[520px]">
                <HeroInvoicePaper />
              </div>
              <div
                className="pointer-events-none absolute right-0 top-0 z-10 h-11 w-11 overflow-hidden sm:h-14 sm:w-14"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(225deg, #e8eef4 0%, #f8fafc 48%, #ffffff 52%)",
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  boxShadow: "-2px 2px 6px rgba(34,46,77,0.08)",
                }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 z-10 h-11 w-11 sm:h-14 sm:w-14"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(225deg, transparent 48%, rgba(34,46,77,0.07) 50%, transparent 52%)",
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
