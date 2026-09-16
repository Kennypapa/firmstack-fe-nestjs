"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bug, Lightbulb, MessageCircle, X } from "lucide-react";

type Kind = "idea" | "bug" | "other";
type Status = "idle" | "sending" | "sent" | "error";

const kinds: {
  id: Kind;
  label: string;
  Icon: typeof Lightbulb;
}[] = [
  { id: "idea", label: "Idea", Icon: Lightbulb },
  { id: "bug", label: "Bug", Icon: Bug },
  { id: "other", label: "Other", Icon: MessageCircle },
];

export function FeedbackWidget() {
  const titleId = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<Kind | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function resetForm() {
    setKind(null);
    setMessage("");
    setEmail("");
    setStatus("idle");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!kind || !message.trim() || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          message: message.trim(),
          email: email.trim() || undefined,
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("sent");
      setMessage("");
      setEmail("");
      setKind(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed top-1/2 right-0 z-50 flex -translate-y-1/2 items-center font-onest">
      <AnimatePresence>
        {open && (
          <motion.div
            key="feedback-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: 16, scale: 0.96 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, x: 0, scale: 1 }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: 12, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mr-2.5 w-[320px] origin-right rounded-xl border border-navy/10 bg-white p-5 shadow-2xl shadow-navy/20 sm:w-[340px]"
          >
            <div className="flex items-center justify-between gap-2">
              <p id={titleId} className="text-[15px] font-semibold text-navy">
                Feedback
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-navy/40 transition hover:bg-navy/5 hover:text-navy"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "sent" ? (
              <div className="py-8 text-center">
                <p className="text-sm font-semibold text-navy">Thanks — got it.</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-3 text-xs font-semibold text-primary hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 space-y-3.5">
                <div className="grid grid-cols-3 gap-2">
                  {kinds.map(({ id, label, Icon }) => {
                    const on = kind === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setKind(id)}
                        className={`rounded-lg border px-2 py-2.5 text-center transition ${
                          on
                            ? "border-primary bg-primary/5"
                            : "border-navy/10 bg-[#f8fafc] hover:border-navy/20"
                        }`}
                      >
                        <Icon
                          className={`mx-auto h-[18px] w-[18px] ${
                            on ? "text-primary" : "text-navy/45"
                          }`}
                        />
                        <p
                          className={`mt-1.5 text-xs font-semibold ${
                            on ? "text-navy" : "text-navy/65"
                          }`}
                        >
                          {label}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="What’s on your mind?"
                  className="w-full resize-none rounded-xl border border-navy/10 bg-[#f8fafc] px-3.5 py-2.5 text-sm text-navy outline-none placeholder:text-navy/35 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="w-full rounded-xl border border-navy/10 bg-[#f8fafc] px-3.5 py-2.5 text-sm text-navy outline-none placeholder:text-navy/35 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />

                {status === "error" && (
                  <p className="text-xs text-red-500">Couldn’t send — try again.</p>
                )}

                <button
                  type="submit"
                  disabled={!kind || !message.trim() || status === "sending"}
                  className="lv2-shimmer-btn w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (status === "sent") resetForm();
        }}
        className="flex h-32 w-9 flex-col items-center justify-center gap-1.5 rounded-l-md bg-[#222e4d] text-white shadow-lg shadow-navy/25 transition hover:bg-navy/90"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <MessageCircle className="h-4 w-4 fill-current" strokeWidth={1.75} />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Feedback
        </span>
      </button>
    </div>
  );
}
