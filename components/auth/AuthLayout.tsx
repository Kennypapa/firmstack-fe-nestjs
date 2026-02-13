import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Optional custom tagline; default is the standard one */
  tagline?: string;
}

const defaultTagline =
  "The easier way to manage revenue, expenses, and profit—with full control and accountability.";

export function AuthLayout({ children, tagline = defaultTagline }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex font-onest">
      {/* Left panel - branding & visual */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[52%] bg-navy flex-col p-10 xl:p-14">
        <Link href="/" className="inline-flex shrink-0">
          <Image
            src="/logo.png"
            alt="Firmstack"
            width={200}
            height={56}
            className="h-12 w-auto object-contain object-left brightness-0 invert opacity-95"
          />
        </Link>
        <p className="mt-12 xl:mt-16 text-white text-2xl xl:text-3xl font-semibold leading-tight max-w-md">
          {tagline}
        </p>
        <div className="mt-10 xl:mt-14 relative flex-1 min-h-[280px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt=""
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-navy/40" />
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 bg-white">
        <div className="w-full max-w-[420px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
