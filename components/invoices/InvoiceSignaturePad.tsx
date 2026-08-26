"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Eraser, PenLine } from "lucide-react";

interface InvoiceSignaturePadProps {
  enabled: boolean;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  signerName: string;
  onSignerNameChange: (name: string) => void;
}

export function InvoiceSignaturePad({
  enabled,
  value,
  onChange,
  signerName,
  onSignerNameChange,
}: InvoiceSignaturePadProps) {
  const padRef = useRef<SignatureCanvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resizeCanvas = () => {
    const pad = padRef.current;
    const container = containerRef.current;
    if (!pad || !container) return;

    const canvas = pad.getCanvas();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const width = container.offsetWidth;
    const height = 140;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext("2d")?.scale(ratio, ratio);
    pad.clear();
  };

  useLayoutEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (!enabled) {
      padRef.current?.clear();
      if (value) onChange(null);
    }
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const pad = padRef.current;
    if (!pad) return;
    if (enabled) {
      pad.on();
    } else {
      pad.off();
    }
  }, [enabled]);

  const handleEnd = () => {
    const pad = padRef.current;
    if (!pad || pad.isEmpty()) {
      onChange(null);
      return;
    }
    // Avoid getTrimmedCanvas() — trim-canvas breaks under Next/webpack
    onChange(pad.getCanvas().toDataURL("image/png"));
  };

  const handleClear = () => {
    padRef.current?.clear();
    onChange(null);
  };

  return (
    <div
      className={`rounded-2xl border p-5 space-y-4 transition-colors ${
        enabled ? "border-gray-100 bg-white" : "border-gray-100 bg-gray-50/80"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-2 ${
              enabled ? "text-navy" : "text-muted-foreground"
            }`}
          >
            <PenLine className="w-4 h-4" />
            Signature
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {enabled
              ? "Draw your authorized signature for this invoice."
              : "Available when you choose a With Signature template."}
          </p>
        </div>
        {!enabled && (
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
            Locked
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="signer-name"
          className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
        >
          Signer name
        </label>
        <input
          id="signer-name"
          type="text"
          value={signerName}
          onChange={(e) => onSignerNameChange(e.target.value)}
          disabled={!enabled}
          placeholder="e.g. J. Morgan"
          className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all disabled:bg-gray-50 disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Draw signature
          </label>
          {enabled && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              <Eraser className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
        <div
          ref={containerRef}
          className={`relative rounded-xl border overflow-hidden ${
            enabled
              ? "border-gray-200 bg-[#fafafa]"
              : "border-gray-200 bg-gray-100 pointer-events-none opacity-60"
          }`}
        >
          <SignatureCanvas
            ref={padRef}
            penColor="#222e4d"
            backgroundColor="#fafafa"
            onEnd={handleEnd}
            canvasProps={{
              className: "touch-none block w-full",
              style: { width: "100%", height: 140 },
            }}
          />
          {!enabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
              <p className="text-xs text-muted-foreground font-medium px-4 text-center">
                Pick a signature template to enable signing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
