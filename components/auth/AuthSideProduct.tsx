import Link from "next/link";

/** New auth left panel — Velox-style: brand + one product window. */
export function AuthSideProduct({ tagline }: { tagline: string }) {
  return (
    <div className="relative hidden h-full flex-col overflow-hidden bg-[#0b1220] lg:flex lg:w-[52%] xl:w-[50%]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123,191,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,191,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 20% 15%, rgba(51,136,255,0.28), transparent 55%), radial-gradient(50% 40% at 85% 70%, rgba(123,191,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="px-10 pt-10 xl:px-14 xl:pt-14">
          <Link href="/" className="inline-flex w-fit shrink-0">
            <div className="flex items-center gap-2.5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect x="2" y="22" width="28" height="6" rx="1.5" fill="white" opacity="0.5" />
                <rect x="4" y="14" width="24" height="6" rx="1.5" fill="white" opacity="0.7" />
                <rect x="6" y="6" width="20" height="6" rx="1.5" fill="white" opacity="0.9" />
                <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.4" />
              </svg>
              <span className="text-2xl font-bold tracking-tight text-white">
                Firmstack
              </span>
            </div>
          </Link>

          <h2 className="mt-12 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white xl:mt-16 xl:text-4xl">
            {tagline}
          </h2>
        </div>

        <div className="relative mt-auto px-6 pt-10 sm:px-8 xl:px-10">
          <div className="overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-2 border-b border-navy/8 bg-[#f4f6f9] px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] text-navy/40">
                app.firmstack.com/dashboard
              </span>
            </div>

            <div className="flex h-[280px] xl:h-[320px]">
              <aside className="hidden w-[132px] shrink-0 border-r border-navy/8 bg-[#f8fafc] p-3 sm:block">
                <p className="px-2 text-[9px] font-semibold uppercase tracking-wider text-navy/35">
                  Menu
                </p>
                <div className="mt-2 space-y-1">
                  <div className="rounded-lg bg-navy px-2.5 py-2 text-[11px] font-semibold text-white">
                    Dashboard
                  </div>
                  {["Invoices", "Expenses", "Team", "Settings"].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg px-2.5 py-2 text-[11px] font-medium text-navy/55"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="min-w-0 flex-1 bg-white p-4">
                <p className="text-sm font-semibold text-navy">Good morning</p>
                <p className="mt-0.5 text-[11px] text-navy/45">
                  Here&apos;s your invoice overview
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-navy/8 bg-[#f8fafc] p-3">
                    <p className="text-[10px] font-medium text-navy/45">Revenue</p>
                    <p className="mt-1 text-base font-bold text-navy">$42,580</p>
                  </div>
                  <div className="rounded-xl border border-navy/8 bg-[#f8fafc] p-3">
                    <p className="text-[10px] font-medium text-navy/45">Invoices</p>
                    <p className="mt-1 text-base font-bold text-navy">128</p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-navy/8 bg-[#0b1220] p-3.5 text-white">
                  <p className="text-[11px] font-semibold">Create your next invoice</p>
                  <p className="mt-1 text-[10px] text-white/55">
                    Templates ready — send in minutes.
                  </p>
                  <div className="mt-3 inline-flex rounded-full bg-primary px-3 py-1.5 text-[10px] font-semibold text-white">
                    New invoice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
