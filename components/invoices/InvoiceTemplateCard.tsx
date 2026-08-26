"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceTemplateMeta } from "@/lib/invoice-templates";
import {
  getTemplateColor,
  saveTemplatePreference,
} from "@/lib/invoice-templates";
import { InvoiceDocument } from "@/components/invoices/InvoiceDocument";
import { GALLERY_INVOICE_DATA } from "@/components/invoices/invoice-preview-types";

interface InvoiceTemplateCardProps {
  template: InvoiceTemplateMeta;
}

export function InvoiceTemplateCard({ template }: InvoiceTemplateCardProps) {
  const router = useRouter();
  const [colorId, setColorId] = useState(template.defaultColorId);
  const selectedColor = getTemplateColor(template, colorId);

  const handleUse = () => {
    saveTemplatePreference(template.id, colorId);
    router.push(
      `/dashboard/invoices/new?template=${template.id}&color=${colorId}`
    );
  };

  return (
    <article className="flex flex-col">
      <div className="mb-4 min-h-[4.5rem]">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-navy tracking-tight">
            {template.name}
          </h3>
          {template.badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-navy/[0.06] text-navy px-2 py-0.5 rounded-full">
              {template.badge}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>

      <div className="rounded-2xl bg-[#e8eef4] px-4 pt-5 pb-4 sm:px-5 sm:pt-6 sm:pb-5">
        <div className="mx-auto w-full max-w-[240px]">
          {/* Single white sheet — header, table, totals, footer all live inside */}
          <div className="aspect-[3/4] bg-white rounded-sm shadow-[0_8px_28px_rgba(34,46,77,0.14)] overflow-hidden ring-1 ring-black/[0.04]">
            <InvoiceDocument
              templateId={template.id}
              data={GALLERY_INVOICE_DATA}
              gallery
              accentColor={selectedColor.accent}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {template.colors.map((color) => {
              const active = colorId === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  title={color.label}
                  onClick={() => setColorId(color.id)}
                  className={`w-5 h-5 rounded-full shrink-0 transition-all ring-2 ring-offset-2 ring-offset-[#e8eef4] ${
                    active ? "ring-navy scale-110" : "ring-transparent hover:ring-navy/25"
                  }`}
                  style={{ background: color.accent }}
                  aria-label={`${template.name} — ${color.label}`}
                  aria-pressed={active}
                />
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleUse}
            className="shrink-0 text-sm font-normal text-navy hover:text-navy/80 transition-colors"
          >
            Use template
          </button>
        </div>
      </div>
    </article>
  );
}
