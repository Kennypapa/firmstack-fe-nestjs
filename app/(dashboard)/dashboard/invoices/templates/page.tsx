"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  LayoutTemplate,
  Sparkles,
  Grid3X3,
  PenLine,
} from "lucide-react";
import {
  INVOICE_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type InvoiceTemplateCategory,
} from "@/lib/invoice-templates";
import { InvoiceTemplateCard } from "@/components/invoices/InvoiceTemplateCard";

const categoryIcons: Record<InvoiceTemplateCategory, typeof LayoutTemplate> = {
  all: LayoutTemplate,
  simple: Sparkles,
  modern: LayoutTemplate,
  classic: Grid3X3,
  signature: PenLine,
};

export default function InvoiceTemplatesPage() {
  const [activeCategory, setActiveCategory] =
    useState<InvoiceTemplateCategory>("all");
 
  const filtered = useMemo(() => {
    if (activeCategory === "all") return INVOICE_TEMPLATES;
    return INVOICE_TEMPLATES.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full font-onest">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Invoices
      </Link>

      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
          Invoice templates
        </h1>
        <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed">
          Choose a style for your invoices. Your live preview updates to match
          the template you select.
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto pb-2 mb-8 border-b border-gray-100 scrollbar-hide">
        {TEMPLATE_CATEGORIES.map((cat) => {
          const Icon = categoryIcons[cat.id];
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors -mb-px ${
                active
                  ? "border-b-navy text-navy font-semibold"
                  : "border-b-transparent text-muted-foreground font-medium hover:text-navy"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 pb-10">
        {filtered.map((template) => (
          <InvoiceTemplateCard key={template.id} template={template} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16 text-sm">
          No templates in this category yet.
        </p>
      )}
    </div>
  );
}
