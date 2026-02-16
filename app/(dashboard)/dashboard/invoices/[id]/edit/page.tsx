"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditInvoicePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href={`/dashboard/invoices/${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Invoice
      </Link>
      <h1 className="text-2xl font-bold text-navy">Edit Invoice {id}</h1>
      <p className="text-muted-foreground">
        Edit form can mirror the Create Invoice page with pre-filled data. Connect to your API to load and update the invoice.
      </p>
    </div>
  );
}
