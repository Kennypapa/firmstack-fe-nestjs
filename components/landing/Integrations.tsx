"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  MessageSquare,
  Cloud,
  BarChart3,
  Database,
  Zap,
} from "lucide-react";

const integrationIcons = [
  { Icon: FileSpreadsheet, label: "Spreadsheets", color: "text-green-600" },
  { Icon: MessageSquare, label: "Slack", color: "text-purple-600" },
  { Icon: Cloud, label: "Cloud", color: "text-blue-600" },
  { Icon: BarChart3, label: "Analytics", color: "text-primary" },
  { Icon: Database, label: "Database", color: "text-amber-600" },
  { Icon: Zap, label: "Automation", color: "text-orange-500" },
];

export function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc] font-onest" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Connect Firmstack with your tools
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Export data, sync with your accounting stack, and automate reporting—so your finances stay in sync with the rest of your business.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center rounded-xl border-2 border-navy text-navy font-semibold px-5 py-2.5 hover:bg-navy hover:text-white transition-colors"
            >
              See integrations
            </Link>
          </div>
          <div ref={containerRef} className="relative flex items-center justify-center min-h-[280px]">
            <div className="relative w-full max-w-md aspect-square">
              {integrationIcons.map((item, i) => {
                const angle = (i / integrationIcons.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 120;
                const x = 50 + (radius / 2) * Math.cos(angle);
                const y = 50 + (radius / 2) * Math.sin(angle);
                return (
                  <div
                    key={item.label}
                    className="absolute w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-transform"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      animation: `float ${5 + i}s ease-in-out infinite`,
                    }}
                  >
                    <item.Icon className={`w-7 h-7 ${item.color}`} aria-hidden />
                  </div>
                );
              })}
              <div
                className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 flex items-center justify-center"
                style={{ animation: "float 4s ease-in-out infinite" }}
              >
                <span className="text-2xl font-bold text-primary">F</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
