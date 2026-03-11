"use client";

function PhoneMockup() {
  return (
    <svg
      viewBox="0 0 320 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-2xl"
      role="img"
      aria-label="Firmstack mobile dashboard preview"
    >
      <defs>
        {/* Clip path for the screen area so content stays within the rounded screen */}
        <clipPath id="screenClip">
          <rect x="12" y="12" width="296" height="636" rx="32" />
        </clipPath>
      </defs>

      {/* Phone outer shell */}
      <rect x="0" y="0" width="320" height="660" rx="44" fill="#222e4d" />
      {/* Phone inner bezel */}
      <rect x="4" y="4" width="312" height="652" rx="41" fill="#1a2340" />
      {/* Screen background */}
      <rect x="8" y="8" width="304" height="644" rx="37" fill="#f8fafc" />

      {/* All screen content clipped to rounded rect */}
      <g clipPath="url(#screenClip)">
        {/* Dynamic Island */}
        <rect x="116" y="14" width="88" height="28" rx="14" fill="#1a2340" />
        <circle cx="172" cy="28" r="5" fill="#222e4d" />
        <circle cx="172" cy="28" r="3.5" fill="#1a2340" />

        {/* Status bar */}
        <text x="28" y="34" fontSize="12" fontWeight="600" fill="#222e4d" fontFamily="system-ui, sans-serif">9:41</text>
        {/* Signal bars */}
        <rect x="248" y="30" width="3" height="4" rx="0.5" fill="#222e4d" />
        <rect x="253" y="28" width="3" height="6" rx="0.5" fill="#222e4d" />
        <rect x="258" y="25" width="3" height="9" rx="0.5" fill="#222e4d" />
        <rect x="263" y="22" width="3" height="12" rx="0.5" fill="#222e4d" />
        {/* WiFi */}
        <path d="M274 30 C274 26 282 26 282 30" fill="none" stroke="#222e4d" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M276 32 C276 30 280 30 280 32" fill="none" stroke="#222e4d" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="278" cy="33" r="1" fill="#222e4d" />
        {/* Battery */}
        <rect x="287" y="25" width="16" height="9" rx="2" fill="none" stroke="#222e4d" strokeWidth="1" />
        <rect x="303" y="28" width="1.5" height="3" rx="0.5" fill="#222e4d" />
        <rect x="289" y="27" width="12" height="5" rx="1" fill="#222e4d" />

        {/* ===== App header bar ===== */}
        <rect x="12" y="48" width="296" height="48" fill="white" />
        <line x1="12" y1="96" x2="308" y2="96" stroke="#e5e7eb" strokeWidth="1" />
        {/* Logo icon */}
        <rect x="28" y="60" width="18" height="4" rx="1.5" fill="#7bbfff" />
        <rect x="25" y="66" width="24" height="4" rx="1.5" fill="#3388ff" />
        <rect x="22" y="72" width="30" height="4" rx="1.5" fill="#222e4d" />
        {/* Logo text */}
        <text x="58" y="75" fontSize="15" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">
          Firm<tspan fill="#3388ff">stack</tspan>
        </text>
        {/* Avatar */}
        <circle cx="286" cy="72" r="14" fill="#3388ff" opacity="0.12" />
        <text x="279" y="76" fontSize="11" fontWeight="700" fill="#3388ff" fontFamily="system-ui, sans-serif">JD</text>

        {/* ===== Greeting ===== */}
        <text x="24" y="122" fontSize="16" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">Good morning, John</text>
        <text x="24" y="138" fontSize="11" fill="#64748b" fontFamily="system-ui, sans-serif">Here&#39;s your financial overview</text>

        {/* ===== 2x2 Metric cards ===== */}
        {/* Revenue */}
        <rect x="24" y="152" width="132" height="68" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
        <rect x="34" y="162" width="24" height="24" rx="8" fill="#3388ff" opacity="0.1" />
        <path d="M42 178 L46 170 L50 174" stroke="#3388ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="34" y="200" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">Revenue</text>
        <text x="34" y="214" fontSize="15" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">$42,580</text>

        {/* Expenses */}
        <rect x="164" y="152" width="132" height="68" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
        <rect x="174" y="162" width="24" height="24" rx="8" fill="#ef4444" opacity="0.1" />
        <path d="M182 170 L186 178 L190 174" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="174" y="200" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">Expenses</text>
        <text x="174" y="214" fontSize="15" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">$18,240</text>

        {/* Net Profit */}
        <rect x="24" y="228" width="132" height="68" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
        <rect x="34" y="238" width="24" height="24" rx="8" fill="#10b981" opacity="0.1" />
        <text x="41" y="255" fontSize="13" fontWeight="600" fill="#10b981" fontFamily="system-ui, sans-serif">$</text>
        <text x="34" y="276" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">Net Profit</text>
        <text x="34" y="290" fontSize="15" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">$24,340</text>

        {/* Total Invoices */}
        <rect x="164" y="228" width="132" height="68" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
        <rect x="174" y="238" width="24" height="24" rx="8" fill="#222e4d" opacity="0.08" />
        <rect x="181" y="244" width="10" height="12" rx="1.5" fill="none" stroke="#222e4d" strokeWidth="1.2" />
        <line x1="183" y1="249" x2="189" y2="249" stroke="#222e4d" strokeWidth="0.8" />
        <line x1="183" y1="252" x2="187" y2="252" stroke="#222e4d" strokeWidth="0.8" />
        <text x="174" y="276" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">Invoices</text>
        <text x="174" y="290" fontSize="15" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">28</text>

        {/* ===== Revenue vs Expenses chart ===== */}
        <rect x="24" y="308" width="272" height="150" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
        <text x="36" y="330" fontSize="12" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">Revenue vs Expenses</text>

        {/* Grid lines */}
        <line x1="44" y1="345" x2="280" y2="345" stroke="#f1f5f9" strokeWidth="0.5" />
        <line x1="44" y1="365" x2="280" y2="365" stroke="#f1f5f9" strokeWidth="0.5" />
        <line x1="44" y1="385" x2="280" y2="385" stroke="#f1f5f9" strokeWidth="0.5" />
        <line x1="44" y1="405" x2="280" y2="405" stroke="#f1f5f9" strokeWidth="0.5" />

        {/* Chart bars - Jan */}
        <rect x="52" y="358" width="10" height="47" rx="3" fill="#3388ff" />
        <rect x="64" y="378" width="10" height="27" rx="3" fill="#ef4444" opacity="0.65" />
        <text x="62" y="416" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Jan</text>

        {/* Feb */}
        <rect x="92" y="348" width="10" height="57" rx="3" fill="#3388ff" />
        <rect x="104" y="370" width="10" height="35" rx="3" fill="#ef4444" opacity="0.65" />
        <text x="102" y="416" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Feb</text>

        {/* Mar */}
        <rect x="132" y="354" width="10" height="51" rx="3" fill="#3388ff" />
        <rect x="144" y="376" width="10" height="29" rx="3" fill="#ef4444" opacity="0.65" />
        <text x="142" y="416" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Mar</text>

        {/* Apr */}
        <rect x="172" y="342" width="10" height="63" rx="3" fill="#3388ff" />
        <rect x="184" y="372" width="10" height="33" rx="3" fill="#ef4444" opacity="0.65" />
        <text x="182" y="416" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Apr</text>

        {/* May */}
        <rect x="212" y="336" width="10" height="69" rx="3" fill="#3388ff" />
        <rect x="224" y="366" width="10" height="39" rx="3" fill="#ef4444" opacity="0.65" />
        <text x="222" y="416" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">May</text>

        {/* Jun */}
        <rect x="252" y="346" width="10" height="59" rx="3" fill="#3388ff" />
        <rect x="264" y="380" width="10" height="25" rx="3" fill="#ef4444" opacity="0.65" />
        <text x="262" y="416" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Jun</text>

        {/* Chart legend */}
        <rect x="92" y="430" width="8" height="8" rx="2" fill="#3388ff" />
        <text x="104" y="438" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">Revenue</text>
        <rect x="158" y="430" width="8" height="8" rx="2" fill="#ef4444" opacity="0.65" />
        <text x="170" y="438" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">Expenses</text>

        {/* ===== Recent Activity ===== */}
        <rect x="24" y="468" width="272" height="142" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="0.5" />
        <text x="36" y="490" fontSize="12" fontWeight="700" fill="#222e4d" fontFamily="system-ui, sans-serif">Recent Activity</text>

        {/* Activity item 1 */}
        <circle cx="40" cy="510" r="3.5" fill="#3388ff" />
        <text x="50" y="508" fontSize="10" fontWeight="600" fill="#222e4d" fontFamily="system-ui, sans-serif">You</text>
        <text x="70" y="508" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Created invoice #INV-028</text>
        <text x="50" y="520" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif">2 min ago</text>

        {/* Activity item 2 */}
        <circle cx="40" cy="538" r="3.5" fill="#3388ff" />
        <text x="50" y="536" fontSize="10" fontWeight="600" fill="#222e4d" fontFamily="system-ui, sans-serif">Sarah</text>
        <text x="84" y="536" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Added expense: Office</text>
        <text x="50" y="548" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif">1 hour ago</text>

        {/* Activity item 3 */}
        <circle cx="40" cy="566" r="3.5" fill="#3388ff" />
        <text x="50" y="564" fontSize="10" fontWeight="600" fill="#222e4d" fontFamily="system-ui, sans-serif">Mike</text>
        <text x="78" y="564" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Marked #INV-025 as paid</text>
        <text x="50" y="576" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif">Yesterday</text>

        {/* Activity item 4 */}
        <circle cx="40" cy="594" r="3.5" fill="#3388ff" />
        <text x="50" y="592" fontSize="10" fontWeight="600" fill="#222e4d" fontFamily="system-ui, sans-serif">You</text>
        <text x="70" y="592" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Updated company settings</text>
        <text x="50" y="604" fontSize="8" fill="#94a3b8" fontFamily="system-ui, sans-serif">3 hours ago</text>

        {/* ===== Bottom tab bar ===== */}
        <rect x="12" y="618" width="296" height="42" fill="white" />
        <line x1="12" y1="618" x2="308" y2="618" stroke="#e5e7eb" strokeWidth="0.5" />

        {/* Home tab (active) */}
        <rect x="44" y="626" width="16" height="12" rx="2.5" fill="#3388ff" />
        <rect x="46" y="628" width="5" height="3.5" rx="0.8" fill="white" />
        <rect x="53" y="628" width="5" height="3.5" rx="0.8" fill="white" />
        <rect x="46" y="633" width="5" height="3.5" rx="0.8" fill="white" />
        <rect x="53" y="633" width="5" height="3.5" rx="0.8" fill="white" />
        <text x="52" y="650" fontSize="8" fontWeight="600" fill="#3388ff" fontFamily="system-ui, sans-serif" textAnchor="middle">Home</text>

        {/* Invoices tab */}
        <rect x="116" y="626" width="16" height="13" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="116" y1="631" x2="132" y2="631" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="119" y1="635" x2="129" y2="635" stroke="#94a3b8" strokeWidth="0.6" />
        <text x="124" y="650" fontSize="8" fontWeight="500" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Invoices</text>

        {/* Expenses tab */}
        <rect x="192" y="626" width="16" height="13" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="195" y1="632" x2="205" y2="632" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="195" y1="635" x2="202" y2="635" stroke="#94a3b8" strokeWidth="0.6" />
        <text x="200" y="650" fontSize="8" fontWeight="500" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Expenses</text>

        {/* Profile tab */}
        <circle cx="268" cy="632" r="7" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
        <circle cx="268" cy="630" r="2.5" fill="#94a3b8" />
        <path d="M263 638 C263 635 273 635 273 638" fill="none" stroke="#94a3b8" strokeWidth="1" />
        <text x="268" y="650" fontSize="8" fontWeight="500" fill="#94a3b8" fontFamily="system-ui, sans-serif" textAnchor="middle">Profile</text>
      </g>

      {/* Home indicator bar (outside clip, on top of phone body) */}
      <rect x="120" y="650" width="80" height="4" rx="2" fill="white" opacity="0.25" />

      {/* Side buttons */}
      <rect x="-2" y="140" width="2" height="30" rx="1" fill="#1a2340" />
      <rect x="-2" y="190" width="2" height="50" rx="1" fill="#1a2340" />
      <rect x="-2" y="250" width="2" height="50" rx="1" fill="#1a2340" />
      <rect x="320" y="200" width="2" height="60" rx="1" fill="#1a2340" />
    </svg>
  );
}

export function MobilePreview() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#f8fafc] font-onest overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 mb-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <rect x="3" y="1" width="10" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="6" y="12" width="4" height="1" rx="0.5" fill="currentColor" />
            </svg>
            Mobile Ready
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Your finances, <span className="text-primary">right in your pocket</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Access your dashboard, send invoices, track expenses, and monitor cash flow—all from your phone.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Left features */}
          <div className="lg:col-span-1 hidden lg:flex flex-col gap-8 items-end text-right">
            {[
              {
                title: "Real-time metrics",
                desc: "Revenue, expenses, and profit updated live.",
              },
              {
                title: "Quick invoicing",
                desc: "Create and send invoices in seconds.",
              },
            ].map((item) => (
              <div key={item.title} className="max-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ml-auto mb-3">
                  <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#3388ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-navy font-semibold text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Center phone */}
          <div className="lg:col-span-3 relative flex justify-center">
            {/* Glow effects */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #3388ff 0%, transparent 70%)" }}
            />
            <div className="relative w-60 sm:w-64 lg:w-72">
              <PhoneMockup />
            </div>
          </div>

          {/* Right features */}
          <div className="lg:col-span-1 hidden lg:flex flex-col gap-8 items-start text-left">
            {[
              {
                title: "Expense tracking",
                desc: "Log expenses on the spot, anywhere you are.",
              },
              {
                title: "Team activity",
                desc: "See who did what with real-time updates.",
              },
            ].map((item) => (
              <div key={item.title} className="max-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#3388ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-navy font-semibold text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile-only feature list (shown below phone on small screens) */}
          <div className="lg:hidden col-span-full">
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Real-time dashboard with key metrics",
                "Create & send invoices anywhere",
                "Track expenses on the spot",
                "Activity feed for team updates",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-navy font-medium">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#3388ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
