import TimeFilter from '../types/time_filter';
import { appendData, generateStableHash, hasIntersection } from './delta_util';
import _ from 'lodash';
import { InstanaQuery } from '../types/instana_query';
import { buildTestTarget } from '../test_util';

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

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(true);
    });

    it('should not find before overlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10200000,
        to: 10400000,
        windowSize: 200000
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find innerlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10400000,
        to: 10500000,
        windowSize: 100000
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(true);
    });

    it('should not find after outerlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10700000,
        to: 10800000,
        windowSize: 100000
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find before outerlap', function() {
      let newTimeFilter: TimeFilter = {
        from: 10100000,
        to: 10200000,
        windowSize: 100000
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });
  });

  describe('with a target', function() {
    let target = buildTarget();

    it('should generate a stable hash and should have SelectableValue flattened', function() {
      let result = generateStableHash(target);
      expect(result).toEqual(JSON.stringify({
        aggregateGraphs: false,
        aggregation: {},
        applicationCallToEntity: {},
        customFilters: [],
        displayMaxMetricValue: false,
        endpoint: {},
        entity: 'key', //no more label
        entityQuery: 'query',
        entityType: {},
        filter: 'filter',
        filters: [],
        freeTextMetrics: '',
        group: {},
        groupbyTagSecondLevelKey: '',
        hideOriginalGraphs: false,
        metric: {},
        metricCategory: {},
        service: null,
        sloReport: {},
        sloSpecific: {},
        sloValue: '',
        timeInterval: {},
        timeShift: '',
        showAllMetrics: false,
        allMetrics: [],
        aggregationFunction: {}
      }));
    });
  });

  describe('with new data', function() {

    it('should override cached data with new data', function() {
      let deltaData = generateTestData(2, 2);
      let cachedData = generateTestData(2, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).toEqual(20);
      expect(result[0].datapoints[19]).toEqual(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).toEqual(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).toEqual(cachedData[0].datapoints[17]);

      expect(result[1].datapoints.length).toEqual(20);
      expect(result[1].datapoints[19]).toEqual(deltaData[1].datapoints[1]);
      expect(result[1].datapoints[18]).toEqual(deltaData[1].datapoints[0]);
      expect(result[1].datapoints[17]).toEqual(cachedData[1].datapoints[17]);
    });

    it('should add completly new data to cache', function() {
      let deltaData = generateTestData(2, 2);
      let cachedData = generateTestData(1, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).toEqual(20);
      expect(result[0].datapoints[19]).toEqual(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).toEqual(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).toEqual(cachedData[0].datapoints[17]);

      expect(result[1].datapoints.length).toEqual(2);
      expect(result[1].datapoints[1]).toEqual(deltaData[1].datapoints[1]);
      expect(result[1].datapoints[0]).toEqual(deltaData[1].datapoints[0]);
    });

    it('should still contain cached data if not updated', function() {
      let deltaData = generateTestData(1, 2);
      let cachedData = generateTestData(2, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).toEqual(20);
      expect(result[0].datapoints[19]).toEqual(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).toEqual(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).toEqual(cachedData[0].datapoints[17]);

      expect(result[1].datapoints.length).toEqual(20);
      expect(result[1].datapoints[19]).toEqual(cachedData[1].datapoints[19]);
      expect(result[1].datapoints[18]).toEqual(cachedData[1].datapoints[18]);
      expect(result[1].datapoints[17]).toEqual(cachedData[1].datapoints[17]);
    });

    it('should dropp old cached data when new data was added', function() {
      let deltaData = generateTestData(1, 2);
      let cachedData = generateTestData(1, 21);
      cachedData[0].datapoints = _.takeRight(cachedData[0].datapoints, 20);

      let result = appendData(_.cloneDeep(deltaData), _.cloneDeep(cachedData));

      expect(result[0].datapoints.length).toEqual(20);
      expect(result[0].datapoints[19]).toEqual(deltaData[0].datapoints[1]);
      expect(result[0].datapoints[18]).toEqual(deltaData[0].datapoints[0]);
      expect(result[0].datapoints[17]).toEqual(cachedData[0].datapoints[17]);
    });

  });
});

/*
 * Return testdata with random values (sometimes null) and a decreasing timestamp.
 */
function generateTestData(amountOfTimeseries: number, numberOfEntries: number) {
  var data = [];
  for (let i = 1; i <= amountOfTimeseries; i++) {
    var timeseries = [];
    for (let j = 1; j <= numberOfEntries; j++) {
      timeseries.unshift([ getRandomValue(), 10900000 - (j * 100000) ]);
    }
    data.push({
      target: 'Metrics for ' + i,
      refId: 'A',
      datapoints: timeseries,
      key: 'Metrics for ' + i
    });
  }
  return data;
}

function getRandomValue() {
  // return null once in a while
  if (Math.floor(Math.random() * 5) == 0) {
    return null;
  }
  return Math.floor(Math.random() * 100);
}

function buildTarget() {
  let target: InstanaQuery = buildTestTarget();
  target.entity = { key: 'key', label: 'test' };
  target.service = { key: null };
  target.entityQuery = 'query';
  target.filter = 'filter';
  target.pluginId = 'pluginId';
  target.showWarningCantShowAllResults = false;
  target.labelFormat = 'labelFormat';
  target.timeShiftIsValid = false;
  target.useFreeTextMetrics = false;
  target.showGroupBySecondLevel = false;
  target.aggregateGraphs = false;
  target.canShowAllMetrics = false;
  target.timeFilter = { from: 0, to: 0, windowSize: 0 };
  target.stableHash = 'stableHash';
  target.refId = 'A';
  return target;
}
