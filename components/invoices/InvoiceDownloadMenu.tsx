"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Download } from "lucide-react";
import type { InvoiceDocumentData } from "@/components/invoices/invoice-preview-types";
import { FileFormatIcon } from "@/components/invoices/FileFormatIcon";
import {
  downloadInvoiceExport,
  INVOICE_EXPORT_FORMATS,
  type InvoiceExportFormatId,
} from "@/lib/invoice-export";

interface InvoiceDownloadMenuProps {
  data: InvoiceDocumentData;
  /** Optional button size/style override */
  buttonClassName?: string;
  /** Show label on all breakpoints (default: hidden on xs) */
  alwaysShowLabel?: boolean;
}

export function InvoiceDownloadMenu({
  data,
  buttonClassName,
  alwaysShowLabel = false,
}: InvoiceDownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    openUp: boolean;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? 320;
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < menuHeight + gap && rect.top > menuHeight + gap;

    setPosition({
      top: openUp ? rect.top - gap : rect.bottom + gap,
      left: rect.right,
      openUp,
    });
  };

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const handleSelect = (formatId: InvoiceExportFormatId) => {
    downloadInvoiceExport(formatId, data);
    setOpen(false);
  };

  const menu =
    mounted && open && position
      ? createPortal(
          <div
            ref={menuRef}
            className="fixed z-[200] w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-1"
            style={{
              top: position.top,
              left: position.left,
              transform: position.openUp
                ? "translate(-100%, -100%)"
                : "translateX(-100%)",
            }}
          >
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Download as
            </p>
            {INVOICE_EXPORT_FORMATS.map((format) => (
              <button
                key={format.id}
                type="button"
                onClick={() => handleSelect(format.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
              >
                <FileFormatIcon format={format.id} />
                <span>
                  <span className="block text-sm font-medium text-navy">
                    {format.label}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    .{format.extension}
                  </span>
                </span>
              </button>
            ))}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={
          buttonClassName ??
          "inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
        }
      >
        <Download className="w-3.5 h-3.5" />
        <span className={alwaysShowLabel ? "inline" : "hidden sm:inline"}>
          Download
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {menu}
    </>
  );
}
