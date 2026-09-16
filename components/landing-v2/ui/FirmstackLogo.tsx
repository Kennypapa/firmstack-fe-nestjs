import Link from "next/link";

export function FirmstackMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="2" y="22" width="28" height="6" rx="1.5" fill="#222e4d" />
      <rect x="4" y="14" width="24" height="6" rx="1.5" fill="#3388ff" />
      <rect x="6" y="6" width="20" height="6" rx="1.5" fill="#7bbfff" />
      <rect x="10" y="8" width="12" height="2" rx="1" fill="white" opacity="0.6" />
    </svg>
  );
}

export function FirmstackLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <FirmstackMark />
      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        Firm
        <span className={light ? "text-[#7bbfff]" : "text-primary"}>stack</span>
      </span>
    </Link>
  );
}
