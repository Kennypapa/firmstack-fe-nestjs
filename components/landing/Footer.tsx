import Link from "next/link";
import Image from "next/image";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex">
              <Image
                src="/logo.png"
                alt="Firmstack"
                width={160}
                height={44}
                className="h-8 w-auto object-contain object-left brightness-0 invert opacity-95"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              Firmstack helps growing businesses manage revenue, expenses, and profit with role-based access and full activity logs—all in a secure, multi-tenant environment.
            </p>
            <div className="mt-6 flex gap-4">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Trust
            </Link>
          </div>
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Firmstack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
