import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firmstack",
  description:
    "Backend-first, multi-tenant SaaS platform for managing business operations and finances.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
