"use client";

import Image from "next/image";
import { FadeIn } from "./ui/FadeIn";

type Quote = {
  name: string;
  role: string;
  text: string;
  image: string;
  kind: "person" | "company";
};

const quotes: Quote[] = [
  {
    kind: "person",
    name: "Amelia R.",
    role: "Freelance designer",
    text: "I send invoices the same afternoon I finish a job. Clients pay faster when it looks this clean.",
    image: "/landing/avatars/avatar-amelia.png",
  },
  {
    kind: "company",
    name: "Northline",
    role: "Design studio",
    text: "Every client gets the same sharp layout now. No more last-minute Word edits before send.",
    image: "/landing/logos/logo-northline.png",
  },
  {
    kind: "person",
    name: "Jordan K.",
    role: "Agency ops",
    text: "Templates + WhatsApp send saved our team hours every week. No more Word chaos.",
    image: "/landing/avatars/avatar-jordan.png",
  },
  {
    kind: "company",
    name: "Cobalt",
    role: "Payments team",
    text: "We standardized every invoice in one afternoon. Tracking and follow-ups got clearer overnight.",
    image: "/landing/logos/logo-cobalt.png",
  },
  {
    kind: "person",
    name: "Chris M.",
    role: "Contractor",
    text: "Signed templates make me look legit on every bid. Setup took minutes.",
    image: "/landing/avatars/avatar-chris.png",
  },
  {
    kind: "company",
    name: "Ledgerly",
    role: "Accounting firm",
    text: "Our partners finally send invoices that match our brand. Clients notice the polish.",
    image: "/landing/logos/logo-ledgerly.png",
  },
  {
    kind: "person",
    name: "Priya S.",
    role: "Consultant",
    text: "Finally an invoice tool that feels expensive without the enterprise price.",
    image: "/landing/avatars/avatar-priya.png",
  },
  {
    kind: "company",
    name: "Brightfold",
    role: "Creative agency",
    text: "New hires ship professional invoices on day one. The templates do the heavy lifting.",
    image: "/landing/logos/logo-brightfold.png",
  },
];

export function SocialProof() {
  const loop = [...quotes, ...quotes];

  return (
    <section className="overflow-hidden bg-[#f7f9fc] py-20 font-onest">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Loved by freelancers &amp; firms
          </h2>
          <p className="mt-2 max-w-xl text-navy/65">
            People who send invoices for a living — not generic SaaS praise.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.1} className="mt-10">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f7f9fc] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f7f9fc] to-transparent sm:w-24" />
          <div className="lv2-marquee-track flex w-max gap-4 px-4">
            {loop.map((q, i) => (
              <figure
                key={`${q.name}-${i}`}
                className="w-[300px] shrink-0 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-md sm:w-[340px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative h-10 w-10 overflow-hidden ring-2 ring-white ${
                      q.kind === "company"
                        ? "rounded-xl bg-[#f0f3f8] p-1.5"
                        : "rounded-full"
                    }`}
                  >
                    <Image
                      src={q.image}
                      alt=""
                      width={40}
                      height={40}
                      className={`h-full w-full object-cover ${
                        q.kind === "company" ? "object-contain" : ""
                      }`}
                    />
                  </div>
                  <figcaption>
                    <p className="text-sm font-semibold text-navy">{q.name}</p>
                    <p className="text-xs text-navy/50">{q.role}</p>
                  </figcaption>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-navy/75">
                  “{q.text}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
