import {
  DataQueryResponseData,
  FieldType,
  MutableDataFrame,
  MutableField,
  TimeSeries,
  TimeSeriesPoints
} from "@grafana/data";
import _ from "lodash";

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

export function buildDataFrame(refId: string, label: string, datapoints: DataQueryResponseData[]): MutableDataFrame {
  const values = _.map(datapoints, value => { return value[0]; });
  const times = _.map(datapoints, value => { return value[1]; });

  return new MutableDataFrame({
    fields: [
      { name: 'Time', values: times, type: FieldType.time },
      { name: label, values: values, type: FieldType.number }
    ]
  });
}

export function buildMultiDataFrame(refId: string, fields: MutableField[]) {
  return new MutableDataFrame({
    refId: refId,
    fields: fields
  });
}
