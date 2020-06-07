import { buildTimeSeries, emptyResultData } from './target_util';
import { TimeSeries, TimeSeriesPoints } from '@grafana/data';

describe('Given a string refId', function() {
  it('should return an empty result object containing said refId', function() {
    expect(emptyResultData('someRandomRefId')).toEqual({target: 'someRandomRefId', datapoints: []});
  });
});

describe('Given a label, refId, and datapoints', function() {
  it('should return a TimeSeries object', function() {
    let target: string = 'label';
    let refId: string = 'refId';
    let datapoints: TimeSeriesPoints = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ]

    let expected: TimeSeries = {
      target: target,
      refId: refId,
      datapoints: datapoints
    }

    expect(buildTimeSeries(target, refId, datapoints)).toEqual(expected);
  });
});
