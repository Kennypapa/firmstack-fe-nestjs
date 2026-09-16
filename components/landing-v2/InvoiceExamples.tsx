"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import {
  INVOICE_TEMPLATES,
  getTemplateColor,
  saveTemplatePreference,
  type InvoiceTemplateMeta,
} from "@/lib/invoice-templates";
import { InvoiceDocument } from "@/components/invoices/InvoiceDocument";
import { GALLERY_INVOICE_DATA } from "@/components/invoices/invoice-preview-types";
import { FadeIn } from "./ui/FadeIn";
import { TinyGrid } from "./ui/TinyGrid";

const showcase = INVOICE_TEMPLATES.slice(0, 8);

export function InvoiceExamples() {
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [colorMap, setColorMap] = useState<Record<string, string>>(() =>
    Object.fromEntries(showcase.map((t) => [t.id, t.defaultColorId]))
  );

  const current = showcase[active] ?? showcase[0];
  const colorId = colorMap[current.id] ?? current.defaultColorId;
  const accent = getTemplateColor(current, colorId).accent;

  const setColor = (templateId: string, id: string) => {
    setColorMap((prev) => ({ ...prev, [templateId]: id }));
  };

  return (
    <section
      id="templates"
      className="relative overflow-hidden font-onest"
    >
      
      <div className="absolute inset-0 bg-[#0b1220]" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(900px 480px at 50% 0%, rgba(51,136,255,0.28), transparent 55%),
            radial-gradient(700px 400px at 80% 80%, rgba(123,191,255,0.12), transparent 50%),
            radial-gradient(600px 360px at 15% 70%, rgba(34,46,77,0.9), transparent 55%)
          `,
        }}
      />
      <TinyGrid
        className="absolute inset-0 opacity-40"
        line="rgba(255,255,255,0.04)"
        size={22}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7bbfff]/80">
            Invoice studio
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Flip through real invoices
          </h2>
          <p className="mt-3 text-white/60">
            Interactive coverflow — the actual Firmstack documents, not mock
            marketing art. Drag, peek, pick a color, use it.
          </p>
        </FadeIn>

        
        <FadeIn delay={0.1} className="relative mt-14">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-white/40">
                firmstack · live templates
              </span>
              <span className="hidden text-[11px] text-white/30 sm:inline">
                {active + 1} / {showcase.length}
              </span>
            </div>

            
            <div className="relative px-2 py-10 sm:px-6 sm:py-14">
              
              <div
                className="pointer-events-none absolute inset-x-8 bottom-6 h-24 rounded-[100%] opacity-40 blur-2xl sm:inset-x-20"
                style={{
                  background: `radial-gradient(ellipse at center, ${accent}55, transparent 70%)`,
                }}
              />

              <Swiper
                onSwiper={setSwiper}
                onSlideChange={(s) => setActive(s.realIndex)}
                modules={[EffectCoverflow, Navigation]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                loop
                coverflowEffect={{
                  rotate: 18,
                  stretch: 0,
                  depth: 160,
                  modifier: 1.15,
                  slideShadows: false,
                }}
                className="!overflow-visible [&_.swiper-slide]:!w-[220px] sm:[&_.swiper-slide]:!w-[260px]"
              >
                {showcase.map((template, i) => (
                  <SwiperSlide key={template.id}>
                    <CoverSlide
                      template={template}
                      colorId={colorMap[template.id] ?? template.defaultColorId}
                      isActive={i === active}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Previous template"
                  onClick={() => swiper?.slidePrev()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:bg-white/15"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next template"
                  onClick={() => swiper?.slideNext()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:bg-white/15"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            
            <div className="border-t border-white/10 bg-white/[0.06] px-4 py-5 backdrop-blur-md sm:px-8 sm:py-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-white">
                      {current.name}
                    </h3>
                    {current.badge && (
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7bbfff]">
                        {current.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 max-w-md text-sm text-white/50">
                    {current.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {current.colors.map((c) => {
                      const on = c.id === colorId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          title={c.label}
                          onClick={() => setColor(current.id, c.id)}
                          className={`h-6 w-6 rounded-full transition ring-2 ring-offset-2 ring-offset-[#121a2e] ${
                            on ? "scale-110 ring-white" : "ring-transparent opacity-80 hover:opacity-100"
                          }`}
                          style={{ background: c.accent }}
                          aria-label={c.label}
                          aria-pressed={on}
                        />
                      );
                    })}
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-white/35">
                      <FileDown className="h-3.5 w-3.5" />
                      PDF · Word
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/invoices/new?template=${current.id}&color=${colorId}`}
                  onClick={() => saveTemplatePreference(current.id, colorId)}
                  className="lv2-shimmer-btn inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        
        <FadeIn delay={0.18} className="mt-8">
          <div className="flex flex-wrap justify-center gap-2">
            {showcase.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => swiper?.slideToLoop(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  i === active
                    ? "bg-white text-navy"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CoverSlide({
  template,
  colorId,
  isActive,
}: {
  template: InvoiceTemplateMeta;
  colorId: string;
  isActive: boolean;
}) {
  const accent = getTemplateColor(template, colorId).accent;

  return (
    <div
      className={`mx-auto transition duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-[0.92] opacity-70"
      }`}
    >
      
      <div
        className={`rounded-xl border p-3 transition duration-500 ${
          isActive
            ? "border-white/25 bg-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
            : "border-white/10 bg-white/[0.04] backdrop-blur-sm"
        }`}
        style={
          isActive
            ? { boxShadow: `0 28px 60px ${accent}33, 0 12px 40px rgba(0,0,0,0.4)` }
            : undefined
        }
      >
        <div className="aspect-[3/4] overflow-hidden rounded-sm bg-white shadow-inner ring-1 ring-black/5">
          <InvoiceDocument
            templateId={template.id}
            data={GALLERY_INVOICE_DATA}
            gallery
            accentColor={accent}
          />
        </div>
      </div>
    </div>
  );
}
