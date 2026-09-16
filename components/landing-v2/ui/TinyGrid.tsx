import type { ReactNode } from "react";

export function TinyGrid({
  children,
  className = "",
  line = "rgba(34, 46, 77, 0.07)",
  size = 16,
}: {
  children?: ReactNode;
  className?: string;
  line?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${line} 1px, transparent 1px),
          linear-gradient(90deg, ${line} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    >
      {children}
    </div>
  );
}
