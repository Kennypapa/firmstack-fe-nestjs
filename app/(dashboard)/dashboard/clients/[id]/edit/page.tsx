"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pin } from "lucide-react";
import { getClient, updateClient, type ClientInput } from "@/lib/api/clients";

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/20 focus:outline-none";

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getClient(id)
      .then((client) => {
        setName(client.name);
        setEmail(client.email || "");
        setPhone(client.phone || "");
        setCompany(client.company || "");
        setAddress(client.address || "");
        setNotes(client.notes || "");
      })
      .catch(() => setError("Client not found."))
      .finally(() => setLoading(false));
  }, [id]);

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
      await updateClient(id, body);
      router.push(`/dashboard/clients/${id}`);
    } catch {
      setToast("Could not update client. Try again.");
      setTimeout(() => setToast(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-sm text-muted-foreground font-onest">
        Loading client…
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl font-onest">
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Link>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full font-onest pb-10">
      <Link
        href={`/dashboard/clients/${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to client
      </Link>

      <div className="mx-auto w-full max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-navy tracking-tight">
            Edit Client
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update contact details for this client
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
            rows={3}
            className={`${fieldClass} resize-y`}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push(`/dashboard/clients/${id}`)}
            className="flex-1 rounded-xl border border-gray-200 text-navy font-semibold py-2.5 text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-xl bg-navy text-white font-semibold py-2.5 text-sm hover:bg-navy/90 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving…" : "Save changes"}
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
