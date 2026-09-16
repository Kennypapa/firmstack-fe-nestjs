"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pin } from "lucide-react";
import { createClient, type ClientInput } from "@/lib/api/clients";

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none";

export default function NewClientPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setToast("Client name is required.");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setSaving(true);
    try {
      const body: ClientInput = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        address: address.trim() || undefined,
        notes: notes.trim() || undefined,
      };
      const created = await createClient(body);
      router.push(`/dashboard/clients/${created.id}`);
    } catch {
      setToast("Could not save client. Try again.");
      setTimeout(() => setToast(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full font-onest pb-10">
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </Link>

      <div className="mx-auto w-full max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-navy tracking-tight">
            Add Client
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Save their details once — reuse them on every invoice
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 space-y-5 shadow-sm"
        >
          <div
            className="absolute -top-2.5 left-1/2 z-20 -translate-x-1/2 pointer-events-none"
            aria-hidden
          >
            <Pin
              className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] rotate-[18deg]"
              strokeWidth={1.5}
            />
          </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client or contact name"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@company.com"
            className={fieldClass}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555 000 0000"
              className={fieldClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">
            Billing address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city, country"
            rows={3}
            className={`${fieldClass} resize-y`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything useful about this client"
            rows={3}
            className={`${fieldClass} resize-y`}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/clients")}
            className="flex-1 rounded-xl border border-gray-200 text-navy font-semibold py-2.5 text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-xl bg-navy text-white font-semibold py-2.5 text-sm hover:bg-navy/90 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving…" : "Save client"}
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
