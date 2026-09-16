"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STORAGE_KEY = "firmstack-cookie-consent";

export function CookieConsent() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-desc"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-navy/10 bg-white font-onest shadow-[0_-8px_30px_rgba(34,46,77,0.12)]"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-5">
            <p
              id="cookie-desc"
              className="max-w-3xl text-sm leading-relaxed text-navy/70"
            >
              We use cookies to keep Firmstack running and to improve your
              experience. By continuing, you can accept or decline optional
              cookies.{" "}
              <Link
                href="/support"
                className="font-medium text-primary hover:underline"
              >
                Learn more
              </Link>
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy/75 transition hover:bg-navy/5"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="lv2-shimmer-btn rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105"
              >
                Accept cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
