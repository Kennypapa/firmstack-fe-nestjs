"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./ui/FadeIn";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-4 py-24 font-onest sm:px-6">
      <Image
        src="/landing/cta-invoice-wall.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, rgba(26,36,61,0.88) 0%, rgba(34,46,77,0.82) 50%, rgba(51,136,255,0.55) 100%)",
        }}
      />

      <FadeIn className="relative mx-auto max-w-2xl text-center">
        <div className="rounded-3xl border border-white/15 bg-white/10 px-8 py-12 shadow-2xl backdrop-blur-xl sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to send your next invoice?
          </h2>
          <p className="mt-3 text-white/75">
            Create a polished invoice in minutes — template, send, get paid.
          </p>
          <Link
            href="/signup"
            className="lv2-shimmer-btn mt-8 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-105"
          >
            Create My Invoice
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
