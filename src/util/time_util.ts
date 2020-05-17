import { TimeRange } from "@grafana/data/types/time";
import TimeFilter from "../types/time_filter";

export function readTime(time: TimeRange): TimeFilter {
  const from = Math.floor(new Date(time!.from.valueOf()).getTime() / 1000) * 1000;
  const to = Math.floor(new Date(time!.to.valueOf()).getTime() / 1000) * 1000;
  return {
    from: from,
    to: to,
    windowSize: to - from
  };
}

export function getWindowSize(timeFilter: TimeFilter): number {
  return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
}
