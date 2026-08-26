import type { ReactNode } from "react";
import type { InvoiceExportFormatId } from "@/lib/invoice-export";

interface FileFormatIconProps {
  format: InvoiceExportFormatId;
  className?: string;
}

function DocShape({
  fill,
  children,
}: {
  fill: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-5 h-6 shrink-0"
    >
      <path
        d="M4 0h11l5 5v21a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Z"
        fill={fill}
      />
      <path d="M15 0v5h5" fill="rgba(255,255,255,0.35)" />
      {children}
    </svg>
  );
}

export function FileFormatIcon({ format, className }: FileFormatIconProps) {
  const wrapperClass = className ?? "";

  switch (format) {
    case "pdf":
      return (
        <span className={wrapperClass}>
          <DocShape fill="#E5252A">
            <text
              x="12"
              y="18"
              textAnchor="middle"
              fill="white"
              fontSize="6.5"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              PDF
            </text>
          </DocShape>
        </span>
      );

    case "doc":
      return (
        <span className={wrapperClass}>
          <DocShape fill="#2B579A">
            <text
              x="12"
              y="18.5"
              textAnchor="middle"
              fill="white"
              fontSize="5.5"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              DOC
            </text>
          </DocShape>
        </span>
      );

    case "docx":
      return (
        <span className={wrapperClass}>
          <DocShape fill="#2B579A">
            <text
              x="12"
              y="19"
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              W
            </text>
          </DocShape>
        </span>
      );

    case "xlsx":
      return (
        <span className={wrapperClass}>
          <DocShape fill="#217346">
            <text
              x="12"
              y="19"
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              X
            </text>
          </DocShape>
        </span>
      );

    case "csv":
      return (
        <span className={wrapperClass}>
          <DocShape fill="#107C41">
            <g stroke="white" strokeWidth="0.9" opacity="0.95">
              <path d="M7 12h10M7 15h10M7 18h10" />
              <path d="M10 11v8M13 11v8M16 11v8" />
            </g>
          </DocShape>
        </span>
      );

    case "html":
      return (
        <span className={wrapperClass}>
          <DocShape fill="#E44D26">
            <text
              x="12"
              y="13.5"
              textAnchor="middle"
              fill="white"
              fontSize="5.5"
              fontWeight="700"
              fontFamily="monospace"
            >
              {"</>"}
            </text>
            <text
              x="12"
              y="20"
              textAnchor="middle"
              fill="white"
              fontSize="5"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              HTML
            </text>
          </DocShape>
        </span>
      );

    case "txt":
    default:
      return (
        <span className={wrapperClass}>
          <DocShape fill="#6B7280">
            <g stroke="white" strokeWidth="0.9" strokeLinecap="round" opacity="0.95">
              <path d="M7 12h10M7 15h10M7 18h7" />
            </g>
            <text
              x="12"
              y="10"
              textAnchor="middle"
              fill="white"
              fontSize="4.5"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              TXT
            </text>
          </DocShape>
        </span>
      );
  }
}
