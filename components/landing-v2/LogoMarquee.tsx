"use client";

import type { ReactNode } from "react";

type Mark = {
  name: string;
  Mark: () => ReactNode;
};

function Northline() {
  return (
    <svg viewBox="0 0 120 28" className="h-7 w-auto" aria-hidden>
      <path d="M4 22 L14 6 L24 22" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <text x="32" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Northline
      </text>
    </svg>
  );
}

function Cobalt() {
  return (
    <svg viewBox="0 0 110 28" className="h-7 w-auto" aria-hidden>
      <circle cx="12" cy="14" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="14" r="3.5" fill="currentColor" />
      <text x="28" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Cobalt
      </text>
    </svg>
  );
}

function Ledgerly() {
  return (
    <svg viewBox="0 0 120 28" className="h-7 w-auto" aria-hidden>
      <rect x="3" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M7 12h8M7 16h6" stroke="currentColor" strokeWidth="1.6" />
      <text x="26" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Ledgerly
      </text>
    </svg>
  );
}

function Brightfold() {
  return (
    <svg viewBox="0 0 130 28" className="h-7 w-auto" aria-hidden>
      <path d="M4 20 V8 h8 a6 6 0 0 1 0 12H4z" fill="currentColor" />
      <text x="28" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Brightfold
      </text>
    </svg>
  );
}

function Arcadia() {
  return (
    <svg viewBox="0 0 115 28" className="h-7 w-auto" aria-hidden>
      <path d="M4 22 L14 6 L24 22 M8 16h12" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="30" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Arcadia
      </text>
    </svg>
  );
}

function Voltpay() {
  return (
    <svg viewBox="0 0 115 28" className="h-7 w-auto" aria-hidden>
      <path d="M16 5 L8 15h7L10 23 l10-12h-7L16 5z" fill="currentColor" />
      <text x="30" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Voltpay
      </text>
    </svg>
  );
}

function Paperlane() {
  return (
    <svg viewBox="0 0 130 28" className="h-7 w-auto" aria-hidden>
      <rect x="4" y="5" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M4 5h10l4 4V23" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <text x="26" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Paperlane
      </text>
    </svg>
  );
}

function Meridian() {
  return (
    <svg viewBox="0 0 125 28" className="h-7 w-auto" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M14 4v20 M4 14h20" stroke="currentColor" strokeWidth="1.4" />
      <text x="30" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Meridian
      </text>
    </svg>
  );
}

function Kestrel() {
  return (
    <svg viewBox="0 0 115 28" className="h-7 w-auto" aria-hidden>
      <path d="M4 22 L14 7 L20 14 L24 7 L24 22" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="32" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Kestrel
      </text>
    </svg>
  );
}

function Sumora() {
  return (
    <svg viewBox="0 0 110 28" className="h-7 w-auto" aria-hidden>
      <path d="M4 14c0-6 5-10 10-10s8 3 8 7-3 5-8 5-6 1-6 4 3 4 7 4 8-2 8-2" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="28" y="19" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Onest, sans-serif">
        Sumora
      </text>
    </svg>
  );
}

const ROW_A: Mark[] = [
  { name: "Northline", Mark: Northline },
  { name: "Cobalt", Mark: Cobalt },
  { name: "Ledgerly", Mark: Ledgerly },
  { name: "Brightfold", Mark: Brightfold },
  { name: "Arcadia", Mark: Arcadia },
];

const ROW_B: Mark[] = [
  { name: "Voltpay", Mark: Voltpay },
  { name: "Paperlane", Mark: Paperlane },
  { name: "Meridian", Mark: Meridian },
  { name: "Kestrel", Mark: Kestrel },
  { name: "Sumora", Mark: Sumora },
];

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: Mark[];
  reverse?: boolean;
  duration: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className="lv2-logo-mask overflow-hidden">
      <div
        className={`lv2-logo-track flex w-max gap-10 py-2 ${
          reverse ? "lv2-logo-track-reverse" : ""
        }`}
        style={{ animationDuration: duration }}
      >
        {loop.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex shrink-0 items-center gap-2 text-navy/35 transition hover:text-navy/70"
            title={item.name}
          >
            <item.Mark />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="border-y border-navy/[0.06] bg-white py-10 font-onest">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-navy/40">
          Teams getting paid with polished invoices
        </p>
        <div className="space-y-3">
          <MarqueeRow items={ROW_A} duration="38s" />
          <MarqueeRow items={ROW_B} reverse duration="46s" />
        </div>
      </div>
    </section>
  );
}
