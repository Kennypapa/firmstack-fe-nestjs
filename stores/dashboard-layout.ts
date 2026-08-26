import type { LayoutItem, ResponsiveLayouts } from "react-grid-layout";
import { create } from "zustand";

export type DashboardWidgetId =
  | "total-revenue"
  | "total-expenses"
  | "net-profit"
  | "total-invoices"
  | "revenue-chart"
  | "profit-trend"
  | "quick-actions"
  | "recent-activity"
  | "recent-invoices"
  | "recent-expenses";

export type DashboardBreakpoint = "lg" | "md" | "sm" | "xs";

export const DASHBOARD_BREAKPOINTS: Record<DashboardBreakpoint, number> = {
  lg: 1200,
  md: 768,
  sm: 480,
  xs: 0,
};

export const DASHBOARD_COLS: Record<DashboardBreakpoint, number> = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
};

/** Desktop — original arrangement */
const LAYOUT_LG: LayoutItem[] = [
  { i: "total-revenue", x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "total-expenses", x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "net-profit", x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "total-invoices", x: 9, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "revenue-chart", x: 0, y: 4, w: 8, h: 8, minW: 4, minH: 6 },
  { i: "profit-trend", x: 8, y: 4, w: 4, h: 3, minW: 3, minH: 3 },
  { i: "quick-actions", x: 8, y: 7, w: 4, h: 5, minW: 3, minH: 4 },
  { i: "recent-activity", x: 0, y: 12, w: 4, h: 9, minW: 3, minH: 6 },
  { i: "recent-invoices", x: 4, y: 12, w: 4, h: 9, minW: 3, minH: 6 },
  { i: "recent-expenses", x: 8, y: 12, w: 4, h: 9, minW: 3, minH: 6 },
];

/** Tablet — 2 metric cards per row */
const LAYOUT_MD: LayoutItem[] = [
  { i: "total-revenue", x: 0, y: 0, w: 5, h: 4, minW: 3, minH: 3 },
  { i: "total-expenses", x: 5, y: 0, w: 5, h: 4, minW: 3, minH: 3 },
  { i: "net-profit", x: 0, y: 4, w: 5, h: 4, minW: 3, minH: 3 },
  { i: "total-invoices", x: 5, y: 4, w: 5, h: 4, minW: 3, minH: 3 },
  { i: "revenue-chart", x: 0, y: 8, w: 10, h: 8, minW: 4, minH: 6 },
  { i: "quick-actions", x: 0, y: 16, w: 5, h: 5, minW: 3, minH: 4 },
  { i: "profit-trend", x: 5, y: 16, w: 5, h: 4, minW: 3, minH: 3 },
  { i: "recent-activity", x: 0, y: 21, w: 10, h: 9, minW: 4, minH: 6 },
  { i: "recent-invoices", x: 0, y: 30, w: 5, h: 9, minW: 3, minH: 6 },
  { i: "recent-expenses", x: 5, y: 30, w: 5, h: 9, minW: 3, minH: 6 },
];

/** Large phone — 2 cols of metrics, rest full width */
const LAYOUT_SM: LayoutItem[] = [
  { i: "total-revenue", x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "total-expenses", x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "net-profit", x: 0, y: 4, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "total-invoices", x: 3, y: 4, w: 3, h: 4, minW: 2, minH: 3 },
  { i: "revenue-chart", x: 0, y: 8, w: 6, h: 8, minW: 4, minH: 6 },
  { i: "profit-trend", x: 0, y: 16, w: 6, h: 4, minW: 3, minH: 3 },
  { i: "quick-actions", x: 0, y: 20, w: 6, h: 5, minW: 3, minH: 4 },
  { i: "recent-activity", x: 0, y: 25, w: 6, h: 9, minW: 3, minH: 6 },
  { i: "recent-invoices", x: 0, y: 34, w: 6, h: 9, minW: 3, minH: 6 },
  { i: "recent-expenses", x: 0, y: 43, w: 6, h: 9, minW: 3, minH: 6 },
];

/** Phone — stacked single column (4-col grid, each widget full width) */
const LAYOUT_XS: LayoutItem[] = [
  { i: "total-revenue", x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 3 },
  { i: "total-expenses", x: 0, y: 4, w: 4, h: 4, minW: 2, minH: 3 },
  { i: "net-profit", x: 0, y: 8, w: 4, h: 4, minW: 2, minH: 3 },
  { i: "total-invoices", x: 0, y: 12, w: 4, h: 4, minW: 2, minH: 3 },
  { i: "revenue-chart", x: 0, y: 16, w: 4, h: 8, minW: 2, minH: 6 },
  { i: "profit-trend", x: 0, y: 24, w: 4, h: 4, minW: 2, minH: 3 },
  { i: "quick-actions", x: 0, y: 28, w: 4, h: 6, minW: 2, minH: 4 },
  { i: "recent-activity", x: 0, y: 34, w: 4, h: 9, minW: 2, minH: 6 },
  { i: "recent-invoices", x: 0, y: 43, w: 4, h: 9, minW: 2, minH: 6 },
  { i: "recent-expenses", x: 0, y: 52, w: 4, h: 9, minW: 2, minH: 6 },
];

export const DEFAULT_DASHBOARD_LAYOUTS: ResponsiveLayouts<DashboardBreakpoint> = {
  lg: LAYOUT_LG,
  md: LAYOUT_MD,
  sm: LAYOUT_SM,
  xs: LAYOUT_XS,
};

export const DASHBOARD_WIDGET_IDS = LAYOUT_LG.map(
  (item) => item.i as DashboardWidgetId
);

function cloneLayouts(
  layouts: ResponsiveLayouts<DashboardBreakpoint>
): ResponsiveLayouts<DashboardBreakpoint> {
  return {
    lg: layouts.lg?.map((item) => ({ ...item })) ?? [],
    md: layouts.md?.map((item) => ({ ...item })) ?? [],
    sm: layouts.sm?.map((item) => ({ ...item })) ?? [],
    xs: layouts.xs?.map((item) => ({ ...item })) ?? [],
  };
}

function normalizeLayout(layout: readonly LayoutItem[]): LayoutItem[] {
  return layout.map((item) => ({
    i: item.i,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    minW: item.minW,
    minH: item.minH,
  }));
}

interface DashboardLayoutState {
  layouts: ResponsiveLayouts<DashboardBreakpoint>;
  breakpoint: DashboardBreakpoint;
  isEditing: boolean;
  setLayouts: (layouts: ResponsiveLayouts<DashboardBreakpoint>) => void;
  setBreakpoint: (breakpoint: DashboardBreakpoint) => void;
  setEditing: (editing: boolean) => void;
  resetLayout: () => void;
}

/**
 * In-memory Zustand store only.
 * Layouts are per breakpoint so the grid can reflow on smaller screens.
 */
export const useDashboardLayoutStore = create<DashboardLayoutState>((set) => ({
  layouts: cloneLayouts(DEFAULT_DASHBOARD_LAYOUTS),
  breakpoint: "lg",
  isEditing: false,
  setLayouts: (layouts) =>
    set({
      layouts: {
        lg: normalizeLayout(layouts.lg ?? []),
        md: normalizeLayout(layouts.md ?? []),
        sm: normalizeLayout(layouts.sm ?? []),
        xs: normalizeLayout(layouts.xs ?? []),
      },
    }),
  setBreakpoint: (breakpoint) => set({ breakpoint }),
  setEditing: (isEditing) => set({ isEditing }),
  resetLayout: () =>
    set({
      layouts: cloneLayouts(DEFAULT_DASHBOARD_LAYOUTS),
      isEditing: false,
    }),
}));
