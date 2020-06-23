import { TimeRange } from '@grafana/data/types/time';
import TimeFilter from '../types/time_filter';
import { SEPARATOR } from '../GlobalVariables';

export function readTime(time: TimeRange): TimeFilter {
  const from = Math.floor(new Date(time!.from.valueOf()).getTime() / 1000) * 1000;
  const to = Math.floor(new Date(time!.to.valueOf()).getTime() / 1000) * 1000;
  return {
    from: from,
    to: to,
    windowSize: to - from,
  };
}

export function getWindowSize(timeFilter: TimeFilter): number {
  return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
}

export function getTimeKey(timeFilter: TimeFilter): string {
  // time might be part of a cache key as this can cause different results
  return msToMin(timeFilter.from) + SEPARATOR + msToMin(timeFilter.to);
}

function msToMin(time: number): number {
  return Math.floor(time / 60000);
}

export function hoursToMs(hours: any): number {
  if (hours > 0) {
    return hours * 60 * 60 * 1000;
  }
  return 0;
}
