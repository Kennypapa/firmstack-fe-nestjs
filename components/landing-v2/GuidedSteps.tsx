"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, FileText, LayoutTemplate, Send } from "lucide-react";
import { FadeIn } from "./ui/FadeIn";

const steps = [
  {
    id: "fill",
    num: "01",
    label: "Fill details",
    title: "Fill your details",
    body: "Client, line items, tax, due date — the form stays simple.",
    bullets: [
      "Add client & contact in seconds",
      "Line items, tax, and due date",
      "Totals update as you type",
    ],
    Icon: FileText,
    image: "/landing/unsplash/step-fill-details.png",
    alt: "Hands filling invoice details on a laptop with papers and calculator",
  },
  {
    id: "template",
    num: "02",
    label: "Pick template",
    title: "Pick a template",
    body: "Modern, classic, or signed — swap looks without retyping.",
    bullets: [
      "Preview real invoice layouts",
      "Change colors without redo",
      "Signed templates when you need them",
    ],
    Icon: LayoutTemplate,
    image: "/landing/unsplash/step-pick-template.png",
    alt: "Comparing invoice template layouts on a computer screen",
  },
  {
    id: "send",
    num: "03",
    label: "Send / download",
    title: "Send or download",
    body: "Email, WhatsApp, or copy a link. PDF when you need a file.",
    bullets: [
      "Email or WhatsApp in one tap",
      "Copy a shareable link",
      "Download PDF when you need a file",
    ],
    Icon: Send,
    image: "/landing/unsplash/step-send-download.png",
    alt: "Sending an invoice from phone and downloading PDF on laptop",
  },
];

export function GuidedSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const step = steps[active];

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [paused, reduce]);

  return (
    <section
      className="relative overflow-hidden px-4 py-20 font-onest sm:px-6 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      
      <div className="absolute inset-0 bg-[#f7f6f3]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(34,46,77,0.055) 31px, rgba(34,46,77,0.055) 32px)",
        }}
        aria-hidden
      />

      
      <div
        className="pointer-events-none absolute bottom-0 left-[max(1rem,calc(50%-36rem))] top-0 w-px bg-primary/25 sm:left-[max(1.5rem,calc(50%-36rem))]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[max(1.35rem,calc(50%-35.65rem))] top-0 w-px bg-navy/[0.06] sm:left-[max(1.85rem,calc(50%-35.65rem))]"
        aria-hidden
      />

      
      <div
        className="pointer-events-none absolute bottom-0 right-[max(1rem,calc(50%-36rem))] top-0 w-px bg-navy/[0.06] sm:right-[max(1.5rem,calc(50%-36rem))]"
        aria-hidden
      />

      
      <div
        className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-navy/15 sm:left-10 sm:top-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-navy/15 sm:right-10 sm:top-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-navy/15 sm:bottom-10 sm:left-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-navy/15 sm:bottom-10 sm:right-10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Three steps to get paid
          </h2>
          <p className="mt-3 text-navy/60">
            Fill → pick a template → send. No finance degree required.
          </p>
        </FadeIn>

        
        <FadeIn delay={0.08} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="How it works steps"
            className="relative inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full border border-navy/8 bg-white/70 p-1.5 shadow-sm backdrop-blur-xl"
          >
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`relative z-[1] flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
                    on ? "text-white" : "text-navy/50 hover:text-navy/80"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="hiw-tab-pill"
                      className="absolute inset-0 rounded-full bg-navy shadow-lg shadow-navy/20"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <s.Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{s.num}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        
        <FadeIn delay={0.12} className="mt-10">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 shadow-[0_30px_80px_rgba(34,46,77,0.1)] backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative aspect-[16/11] min-h-[280px] lg:aspect-auto lg:min-h-[440px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.image}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={active === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/40" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy backdrop-blur-md">
                      Step {step.num}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative flex flex-col justify-center border-t border-navy/5 bg-white/60 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:bg-white/50 lg:p-10 lg:backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                      <step.Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/60 sm:text-base">
                      {step.body}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm text-navy/80"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="h-3 w-3" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex gap-2">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Show ${s.title}`}
                      onClick={() => setActive(i)}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-navy/10"
                    >
                      <motion.span
                        className="block h-full rounded-full bg-primary"
                        initial={false}
                        animate={{
                          width:
                            i === active ? "100%" : i < active ? "100%" : "0%",
                          opacity: i === active ? 1 : i < active ? 0.4 : 0,
                        }}
                        transition={{ duration: 0.35 }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
