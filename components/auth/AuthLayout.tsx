import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  tagline?: string;
}

const defaultTagline =
  "The easier way to manage revenue, expenses, and profit—with full control and accountability.";

/** Rich dashboard illustration — multiple floating cards showing platform features */
function DashboardIllustration() {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden
    >
      <defs>
        <linearGradient id="authCardBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="authBarBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7bbfff" />
          <stop offset="100%" stopColor="#3388ff" />
        </linearGradient>
        <linearGradient id="authBarRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="authLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3388ff" />
          <stop offset="100%" stopColor="#7bbfff" />
        </linearGradient>
        <filter id="authShadow" x="-4%" y="-4%" width="108%" height="112%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.15" />
        </filter>
        <filter id="authGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      {/* Background glow blobs */}
      <ellipse cx="160" cy="200" rx="160" ry="140" fill="#3388ff" opacity="0.06" filter="url(#authGlow)" />
      <ellipse cx="400" cy="280" rx="120" ry="100" fill="#7bbfff" opacity="0.05" filter="url(#authGlow)" />

      {/* ===== Main dashboard card ===== */}
      <g filter="url(#authShadow)">
        <rect x="20" y="30" width="360" height="240" rx="16" fill="url(#authCardBg)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </g>

      {/* Dashboard header */}
      <rect x="20" y="30" width="360" height="44" rx="16" fill="rgba(255,255,255,0.06)" />
      <rect x="36" y="43" width="12" height="3" rx="1" fill="#7bbfff" />
      <rect x="34" y="48" width="16" height="3" rx="1" fill="#3388ff" />
      <rect x="32" y="53" width="20" height="3" rx="1" fill="white" opacity="0.5" />
      <text x="58" y="55" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui, sans-serif" opacity="0.9">Dashboard</text>
      <circle cx="340" cy="52" r="4" fill="rgba(255,255,255,0.15)" />
      <circle cx="355" cy="52" r="4" fill="#3388ff" opacity="0.4" />

      {/* Metric cards row */}
      <rect x="36" y="86" width="100" height="56" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <circle cx="52" cy="100" r="8" fill="#3388ff" opacity="0.2" />
      <path d="M48 102L52 96L56 100" stroke="#7bbfff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <text x="42" y="120" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">Revenue</text>
      <text x="42" y="132" fontSize="12" fontWeight="700" fill="white" fontFamily="system-ui">$42,580</text>

      <rect x="148" y="86" width="100" height="56" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <circle cx="164" cy="100" r="8" fill="#ef4444" opacity="0.2" />
      <path d="M160 96L164 102L168 98" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <text x="154" y="120" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">Expenses</text>
      <text x="154" y="132" fontSize="12" fontWeight="700" fill="white" fontFamily="system-ui">$18,240</text>

      <rect x="260" y="86" width="104" height="56" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <circle cx="276" cy="100" r="8" fill="#10b981" opacity="0.2" />
      <text x="272" y="104" fontSize="10" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">$</text>
      <text x="266" y="120" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">Net Profit</text>
      <text x="266" y="132" fontSize="12" fontWeight="700" fill="white" fontFamily="system-ui">$24,340</text>

      {/* Bar chart area */}
      <rect x="36" y="154" width="328" height="100" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text x="48" y="172" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">Revenue vs Expenses</text>

      <line x1="48" y1="186" x2="348" y2="186" stroke="rgba(255,255,255,0.04)" />
      <line x1="48" y1="206" x2="348" y2="206" stroke="rgba(255,255,255,0.04)" />
      <line x1="48" y1="226" x2="348" y2="226" stroke="rgba(255,255,255,0.04)" />

      <rect x="62" y="198" width="10" height="42" rx="3" fill="url(#authBarBlue)" opacity="0.85" />
      <rect x="74" y="214" width="10" height="26" rx="3" fill="url(#authBarRed)" opacity="0.6" />
      <rect x="108" y="190" width="10" height="50" rx="3" fill="url(#authBarBlue)" opacity="0.85" />
      <rect x="120" y="208" width="10" height="32" rx="3" fill="url(#authBarRed)" opacity="0.6" />
      <rect x="154" y="194" width="10" height="46" rx="3" fill="url(#authBarBlue)" opacity="0.85" />
      <rect x="166" y="212" width="10" height="28" rx="3" fill="url(#authBarRed)" opacity="0.6" />
      <rect x="200" y="186" width="10" height="54" rx="3" fill="url(#authBarBlue)" opacity="0.85" />
      <rect x="212" y="206" width="10" height="34" rx="3" fill="url(#authBarRed)" opacity="0.6" />
      <rect x="246" y="182" width="10" height="58" rx="3" fill="url(#authBarBlue)" opacity="0.85" />
      <rect x="258" y="202" width="10" height="38" rx="3" fill="url(#authBarRed)" opacity="0.6" />
      <rect x="292" y="192" width="10" height="48" rx="3" fill="url(#authBarBlue)" opacity="0.85" />
      <rect x="304" y="216" width="10" height="24" rx="3" fill="url(#authBarRed)" opacity="0.6" />

      <circle cx="140" cy="246" r="3" fill="#3388ff" />
      <text x="148" y="249" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">Revenue</text>
      <circle cx="200" cy="246" r="3" fill="#ef4444" opacity="0.6" />
      <text x="208" y="249" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">Expenses</text>

      {/* ===== Floating invoice card (top right) ===== */}
      <g filter="url(#authShadow)">
        <rect x="400" y="20" width="110" height="145" rx="14" fill="url(#authCardBg)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      </g>
      <text x="416" y="46" fontSize="9" fontWeight="700" fill="white" fontFamily="system-ui" opacity="0.9">Invoice #028</text>
      <text x="416" y="60" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="system-ui">Acme Corp</text>
      <rect x="416" y="72" width="78" height="1" rx="0.5" fill="rgba(255,255,255,0.08)" />
      <text x="416" y="88" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="system-ui">Subtotal</text>
      <text x="472" y="88" fontSize="7" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">$3,800</text>
      <text x="416" y="102" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="system-ui">Tax</text>
      <text x="472" y="102" fontSize="7" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">$400</text>
      <rect x="416" y="110" width="78" height="1" rx="0.5" fill="rgba(255,255,255,0.08)" />
      <text x="416" y="126" fontSize="8" fontWeight="700" fill="white" fontFamily="system-ui">Total</text>
      <text x="462" y="126" fontSize="9" fontWeight="700" fill="#7bbfff" fontFamily="system-ui">$4,200</text>
      <rect x="416" y="136" width="44" height="16" rx="8" fill="#3388ff" opacity="0.2" />
      <text x="423" y="147" fontSize="7" fontWeight="600" fill="#7bbfff" fontFamily="system-ui">Pending</text>

      {/* ===== Floating activity card (bottom right) ===== */}
      <g filter="url(#authShadow)">
        <rect x="390" y="185" width="125" height="130" rx="14" fill="url(#authCardBg)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </g>
      <text x="406" y="210" fontSize="9" fontWeight="700" fill="white" fontFamily="system-ui" opacity="0.9">Activity</text>

      <circle cx="412" cy="228" r="3" fill="#3388ff" />
      <text x="420" y="230" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">Invoice created</text>
      <text x="420" y="240" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="system-ui">2 min ago</text>

      <circle cx="412" cy="254" r="3" fill="#10b981" />
      <text x="420" y="256" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">Payment received</text>
      <text x="420" y="266" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="system-ui">1 hour ago</text>

      <circle cx="412" cy="280" r="3" fill="#f59e0b" />
      <text x="420" y="282" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">Expense logged</text>
      <text x="420" y="292" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="system-ui">3 hours ago</text>

      <circle cx="412" cy="304" r="3" fill="#8b5cf6" />
      <text x="420" y="306" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">Team member added</text>

      {/* ===== Floating profit trend (bottom left) ===== */}
      <g filter="url(#authShadow)">
        <rect x="30" y="290" width="170" height="110" rx="14" fill="url(#authCardBg)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </g>
      <text x="46" y="314" fontSize="9" fontWeight="700" fill="white" fontFamily="system-ui" opacity="0.9">Profit Trend</text>
      <text x="140" y="314" fontSize="8" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">+18.2%</text>

      <polyline
        points="46,370 70,358 94,364 118,346 142,340 166,330 184,322"
        stroke="url(#authLine)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M46 370 L70 358 L94 364 L118 346 L142 340 L166 330 L184 322 L184 385 L46 385 Z"
        fill="url(#authBarBlue)"
        opacity="0.08"
      />
      <circle cx="184" cy="322" r="4" fill="#3388ff" />
      <circle cx="184" cy="322" r="6" fill="#3388ff" opacity="0.2" />

      {/* ===== Floating team card (bottom center) ===== */}
      <g filter="url(#authShadow)">
        <rect x="220" y="330" width="150" height="70" rx="14" fill="url(#authCardBg)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </g>
      <text x="236" y="354" fontSize="9" fontWeight="700" fill="white" fontFamily="system-ui" opacity="0.9">Team</text>

      <circle cx="244" cy="376" r="12" fill="#3388ff" opacity="0.3" stroke="rgba(34,46,77,0.8)" strokeWidth="2" />
      <text x="239" y="380" fontSize="8" fontWeight="600" fill="white" fontFamily="system-ui">JD</text>
      <circle cx="264" cy="376" r="12" fill="#10b981" opacity="0.3" stroke="rgba(34,46,77,0.8)" strokeWidth="2" />
      <text x="259" y="380" fontSize="8" fontWeight="600" fill="white" fontFamily="system-ui">SM</text>
      <circle cx="284" cy="376" r="12" fill="#f59e0b" opacity="0.3" stroke="rgba(34,46,77,0.8)" strokeWidth="2" />
      <text x="279" y="380" fontSize="8" fontWeight="600" fill="white" fontFamily="system-ui">MK</text>
      <circle cx="304" cy="376" r="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <text x="298" y="380" fontSize="7" fontWeight="600" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">+5</text>

      <text x="330" y="372" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="system-ui">Admin</text>
      <text x="330" y="384" fontSize="7" fill="rgba(255,255,255,0.35)" fontFamily="system-ui">3 roles</text>
    </svg>
  );
}

function FirmstackLogoWhite() {
  return (
    <div className="flex items-center gap-2.5">
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
    </div>
  );
}

export function AuthLayout({ children, tagline = defaultTagline }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex font-onest">
      {/* Left panel — branding + illustration */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[52%] bg-navy flex-col relative overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(51,136,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(123,191,255,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative flex flex-col h-full p-10 xl:p-14">
          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0 w-fit">
            <FirmstackLogoWhite />
          </Link>

          {/* Tagline */}
          <p className="mt-10 xl:mt-14 text-white/80 text-lg xl:text-xl font-medium leading-relaxed max-w-md tracking-tight">
            {tagline}
          </p>

          {/* Illustration area */}
          <div className="mt-8 xl:mt-10 flex-1 flex items-center justify-center min-h-0">
            <div className="w-full max-w-[520px]">
              <DashboardIllustration />
            </div>
          </div>

          {/* Bottom trust indicators */}
          <div className="mt-auto pt-6 flex items-center gap-6 text-white/30 text-xs">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 1L8.5 4.5L12.5 5L9.75 7.5L10.5 11.5L7 9.5L3.5 11.5L4.25 7.5L1.5 5L5.5 4.5L7 1Z" fill="currentColor" />
              </svg>
              256-bit encryption
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="3" y="5" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 5V3.5C5 2.4 5.9 1.5 7 1.5C8.1 1.5 9 2.4 9 3.5V5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              SOC 2 compliant
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4.5 7L6.5 9L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Multi-tenant isolated
            </span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 bg-white">
        <div className="w-full max-w-[420px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
