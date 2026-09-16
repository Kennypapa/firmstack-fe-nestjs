"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useAuthStore } from "@/stores/auth";
import { markDashboardTourSeen } from "@/lib/api/users";

export function DashboardTour() {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user || user.dashboardTourSeen) return;

    const timer = window.setTimeout(() => {
      const customize = document.querySelector("#tour-customize");
      const newInvoice = document.querySelector("#tour-new-invoice");
      const quickActions = document.querySelector("#tour-quick-actions");
      if (!customize || !newInvoice || !quickActions) return;

      const tour = driver({
        showProgress: true,
        animate: true,
        overlayOpacity: 0.55,
        stagePadding: 8,
        stageRadius: 12,
        popoverClass: "firmstack-tour-popover",
        allowClose: false,
        overlayClickBehavior: () => {},
        allowKeyboardControl: false,
        disableActiveInteraction: true,
        showButtons: ["next", "previous"],
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Got it",
        steps: [
          {
            element: "#tour-customize",
            popover: {
              title: "Customize your dashboard",
              description:
                "Rearrange widgets so the numbers you care about sit up front.",
              side: "bottom",
              align: "end",
            },
          },
          {
            element: "#tour-new-invoice",
            popover: {
              title: "Create an invoice",
              description:
                "Start a new invoice anytime — pick a template and send it.",
              side: "bottom",
              align: "end",
            },
          },
          {
            element: "#tour-quick-actions",
            popover: {
              title: "Quick actions",
              description:
                "Shortcuts for invoices, expenses, settings, and inviting your team.",
              side: "left",
              align: "start",
            },
          },
        ],
        onDestroyed: () => {
          void markDashboardTourSeen()
            .then(() => {
              useAuthStore.setState((state) =>
                state.user
                  ? {
                      user: { ...state.user, dashboardTourSeen: true },
                    }
                  : {},
              );
            })
            .catch(() => {
              /* ignore — tour already finished in UI */
            });
        },
      });

      tour.drive();
    }, 700);

    return () => window.clearTimeout(timer);
  }, [user?.id, user?.dashboardTourSeen]);

  return null;
}
