"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Calendar, FileText } from "lucide-react";
import { getPortalMe } from "@/lib/api/portal";

const cards = [
  {
    href: "/portal/clock",
    title: "Clock In / Clock Out",
    description: "Track your work hours",
    Icon: Clock,
  },
  {
    href: "/portal/leave",
    title: "Request Leave",
    description: "Submit time off requests",
    Icon: Calendar,
  },
  {
    href: "/portal/payslips",
    title: "View Payslips",
    description: "Access your salary statements",
    Icon: FileText,
  },
];

export default function PortalDashboardPage() {
  const [greeting, setGreeting] = useState("Hello");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortalMe()
      .then((data) => setGreeting(data.greeting))
      .catch(() => {
        const hour = new Date().getHours();
        setGreeting(
          hour < 12
            ? "Good Morning"
            : hour < 18
              ? "Good Afternoon"
              : "Good Evening",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-navy">
          {loading ? "Loading…" : greeting}
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Here&apos;s what you need today.
        </p>
      </div>

      <div className="space-y-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10">
                <card.Icon className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-navy">{card.title}</h2>
                <p className="mt-1 text-muted-foreground">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
