"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-primary font-semibold">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </span>
              Support
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-muted-foreground hover:text-navy"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Got any questions? I&apos;m happy to help.
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-navy text-white shadow-lg hover:bg-navy/90 transition-colors flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
