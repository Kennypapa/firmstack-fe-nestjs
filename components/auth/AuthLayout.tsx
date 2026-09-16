import { AuthSideClassic } from "./AuthSideClassic";
import { AuthSideProduct } from "./AuthSideProduct";

/**
 * Auth left-panel switch.
 * - "product" = new Velox-style (one dashboard window) — default
 * - "classic" = old floating glass cards
 *
 * Flip here, or set NEXT_PUBLIC_AUTH_SIDE=classic|product in .env
 */
export type AuthSideVariant = "product" | "classic";

const fromEnv = process.env.NEXT_PUBLIC_AUTH_SIDE;
export const AUTH_SIDE_VARIANT: AuthSideVariant =
  fromEnv === "classic" || fromEnv === "product" ? fromEnv : "product";

interface AuthLayoutProps {
  children: React.ReactNode;
  tagline?: string;
}

const defaultTagline =
  "The easiest way to create & send invoices.";

export function AuthLayout({
  children,
  tagline = defaultTagline,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen font-onest">
      {AUTH_SIDE_VARIANT === "classic" ? (
        <AuthSideClassic tagline={tagline} />
      ) : (
        <AuthSideProduct tagline={tagline} />
      )}

      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
