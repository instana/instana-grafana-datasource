import { describe, it, expect } from './lib/common';
import { aggregateTarget } from "../src/util/aggregation_util";

describe('Given a dataset', function() {
  describe('with 3 entries', function() {
    /*
      [
        {
          datapoints: [
            [0, 0],
            [1, 100000000],
            [2, 200000000]
          ]
        },
        {
          datapoints: [
            [1, 0],
            [2, 100000000],
            [3, 200000000]
          ]
        },
        {
          datapoints: [
            [2, 0],
            [3, 100000000],
            [4, 200000000]
          ]
        }
      ]
    */
    let data = generateTestData(3, 3);

    it('should aggregate correctly to SUM', function() {
      let target = buildTestTarget("SUM", "A");

      const expected = {
        datapoints: [
          [3, 0],
          [6, 100000000],
          [9, 200000000]
        ],
        refId: target.refId,
        target: target.aggregationFunction.label
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });

    it('should aggregate correctly to MEAN', function() {
      let target = buildTestTarget("MEAN", "B");

      const expected = {
        datapoints: [
          [1, 0],
          [2, 100000000],
          [3, 200000000]
        ],
        refId: target.refId,
        target: target.aggregationFunction.label
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });

    it('should aggregate correctly to MIN', function() {
      let target = buildTestTarget("MIN", "C");

      const expected = {
        datapoints: [
          [0, 0],
          [1, 100000000],
          [2, 200000000]
        ],
        refId: target.refId,
        target: target.aggregationFunction.label
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });

    it('should aggregate correctly to MAX', function() {
      let target = buildTestTarget("MAX", "D");
      
      const expected = {
        datapoints: [
          [2, 0],
          [3, 100000000],
          [4, 200000000]
        ],
        refId: target.refId,
        target: target.aggregationFunction.label
      };
      let result = aggregateTarget(data, target);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

});

function generateTestData(amountOfTimeseries, numberOfEntries) {
  var data = [];
  for (let i = 0; i < amountOfTimeseries; i++) {
    var timeseries = [];
    for (let j = 0; j < numberOfEntries; j++) {
      timeseries.push([j + i, j * 100000000]);
    }
    data.push({ datapoints: timeseries });
  }
  return data;
}

function buildTestTarget(aggregationFunctionLabel, refId) {
  return {
    showAllMetrics: true,
    allMetrics: [
      1, 2, 3, 4, 5
    ],
    aggregationFunction: {
      label: aggregationFunctionLabel
    },
    refId: refId
  };
}
