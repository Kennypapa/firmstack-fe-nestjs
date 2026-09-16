"use client";

import type { InvoiceDocumentData } from "./invoice-preview-types";
import {
  getTemplateTheme,
  themeWithAccent,
  type InvoiceThemeTokens,
} from "@/lib/invoice-templates";

interface InvoiceDocumentProps {
  templateId: string;
  data: InvoiceDocumentData;
  /** Smaller type for gallery thumbnails */
  compact?: boolean;
  /** Tight gallery thumbnail — fits inside preview card */
  gallery?: boolean;
  /** Override the template accent color (gallery color swatches) */
  accentColor?: string;
  /** @deprecated use gallery mode instead */
  fillContainer?: boolean;
  /** Signature always on; kept for API compatibility */
  showSignature?: boolean;
}

function BrandMark({
  company,
  logo,
  gallery,
  color,
}: {
  company: string;
  logo: string | null;
  gallery?: boolean;
  color: string;
}) {
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={company}
        className={
          gallery
            ? "h-5 w-auto max-w-[72px] object-contain"
            : "h-9 w-auto max-w-[140px] object-contain"
        }
      />
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`rounded-sm ${gallery ? "h-3.5 w-3.5" : "h-5 w-5"}`}
        style={{ background: color }}
        aria-hidden
      />
      <span className={gallery ? "text-[9px] font-bold" : "text-sm font-bold"}>
        {company}
      </span>
    </div>
  );
}

function formatDisplayDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SignatureFooter({
  data,
  theme,
  gallery,
}: {
  data: InvoiceDocumentData;
  theme: InvoiceThemeTokens;
  gallery?: boolean;
}) {
  const name = data.signerName?.trim() || "Alex Morgan";
  const title = data.signerTitle?.trim() || "Founder";

  return (
    <div
      className={`mt-auto flex items-end justify-between gap-3 border-t border-dashed ${
        gallery ? "pt-1.5" : "pt-4"
      }`}
      style={{ borderColor: theme.rule }}
    >
      <div className="min-w-0">
        <p
          className={`font-semibold uppercase tracking-wider ${
            gallery ? "text-[5px]" : "text-[9px]"
          }`}
          style={{ color: theme.muted }}
        >
          Authorized signature
        </p>
        {data.signatureImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.signatureImage}
            alt={name}
            className={
              gallery
                ? "mt-0.5 h-4 w-auto max-w-[56px] object-contain"
                : "mt-2 h-10 w-auto max-w-[140px] object-contain"
            }
          />
        ) : (
          <p
            className={`italic font-serif ${
              gallery ? "mt-1 text-[8px]" : "mt-3 text-sm"
            }`}
            style={{ color: `${theme.ink}66` }}
          >
            {name}
          </p>
        )}
        <div
          className={`border-b ${gallery ? "mt-0.5 w-14" : "mt-1 w-28"}`}
          style={{ borderColor: theme.accent }}
        />
        <p
          className={`font-medium ${gallery ? "mt-0.5 text-[6px]" : "mt-1 text-[10px]"}`}
          style={{ color: theme.ink }}
        >
          {name}
          {!gallery && title ? ` · ${title}` : ""}
        </p>
        {!gallery && (
          <p className="text-[9px]" style={{ color: theme.muted }}>
            {title}
          </p>
        )}
      </div>
      <div className="text-right shrink-0">
        <p
          className={`font-semibold uppercase tracking-wider ${
            gallery ? "text-[5px]" : "text-[9px]"
          }`}
          style={{ color: theme.muted }}
        >
          Date
        </p>
        <p
          className={gallery ? "mt-2 text-[6px]" : "mt-5 text-[10px]"}
          style={{ color: theme.ink }}
        >
          {formatDisplayDate(data.invoiceDate)}
        </p>
        <div
          className={`ml-auto border-b ${gallery ? "mt-0.5 w-10" : "mt-1 w-20"}`}
          style={{ borderColor: theme.rule }}
        />
        <p
          className={gallery ? "mt-1 text-[5px]" : "mt-2 text-[9px]"}
          style={{ color: theme.muted }}
        >
          Thank you for your business
        </p>
      </div>
    </div>
  );
}

function ProfessionalInvoicePaper({
  data,
  theme,
  gallery,
  compact,
  fillContainer,
}: {
  data: InvoiceDocumentData;
  theme: InvoiceThemeTokens;
  gallery?: boolean;
  compact?: boolean;
  fillContainer?: boolean;
}) {
  const company = data.companyName ?? "Firmstack";
  const email = data.companyEmail ?? "invoices@firmstack.com";
  const logo = data.companyLogo ?? null;
  const g = !!gallery;
  const pad = g ? "px-2 py-1.5" : compact ? "px-3 py-3" : "px-5 py-4";
  const label = g
    ? "text-[5px] font-semibold uppercase tracking-wider"
    : "text-[9px] font-semibold uppercase tracking-wider";
  const body = g ? "text-[6.5px] leading-tight" : compact ? "text-[9px]" : "text-[11px]";
  const title = g ? "text-[9px]" : compact ? "text-sm" : "text-base";

  const soft = theme.variant === "soft-header" || theme.variant === "framed" || theme.variant === "editorial";
  const split = theme.variant === "split";
  const bordered = theme.variant === "bordered";
  const banded = theme.variant === "banded";
  const framed = !!theme.frameInset || theme.variant === "framed";

  const header = (
    <div className="relative shrink-0">
      <div
        className={`flex items-start justify-between gap-2 ${pad} ${
          soft && !theme.foilLine ? "border-b" : ""
        }`}
        style={{
          background: theme.headerBg,
          borderColor: soft ? theme.rule : undefined,
        }}
      >
        <div className="min-w-0">
          <div style={{ color: theme.headerText }}>
            <BrandMark
              company={company}
              logo={logo}
              gallery={g}
              color={soft ? theme.accent : theme.headerText}
            />
          </div>
          <p
            className={`mt-0.5 truncate ${g ? "text-[5.5px]" : "text-[10px]"}`}
            style={{ color: theme.headerMuted }}
          >
            {email}
          </p>
          {!g && data.companyPhone && (
            <p className="text-[9px]" style={{ color: theme.headerMuted }}>
              {data.companyPhone}
            </p>
          )}
          {!g && data.companyAddress && (
            <p className="text-[9px]" style={{ color: theme.headerMuted }}>
              {data.companyAddress}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p
            className={`font-semibold uppercase tracking-wider ${
              g ? "text-[7px]" : "text-xs"
            }`}
            style={{ color: theme.headerText }}
          >
            Invoice
          </p>
          <p
            className={g ? "mt-0.5 text-[5.5px]" : "mt-1 text-[10px]"}
            style={{ color: theme.headerMuted }}
          >
            #{data.invoiceNumber}
          </p>
          {theme.dueChip ? (
            <span
              className={`mt-1 inline-block rounded-full font-semibold ${
                g ? "px-1 py-0.5 text-[5px]" : "px-2 py-0.5 text-[9px]"
              }`}
              style={{
                background: theme.foilLine || theme.accent,
                color:
                  theme.variant === "soft-header" || theme.variant === "framed"
                    ? theme.ink
                    : theme.headerBg,
              }}
            >
              Due {formatDisplayDate(data.dueDate)}
            </span>
          ) : (
            <p
              className={g ? "text-[5.5px]" : "text-[10px]"}
              style={{ color: theme.headerMuted }}
            >
              Due {formatDisplayDate(data.dueDate)}
            </p>
          )}
          {!g && data.poNumber && (
            <p className="text-[9px]" style={{ color: theme.headerMuted }}>
              PO {data.poNumber}
            </p>
          )}
        </div>
      </div>
      {theme.dualBand && (
        <div
          className={g ? "h-0.5" : "h-1"}
          style={{ background: theme.dualBand }}
        />
      )}
      {theme.foilLine && (
        <div
          className={g ? "h-[1px]" : "h-[2px]"}
          style={{ background: theme.foilLine }}
        />
      )}
    </div>
  );

  const parties = (
    <div
      className={`grid grid-cols-2 gap-2 border-b ${pad}`}
      style={{ borderColor: theme.rule }}
    >
      <div className="min-w-0">
        <p className={label} style={{ color: theme.muted }}>
          Bill to
        </p>
        <p
          className={`mt-0.5 font-semibold truncate ${title}`}
          style={{ color: theme.ink }}
        >
          {data.clientName}
        </p>
        <p className={`truncate ${body}`} style={{ color: theme.muted }}>
          {data.clientEmail}
        </p>
        {!g && data.clientAddress && (
          <p className={body} style={{ color: theme.muted }}>
            {data.clientAddress}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className={label} style={{ color: theme.muted }}>
          Issue date
        </p>
        <p
          className={`mt-0.5 font-medium ${g ? "text-[6.5px]" : body}`}
          style={{ color: theme.ink }}
        >
          {formatDisplayDate(data.invoiceDate)}
        </p>
        {!g && data.companyTaxId && (
          <>
            <p className={`mt-2 ${label}`} style={{ color: theme.muted }}>
              Tax ID
            </p>
            <p className={body} style={{ color: theme.ink }}>
              {data.companyTaxId}
            </p>
          </>
        )}
      </div>
    </div>
  );

  const table = (
    <div className={`flex min-h-0 flex-1 flex-col ${pad} pt-1`}>
      <div
        className={`flex items-center ${g ? "px-1 py-0.5" : "px-2 py-1.5"}`}
        style={{ background: theme.tableHeaderBg }}
      >
        <span
          className={`flex-1 ${label}`}
          style={{ color: theme.tableHeaderText }}
        >
          Description
        </span>
        <span
          className={`${label} ${g ? "w-6 text-center" : "w-10 text-center"}`}
          style={{ color: theme.tableHeaderText }}
        >
          Qty
        </span>
        <span
          className={`${label} ${g ? "w-9 text-right" : "w-16 text-right"}`}
          style={{ color: theme.tableHeaderText }}
        >
          Price
        </span>
        <span
          className={`${label} ${g ? "w-9 text-right" : "w-16 text-right"}`}
          style={{ color: theme.tableHeaderText }}
        >
          Total
        </span>
      </div>
      <div
        className={`flex flex-1 flex-col ${
          fillContainer || g ? "justify-evenly" : ""
        }`}
      >
        {data.lineItems.map((item) => {
          const lineTotal = item.quantity * item.unitPrice;
          return (
            <div
              key={item.id}
              className={`flex items-center border-b ${
                g ? "py-0.5" : "py-2"
              }`}
              style={{ borderColor: theme.rule, color: theme.ink }}
            >
              <span className={`flex-1 truncate pr-1 font-medium ${body}`}>
                {item.description}
              </span>
              <span
                className={`${body} ${g ? "w-6 text-center" : "w-10 text-center"}`}
                style={{ color: theme.muted }}
              >
                {item.quantity}
              </span>
              <span
                className={`${body} ${g ? "w-9 text-right" : "w-16 text-right"}`}
                style={{ color: theme.muted }}
              >
                {data.formatAmount(item.unitPrice)}
              </span>
              <span
                className={`font-semibold ${body} ${
                  g ? "w-9 text-right" : "w-16 text-right"
                }`}
              >
                {data.formatAmount(lineTotal)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const totals = (
    <div className={`${pad} pt-0`}>
      <div className="flex justify-end">
        <div className={g ? "w-[42%]" : "w-48"}>
          <div
            className={`flex justify-between ${body}`}
            style={{ color: theme.muted }}
          >
            <span>Subtotal</span>
            <span>{data.formatAmount(data.subtotal)}</span>
          </div>
          {data.discountAmount > 0 && (
            <div
              className={`mt-0.5 flex justify-between ${body}`}
              style={{ color: theme.muted }}
            >
              <span>Discount</span>
              <span>-{data.formatAmount(data.discountAmount)}</span>
            </div>
          )}
          {data.tax > 0 && (
            <div
              className={`mt-0.5 flex justify-between ${body}`}
              style={{ color: theme.muted }}
            >
              <span>Tax{data.taxPercent ? ` (${data.taxPercent}%)` : ""}</span>
              <span>{data.formatAmount(data.tax)}</span>
            </div>
          )}
          <div
            className={`mt-1 flex justify-between font-bold ${
              g ? "rounded px-1 py-0.5 text-[7px]" : "rounded-md px-2.5 py-1.5 text-sm"
            }`}
            style={{
              background: theme.totalBarBg,
              color: theme.totalBarText,
            }}
          >
            <span>Total due</span>
            <span>{data.formatAmount(data.grandTotal)}</span>
          </div>
        </div>
      </div>
      {!g && (data.paymentTerms || data.paymentInstructions || data.notes) && (
        <div className="mt-3 space-y-1" style={{ color: theme.muted }}>
          {data.paymentTerms && (
            <p className="text-[9px]">
              <span className="font-semibold" style={{ color: theme.ink }}>
                Terms:{" "}
              </span>
              {data.paymentTerms}
            </p>
          )}
          {data.paymentInstructions && (
            <p className="text-[9px]">
              <span className="font-semibold" style={{ color: theme.ink }}>
                Pay:{" "}
              </span>
              {data.paymentInstructions}
            </p>
          )}
          {data.notes && <p className="text-[9px]">{data.notes}</p>}
        </div>
      )}
      <SignatureFooter data={data} theme={theme} gallery={g} />
    </div>
  );

  const sheet = (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden">
      {theme.watermark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className={`select-none font-bold uppercase tracking-[0.2em] opacity-[0.04] ${
              g ? "text-2xl" : "text-6xl"
            }`}
            style={{ color: theme.ink }}
          >
            Invoice
          </span>
        </div>
      )}
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {header}
        {parties}
        {table}
        {totals}
        {banded && (
          <div className="h-2 shrink-0" style={{ background: theme.headerBg }} />
        )}
      </div>
    </div>
  );

  if (split && !g) {
    return (
      <div
        className="flex h-full w-full overflow-hidden font-onest"
        style={{ background: theme.pageBg, color: theme.ink }}
      >
        <aside
          className="flex w-[28%] flex-col justify-between p-4 text-white"
          style={{ background: theme.headerBg }}
        >
          <div>
            <BrandMark
              company={company}
              logo={logo}
              color="#ffffff"
            />
            <p className="mt-3 text-[10px] text-white/65">{email}</p>
            {data.companyPhone && (
              <p className="text-[10px] text-white/65">{data.companyPhone}</p>
            )}
            {data.companyAddress && (
              <p className="mt-2 text-[10px] text-white/55">
                {data.companyAddress}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">
              Invoice
            </p>
            <p className="mt-1 text-[10px] text-white/60">
              #{data.invoiceNumber}
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className={`grid grid-cols-2 gap-2 border-b ${pad}`}
            style={{ borderColor: theme.rule }}
          >
            <div>
              <p className={label} style={{ color: theme.muted }}>
                Bill to
              </p>
              <p className={`mt-1 font-semibold ${title}`}>{data.clientName}</p>
              <p className={body} style={{ color: theme.muted }}>
                {data.clientEmail}
              </p>
            </div>
            <div className="text-right">
              <p className={label} style={{ color: theme.muted }}>
                Issue date
              </p>
              <p className={`mt-1 ${body}`}>
                {formatDisplayDate(data.invoiceDate)}
              </p>
              <p className={`mt-2 ${label}`} style={{ color: theme.muted }}>
                Due date
              </p>
              <p className={body}>{formatDisplayDate(data.dueDate)}</p>
            </div>
          </div>
          {table}
          {totals}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden font-onest ${
        bordered ? "ring-1" : ""
      } ${framed && !g ? (compact ? "p-2" : "p-3") : ""} ${
        framed && g ? "p-1" : ""
      }`}
      style={{
        background: framed ? theme.pageBg : theme.pageBg,
        color: theme.ink,
        boxShadow: bordered ? `inset 0 0 0 1px ${theme.rule}` : undefined,
      }}
    >
      {framed ? (
        <div
          className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white shadow-sm"
          style={{ boxShadow: `inset 0 0 0 1px ${theme.rule}` }}
        >
          {sheet}
        </div>
      ) : (
        sheet
      )}
    </div>
  );
}

export function InvoiceDocument({
  templateId,
  data,
  compact = false,
  gallery = false,
  accentColor,
  fillContainer = false,
}: InvoiceDocumentProps) {
  const baseTheme = getTemplateTheme(templateId);
  const theme = themeWithAccent(baseTheme, accentColor);

  return (
    <ProfessionalInvoicePaper
      data={data}
      theme={theme}
      gallery={gallery}
      compact={compact}
      fillContainer={fillContainer}
    />
  );
}
