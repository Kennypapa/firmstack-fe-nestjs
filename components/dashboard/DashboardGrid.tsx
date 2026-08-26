"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveGridLayout,
  useContainerWidth,
  verticalCompactor,
  type Layout,
  type ResponsiveLayouts,
} from "react-grid-layout";
import {
  useDashboardLayoutStore,
  DASHBOARD_BREAKPOINTS,
  DASHBOARD_COLS,
  DASHBOARD_WIDGET_IDS,
  type DashboardBreakpoint,
  type DashboardWidgetId,
} from "@/stores/dashboard-layout";
import {
  TotalRevenueWidget,
  TotalExpensesWidget,
  NetProfitWidget,
  TotalInvoicesWidget,
  RevenueChartWidget,
  ProfitTrendWidget,
  QuickActionsWidget,
  RecentActivityWidget,
  RecentInvoicesWidget,
  RecentExpensesWidget,
} from "@/components/dashboard/DashboardWidgets";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const SHAKE_DURATION_MS = 3000;
const SHAKE_INTERVAL_MS = 30 * 1000;

const WIDGET_MAP: Record<DashboardWidgetId, () => React.ReactElement> = {
  "total-revenue": TotalRevenueWidget,
  "total-expenses": TotalExpensesWidget,
  "net-profit": NetProfitWidget,
  "total-invoices": TotalInvoicesWidget,
  "revenue-chart": RevenueChartWidget,
  "profit-trend": ProfitTrendWidget,
  "quick-actions": QuickActionsWidget,
  "recent-activity": RecentActivityWidget,
  "recent-invoices": RecentInvoicesWidget,
  "recent-expenses": RecentExpensesWidget,
};

export function DashboardGrid() {
  const layouts = useDashboardLayoutStore((s) => s.layouts);
  const isEditing = useDashboardLayoutStore((s) => s.isEditing);
  const setLayouts = useDashboardLayoutStore((s) => s.setLayouts);
  const setBreakpoint = useDashboardLayoutStore((s) => s.setBreakpoint);
  const { width, containerRef, mounted } = useContainerWidth();
  const [isShaking, setIsShaking] = useState(false);

  // Light CSS jiggle while customizing: 3s burst every 30 seconds
  useEffect(() => {
    if (!isEditing) {
      setIsShaking(false);
      return;
    }

    let endTimer: ReturnType<typeof setTimeout> | undefined;

    const runShake = () => {
      setIsShaking(true);
      clearTimeout(endTimer);
      endTimer = setTimeout(() => setIsShaking(false), SHAKE_DURATION_MS);
    };

    const firstTimer = setTimeout(runShake, 600);
    const interval = setInterval(runShake, SHAKE_INTERVAL_MS);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      clearTimeout(endTimer);
      setIsShaking(false);
    };
  }, [isEditing]);

  const widgets = useMemo(
    () =>
      DASHBOARD_WIDGET_IDS.map((id) => {
        const Widget = WIDGET_MAP[id];
        if (!Widget) return null;
        return (
          <div key={id} className="h-full">
            <Widget />
          </div>
        );
      }),
    []
  );

  // Drag to rearrange only — hide the bottom-right resize handle
  const allowResize = false;

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={[
        isEditing ? "dashboard-grid-editing" : "",
        isShaking ? "dashboard-widgets-shaking" : "",
      ]
        .filter(Boolean)
        .join(" ") || undefined}
    >
      {mounted && width > 0 && (
        <ResponsiveGridLayout
          className="layout"
          width={width}
          layouts={layouts}
          breakpoints={DASHBOARD_BREAKPOINTS}
          cols={DASHBOARD_COLS}
          rowHeight={36}
          margin={[12, 12]}
          containerPadding={[0, 0]}
          dragConfig={{
            enabled: isEditing,
            handle: ".drag-handle",
          }}
          resizeConfig={{
            enabled: allowResize,
            handles: ["se"],
          }}
          compactor={verticalCompactor}
          onBreakpointChange={(bp) =>
            setBreakpoint(bp as DashboardBreakpoint)
          }
          onLayoutChange={(
            _layout: Layout,
            nextLayouts: ResponsiveLayouts<DashboardBreakpoint>
          ) => setLayouts(nextLayouts)}
          autoSize
        >
          {widgets}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
