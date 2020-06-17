import { InstanaQuery } from '../types/instana_query';
import { buildTestTarget, generateTestData } from './test_util';
import { aggregateTarget } from './aggregation_util';

describe('Given a dataset', function() {
  describe('with 3 entries', function() {
    let data = generateTestData(3, 3);

    it('should aggregate correctly to SUM', function() {
      let target: InstanaQuery = buildTestTarget();
      target.refId = 'A';
      target.metric = {  key: 'my metric' };
      target.aggregationFunction = {
        label: 'SUM'
      };

      const expected = {
        datapoints: [
          [3, 0],
          [6, 100000000],
          [9, 200000000]
        ],
        refId: target.refId,
        target: target.metric.key + " (" + target.aggregationFunction.label + ")"
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });

    it('should aggregate correctly to MEAN', function() {
      let target: InstanaQuery = buildTestTarget();
      target.refId = 'B';
      target.aggregationFunction = {
        label: 'MEAN'
      };

      const expected = {
        datapoints: [
          [1, 0],
          [2, 100000000],
          [3, 200000000]
        ],
        refId: target.refId,
        target: target.metric.key + " (" + target.aggregationFunction.label + ")"
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });

    it('should aggregate correctly to MIN', function() {
      let target = buildTestTarget();
      target.refId = 'C';
      target.metric = { key: 'my metric'}
      target.aggregationFunction = {
        label: 'MIN'
      };


      const expected = {
        datapoints: [
          [0, 0],
          [1, 100000000],
          [2, 200000000]
        ],
        refId: target.refId,
        target: target.metric.key + " (" + target.aggregationFunction.label + ")"
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });

    it('should aggregate correctly to MAX', function() {
      let target = buildTestTarget();
      target.refId = 'D';
      target.metric = { key: 'my metric'}
      target.aggregationFunction = {
        label: 'MAX'
      };

      const expected = {
        datapoints: [
          [2, 0],
          [3, 100000000],
          [4, 200000000]
        ],
        refId: target.refId,
        target: target.metric.key + " (" + target.aggregationFunction.label + ")"
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

});
