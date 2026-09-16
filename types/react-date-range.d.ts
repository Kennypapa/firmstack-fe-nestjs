declare module "react-date-range" {
  import { Component } from "react";
  export interface Range {
    startDate: Date;
    endDate: Date;
    key?: string;
  }
  export interface DateRangePickerProps {
    ranges: Range[];
    onChange?: (item: { selection: Range }) => void;
    months?: number;
    direction?: "horizontal" | "vertical";
    rangeColors?: string[];
    showDateDisplay?: boolean;
    staticRanges?: unknown[];
    inputRanges?: unknown[];
  }
  export interface CalendarProps {
    date?: Date;
    onChange?: (date: Date) => void;
    months?: number;
    direction?: "horizontal" | "vertical";
    color?: string;
    rangeColors?: string[];
    showDateDisplay?: boolean;
    showMonthAndYearPickers?: boolean;
  }
  export class DateRangePicker extends Component<DateRangePickerProps> {}
  export class Calendar extends Component<CalendarProps> {}
}
