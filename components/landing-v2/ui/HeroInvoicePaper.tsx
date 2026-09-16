
import { HeroBiro } from "./HeroBiro";

const rows = [
  { desc: "Consulting (10 hrs)", qty: "10", price: "$150.00", total: "$1,500.00" },
  { desc: "Software license", qty: "1", price: "$2,400.00", total: "$2,400.00" },
  { desc: "API integration", qty: "1", price: "$1,850.00", total: "$1,850.00" },
  { desc: "Travel & expenses", qty: "1", price: "$494.50", total: "$494.50" },
  { desc: "Support retainer", qty: "1", price: "$600.00", total: "$600.00" },
  { desc: "Design revisions", qty: "4", price: "$95.00", total: "$380.00" },
];

const SIGN_PATH =
  "M8 36 C 24 30, 36 40, 52 34 S 76 28, 94 36 S 118 42, 138 32 S 158 30, 172 35";

function SignatureWithPen() {
  return (
    <div className="relative mt-3 h-16 w-60 sm:h-[4.5rem] sm:w-72">
      <div className="absolute inset-0 overflow-hidden rounded-sm bg-white">
        <div className="absolute bottom-[22%] left-1 right-1 border-b border-navy/25" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 180 48"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <path
            d={SIGN_PATH}
            stroke="#222e4d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      
      <div
        className="pointer-events-none absolute z-30 w-[76px] sm:w-[88px]"
        style={{
          left: "92%",
          top: "72%",
          transform: "translate(-50%, -98.5%) rotate(40deg)",
          transformOrigin: "50% 98.5%",
        }}
      >
        <HeroBiro className="h-auto w-full drop-shadow-[0_10px_18px_rgba(34,46,77,0.3)]" />
      </div>
    </div>
  );
}

export function HeroInvoicePaper() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-visible bg-white font-onest text-navy">
      <div className="flex items-start justify-between gap-4 bg-[#222e4d] px-5 py-4 sm:px-6 sm:py-5">
        <div>
          <p className="text-sm font-bold tracking-tight text-white sm:text-base">
            Firmstack
          </p>
          <p className="mt-0.5 text-[10px] text-white/60 sm:text-xs">
            invoices@firmstack.com
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
            Invoice
          </p>
          <p className="mt-1 text-[10px] text-white/55 sm:text-xs">#INV-001</p>
          <p className="text-[10px] text-white/45 sm:text-xs">Due Mar 20, 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-b border-navy/8 px-5 py-3.5 sm:px-6 sm:py-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-navy/40">
            Bill to
          </p>
          <p className="mt-1 text-xs font-semibold sm:text-sm">Acme Corp</p>
          <p className="text-[10px] text-navy/50 sm:text-xs">billing@acme.com</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-navy/40">
            Issue date
          </p>
          <p className="mt-1 text-xs font-medium sm:text-sm">Mar 1, 2024</p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 pt-3 sm:px-6">
        <div className="flex border-b border-navy/10 pb-2 text-[9px] font-semibold uppercase tracking-wider text-navy/40 sm:text-[10px]">
          <span className="flex-1">Description</span>
          <span className="w-10 text-center sm:w-12">Qty</span>
          <span className="w-16 text-right sm:w-20">Price</span>
          <span className="w-16 text-right sm:w-20">Total</span>
        </div>
        <div className="flex flex-1 flex-col justify-evenly py-1">
          {rows.map((row) => (
            <div
              key={row.desc}
              className="flex items-center border-b border-navy/[0.04] py-2 text-[10px] sm:py-2.5 sm:text-xs"
            >
              <span className="flex-1 pr-2 font-medium text-navy/80">{row.desc}</span>
              <span className="w-10 text-center text-navy/55 sm:w-12">{row.qty}</span>
              <span className="w-16 text-right text-navy/55 sm:w-20">{row.price}</span>
              <span className="w-16 text-right font-semibold sm:w-20">{row.total}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 mt-auto overflow-visible border-t border-navy/8 bg-white px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex justify-end">
          <div className="w-44 space-y-1.5 text-[10px] sm:w-52 sm:text-xs">
            <div className="flex justify-between text-navy/55">
              <span>Subtotal</span>
              <span>$7,224.50</span>
            </div>
            <div className="flex justify-between border-t border-navy/10 pt-1.5 text-sm font-bold text-navy">
              <span>Total due</span>
              <span>$7,224.50</span>
            </div>
          </div>
        </div>

        <div className="relative mt-5 flex items-end justify-between gap-6 overflow-visible border-t border-dashed border-navy/15 bg-white pt-4">
          <div className="relative z-30 overflow-visible bg-white">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-navy/35">
              Authorized signature
            </p>
            <SignatureWithPen />
            <p className="mt-1 text-[10px] text-navy/45">Alex Morgan · Founder</p>
          </div>
          <p className="pb-1 text-[9px] text-navy/35">Thank you for your business</p>
        </div>
      </div>
    </div>
  );
}
