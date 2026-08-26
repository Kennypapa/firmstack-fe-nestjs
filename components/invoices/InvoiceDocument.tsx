"use client";

import type { ReactNode } from "react";
import type { InvoiceDocumentData } from "./invoice-preview-types";
import {
  resolveTemplateBaseId,
  templateHasSignature,
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
  /** Show authorized signature block (auto for signed-* templates) */
  showSignature?: boolean;
}

function SignatureBlock({
  t,
  p,
  accent,
  gallery,
  signatureImage,
  signerName,
  signerTitle,
  signedDate,
}: {
  t: string;
  p: string;
  accent?: string;
  gallery?: boolean;
  signatureImage?: string | null;
  signerName?: string;
  signerTitle?: string;
  signedDate?: string;
}) {
  const lineColor = accent ?? "#94a3b8";
  const name = signerName?.trim() || "J. Morgan";
  const title = signerTitle?.trim() || "Director, Finance";

  if (gallery) {
    return (
      <div className="px-2 pb-1.5 pt-1 border-t border-gray-200 shrink-0 mt-auto">
        <div className={`flex justify-between gap-2 ${t}`}>
          <div>
            <p className="text-muted-foreground uppercase tracking-wide text-[6px]">
              Signature
            </p>
            {signatureImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signatureImage}
                alt=""
                className="h-5 w-auto max-w-[64px] object-contain mt-0.5"
              />
            ) : (
              <p className="text-[8px] text-navy/35 italic mt-1 font-serif">{name}</p>
            )}
            <div className="mt-0.5 border-b w-16" style={{ borderColor: lineColor }} />
          </div>
          <div className="text-right">
            <p className="text-muted-foreground uppercase tracking-wide text-[6px]">Date</p>
            <div className="mt-3 border-b w-12 ml-auto" style={{ borderColor: lineColor }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${p} pt-3 mt-auto border-t border-gray-100 shrink-0`}>
      <div className={`flex justify-between gap-4 ${t}`}>
        <div>
          <p className="text-muted-foreground uppercase tracking-wide text-[8px]">
            Authorized signature
          </p>
          {signatureImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={signatureImage}
              alt={name}
              className="h-10 w-auto max-w-[140px] object-contain mt-2"
            />
          ) : (
            <p className="text-sm text-navy/40 italic mt-3 font-serif">{name}</p>
          )}
          <div className="mt-1 border-b w-28" style={{ borderColor: lineColor }} />
          <p className="text-navy mt-1 text-[9px] font-medium">{name}</p>
          <p className="text-muted-foreground text-[8px]">{title}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground uppercase tracking-wide text-[8px]">Date</p>
          {signedDate ? (
            <p className="text-[10px] text-navy mt-6">{signedDate}</p>
          ) : null}
          <div
            className={`${signedDate ? "mt-1" : "mt-8"} border-b w-20 ml-auto`}
            style={{ borderColor: lineColor }}
          />
        </div>
      </div>
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
  showSignature,
}: InvoiceDocumentProps) {
  const company = data.companyName ?? "Firmstack";
  const email = data.companyEmail ?? "invoices@firmstack.com";
  const logo = data.companyLogo ?? null;
  const isGallery = gallery;
  const isCompact = compact || isGallery;
  const p = isGallery ? "px-2 py-1" : isCompact ? "p-3" : "p-5";
  const t = isGallery
    ? "text-[7px] leading-[1.25]"
    : isCompact
      ? "text-[9px]"
      : "text-[11px]";
  const h = isGallery ? "text-[10px] leading-tight" : isCompact ? "text-sm" : "text-lg";
  const props = {
    data,
    company,
    email,
    logo,
    p,
    t,
    h,
    accent: accentColor,
    gallery: isGallery,
    relaxedRows: fillContainer && isCompact && !isGallery,
  };

  const baseId = resolveTemplateBaseId(templateId);
  const withSignature = showSignature ?? templateHasSignature(templateId);

  let content: ReactNode;
  switch (baseId) {
    case "minimal-gold":
      content = <MinimalGold {...props} />;
      break;
    case "modern-blue":
      content = <ModernBlue {...props} />;
      break;
    case "service-pro":
      content = <ServicePro {...props} />;
      break;
    case "classic-grid":
      content = <ClassicGrid {...props} />;
      break;
    case "clean-slate":
      content = <CleanSlate {...props} />;
      break;
    case "bold-navy":
      content = <BoldNavy {...props} />;
      break;
    case "emerald":
      content = <Emerald {...props} />;
      break;
    case "coral":
      content = <Coral {...props} />;
      break;
    case "mono":
      content = <MonoInk {...props} />;
      break;
    case "split":
      content = <SplitPanel {...props} />;
      break;
    case "sky":
      content = <SoftSky {...props} />;
      break;
    case "firmstack":
    default:
      content = <FirmstackDefault {...props} />;
      break;
  }

  if (isGallery) {
    return (
      <div className="h-full w-full flex flex-col bg-white overflow-hidden font-onest pointer-events-none">
        {content}
        {withSignature && (
          <SignatureBlock
            t={t}
            p={p}
            accent={accentColor}
            gallery
            signatureImage={data.signatureImage}
            signerName={data.signerName}
            signerTitle={data.signerTitle}
            signedDate={data.invoiceDate}
          />
        )}
      </div>
    );
  }

  if (!fillContainer && !withSignature) {
    return content;
  }

  return (
    <div
      className={`flex flex-col w-full bg-white overflow-hidden font-onest ${
        fillContainer ? "h-full min-h-[300px]" : ""
      }`}
    >
      <div className={`flex flex-col flex-1 min-h-0 ${fillContainer ? "h-full" : ""}`}>
        {content}
      </div>
      {withSignature && (
        <SignatureBlock
          t={t}
          p={p}
          accent={accentColor}
          signatureImage={data.signatureImage}
          signerName={data.signerName}
          signerTitle={data.signerTitle}
          signedDate={data.invoiceDate}
        />
      )}
    </div>
  );
}

type StyleProps = {
  data: InvoiceDocumentData;
  company: string;
  email: string;
  logo: string | null;
  p: string;
  t: string;
  h: string;
  accent?: string;
  relaxedRows?: boolean;
  gallery?: boolean;
};

function BrandMark({
  company,
  logo,
  light,
  compact,
}: {
  company: string;
  logo: string | null;
  light?: boolean;
  compact?: boolean;
}) {
  const size = compact ? "h-6 max-w-[72px]" : "h-8 max-w-[96px]";
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={company}
        className={`${size} object-contain object-left`}
      />
    );
  }
  return (
    <span
      className={`font-bold ${compact ? "text-[8px]" : "text-sm"} ${
        light ? "text-white" : "text-navy"
      }`}
    >
      {company}
    </span>
  );
}

function TableHeader({ t, showNo }: { t: string; showNo?: boolean }) {
  return (
    <div
      className={`flex ${t} font-semibold text-muted-foreground uppercase border-b border-gray-200 bg-gray-50 px-1 py-0.5`}
    >
      {showNo && <span className="w-4 text-center shrink-0">#</span>}
      <span className="flex-1">Description</span>
      <span className="w-6 text-center shrink-0">Qty</span>
      <span className="w-10 text-right shrink-0">Price</span>
      <span className="w-11 text-right shrink-0">Total</span>
    </div>
  );
}

function GalleryTableWrap({
  gallery,
  children,
}: {
  gallery?: boolean;
  children: React.ReactNode;
}) {
  if (!gallery) return <>{children}</>;
  return (
    <div className="border border-gray-200 rounded-sm overflow-hidden flex-1 min-h-0">
      {children}
    </div>
  );
}

function LineRows({
  data,
  t,
  showNo,
  relaxed,
  gallery,
}: {
  data: InvoiceDocumentData;
  t: string;
  showNo?: boolean;
  relaxed?: boolean;
  gallery?: boolean;
}) {
  const qtyW = gallery ? "w-6" : "w-8";
  const priceW = gallery ? "w-10" : "w-14";
  const totalW = gallery ? "w-11" : "w-16";
  const noW = gallery ? "w-4" : "w-5";

  return (
    <>
      {data.lineItems.map((item, i) => (
        <div
          key={item.id}
          className={`flex ${gallery ? "py-0.5 px-1 border-b border-gray-200 last:border-b-0" : relaxed ? "py-2" : "py-1.5"} ${t}`}
        >
          {showNo && (
            <span className={`${noW} text-muted-foreground shrink-0`}>{i + 1}</span>
          )}
          <span className="flex-1 text-navy truncate min-w-0">
            {item.description || "Item description"}
          </span>
          <span className={`${qtyW} text-center text-muted-foreground shrink-0`}>
            {item.quantity}
          </span>
          <span className={`${priceW} text-right text-muted-foreground shrink-0`}>
            {data.formatAmount(item.unitPrice)}
          </span>
          <span className={`${totalW} text-right font-medium text-navy shrink-0`}>
            {data.formatAmount(item.quantity * item.unitPrice)}
          </span>
        </div>
      ))}
    </>
  );
}

function Totals({
  data,
  t,
  accent,
  bar,
  gallery,
}: {
  data: InvoiceDocumentData;
  t: string;
  accent?: string;
  bar?: boolean;
  gallery?: boolean;
}) {
  return (
    <div className={`${gallery ? "space-y-0.5" : "space-y-1"} ${t} shrink-0`}>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium text-navy">
          {data.formatAmount(data.subtotal)}
        </span>
      </div>
      {data.taxPercent > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax ({data.taxPercent}%)</span>
          <span className="font-medium text-navy">
            {data.formatAmount(data.tax)}
          </span>
        </div>
      )}
      {data.discountAmount > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Discount</span>
          <span className="font-medium text-red-600">
            -{data.formatAmount(data.discountAmount)}
          </span>
        </div>
      )}
      {bar && accent ? (
        <div
          className={`flex justify-between items-center text-white font-bold rounded-sm ${
            gallery ? "px-1.5 py-0.5 mt-0.5" : "px-2.5 py-1.5 mt-1.5"
          }`}
          style={{ background: accent }}
        >
          <span>Total</span>
          <span>{data.formatAmount(data.grandTotal)}</span>
        </div>
      ) : (
        <div className={`flex justify-between border-t border-gray-200 pt-1 ${gallery ? "mt-0.5" : "pt-1.5 mt-1.5"}`}>
          <span className="font-bold text-navy">Total Due</span>
          <span className="font-bold text-navy">
            {data.formatAmount(data.grandTotal)}
          </span>
        </div>
      )}
    </div>
  );
}

function GalleryCompactLayout({
  data,
  company,
  logo,
  p,
  t,
  h,
  accent,
  headerBg,
  headerLight,
  showNo,
  barTotal,
  footerNote,
}: {
  data: InvoiceDocumentData;
  company: string;
  logo: string | null;
  p: string;
  t: string;
  h: string;
  accent: string;
  headerBg: string;
  headerLight?: string;
  showNo?: boolean;
  barTotal?: boolean;
  footerNote?: string;
}) {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden font-onest">
      <div className={`${p} text-white shrink-0`} style={{ background: headerBg }}>
        <div className="flex items-start justify-between gap-1">
          <BrandMark company={company} logo={logo} light compact />
          <div className="text-right">
            <p className={`font-bold ${h}`}>INVOICE</p>
            <p className="text-[6px] text-white/70 mt-0.5">{data.invoiceNumber}</p>
          </div>
        </div>
        {headerLight && (
          <div
            className={`mt-1 px-1 py-0.5 rounded-sm text-[6px] text-white/90`}
            style={{ background: headerLight }}
          >
            {company} → {data.clientName || "Client"}
          </div>
        )}
      </div>
      <div className={`${p} flex-1 flex flex-col gap-1 min-h-0 pt-1`}>
        <div className={`flex justify-between gap-1 ${t}`}>
          <div className="min-w-0">
            <p className="font-semibold text-muted-foreground uppercase">Bill to</p>
            <p className="font-medium text-navy truncate">{data.clientName || "Client"}</p>
          </div>
          <div className="text-right shrink-0">
            <p>{data.invoiceDate || "—"}</p>
            <p>Due {data.dueDate || "—"}</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-sm overflow-hidden flex-1 min-h-0">
          <TableHeader t={t} showNo={showNo} />
          <LineRows data={data} t={t} gallery showNo={showNo} />
        </div>
        <Totals data={data} t={t} accent={accent} bar={barTotal} gallery />
        {data.notes && (
          <p className={`${t} text-muted-foreground bg-gray-50 rounded px-1 py-0.5`}>
            {data.notes}
          </p>
        )}
        <p className={`${t} text-center text-muted-foreground shrink-0`}>
          {footerNote ?? "Thank you for your business"}
        </p>
      </div>
    </div>
  );
}

function FirmstackDefault({
  data,
  company,
  logo,
  p,
  t,
  h,
  accent,
  relaxedRows,
  gallery,
}: StyleProps) {
  const header = accent ?? "#222e4d";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={header}
        headerBg={header}
      />
    );
  }
  const isSmall = gallery || t === "text-[9px]";

  return (
    <div
      className={`bg-white overflow-hidden font-onest ${
        gallery ? "h-full flex flex-col" : ""
      }`}
    >
      <div className={`${p} text-white shrink-0`} style={{ background: header }}>
        <div className="flex items-start justify-between gap-1">
          <BrandMark company={company} logo={logo} light compact={isSmall} />
          <div className="text-right">
            <p className={`font-bold ${h}`}>INVOICE</p>
            <p className={`text-white/60 ${gallery ? "text-[6px]" : "text-[10px]"} mt-0.5`}>
              {data.invoiceNumber}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${p} ${
          gallery
            ? "flex-1 flex flex-col gap-1 min-h-0 pt-1"
            : "space-y-3"
        }`}
      >
        <div className={`flex justify-between gap-1 ${t}`}>
          <div className="min-w-0">
            <p className="font-semibold text-muted-foreground uppercase">Bill to</p>
            <p className="font-medium text-navy truncate">
              {data.clientName || "Client name"}
            </p>
            {!gallery && data.clientEmail && (
              <p className="text-muted-foreground">{data.clientEmail}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p>
              Date:{" "}
              <span className="font-medium text-navy">{data.invoiceDate || "—"}</span>
            </p>
            <p>
              Due:{" "}
              <span className="font-medium text-navy">{data.dueDate || "—"}</span>
            </p>
          </div>
        </div>

        <GalleryTableWrap gallery={gallery}>
          {gallery ? (
            <TableHeader t={t} />
          ) : (
            <div
              className={`flex ${t} font-semibold text-muted-foreground uppercase border-b border-gray-100 pb-1.5`}
            >
              <span className="flex-1">Description</span>
              <span className="w-8 text-center">Qty</span>
              <span className="w-14 text-right">Price</span>
              <span className="w-16 text-right">Total</span>
            </div>
          )}
          {gallery ? (
            <LineRows data={data} t={t} gallery relaxed={relaxedRows} />
          ) : (
            <div className="divide-y divide-gray-50">
              <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
            </div>
          )}
        </GalleryTableWrap>

        <Totals data={data} t={t} gallery={gallery} />
        {data.notes && (
          <p
            className={`${t} text-muted-foreground bg-gray-50 rounded ${
              gallery ? "px-1 py-0.5" : "rounded-lg p-2"
            }`}
          >
            {data.notes}
          </p>
        )}
        <p className={`${t} text-center text-muted-foreground shrink-0`}>
          Thank you for your business
        </p>
      </div>
    </div>
  );
}

function MinimalGold({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const gold = accent ?? "#d4a017";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={gold}
        headerBg={gold}
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest">
      <div className="h-1.5" style={{ background: gold }} />
      <div className={`${p} space-y-3`}>
        <div className="flex justify-between items-start">
          <div>
            <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
            <p className={`${t} text-muted-foreground mt-0.5`}>Professional invoicing</p>
          </div>
          <div className="text-right">
            <div className="h-0.5 w-12 ml-auto mb-1" style={{ background: gold }} />
            <p className={`font-light tracking-widest text-navy ${h}`}>INVOICE</p>
            <div className="h-0.5 w-12 ml-auto mt-1" style={{ background: gold }} />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div>
            <p className={`${t} font-semibold text-muted-foreground uppercase`}>
              Invoice to
            </p>
            <p className={`${t} font-medium text-navy`}>
              {data.clientName || "Client name"}
            </p>
          </div>
          <div className={`${t} text-right`}>
            <p>#{data.invoiceNumber}</p>
            <p>{data.invoiceDate || "—"}</p>
          </div>
        </div>
        <div className="border border-gray-200">
          <div className={`flex ${t} font-semibold text-white bg-gray-700 px-2 py-1.5`}>
            <span className="flex-1">Item</span>
            <span className="w-8 text-center">Qty</span>
            <span className="w-14 text-right">Price</span>
            <span className="w-16 text-right">Total</span>
          </div>
          <div className="px-2 divide-y divide-gray-100">
            <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-40">
            <Totals data={data} t={t} accent={gold} bar />
          </div>
        </div>
        <p className={`${t} text-center text-muted-foreground`}>
          Thank you for your business
        </p>
      </div>
      <div className="h-1" style={{ background: gold }} />
    </div>
  );
}

function ModernBlue({ data, company, email, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const blue = accent ?? "#0369a1";
  const light = accent ?? "#0284c7";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={light}
        headerBg={blue}
        headerLight={light}
        barTotal
        footerNote="THANKS FOR YOUR BUSINESS!"
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest">
      <div className="px-3 py-2.5 text-white" style={{ background: blue }}>
        <div className="flex justify-between items-center gap-2">
          <BrandMark company={company} logo={logo} light compact={t === "text-[9px]"} />
          <p className={`${t} opacity-80 truncate`}>{email}</p>
        </div>
      </div>
      <div className="px-3 py-1.5 text-white text-[9px]" style={{ background: light }}>
        <div className="flex justify-between gap-2">
          <span>From: {company}</span>
          <span>To: {data.clientName || "Client"}</span>
        </div>
      </div>
      <div className={`${p} space-y-2.5`} style={{ background: "#f0f9ff" }}>
        <div className={`flex justify-between ${t}`}>
          <span>Date: {data.invoiceDate || "—"}</span>
          <span className="font-semibold">{data.invoiceNumber}</span>
        </div>
        <div>
          <div className={`flex ${t} font-semibold text-navy border-b border-sky-200 pb-1`}>
            <span className="flex-1">Description</span>
            <span className="w-8 text-center">Qty</span>
            <span className="w-14 text-right">Price</span>
            <span className="w-16 text-right">Total</span>
          </div>
          <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
        </div>
        <Totals data={data} t={t} accent={light} bar />
        <p className={`${t} text-center font-semibold text-navy`}>
          THANKS FOR YOUR BUSINESS!
        </p>
      </div>
    </div>
  );
}

function ServicePro({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const teal = accent ?? "#14b8a6";
  const navy = "#222e4d";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={teal}
        headerBg={navy}
        headerLight={teal}
        showNo
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest">
      <div className={`${p} pb-2`}>
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className={`font-bold text-navy ${h}`}>Invoice Service</p>
            <div
              className="mt-1.5 inline-block px-2 py-1 text-white text-[9px] rounded-sm"
              style={{ background: navy }}
            >
              <p>{data.invoiceNumber}</p>
              <p>{data.invoiceDate || "—"}</p>
            </div>
          </div>
          <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
        </div>
        <div className={`grid grid-cols-2 gap-2 mt-2 border-t border-dashed border-gray-200 pt-2 ${t}`}>
          <div>
            <p className="font-semibold text-navy">From</p>
            <p className="text-muted-foreground">{company}</p>
          </div>
          <div>
            <p className="font-semibold text-navy">Bill To</p>
            <p className="text-muted-foreground">{data.clientName || "Client"}</p>
          </div>
        </div>
      </div>
      <div className={`flex ${t} font-semibold text-white px-3 py-1.5`} style={{ background: teal }}>
        <span className="w-5">No</span>
        <span className="flex-1">Description</span>
        <span className="w-8 text-center">Qty</span>
        <span className="w-14 text-right">Price</span>
        <span className="w-16 text-right">Total</span>
      </div>
      <div className="px-3 divide-y divide-gray-50">
        <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} showNo />
      </div>
      <div
        className="px-3 py-1.5 text-white text-[9px] flex justify-end gap-4"
        style={{ background: navy }}
      >
        <span>Sub: {data.formatAmount(data.subtotal)}</span>
        <span className="font-bold">Total: {data.formatAmount(data.grandTotal)}</span>
      </div>
    </div>
  );
}

function ClassicGrid({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const blue = accent ?? "#1e40af";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={blue}
        headerBg={blue}
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest border border-gray-200">
      <div className={`${p} border-b border-gray-200`}>
        <div className="flex justify-between gap-2">
          <div>
            <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
            <p className={`${t} text-muted-foreground mt-0.5`}>Business address</p>
          </div>
          <div className="text-right">
            <p className={`font-light tracking-wider ${h}`} style={{ color: blue }}>
              INVOICE
            </p>
            <p className={t}>{data.invoiceNumber}</p>
            <p
              className={`${t} inline-block px-1.5 py-0.5 text-white mt-0.5`}
              style={{ background: blue }}
            >
              Due {data.dueDate || "—"}
            </p>
          </div>
        </div>
      </div>
      <div className="px-3 py-1 text-white text-[9px] font-semibold uppercase" style={{ background: blue }}>
        Bill To
      </div>
      <div className={`px-3 py-1.5 border-b border-gray-200 ${t}`}>
        <p className="font-medium text-navy">{data.clientName || "Client name"}</p>
        {data.clientEmail && <p className="text-muted-foreground">{data.clientEmail}</p>}
      </div>
      <div className="border-b border-gray-200">
        <div className={`flex ${t} font-semibold text-white px-2 py-1.5`} style={{ background: blue }}>
          <span className="flex-1">Description</span>
          <span className="w-8 text-center">Qty</span>
          <span className="w-14 text-right">Amt</span>
          <span className="w-16 text-right">Total</span>
        </div>
        <div className="px-2">
          <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
        </div>
      </div>
      <div className={`${p}`}>
        <div className="flex justify-end">
          <div className="w-36">
            <Totals data={data} t={t} />
          </div>
        </div>
        <p className={`${t} text-center font-semibold italic mt-2`} style={{ color: blue }}>
          Thank You For Your Business!
        </p>
      </div>
    </div>
  );
}

function CleanSlate({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const slate = accent ?? "#64748b";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={slate}
        headerBg={slate}
      />
    );
  }
  return (
    <div className={`bg-white font-onest ${p} space-y-3`}>
      <div
        className="flex justify-between items-end border-b pb-2"
        style={{ borderColor: `${slate}33` }}
      >
        <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
        <p className={`${h} font-light text-gray-400 tracking-wide`}>Invoice</p>
      </div>
      <div className={`grid grid-cols-2 gap-2 ${t}`}>
        <div>
          <p className="text-muted-foreground">Billed to</p>
          <p className="font-medium text-navy">{data.clientName || "Client name"}</p>
        </div>
        <div className="text-right text-muted-foreground">
          <p>{data.invoiceNumber}</p>
          <p>{data.invoiceDate || "—"}</p>
        </div>
      </div>
      <div className="space-y-0.5">
        <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
      </div>
      <div className="border-t pt-2" style={{ borderColor: `${slate}33` }}>
        <Totals data={data} t={t} accent={slate} bar />
      </div>
    </div>
  );
}

function BoldNavy({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const header = accent ?? "#222e4d";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={header}
        headerBg={header}
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest">
      <div className="text-white px-3 py-3" style={{ background: header }}>
        <div className="flex items-center justify-between gap-2 mb-1">
          <BrandMark company={company} logo={logo} light compact={t === "text-[9px]"} />
          <p className={`font-bold tracking-tight ${h}`}>INVOICE</p>
        </div>
        <p className={`${t} text-white/70 mt-0.5`}>{data.invoiceNumber}</p>
      </div>
      <div className="h-1" style={{ background: header }} />
      <div className={`${p} space-y-3`}>
        <div className={`flex justify-between ${t}`}>
          <div>
            <p className="font-semibold text-navy uppercase text-[9px]">Client</p>
            <p className="font-medium text-navy">{data.clientName || "Client name"}</p>
          </div>
          <div className="text-right">
            <p>Issued {data.invoiceDate || "—"}</p>
            <p>Due {data.dueDate || "—"}</p>
          </div>
        </div>
        <div className="rounded-xl px-2 py-1" style={{ background: `${header}08` }}>
          <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
        </div>
        <Totals data={data} t={t} accent={header} bar />
      </div>
    </div>
  );
}

function Emerald({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const green = accent ?? "#059669";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={green}
        headerBg={green}
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest border border-emerald-100">
      <div className={`${p} flex justify-between items-start`}>
        <div>
          <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
          <p className={`${t} text-muted-foreground mt-1`}>
            {data.clientName || "Client name"}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-bold ${h}`} style={{ color: green }}>
            Invoice
          </p>
          <p className={t}>{data.invoiceNumber}</p>
        </div>
      </div>
      <div className={`flex ${t} font-semibold text-white px-3 py-1.5`} style={{ background: green }}>
        <span className="flex-1">Item</span>
        <span className="w-8 text-center">Qty</span>
        <span className="w-14 text-right">Rate</span>
        <span className="w-16 text-right">Total</span>
      </div>
      <div className="px-3">
        <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
      </div>
      <div className={`${p}`}>
        <Totals data={data} t={t} accent={green} bar />
      </div>
    </div>
  );
}

function Coral({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const coral = accent ?? "#e11d48";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={coral}
        headerBg={coral}
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest">
      <div className="px-3 py-2.5" style={{ background: "#fff1f2" }}>
        <div className="flex justify-between items-center">
          <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
          <span
            className={`${t} font-semibold text-white px-2 py-0.5 rounded-full`}
            style={{ background: coral }}
          >
            {data.invoiceNumber}
          </span>
        </div>
      </div>
      <div className={`${p} space-y-2.5`}>
        <div className={`flex justify-between ${t}`}>
          <div>
            <p className="text-muted-foreground">Bill to</p>
            <p className="font-medium text-navy">{data.clientName || "Client"}</p>
          </div>
          <div className="text-right text-muted-foreground">
            <p>{data.invoiceDate || "—"}</p>
            <p>Due {data.dueDate || "—"}</p>
          </div>
        </div>
        <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
        <Totals data={data} t={t} accent={coral} bar />
      </div>
    </div>
  );
}

function MonoInk({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const ink = accent ?? "#171717";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={ink}
        headerBg={ink}
      />
    );
  }
  return (
    <div
      className={`bg-white font-onest ${p} space-y-3 border-2`}
      style={{ borderColor: ink, color: ink }}
    >
      <div
        className="flex justify-between items-baseline border-b-2 pb-2"
        style={{ borderColor: ink }}
      >
        <p className={`font-black uppercase tracking-tight ${h}`}>Invoice</p>
        <p className={`${t} font-bold`}>{data.invoiceNumber}</p>
      </div>
      <div className={`grid grid-cols-2 gap-2 ${t}`}>
        <div>
          <p className="font-bold uppercase text-[8px] tracking-wider">From</p>
          <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
        </div>
        <div>
          <p className="font-bold uppercase text-[8px] tracking-wider">To</p>
          <p>{data.clientName || "Client name"}</p>
        </div>
      </div>
      <div className="border-y py-1" style={{ borderColor: ink }}>
        <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
      </div>
      <div className={`flex justify-between ${t} font-black`}>
        <span>AMOUNT DUE</span>
        <span>{data.formatAmount(data.grandTotal)}</span>
      </div>
    </div>
  );
}

function SplitPanel({ data, company, email, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const panel = accent ?? "#222e4d";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={panel}
        headerBg={panel}
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest flex min-h-[200px]">
      <div
        className="w-[28%] text-white p-2.5 flex flex-col justify-between shrink-0"
        style={{ background: panel }}
      >
        <div>
          <BrandMark company={company} logo={logo} light compact />
          <p className="text-[8px] text-white/60 mt-1 leading-tight">{email}</p>
        </div>
        <p className="text-[8px] text-primary-light font-semibold">INVOICE</p>
      </div>
      <div className={`flex-1 ${p} space-y-2 min-w-0`}>
        <div className="flex justify-between gap-1">
          <div>
            <p className={`${t} text-muted-foreground`}>Bill to</p>
            <p className={`${t} font-semibold text-navy`}>
              {data.clientName || "Client"}
            </p>
          </div>
          <p className={`${t} font-medium text-navy`}>{data.invoiceNumber}</p>
        </div>
        <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
        <Totals data={data} t={t} accent={panel} bar />
      </div>
    </div>
  );
}

function SoftSky({ data, company, logo, p, t, h, accent, relaxedRows, gallery }: StyleProps) {
  const sky = accent ?? "#0ea5e9";
  if (gallery) {
    return (
      <GalleryCompactLayout
        data={data}
        company={company}
        logo={logo}
        p={p}
        t={t}
        h={h}
        accent={sky}
        headerBg={sky}
        barTotal
      />
    );
  }
  return (
    <div className="bg-white overflow-hidden font-onest rounded-sm">
      <div
        className="px-3 py-3 text-center"
        style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)" }}
      >
        <div className="flex justify-center mb-1">
          <BrandMark company={company} logo={logo} compact={t === "text-[9px]"} />
        </div>
        <p className={`font-bold text-navy ${h}`}>Invoice</p>
        <p className={`${t} text-muted-foreground mt-0.5`}>{data.invoiceNumber}</p>
      </div>
      <div className={`${p} space-y-2.5`}>
        <div className={`flex justify-between ${t}`}>
          <p className="font-medium text-navy">{data.clientName || "Client name"}</p>
          <p className="text-muted-foreground">{data.invoiceDate || "—"}</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-sky-100">
          <div className={`flex ${t} font-semibold px-2 py-1.5`} style={{ background: "#e0f2fe", color: "#0369a1" }}>
            <span className="flex-1">Description</span>
            <span className="w-8 text-center">Qty</span>
            <span className="w-14 text-right">Price</span>
            <span className="w-16 text-right">Total</span>
          </div>
          <div className="px-2">
            <LineRows data={data} t={t} gallery={gallery} relaxed={relaxedRows} />
          </div>
        </div>
        <Totals data={data} t={t} accent={sky} bar />
      </div>
    </div>
  );
}
