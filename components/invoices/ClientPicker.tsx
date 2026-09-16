"use client";

import { useEffect, useRef, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { listClients } from "@/lib/api/clients";
import type { ClientItem } from "@/lib/api/types";

type ClientPickerProps = {
  onSelect: (client: ClientItem) => void;
};

export function ClientPicker({ onSelect }: ClientPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ClientItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(() => {
      listClients({ search: q })
        .then((data) => {
          if (!cancelled) setResults(data.slice(0, 8));
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
        Find existing client
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search by name, email, or company"
          className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
        />
      </div>

      {open && query.trim() && (
        <div className="absolute z-30 mt-1.5 w-full rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
          {loading ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">Searching…</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No clients match “{query.trim()}”
            </p>
          ) : (
            <ul className="max-h-56 overflow-y-auto py-1">
              {results.map((client) => (
                <li key={client.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(client);
                      setQuery("");
                      setResults([]);
                      setOpen(false);
                    }}
                    className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-navy">
                      <UserRound className="w-3.5 h-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-navy truncate">
                        {client.name}
                      </span>
                      <span className="block text-xs text-muted-foreground truncate">
                        {[client.email, client.company].filter(Boolean).join(" · ") ||
                          "No contact info"}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
