
export function HeroBiro({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      
      <rect x="38" y="8" width="44" height="110" rx="14" fill="#1a1f2e" />
      <rect x="38" y="100" width="44" height="10" fill="#c9a227" />
      <rect x="38" y="88" width="44" height="6" fill="#e8c547" />
      
      <path
        d="M78 22c18 4 28 22 26 48-1 14-8 26-18 34"
        stroke="#c9a227"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="82" cy="24" r="5" fill="#e8c547" />

      
      <rect x="40" y="118" width="40" height="168" rx="12" fill="#222e4d" />
      <rect x="40" y="118" width="40" height="14" fill="#c9a227" />
      <rect x="46" y="160" width="28" height="90" rx="6" fill="#1a243d" opacity="0.45" />

      
      <rect x="42" y="286" width="36" height="48" rx="10" fill="#2a354f" />
      <rect x="42" y="286" width="36" height="8" fill="#c9a227" />

      
      <path d="M48 334h24l-4 22H52l-4-22z" fill="#c9a227" />
      <path d="M52 356h16l-8 52-8-52z" fill="#d4af37" />
      <path d="M60 362v40" stroke="#8a7020" strokeWidth="1.5" />
      
      <ellipse cx="60" cy="416" rx="2" ry="3.5" fill="#222e4d" />
    </svg>
  );
}
