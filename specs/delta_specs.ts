import { describe, it, expect } from './lib/common';
import { appendData, generateStableHash, isOverlapping } from "../src/util/delta_util";
import TimeFilter from '../src/types/time_filter';

describe('Given a delta', function() {
  describe('with two overlapping timeFilter', function() {
    let preTimeFilter: TimeFilter = {
      from: 10300000,
      to: 10600000,
      windowSize: 300000
    };

    it('should find after overlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10500000,
        to: 10700000,
        windowSize: 200000
      };

      let result = isOverlapping(newTimeFilter, preTimeFilter);
      expect(result).to.equal(true);
    });

    it('should not find before overlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10200000,
        to: 10400000,
        windowSize: 200000
      };

      let result = isOverlapping(newTimeFilter, preTimeFilter);
      expect(result).to.equal(false);
    });

    it('should not find innerlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10400000,
        to: 10500000,
        windowSize: 100000
      };

      let result = isOverlapping(newTimeFilter, preTimeFilter);
      expect(result).to.equal(true); // TODO false ? as seen in description
    });

    it('should not find after outerlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10700000,
        to: 10800000,
        windowSize: 100000
      };

      let result = isOverlapping(newTimeFilter, preTimeFilter);
      expect(result).to.equal(false);
    });

    it('should not find before outerlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10100000,
        to: 10200000,
        windowSize: 100000
      };

      let result = isOverlapping(newTimeFilter, preTimeFilter);
      expect(result).to.equal(false);
    });
  });

  describe('with a target', function() {
    let target = buildTestTarget("SUM");

    it('should generate a stable hash', function() {
      let result = generateStableHash(target);
      expect(result).to.equal(JSON.stringify({
        entity: "key",
        service: null,
        query: "query",
        filter: null
      }));
    });

    it('should have Selectable flattened', function() {
      let result = generateStableHash(target);
      expect(result).to.equal(JSON.stringify({
        entity: "key",
        service: null,
        query: "query",
        filter: null
      }));
    });
  });

  describe('with new data', function() {

    it('should override cached data with new data', function() {
      let deltaData = generateTestData(2, 2);
      let cachedData = generateTestData(2, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).to.equal(20);
      expect(result[0].datapoints[19]).to.equal(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).to.equal(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).to.equal(cachedData[0].datapoints[17]); // ...

      expect(result[1].datapoints.length).to.equal(20);
      expect(result[1].datapoints[19]).to.equal(deltaData[1].datapoints[1]);
      expect(result[1].datapoints[18]).to.equal(deltaData[1].datapoints[0]);
      expect(result[1].datapoints[17]).to.equal(cachedData[1].datapoints[17]); // ...
    });

    it('should add completly new data to cache', function() {
      let deltaData = generateTestData(2, 2);
      let cachedData = generateTestData(1, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).to.equal(20);
      expect(result[0].datapoints[19]).to.equal(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).to.equal(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).to.equal(cachedData[0].datapoints[17]); // ...

      expect(result[1].datapoints.length).to.equal(2);
      expect(result[1].datapoints[1]).to.equal(deltaData[1].datapoints[1]);
      expect(result[1].datapoints[0]).to.equal(deltaData[1].datapoints[0]);
    });

    it('should still contain cached data if not updated', function() {
      let deltaData = generateTestData(1, 2);
      let cachedData = generateTestData(2, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).to.equal(20);
      expect(result[0].datapoints[19]).to.equal(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).to.equal(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).to.equal(cachedData[0].datapoints[17]); // ...

      expect(result[1].datapoints.length).to.equal(20);
      expect(result[1].datapoints[19]).to.equal(cachedData[1].datapoints[19]);
      expect(result[1].datapoints[18]).to.equal(cachedData[1].datapoints[18]);
      expect(result[1].datapoints[17]).to.equal(cachedData[1].datapoints[17]); // ...
    });

    it('should dropp old cached data when new data was added', function() {
      let deltaData = generateTestData(1, 2);
      let cachedData = generateTestData(1, 21);
      cachedData = _.takeRight(cachedData[0].datapoints, 20)

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).to.equal(20);
      expect(result[0].datapoints[19]).to.equal(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).to.equal(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).to.equal(cachedData[0].datapoints[17]); // ...
    });

  });
});

/*
 * Return testdata with random values (sometimes null) and a decreasing timestamp.
 */
function generateTestData(amountOfTimeseries, numberOfEntries) {
  var data = [];
  for (let i = 1; i <= amountOfTimeseries; i++) {
    var timeseries = [];
    for (let j = 1; j <= numberOfEntries; j++) {
      timeseries.unshift([getRandomValue(), 10900000 - (j * 100000)]);
    }
    data.push({
      target: "Metrics for " + amountOfTimeseries,
      refId: "A",
      datapoints: timeseries
    });
  }
  return data;
}

function getRandomValue(): integer {
  // return null once in a while
  if (Math.floor(Math.random() * 5) == 0) {
    return null;
  }
  return Math.floor(Math.random() * 100);
}

function buildTestTarget(aggregationFunctionLabel) {
  return {
    entity: { key: "key", label: "label" },
    service: { key: null, label: "-----" },
    query: "query",
    filter: null,
    pluginId: "pluginId",
    showWarningCantShowAllResults: "showWarningCantShowAllResults",
    labelFormat: "labelFormat",
    timeShiftIsValid: "timeShiftIsValid",
    useFreeTextMetrics: "useFreeTextMetrics",
    showGroupBySecondLevel: "showGroupBySecondLevel",
    aggregateGraphs: "aggregateGraphs",
    canShowAllMetrics: "canShowAllMetrics",
    timeFilter: "timeFilter",
    stableHash: "stableHash",
    refId: "A"
  };
}
