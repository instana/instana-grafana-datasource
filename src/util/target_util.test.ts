import { buildTimeSeries, emptyResultData } from './target_util';
import { TimeSeries, TimeSeriesPoints } from '@grafana/data';

describe('Given a string refId', () => {
  it('should return an empty result object containing said refId', () => {
    expect(emptyResultData('someRandomRefId')).toEqual({ target: 'someRandomRefId', datapoints: [] });
  });
});

describe('Given a label, refId, and datapoints', () => {
  it('should return a TimeSeries object', () => {
    let target = 'label';
    let refId = 'refId';
    let datapoints: TimeSeriesPoints = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ];

    let expected: TimeSeries = {
      target: target,
      refId: refId,
      datapoints: datapoints,
    };

    expect(buildTimeSeries(target, refId, datapoints)).toEqual(expected);
  });
});
