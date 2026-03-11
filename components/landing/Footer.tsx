import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Integrations", href: "#resources" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Templates", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "API & Docs", href: "#" },
  ],
  Support: [
    { label: "Contact", href: "#" },
    { label: "Status", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const social = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white font-onest">
      {/* Divider line separating CTA from footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/[0.08]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
                <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
                <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
                <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.4" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-white">
                Firm<span className="text-white/70">stack</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/50 max-w-xs leading-relaxed">
              Firmstack helps growing businesses manage revenue, expenses, and
              profit with role-based access and full activity logs.
            </p>
            <div className="mt-6 flex gap-4">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white/70 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white/70 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white/70 transition-colors">
              Trust
            </Link>
          </div>
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Firmstack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
