export type InvoiceTemplateCategory =
  | "all"
  | "soft"
  | "bold"
  | "classic"
  | "modern"
  | "premium";

export type InvoicePaperVariant =
  | "solid-header"
  | "soft-header"
  | "banded"
  | "split"
  | "bordered"
  | "foil"
  | "framed"
  | "editorial"
  | "luxury-dark";

export interface InvoiceThemeTokens {
  /** Primary accent (swatches + totals emphasis) */
  accent: string;
  headerBg: string;
  headerText: string;
  headerMuted: string;
  pageBg: string;
  ink: string;
  muted: string;
  rule: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  totalBarBg: string;
  totalBarText: string;
  variant: InvoicePaperVariant;
  /** Thin metallic rule under header */
  foilLine?: string;
  /** Secondary accent strip under header */
  dualBand?: string;
  /** Outer paper tint with inset white card */
  frameInset?: boolean;
  /** Faint oversized INVOICE watermark */
  watermark?: boolean;
  /** Due date as a pill chip */
  dueChip?: boolean;
}

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
  theme: InvoiceThemeTokens;
}

export const INVOICE_TEMPLATE_KEY = "firmstack_invoice_template";
export const INVOICE_TEMPLATE_COLOR_KEY = "firmstack_invoice_template_color";

export const TEMPLATE_CATEGORIES: {
  id: InvoiceTemplateCategory;
  label: string;
}[] = [
  { id: "all", label: "All Templates" },
  { id: "premium", label: "Premium" },
  { id: "soft", label: "Soft fills" },
  { id: "bold", label: "Bold" },
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
];

function theme(
  partial: InvoiceThemeTokens
): InvoiceThemeTokens {
  return partial;
}

function solid(
  headerBg: string,
  accent: string,
  opts?: Partial<InvoiceThemeTokens>
): InvoiceThemeTokens {
  return theme({
    accent,
    headerBg,
    headerText: "#ffffff",
    headerMuted: "rgba(255,255,255,0.65)",
    pageBg: "#ffffff",
    ink: "#222e4d",
    muted: "rgba(34,46,77,0.55)",
    rule: "rgba(34,46,77,0.1)",
    tableHeaderBg: "rgba(34,46,77,0.04)",
    tableHeaderText: "rgba(34,46,77,0.45)",
    totalBarBg: headerBg,
    totalBarText: "#ffffff",
    variant: "solid-header",
    ...opts,
  });
}

function softFill(
  pageBg: string,
  headerBg: string,
  accent: string,
  ink = "#222e4d",
  opts?: Partial<InvoiceThemeTokens>
): InvoiceThemeTokens {
  return theme({
    accent,
    headerBg,
    headerText: ink,
    headerMuted: `${ink}99`,
    pageBg,
    ink,
    muted: `${ink}8f`,
    rule: `${ink}1a`,
    tableHeaderBg: headerBg,
    tableHeaderText: `${ink}99`,
    totalBarBg: accent,
    totalBarText: "#ffffff",
    variant: "soft-header",
    ...opts,
  });
}

function makeTemplate(
  meta: Omit<InvoiceTemplateMeta, "colors" | "defaultColorId" | "accent"> & {
    theme: InvoiceThemeTokens;
  }
): InvoiceTemplateMeta {
  const accent = meta.theme.accent;
  return {
    ...meta,
    accent,
    defaultColorId: "default",
    colors: [{ id: "default", label: "Default", accent }],
  };
}

/**
 * 30 professional invoice papers — one shared layout, themed colorways.
 * Old IDs kept where possible so saved preferences still resolve.
 */
export const INVOICE_TEMPLATES: InvoiceTemplateMeta[] = [
  makeTemplate({
    id: "firmstack",
    name: "Firmstack Navy",
    description: "Signature navy header — serious B2B default.",
    category: "bold",
    badge: "Default",
    theme: solid("#222e4d", "#222e4d"),
  }),
  makeTemplate({
    id: "bold-navy",
    name: "Bold Midnight",
    description: "Deep midnight header with high-contrast totals.",
    category: "bold",
    theme: solid("#0f172a", "#0f172a"),
  }),
  makeTemplate({
    id: "modern-blue",
    name: "Modern Cobalt",
    description: "Strong cobalt header for tech and SaaS teams.",
    category: "modern",
    theme: solid("#1e3a8a", "#2563eb"),
  }),
  makeTemplate({
    id: "sky",
    name: "Soft Sky",
    description: "Light sky fill with clear invoice structure.",
    category: "soft",
    theme: softFill("#f0f9ff", "#dbeafe", "#0284c7"),
  }),
  makeTemplate({
    id: "ice-blue",
    name: "Ice Blue",
    description: "Cool ice paper with slate ink.",
    category: "soft",
    theme: softFill("#f8fbff", "#e8f1fb", "#3b82f6"),
  }),
  makeTemplate({
    id: "apricot-sky",
    name: "Apricot Sky",
    description: "Light yellow paper with soft blue accents.",
    category: "soft",
    badge: "New",
    theme: softFill("#fffbeb", "#dbeafe", "#2563eb", "#1e293b"),
  }),
  makeTemplate({
    id: "soft-lemon",
    name: "Soft Lemon",
    description: "Warm lemon fill paired with calm blue totals.",
    category: "soft",
    theme: softFill("#fefce8", "#fef08a", "#0284c7", "#1e293b"),
  }),
  makeTemplate({
    id: "minimal-gold",
    name: "Minimal Gold",
    description: "Cream paper with gold emphasis on totals.",
    category: "classic",
    theme: softFill("#fffdf7", "#f5ecd7", "#b45309", "#1c1917"),
  }),
  makeTemplate({
    id: "honey-cream",
    name: "Honey Cream",
    description: "Soft honey header for warm professional brands.",
    category: "soft",
    theme: softFill("#fffaf0", "#fde68a", "#d97706"),
  }),
  makeTemplate({
    id: "sand",
    name: "Desert Sand",
    description: "Muted sand tones — quiet and executive.",
    category: "soft",
    theme: softFill("#faf7f2", "#ede4d7", "#92400e"),
  }),
  makeTemplate({
    id: "emerald",
    name: "Emerald",
    description: "Fresh emerald header for growth-focused firms.",
    category: "modern",
    theme: solid("#065f46", "#059669"),
  }),
  makeTemplate({
    id: "mint-paper",
    name: "Mint Paper",
    description: "Soft mint fill with forest accent totals.",
    category: "soft",
    theme: softFill("#f0fdf4", "#dcfce7", "#047857"),
  }),
  makeTemplate({
    id: "forest",
    name: "Forest Ledger",
    description: "Deep forest header for established practices.",
    category: "bold",
    theme: solid("#14532d", "#166534"),
  }),
  makeTemplate({
    id: "service-pro",
    name: "Service Teal",
    description: "Professional teal — built for service invoices.",
    category: "modern",
    theme: solid("#0f766e", "#14b8a6"),
  }),
  makeTemplate({
    id: "ocean",
    name: "Ocean Band",
    description: "Ocean blue with a matching totals band.",
    category: "modern",
    theme: solid("#0e7490", "#0891b2"),
  }),
  makeTemplate({
    id: "coral",
    name: "Coral Formal",
    description: "Warm coral header that still reads corporate.",
    category: "modern",
    theme: solid("#9f1239", "#e11d48"),
  }),
  makeTemplate({
    id: "blush",
    name: "Blush Paper",
    description: "Soft blush fill with rose accent totals.",
    category: "soft",
    theme: softFill("#fff1f2", "#ffe4e6", "#be123c"),
  }),
  makeTemplate({
    id: "rose-quartz",
    name: "Rose Quartz",
    description: "Dusty rose paper for boutique brands.",
    category: "soft",
    theme: softFill("#fdf2f8", "#fce7f3", "#9d174d"),
  }),
  makeTemplate({
    id: "lavender",
    name: "Lavender Bill",
    description: "Light lavender with indigo totals.",
    category: "soft",
    theme: softFill("#f5f3ff", "#ede9fe", "#4f46e5"),
  }),
  makeTemplate({
    id: "plum",
    name: "Plum Executive",
    description: "Deep plum header for premium services.",
    category: "bold",
    theme: solid("#581c87", "#7e22ce"),
  }),
  makeTemplate({
    id: "indigo",
    name: "Indigo Press",
    description: "Rich indigo — sharp and contemporary.",
    category: "bold",
    theme: solid("#312e81", "#4338ca"),
  }),
  makeTemplate({
    id: "clean-slate",
    name: "Clean Slate",
    description: "Quiet gray paper — maximum readability.",
    category: "classic",
    theme: softFill("#f8fafc", "#e2e8f0", "#475569"),
  }),
  makeTemplate({
    id: "fog",
    name: "Fog Ledger",
    description: "Cool fog tones with charcoal ink.",
    category: "soft",
    theme: softFill("#f1f5f9", "#e2e8f0", "#334155"),
  }),
  makeTemplate({
    id: "charcoal",
    name: "Charcoal",
    description: "Charcoal header for high-contrast billing.",
    category: "bold",
    theme: solid("#1f2937", "#374151"),
  }),
  makeTemplate({
    id: "mono",
    name: "Mono Ink",
    description: "Black-and-white typographic invoice.",
    category: "classic",
    theme: solid("#171717", "#171717", {
      pageBg: "#ffffff",
      tableHeaderBg: "#f5f5f5",
    }),
  }),
  makeTemplate({
    id: "classic-grid",
    name: "Classic Grid",
    description: "Bordered formal layout for traditional firms.",
    category: "classic",
    theme: theme({
      accent: "#1e40af",
      headerBg: "#1e40af",
      headerText: "#ffffff",
      headerMuted: "rgba(255,255,255,0.7)",
      pageBg: "#ffffff",
      ink: "#1e293b",
      muted: "rgba(30,41,59,0.55)",
      rule: "rgba(30,64,175,0.25)",
      tableHeaderBg: "#eff6ff",
      tableHeaderText: "#1e40af",
      totalBarBg: "#1e40af",
      totalBarText: "#ffffff",
      variant: "bordered",
    }),
  }),
  makeTemplate({
    id: "split",
    name: "Split Panel",
    description: "Left brand panel with full invoice body.",
    category: "modern",
    theme: theme({
      accent: "#222e4d",
      headerBg: "#222e4d",
      headerText: "#ffffff",
      headerMuted: "rgba(255,255,255,0.65)",
      pageBg: "#ffffff",
      ink: "#222e4d",
      muted: "rgba(34,46,77,0.55)",
      rule: "rgba(34,46,77,0.1)",
      tableHeaderBg: "rgba(34,46,77,0.05)",
      tableHeaderText: "rgba(34,46,77,0.45)",
      totalBarBg: "#222e4d",
      totalBarText: "#ffffff",
      variant: "split",
    }),
  }),
  makeTemplate({
    id: "banded-navy",
    name: "Banded Navy",
    description: "Navy header and footer bands — framed document.",
    category: "classic",
    theme: theme({
      accent: "#222e4d",
      headerBg: "#222e4d",
      headerText: "#ffffff",
      headerMuted: "rgba(255,255,255,0.65)",
      pageBg: "#ffffff",
      ink: "#222e4d",
      muted: "rgba(34,46,77,0.55)",
      rule: "rgba(34,46,77,0.1)",
      tableHeaderBg: "rgba(34,46,77,0.04)",
      tableHeaderText: "rgba(34,46,77,0.45)",
      totalBarBg: "#222e4d",
      totalBarText: "#ffffff",
      variant: "banded",
    }),
  }),
  makeTemplate({
    id: "sage",
    name: "Sage Formal",
    description: "Muted sage paper for calm professional billing.",
    category: "soft",
    theme: softFill("#f6f7f4", "#e7ebe3", "#3f6212"),
  }),
  makeTemplate({
    id: "slate-blue",
    name: "Slate Blue",
    description: "Slate-blue fill — modern and restrained.",
    category: "soft",
    theme: softFill("#f1f5f9", "#dbe4f0", "#1e3a5f"),
  }),

  // ── Premium collection (20) — foil, frame, dual-band, editorial, luxury ──
  makeTemplate({
    id: "obsidian-gold",
    name: "Obsidian Gold",
    description: "Black header with gold foil rule — boardroom premium.",
    category: "premium",
    badge: "Premium",
    theme: solid("#0a0a0a", "#c9a227", {
      variant: "foil",
      foilLine: "#c9a227",
      totalBarBg: "#c9a227",
      totalBarText: "#0a0a0a",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "champagne",
    name: "Champagne",
    description: "Ivory framed paper with champagne accents.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#f7f1e8", "#efe2cf", "#b08d57", "#1c1917", {
      variant: "framed",
      frameInset: true,
      foilLine: "#c9a227",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "burgundy-ledger",
    name: "Burgundy Ledger",
    description: "Deep burgundy with cream body — wine-country formal.",
    category: "premium",
    badge: "Premium",
    theme: solid("#6b1d2a", "#8b2942", {
      variant: "luxury-dark",
      pageBg: "#faf6f2",
      foilLine: "#d4a574",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "copper-press",
    name: "Copper Press",
    description: "Warm copper foil on espresso header.",
    category: "premium",
    badge: "Premium",
    theme: solid("#1c1410", "#b87333", {
      variant: "foil",
      foilLine: "#b87333",
      totalBarBg: "#b87333",
      pageBg: "#fcfaf8",
    }),
  }),
  makeTemplate({
    id: "pearl-navy",
    name: "Pearl Navy",
    description: "Pearl paper, navy ink, silver dual-band.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#f7f8fa", "#e8ecf2", "#222e4d", "#222e4d", {
      variant: "foil",
      dualBand: "#94a3b8",
      foilLine: "#cbd5e1",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "emerald-estate",
    name: "Emerald Estate",
    description: "Estate green with brass foil — private client feel.",
    category: "premium",
    badge: "Premium",
    theme: solid("#0b3d2e", "#c2a15a", {
      variant: "foil",
      foilLine: "#c2a15a",
      totalBarBg: "#c2a15a",
      totalBarText: "#0b3d2e",
      pageBg: "#f4f7f5",
    }),
  }),
  makeTemplate({
    id: "noir-editorial",
    name: "Noir Editorial",
    description: "Editorial watermark + stark mono luxury.",
    category: "premium",
    badge: "Premium",
    theme: solid("#111111", "#111111", {
      variant: "editorial",
      watermark: true,
      foilLine: "#e5e5e5",
      pageBg: "#fafafa",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "royal-indigo",
    name: "Royal Indigo",
    description: "Royal indigo with gold chip and dual band.",
    category: "premium",
    badge: "Premium",
    theme: solid("#1e1b4b", "#c9a227", {
      variant: "foil",
      dualBand: "#312e81",
      foilLine: "#c9a227",
      dueChip: true,
      totalBarBg: "#c9a227",
      totalBarText: "#1e1b4b",
    }),
  }),
  makeTemplate({
    id: "ivory-frame",
    name: "Ivory Frame",
    description: "Double-frame ivory stationery look.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#f3eee6", "#ebe4d8", "#5c4a32", "#1c1917", {
      variant: "framed",
      frameInset: true,
      foilLine: "#a16207",
    }),
  }),
  makeTemplate({
    id: "platinum",
    name: "Platinum",
    description: "Cool platinum metals on slate — fintech premium.",
    category: "premium",
    badge: "Premium",
    theme: solid("#334155", "#94a3b8", {
      variant: "foil",
      foilLine: "#e2e8f0",
      dualBand: "#64748b",
      totalBarBg: "#0f172a",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "rosewood",
    name: "Rosewood",
    description: "Rosewood header with soft blush paper.",
    category: "premium",
    badge: "Premium",
    theme: solid("#4a192c", "#c4a484", {
      variant: "luxury-dark",
      pageBg: "#fbf7f5",
      foilLine: "#c4a484",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "arctic-foil",
    name: "Arctic Foil",
    description: "Ice paper with silver foil and navy totals.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#f5f9fc", "#e2eef7", "#0f172a", "#0f172a", {
      variant: "foil",
      foilLine: "#94a3b8",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "vermillion-press",
    name: "Vermillion Press",
    description: "Deep vermillion with cream — bold luxury print.",
    category: "premium",
    badge: "Premium",
    theme: solid("#7f1d1d", "#f59e0b", {
      variant: "foil",
      foilLine: "#f59e0b",
      pageBg: "#fffbeb",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "graphite-gold",
    name: "Graphite Gold",
    description: "Graphite body frame with gold total bar.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#eceff3", "#d7dde5", "#b45309", "#111827", {
      variant: "framed",
      frameInset: true,
      foilLine: "#d4a017",
      totalBarBg: "#d4a017",
      totalBarText: "#111827",
    }),
  }),
  makeTemplate({
    id: "sapphire-crest",
    name: "Sapphire Crest",
    description: "Sapphire crest header with silver dual-band.",
    category: "premium",
    badge: "Premium",
    theme: solid("#1e3a8a", "#93c5fd", {
      variant: "foil",
      dualBand: "#1e40af",
      foilLine: "#bfdbfe",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "mocha-atelier",
    name: "Mocha Atelier",
    description: "Mocha atelier tones — design-studio premium.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#f5efe8", "#e8ddd0", "#78350f", "#1c1917", {
      variant: "framed",
      frameInset: true,
      foilLine: "#a16207",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "jade-seal",
    name: "Jade Seal",
    description: "Jade seal with gold chip — East-meets-boardroom.",
    category: "premium",
    badge: "Premium",
    theme: solid("#115e59", "#d4a017", {
      variant: "foil",
      foilLine: "#d4a017",
      dueChip: true,
      totalBarBg: "#d4a017",
      totalBarText: "#115e59",
      pageBg: "#f0fdfa",
    }),
  }),
  makeTemplate({
    id: "ink-watermark",
    name: "Ink Watermark",
    description: "Faint INVOICE watermark — letterpress editorial.",
    category: "premium",
    badge: "Premium",
    theme: softFill("#fafaf9", "#f5f5f4", "#1c1917", "#1c1917", {
      variant: "editorial",
      watermark: true,
      foilLine: "#a8a29e",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "amber-vault",
    name: "Amber Vault",
    description: "Amber vault header on warm cream paper.",
    category: "premium",
    badge: "Premium",
    theme: solid("#92400e", "#fbbf24", {
      variant: "luxury-dark",
      pageBg: "#fffbeb",
      foilLine: "#fbbf24",
      dualBand: "#b45309",
      dueChip: true,
    }),
  }),
  makeTemplate({
    id: "steel-orchid",
    name: "Steel Orchid",
    description: "Steel orchid — muted violet luxury with silver foil.",
    category: "premium",
    badge: "Premium",
    theme: solid("#4c1d95", "#c4b5fd", {
      variant: "foil",
      foilLine: "#ddd6fe",
      dualBand: "#5b21b6",
      pageBg: "#faf5ff",
      dueChip: true,
    }),
  }),
];

/** Map legacy / signed template IDs onto the rebuilt set */
const LEGACY_TEMPLATE_ALIASES: Record<string, string> = {
  "signed-firmstack": "firmstack",
  "signed-minimal-gold": "minimal-gold",
  "signed-service-pro": "service-pro",
};

export function resolveTemplateBaseId(id: string): string {
  if (LEGACY_TEMPLATE_ALIASES[id]) return LEGACY_TEMPLATE_ALIASES[id];
  if (id.startsWith("signed-")) return id.slice("signed-".length);
  return id;
}

/** Every rebuilt template includes a signature block */
export function templateHasSignature(_id: string): boolean {
  return true;
}

export function getTemplateById(id: string): InvoiceTemplateMeta {
  const resolved = resolveTemplateBaseId(id);
  return (
    INVOICE_TEMPLATES.find((t) => t.id === resolved) ?? INVOICE_TEMPLATES[0]
  );
}

export function getTemplateTheme(id: string): InvoiceThemeTokens {
  return getTemplateById(id).theme;
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

/** Apply a swatch accent override onto the base theme */
export function themeWithAccent(
  base: InvoiceThemeTokens,
  accent?: string | null
): InvoiceThemeTokens {
  if (!accent) return base;
  if (
    base.variant === "soft-header" ||
    base.variant === "framed" ||
    base.variant === "editorial"
  ) {
    return { ...base, accent, totalBarBg: accent };
  }
  if (base.variant === "foil" || base.variant === "luxury-dark") {
    return {
      ...base,
      accent,
      foilLine: accent,
      totalBarBg: accent,
    };
  }
  return {
    ...base,
    accent,
    headerBg: accent,
    totalBarBg: accent,
  };
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
  const raw =
    window.sessionStorage.getItem(INVOICE_TEMPLATE_KEY) ?? "firmstack";
  return {
    templateId: resolveTemplateBaseId(raw),
    colorId: window.sessionStorage.getItem(INVOICE_TEMPLATE_COLOR_KEY),
  };
}
