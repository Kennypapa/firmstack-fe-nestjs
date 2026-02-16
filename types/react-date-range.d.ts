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
  }
  export class DateRangePicker extends Component<DateRangePickerProps> {}
}
