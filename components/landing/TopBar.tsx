import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-sm font-medium">
        <span>Need more than spreadsheets?</span>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 hover:underline underline-offset-2"
        >
          See plans and pricing
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
