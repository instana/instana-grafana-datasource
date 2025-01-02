import { TimeRange } from '@grafana/data/types/time';
import TimeFilter from '../types/time_filter';
import { SEPARATOR } from '../GlobalVariables';

export function readTime(time: TimeRange): TimeFilter {
  const from = new Date(time!.from.valueOf()).getTime();
  const to = new Date(time!.to.valueOf()).getTime();
  return {
    from: from,
    to: to,
    windowSize: to - from,
  };
}

export function getWindowSize(timeFilter: TimeFilter): number {
  return timeFilter.to - timeFilter.from;
}

export function getTimeKey(timeFilter: TimeFilter): string {
  // time might be part of a cache key as this can cause different results
  return msToMin(timeFilter.from) + SEPARATOR + msToMin(timeFilter.to);
}

function msToMin(time: number): number {
  return time / 60000; // Avoid rounding to retain precision
}

export function hoursToMs(hours: any): number {
  if (hours > 0) {
    return hours * 60 * 60 * 1000; // Direct conversion without rounding
  }
  return 0;
}

export function atLeastGranularity(windowSize: number, granularity: number): number {
  // Ensure windowSize is not smaller than granularity
  const granularityInMs = granularity * 1000;
  return windowSize >= granularityInMs ? windowSize : granularityInMs;
}
