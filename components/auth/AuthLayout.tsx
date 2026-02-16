import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Optional custom tagline; default is the standard one */
  tagline?: string;
}

const defaultTagline =
  "The easier way to manage revenue, expenses, and profit—with full control and accountability.";

/** Inline illustration: refined finance theme – dashboard feel without literal screenshot */
function FinanceIllustration() {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
      aria-hidden
    >
      {/* Soft glow behind content */}
      <ellipse cx="180" cy="100" rx="140" ry="70" fill="rgba(255,255,255,0.03)" />
      {/* Card container – single cohesive block */}
      <rect
        x="40"
        y="24"
        width="280"
        height="152"
        rx="12"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* Header strip */}
      <rect x="40" y="24" width="280" height="32" rx="12" fill="rgba(255,255,255,0.04)" />
      <rect x="52" y="34" width="60" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="52" y="44" width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      {/* Main chart area – one clean bar set */}
      <g transform="translate(52, 70)">
        {[42, 58, 48, 62, 54, 50, 66].map((h, i) => (
          <g key={i}>
            <rect
              x={i * 34 + 4}
              y={72 - h}
              width={18}
              height={h}
              rx={4}
              fill="rgba(255,255,255,0.22)"
            />
            <rect
              x={i * 34 + 4}
              y={72 - h}
              width={18}
              height={h}
              rx={4}
              fill="url(#barShade)"
              fillOpacity="0.5"
            />
          </g>
        ))}
      </g>
      {/* Small “invoice” card */}
      <g transform="translate(268, 68)">
        <rect
          x={0}
          y={0}
          width={52}
          height={64}
          rx={8}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <rect x={10} y={12} width={32} height={4} rx={2} fill="rgba(255,255,255,0.2)" />
        <rect x={10} y={22} width={32} height={4} rx={2} fill="rgba(255,255,255,0.14)" />
        <rect x={10} y={32} width={24} height={4} rx={2} fill="rgba(255,255,255,0.14)" />
        <circle cx={42} cy={50} r={10} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M38 50l3 3 5-6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <defs>
        <linearGradient id="barShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AuthLayout({ children, tagline = defaultTagline }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex font-onest">
      {/* Left panel - branding & illustration */}
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
        <div className="mt-10 xl:mt-14 flex-1 flex flex-col min-h-0">
          <p className="text-white text-lg xl:text-xl font-medium leading-relaxed max-w-md tracking-tight">
            {tagline}
          </p>
          <div className="mt-8 xl:mt-10 flex-1 flex items-center justify-center min-h-[220px] rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6">
            <div className="w-full max-w-[360px] h-[200px] text-white">
              <FinanceIllustration />
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 bg-white">
        <div className="w-full max-w-[420px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
