"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, parse } from "date-fns";
import { Calendar as DateCalendar } from "react-date-range";
import { ArrowLeft, Calendar, ImagePlus, X } from "lucide-react";
import { createExpense } from "@/lib/api/expenses";
import { toExpenseCategory } from "@/lib/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const categories = ["Office", "Software", "Travel", "Marketing", "Other"];
const LINE = 40;
const TIP_KEY = "firmstack-expense-notebook-tip";
/** Receipts are usually phone photos — 5MB is a solid web upload cap */
const MAX_RECEIPT_MB = 5;
const MAX_RECEIPT_BYTES = MAX_RECEIPT_MB * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

export default function NewExpensePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePanelRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [merchant, setMerchant] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Company card");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerPos, setDatePickerPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [receiptName, setReceiptName] = useState<string | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [amountFocused, setAmountFocused] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(TIP_KEY)) setShowTip(true);
    } catch {
      setShowTip(true);
    }
  }, []);

  useEffect(() => {
    if (!datePickerOpen) {
      setDatePickerPos(null);
      return;
    }

    const updatePos = () => {
      const anchor = datePickerRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const panelWidth = 300;
      let left = rect.right - panelWidth;
      left = Math.max(16, Math.min(left, window.innerWidth - panelWidth - 16));
      setDatePickerPos({
        top: rect.bottom + 8,
        left,
      });
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [datePickerOpen]);

  useEffect(() => {
    if (!datePickerOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        datePickerRef.current?.contains(target) ||
        datePanelRef.current?.contains(target)
      ) {
        return;
      }
      setDatePickerOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [datePickerOpen]);

  const selectedDate = parse(date, "yyyy-MM-dd", new Date());

  const dismissTip = () => {
    setShowTip(false);
    try {
      sessionStorage.setItem(TIP_KEY, "1");
    } catch {
      /* ignore */
    }
    // Invite them to start writing
    window.setTimeout(() => amountRef.current?.focus(), 120);
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const buildPayload = async () => {
    let receiptUrl: string | undefined;
    if (receiptFile) {
      try {
        receiptUrl = await fileToDataUrl(receiptFile);
      } catch {
        /* ignore upload convert errors */
      }
    }

    return {
      date,
      category: toExpenseCategory(category),
      description: description.trim(),
      amount: parseFloat(amount),
      merchant: merchant.trim() || undefined,
      paymentMethod: paymentMethod.trim() || undefined,
      receiptUrl,
    };
  };

  const clearReceipt = () => {
    setReceiptName(null);
    setReceiptFile(null);
    if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    setReceiptPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const acceptFile = (file: File | undefined) => {
    if (!file) return;

    const isAllowedType =
      ALLOWED_RECEIPT_TYPES.includes(file.type) ||
      file.type.startsWith("image/");
    if (!isAllowedType) {
      setToast("Please upload a PNG, JPG, WEBP, or PDF receipt.");
      setTimeout(() => setToast(null), 3500);
      return;
    }

    if (file.size > MAX_RECEIPT_BYTES) {
      setToast(`Receipt must be ${MAX_RECEIPT_MB}MB or smaller.`);
      setTimeout(() => setToast(null), 3500);
      return;
    }

    if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    setReceiptFile(file);
    setReceiptName(file.name);
    if (file.type.startsWith("image/")) {
      setReceiptPreview(URL.createObjectURL(file));
    } else {
      setReceiptPreview(null);
    }
  };

  const saveExpenseExtras = (
    id: string,
    extras: {
      merchant?: string;
      paymentMethod?: string;
      hasReceipt?: boolean;
      receiptName?: string;
    },
  ) => {
    try {
      const key = "firmstack-expense-extras";
      const all = JSON.parse(localStorage.getItem(key) || "{}") as Record<
        string,
        typeof extras
      >;
      all[id] = { ...all[id], ...extras };
      localStorage.setItem(key, JSON.stringify(all));
    } catch {
      /* ignore */
    }
  };

  const resetForm = () => {
    setAmount("");
    setMerchant("");
    setDescription("");
    clearReceipt();
    if (notesRef.current) {
      notesRef.current.style.height = `${LINE * 5}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent, andAnother = false) => {
    e.preventDefault();
    if (!amount || Number.isNaN(parseFloat(amount))) return;
    if (!merchant.trim()) {
      setToast("Please fill in who you paid.");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setSaving(true);
    try {
      const payload = await buildPayload();
      let created;
      try {
        created = await createExpense(payload);
      } catch {
        // Backend may reject large data-URL receipts — retry without file body
        const { receiptUrl: _ignored, ...withoutReceipt } = payload;
        created = await createExpense(withoutReceipt);
      }
      saveExpenseExtras(created.id, {
        merchant: payload.merchant,
        paymentMethod: payload.paymentMethod,
        hasReceipt: Boolean(receiptFile),
        receiptName: receiptName || undefined,
      });
      if (andAnother) {
        resetForm();
        setToast("Expense saved. Add another below.");
        setTimeout(() => setToast(null), 3000);
      } else {
        router.push("/dashboard/expenses");
      }
    } catch {
      setToast("Could not save expense. Try again.");
      setTimeout(() => setToast(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  const ruledPaper = {
    backgroundColor: "#f7f8fb",
    backgroundImage: `
      linear-gradient(90deg, transparent 47px, rgba(220, 80, 80, 0.32) 47px, rgba(220, 80, 80, 0.32) 48px, transparent 48px),
      repeating-linear-gradient(
        transparent,
        transparent ${LINE - 1}px,
        rgba(34, 46, 77, 0.1) ${LINE - 1}px,
        rgba(34, 46, 77, 0.1) ${LINE}px
      )
    `,
  } as const;

  const showCaret = !amountFocused && !amount && !showTip;

  return (
    <div className="w-full font-onest pb-10">
      <Link
        href="/dashboard/expenses"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Expenses
      </Link>

      <div className="mx-auto w-full max-w-5xl">
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <div className="relative pb-3">
            <div
              className="absolute inset-x-3 top-4 bottom-0 rounded-sm bg-[#d8dee8]"
              aria-hidden
            />
            <div
              className="absolute inset-x-2 top-2 -bottom-1 rounded-sm bg-[#e4e8ef]"
              aria-hidden
            />
            <div
              className="absolute inset-x-1 top-1 -bottom-2 rounded-sm bg-[#eef1f6]"
              aria-hidden
            />

            <div
              className="relative grid lg:grid-cols-2 lg:items-stretch overflow-hidden rounded-sm bg-[#f7f8fb]"
              style={{
                boxShadow:
                  "0 22px 55px rgba(34,46,77,0.16), 0 1px 0 rgba(255,255,255,0.7) inset",
              }}
            >
              <div
                className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 z-10 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(90deg, rgba(34,46,77,0.18) 0%, rgba(34,46,77,0.05) 30%, rgba(255,255,255,0.55) 50%, rgba(34,46,77,0.05) 70%, rgba(34,46,77,0.18) 100%)",
                }}
              />

              {/* LEFT PAGE */}
              <div
                className="relative pl-14 pr-6 sm:pl-16 sm:pr-8 flex flex-col pb-4 lg:border-r border-[#d0d7e2]"
                style={ruledPaper}
              >
                {/* Title row — sits on first writing line */}
                <div
                  className="flex items-center justify-between gap-3"
                  style={{ height: LINE }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-none truncate">
                    Expense note
                  </h2>
                  <div className="relative shrink-0" ref={datePickerRef}>
                    <button
                      type="button"
                      onClick={() => setDatePickerOpen((o) => !o)}
                      className="inline-flex items-center gap-1.5 bg-transparent border-0 text-sm font-medium text-navy/70 hover:text-navy transition-colors cursor-pointer"
                      aria-label="Pick date"
                      aria-expanded={datePickerOpen}
                    >
                      <Calendar className="w-3.5 h-3.5 text-navy/50" />
                      {format(selectedDate, "MMM d, yyyy")}
                    </button>
                    {datePickerOpen &&
                      datePickerPos &&
                      createPortal(
                        <div
                          ref={datePanelRef}
                          className="firmstack-date-picker firmstack-date-picker--no-ranges fixed z-[100] rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                          style={{
                            top: datePickerPos.top,
                            left: datePickerPos.left,
                          }}
                        >
                          <DateCalendar
                            date={selectedDate}
                            onChange={(next) => {
                              setDate(format(next, "yyyy-MM-dd"));
                              setDatePickerOpen(false);
                            }}
                            color="#222e4d"
                            showDateDisplay={false}
                          />
                          <div className="mt-1 flex justify-end border-t border-gray-100 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                const today = new Date();
                                setDate(format(today, "yyyy-MM-dd"));
                                setDatePickerOpen(false);
                              }}
                              className="rounded-lg px-3 py-1.5 text-xs font-medium text-navy hover:bg-gray-50 transition-colors"
                            >
                              Today
                            </button>
                          </div>
                        </div>,
                        document.body
                      )}
                  </div>
                </div>

                {/* Blank ruled line for breathing room */}
                <div style={{ height: LINE }} aria-hidden />

                {/* Amount */}
                <div
                  className="flex items-center gap-3 cursor-text"
                  style={{ height: LINE }}
                  onClick={() => amountRef.current?.focus()}
                >
                  <span className="shrink-0 w-[4.5rem] text-[11px] font-bold uppercase tracking-[0.12em] text-navy/70">
                    Amount
                  </span>
                  <div className="relative flex-1 flex items-center min-w-0">
                    <span className="text-lg font-semibold text-navy/50 mr-1">$</span>
                    <input
                      ref={amountRef}
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onFocus={() => setAmountFocused(true)}
                      onBlur={() => setAmountFocused(false)}
                      placeholder={showCaret ? "" : "0.00"}
                      className="w-full bg-transparent border-0 px-0 py-0 text-lg font-bold text-navy placeholder:text-navy/30 focus:outline-none focus:ring-0"
                    />
                    {showCaret && (
                      <span
                        className="notebook-caret absolute left-5 top-1/2 -translate-y-1/2 w-[2px] h-[1.15em] bg-navy rounded-sm pointer-events-none"
                        aria-hidden
                      />
                    )}
                  </div>
                </div>

                {/* Paid to */}
                <div className="flex items-center gap-3" style={{ height: LINE }}>
                  <span className="shrink-0 w-[4.5rem] text-[11px] font-bold uppercase tracking-[0.12em] text-navy/70">
                    Paid to
                  </span>
                  <input
                    type="text"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    placeholder="Who did you pay?"
                    className="w-full bg-transparent border-0 px-0 text-[15px] text-navy placeholder:text-navy/35 focus:outline-none focus:ring-0"
                  />
                </div>

                {/* Category */}
                <div className="flex items-center gap-3" style={{ height: LINE }}>
                  <span className="shrink-0 w-[4.5rem] text-[11px] font-bold uppercase tracking-[0.12em] text-navy/70">
                    Category
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent border-0 px-0 text-[15px] text-navy focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment */}
                <div className="flex items-center gap-3" style={{ height: LINE }}>
                  <span className="shrink-0 w-[4.5rem] text-[11px] font-bold uppercase tracking-[0.12em] text-navy/70">
                    Payment
                  </span>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-transparent border-0 px-0 text-[15px] text-navy focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    <option>Company card</option>
                    <option>Personal card</option>
                    <option>Bank transfer</option>
                    <option>Cash</option>
                  </select>
                </div>

                {/* Notes — grows with content */}
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-[4.5rem] flex items-center text-[11px] font-bold uppercase tracking-[0.12em] text-navy/70 leading-none"
                    style={{ height: LINE }}
                  >
                    Notes
                  </span>
                  <textarea
                    ref={notesRef}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      const el = e.target;
                      el.style.height = "auto";
                      el.style.height = `${Math.max(LINE * 5, el.scrollHeight)}px`;
                    }}
                    placeholder="What was this for?"
                    rows={5}
                    className="w-full bg-transparent border-0 px-0 py-0 text-[15px] text-navy placeholder:text-navy/35 focus:outline-none focus:ring-0 resize-none overflow-hidden"
                    style={{
                      lineHeight: `${LINE}px`,
                      minHeight: LINE * 5,
                      height: LINE * 5,
                    }}
                  />
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div
                className="relative pl-14 pr-6 sm:pl-16 sm:pr-10 flex flex-col h-full min-h-[420px]"
                style={{
                  ...ruledPaper,
                  backgroundImage: `
                    linear-gradient(90deg, transparent 47px, rgba(220, 80, 80, 0.2) 47px, rgba(220, 80, 80, 0.2) 48px, transparent 48px),
                    repeating-linear-gradient(
                      transparent,
                      transparent ${LINE - 1}px,
                      rgba(34, 46, 77, 0.07) ${LINE - 1}px,
                      rgba(34, 46, 77, 0.07) ${LINE}px
                    )
                  `,
                }}
              >
                <div
                  className="flex items-center justify-between gap-3"
                  style={{ height: LINE }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-none">
                    Receipt pocket
                  </h2>
                  <div className="relative w-7 h-10 shrink-0" aria-hidden>
                    <div className="absolute inset-x-1 top-0 bottom-2 rounded-full border-2 border-navy/30" />
                    <div className="absolute left-1/2 top-3 -translate-x-1/2 w-1.5 h-5 rounded-full bg-[#f7f8fb]" />
                  </div>
                </div>

                <div style={{ height: LINE }} aria-hidden />

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => acceptFile(e.target.files?.[0])}
                />

                <div className="flex-1 pb-8 min-h-[260px] flex flex-col overflow-hidden">
                  {/* Room on the right/bottom so stacked papers don’t push the white sheet off-center */}
                  <div className="relative mx-auto w-full max-w-[340px] flex-1 min-h-[240px] overflow-visible pr-3 pb-4">
                    {/* Hero-style receipt papers under the pocket */}
                    <div
                      className="absolute inset-0 rounded-sm bg-[#f5d76e] shadow-md ring-1 ring-amber-700/15"
                      style={{ transform: "translate(8px, 10px) rotate(2deg)" }}
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 rounded-sm bg-[#7bbfff] shadow-md ring-1 ring-primary/25"
                      style={{ transform: "translate(4px, 5px) rotate(1deg)" }}
                      aria-hidden
                    />

                    <button
                      type="button"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        acceptFile(e.dataTransfer.files?.[0]);
                      }}
                      onClick={() => fileRef.current?.click()}
                      className={`relative z-[1] h-full min-h-[240px] w-full overflow-hidden rounded-sm text-left transition-all ${
                        dragOver
                          ? "bg-white shadow-md ring-1 ring-navy/30"
                          : "bg-white hover:shadow-md"
                      }`}
                      style={{
                        boxShadow: "0 12px 28px rgba(34,46,77,0.1)",
                        transform: "rotate(-0.4deg)",
                      }}
                    >
                      <span
                        className="absolute -top-2 left-6 z-10 w-10 h-3 bg-amber-100/90 rotate-[-8deg] shadow-sm"
                        aria-hidden
                      />
                      <span
                        className="absolute -top-1.5 right-8 z-10 w-10 h-3 bg-amber-100/80 rotate-[6deg] shadow-sm"
                        aria-hidden
                      />

                      {receiptPreview ? (
                        <div className="absolute inset-3 flex flex-col overflow-hidden">
                          <div className="relative min-h-0 flex-1 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={receiptPreview}
                              alt="Receipt preview"
                              className="absolute inset-0 h-full w-full object-contain"
                            />
                          </div>
                          <p className="mt-2 shrink-0 text-xs text-navy/55 truncate px-0.5">
                            {receiptName}
                          </p>
                        </div>
                      ) : receiptName ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                          <p className="text-sm font-semibold text-navy">
                            {receiptName}
                          </p>
                          <p className="text-xs text-navy/50">
                            File attached — click to replace · max {MAX_RECEIPT_MB}MB
                          </p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/[0.06] text-navy">
                            <ImagePlus className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-navy">
                              Slip your receipt here
                            </p>
                            <p className="mt-1 text-xs text-navy/50 leading-relaxed">
                              Drag & drop or click · PNG, JPG, PDF · max{" "}
                              {MAX_RECEIPT_MB}MB
                            </p>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>

                  {receiptName && (
                    <button
                      type="button"
                      onClick={clearReceipt}
                      className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-medium text-navy/55 hover:text-navy transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Remove receipt
                    </button>
                  )}
                </div>
              </div>

              {/* How-it-works overlay */}
              {showTip && (
                <div
                  className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 bg-navy/45 backdrop-blur-[2px]"
                  onClick={dismissTip}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="expense-notebook-tip-title"
                >
                  <div
                    className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy/40">
                      How this notebook works
                    </p>
                    <h3
                      id="expense-notebook-tip-title"
                      className="mt-2 text-xl font-bold text-navy tracking-tight"
                    >
                      Write on the left. Clip on the right.
                    </h3>
                    <ol className="mt-4 space-y-3 text-sm text-navy/75 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                          1
                        </span>
                        <span>
                          Fill the <strong className="text-navy">Expense note</strong>{" "}
                          — amount, who you paid, and a short note.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                          2
                        </span>
                        <span>
                          Drop your receipt into the{" "}
                          <strong className="text-navy">Receipt pocket</strong>.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                          3
                        </span>
                        <span>Hit Save when you&apos;re done.</span>
                      </li>
                    </ol>
                    <p className="mt-4 text-xs text-navy/50 flex items-center gap-2">
                      <span className="notebook-caret inline-block w-[2px] h-3.5 bg-navy rounded-sm" />
                      Look for the blinking line — that&apos;s where you start typing.
                    </p>
                    <button
                      type="button"
                      onClick={dismissTip}
                      className="mt-6 w-full rounded-xl bg-navy text-white font-semibold py-2.5 text-sm hover:bg-navy/90 transition-colors"
                    >
                      Got it — start writing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
            <button
              type="button"
              disabled={saving}
              onClick={(e) => handleSubmit(e, true)}
              className="rounded-xl border border-gray-200 bg-white text-navy font-semibold px-5 py-2.5 text-sm hover:bg-gray-50 disabled:opacity-60 transition-colors"
            >
              Save & Add Another
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-navy text-white font-semibold px-6 py-2.5 text-sm hover:bg-navy/90 disabled:opacity-60 transition-colors"
            >
              Save expense
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-navy text-white px-4 py-3 shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
