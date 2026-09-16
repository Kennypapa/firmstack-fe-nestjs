export type CurrencyOption = {
  code: string;
  label: string;
  symbol: string;
};

/** Shared currency list for Settings + Create Invoice */
export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", label: "USD ($)", symbol: "$" },
  { code: "EUR", label: "EUR (€)", symbol: "€" },
  { code: "GBP", label: "GBP (£)", symbol: "£" },
  { code: "NGN", label: "NGN (₦)", symbol: "₦" },
  { code: "CAD", label: "CAD (C$)", symbol: "C$" },
  { code: "AUD", label: "AUD (A$)", symbol: "A$" },
  { code: "NZD", label: "NZD (NZ$)", symbol: "NZ$" },
  { code: "CHF", label: "CHF (Fr)", symbol: "Fr" },
  { code: "JPY", label: "JPY (¥)", symbol: "¥" },
  { code: "CNY", label: "CNY (¥)", symbol: "¥" },
  { code: "HKD", label: "HKD (HK$)", symbol: "HK$" },
  { code: "SGD", label: "SGD (S$)", symbol: "S$" },
  { code: "INR", label: "INR (₹)", symbol: "₹" },
  { code: "PKR", label: "PKR (Rs)", symbol: "Rs" },
  { code: "BDT", label: "BDT (৳)", symbol: "৳" },
  { code: "AED", label: "AED (د.إ)", symbol: "د.إ" },
  { code: "SAR", label: "SAR (﷼)", symbol: "﷼" },
  { code: "QAR", label: "QAR (ر.ق)", symbol: "ر.ق" },
  { code: "ZAR", label: "ZAR (R)", symbol: "R" },
  { code: "GHS", label: "GHS (GH₵)", symbol: "GH₵" },
  { code: "KES", label: "KES (KSh)", symbol: "KSh" },
  { code: "UGX", label: "UGX (USh)", symbol: "USh" },
  { code: "TZS", label: "TZS (TSh)", symbol: "TSh" },
  { code: "XOF", label: "XOF (CFA)", symbol: "CFA" },
  { code: "XAF", label: "XAF (FCFA)", symbol: "FCFA" },
  { code: "BRL", label: "BRL (R$)", symbol: "R$" },
  { code: "MXN", label: "MXN (MX$)", symbol: "MX$" },
  { code: "ARS", label: "ARS (AR$)", symbol: "AR$" },
  { code: "CLP", label: "CLP (CLP$)", symbol: "CLP$" },
  { code: "COP", label: "COP (COL$)", symbol: "COL$" },
  { code: "SEK", label: "SEK (kr)", symbol: "kr" },
  { code: "NOK", label: "NOK (kr)", symbol: "kr" },
  { code: "DKK", label: "DKK (kr)", symbol: "kr" },
  { code: "PLN", label: "PLN (zł)", symbol: "zł" },
  { code: "CZK", label: "CZK (Kč)", symbol: "Kč" },
  { code: "HUF", label: "HUF (Ft)", symbol: "Ft" },
  { code: "RON", label: "RON (lei)", symbol: "lei" },
  { code: "TRY", label: "TRY (₺)", symbol: "₺" },
  { code: "ILS", label: "ILS (₪)", symbol: "₪" },
  { code: "KRW", label: "KRW (₩)", symbol: "₩" },
  { code: "THB", label: "THB (฿)", symbol: "฿" },
  { code: "MYR", label: "MYR (RM)", symbol: "RM" },
  { code: "IDR", label: "IDR (Rp)", symbol: "Rp" },
  { code: "PHP", label: "PHP (₱)", symbol: "₱" },
  { code: "VND", label: "VND (₫)", symbol: "₫" },
];

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code + " ";
}
