export type InvoiceTemplateCategory =
  | "all"
  | "simple"
  | "modern"
  | "classic"
  | "signature";

export interface InvoiceTemplateColor {
  id: string;
  label: string;
  accent: string;
}

export interface InvoiceTemplateMeta {
  id: string;
  name: string;
  description: string;
  category: Exclude<InvoiceTemplateCategory, "all">;
  accent: string;
  colors: InvoiceTemplateColor[];
  defaultColorId: string;
  badge?: string;
}

export const INVOICE_TEMPLATE_KEY = "firmstack_invoice_template";
export const INVOICE_TEMPLATE_COLOR_KEY = "firmstack_invoice_template_color";

export const TEMPLATE_CATEGORIES: {
  id: InvoiceTemplateCategory;
  label: string;
}[] = [
  { id: "all", label: "All Templates" },
  { id: "simple", label: "Simple" },
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "signature", label: "With Signature" },
];

function palette(
  colors: InvoiceTemplateColor[],
  defaultId: string
): Pick<InvoiceTemplateMeta, "colors" | "defaultColorId" | "accent"> {
  const fallback = colors[0];
  const chosen = colors.find((c) => c.id === defaultId) ?? fallback;
  return {
    colors,
    defaultColorId: chosen.id,
    accent: chosen.accent,
  };
}

/** 12 real invoice layout styles — rendered as React, not images */
export const INVOICE_TEMPLATES: InvoiceTemplateMeta[] = [
  {
    id: "firmstack",
    name: "Firmstack",
    description: "Clean navy header — the default Firmstack look.",
    category: "modern",
    badge: "Default",
    ...palette(
      [
        { id: "navy", label: "Navy", accent: "#222e4d" },
        { id: "slate", label: "Slate", accent: "#334155" },
        { id: "indigo", label: "Indigo", accent: "#3730a3" },
        { id: "teal", label: "Teal", accent: "#0f766e" },
        { id: "charcoal", label: "Charcoal", accent: "#1f2937" },
      ],
      "navy"
    ),
  },
  {
    id: "minimal-gold",
    name: "Minimal Gold",
    description: "Elegant white layout with gold accent bars.",
    category: "simple",
    ...palette(
      [
        { id: "gold", label: "Gold", accent: "#d4a017" },
        { id: "amber", label: "Amber", accent: "#b45309" },
        { id: "bronze", label: "Bronze", accent: "#92400e" },
        { id: "sand", label: "Sand", accent: "#ca8a04" },
      ],
      "gold"
    ),
  },
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Bold blue header with structured billing columns.",
    category: "modern",
    ...palette(
      [
        { id: "blue", label: "Blue", accent: "#0284c7" },
        { id: "sky", label: "Sky", accent: "#0ea5e9" },
        { id: "cyan", label: "Cyan", accent: "#0891b2" },
        { id: "navy", label: "Navy", accent: "#1e3a8a" },
      ],
      "blue"
    ),
  },
  {
    id: "service-pro",
    name: "Service Pro",
    description: "Professional service invoice with teal table header.",
    category: "modern",
    ...palette(
      [
        { id: "teal", label: "Teal", accent: "#14b8a6" },
        { id: "emerald", label: "Emerald", accent: "#059669" },
        { id: "navy", label: "Navy", accent: "#222e4d" },
        { id: "blue", label: "Blue", accent: "#2563eb" },
      ],
      "teal"
    ),
  },
  {
    id: "classic-grid",
    name: "Classic Grid",
    description: "Traditional spreadsheet-style with clear borders.",
    category: "classic",
    ...palette(
      [
        { id: "blue", label: "Blue", accent: "#1e40af" },
        { id: "navy", label: "Navy", accent: "#1e3a8a" },
        { id: "slate", label: "Slate", accent: "#475569" },
        { id: "green", label: "Green", accent: "#166534" },
      ],
      "blue"
    ),
  },
  {
    id: "clean-slate",
    name: "Clean Slate",
    description: "Ultra-minimal gray lines — quiet and readable.",
    category: "simple",
    ...palette(
      [
        { id: "slate", label: "Slate", accent: "#64748b" },
        { id: "gray", label: "Gray", accent: "#6b7280" },
        { id: "navy", label: "Navy", accent: "#334155" },
        { id: "teal", label: "Teal", accent: "#0d9488" },
      ],
      "slate"
    ),
  },
  {
    id: "bold-navy",
    name: "Bold Navy",
    description: "Strong navy bars and high-contrast totals.",
    category: "modern",
    ...palette(
      [
        { id: "navy", label: "Navy", accent: "#222e4d" },
        { id: "midnight", label: "Midnight", accent: "#0f172a" },
        { id: "indigo", label: "Indigo", accent: "#312e81" },
        { id: "blue", label: "Blue", accent: "#1d4ed8" },
      ],
      "navy"
    ),
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Fresh green accents for modern service businesses.",
    category: "modern",
    ...palette(
      [
        { id: "emerald", label: "Emerald", accent: "#059669" },
        { id: "green", label: "Green", accent: "#16a34a" },
        { id: "teal", label: "Teal", accent: "#0d9488" },
        { id: "lime", label: "Lime", accent: "#65a30d" },
      ],
      "emerald"
    ),
  },
  {
    id: "coral",
    name: "Coral",
    description: "Warm coral highlights with soft cream sections.",
    category: "simple",
    ...palette(
      [
        { id: "coral", label: "Coral", accent: "#e11d48" },
        { id: "rose", label: "Rose", accent: "#f43f5e" },
        { id: "orange", label: "Orange", accent: "#ea580c" },
        { id: "pink", label: "Pink", accent: "#db2777" },
      ],
      "coral"
    ),
  },
  {
    id: "mono",
    name: "Mono Ink",
    description: "Black-and-white typographic invoice, sharp and clear.",
    category: "classic",
    ...palette(
      [
        { id: "black", label: "Black", accent: "#171717" },
        { id: "charcoal", label: "Charcoal", accent: "#404040" },
        { id: "slate", label: "Slate", accent: "#525252" },
      ],
      "black"
    ),
  },
  {
    id: "split",
    name: "Split Panel",
    description: "Two-column header with left brand panel.",
    category: "modern",
    ...palette(
      [
        { id: "navy", label: "Navy", accent: "#222e4d" },
        { id: "blue", label: "Blue", accent: "#3388ff" },
        { id: "indigo", label: "Indigo", accent: "#4338ca" },
        { id: "teal", label: "Teal", accent: "#0f766e" },
      ],
      "navy"
    ),
  },
  {
    id: "sky",
    name: "Soft Sky",
    description: "Light airy blues for a friendly, open feel.",
    category: "simple",
    ...palette(
      [
        { id: "sky", label: "Sky", accent: "#0ea5e9" },
        { id: "blue", label: "Blue", accent: "#3b82f6" },
        { id: "cyan", label: "Cyan", accent: "#06b6d4" },
        { id: "indigo", label: "Indigo", accent: "#6366f1" },
      ],
      "sky"
    ),
  },
  {
    id: "signed-firmstack",
    name: "Firmstack Signed",
    description: "Default navy layout with authorized signature block.",
    category: "signature",
    ...palette(
      [
        { id: "navy", label: "Navy", accent: "#222e4d" },
        { id: "slate", label: "Slate", accent: "#334155" },
        { id: "indigo", label: "Indigo", accent: "#3730a3" },
        { id: "teal", label: "Teal", accent: "#0f766e" },
      ],
      "navy"
    ),
  },
  {
    id: "signed-minimal-gold",
    name: "Minimal Gold Signed",
    description: "Gold-accent invoice with signature and date lines.",
    category: "signature",
    ...palette(
      [
        { id: "gold", label: "Gold", accent: "#d4a017" },
        { id: "amber", label: "Amber", accent: "#b45309" },
        { id: "bronze", label: "Bronze", accent: "#92400e" },
        { id: "sand", label: "Sand", accent: "#ca8a04" },
      ],
      "gold"
    ),
  },
  {
    id: "signed-service-pro",
    name: "Service Pro Signed",
    description: "Professional service invoice with signature footer.",
    category: "signature",
    ...palette(
      [
        { id: "teal", label: "Teal", accent: "#14b8a6" },
        { id: "emerald", label: "Emerald", accent: "#059669" },
        { id: "navy", label: "Navy", accent: "#222e4d" },
        { id: "blue", label: "Blue", accent: "#2563eb" },
      ],
      "teal"
    ),
  },
];

export function resolveTemplateBaseId(id: string): string {
  if (id.startsWith("signed-")) return id.slice("signed-".length);
  return id;
}

export function templateHasSignature(id: string): boolean {
  return id.startsWith("signed-");
}

export function getTemplateById(id: string): InvoiceTemplateMeta {
  return INVOICE_TEMPLATES.find((t) => t.id === id) ?? INVOICE_TEMPLATES[0];
}

export function getTemplateColor(
  template: InvoiceTemplateMeta,
  colorId?: string | null
): InvoiceTemplateColor {
  if (!colorId) {
    return (
      template.colors.find((c) => c.id === template.defaultColorId) ??
      template.colors[0]
    );
  }
  return template.colors.find((c) => c.id === colorId) ?? template.colors[0];
}

export function saveTemplatePreference(templateId: string, colorId?: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(INVOICE_TEMPLATE_KEY, templateId);
  if (colorId) {
    window.sessionStorage.setItem(INVOICE_TEMPLATE_COLOR_KEY, colorId);
  }
}

export function loadTemplatePreference(): {
  templateId: string;
  colorId: string | null;
} {
  if (typeof window === "undefined") {
    return { templateId: "firmstack", colorId: null };
  }
  return {
    templateId:
      window.sessionStorage.getItem(INVOICE_TEMPLATE_KEY) ?? "firmstack",
    colorId: window.sessionStorage.getItem(INVOICE_TEMPLATE_COLOR_KEY),
  };
}
