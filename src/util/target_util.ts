import {
  TimeSeries,
  TimeSeriesPoints
} from '@grafana/data';

export function emptyResultData(refId: string): TimeSeries {
  return {
    target: refId,
    datapoints: []
  };
}

export function buildTimeSeries(label: string, refId: string, datapoints: TimeSeriesPoints): TimeSeries {
  return {
    target: label,
    refId: refId,
    datapoints: datapoints
  };
}
