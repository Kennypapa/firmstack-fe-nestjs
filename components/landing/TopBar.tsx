import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-sm font-medium">
        <span>Whether you&apos;re solo or on a team—need more than spreadsheets?</span>
        <Link
          href="/register"
          className="inline-flex items-center gap-1 hover:underline underline-offset-2 font-semibold"
        >
          Get started free
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
