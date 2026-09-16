import Link from "next/link";
import { FirmstackLogo } from "./ui/FirmstackLogo";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About", href: "/about" }],
  },
  {
    title: "Support",
    links: [{ label: "Need Help?", href: "/support" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1220] px-4 py-14 font-onest text-sm text-white/60 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <FirmstackLogo light />
          <p className="mt-4 max-w-xs text-white/50">
            Create, send, and track invoices that look as sharp as your work.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Firmstack</span>
        <Link href="/support" className="hover:text-white">
          Need Help?
        </Link>
      </div>
    </footer>
  );
}
