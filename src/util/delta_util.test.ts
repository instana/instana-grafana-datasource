import TimeFilter from '../types/time_filter';
import { appendData, generateStableHash, getDeltaRequestTimestamp, hasIntersection } from './delta_util';
import _ from 'lodash';
import { InstanaQuery } from '../types/instana_query';
import { buildTestTarget } from './test_util';

describe('Test getDeltaRequestTimestamp', () => {

  const oneSecondGranularity = {
    key: '1'
  };

  const oneSecondRollup = {
    key: '1000'
  };

  it('should return fromDefault when timeInterval is one second', () => {
    let series: any = [
      {
        datapoints: [
          [1, 100000001],
          [2, 100000002],
          [3, 100000003]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondGranularity);
    expect(deltaRequestTimestap).toEqual(12345);
  });

  it('should return fromDefault when less than 2 datapoints', () => {
    let series: any = [
      {
        datapoints: [
          [1, 100000001],
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(12345);
  });

  it('should return fromDefault when no datapoints', () => {
    let series: any = [
      {
        datapoints: []
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(12345);
  });

  it('should return penultimate timestamp when enough datapoints are present', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [1, 100000001],
          [2, 100000002],
          [3, 100000003],
          [4, 100000004],
          [5, 100000005],
          [6, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });


  it('should return penulimate timestamp when enough datapoints are present and last value is null', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [1, 100000001],
          [2, 100000002],
          [3, 100000003],
          [4, 100000004],
          [5, 100000005],
          [null, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });


  it('should return penulimate timestamp when enough datapoints are present and several null values (1)', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [1, 100000001],
          [null, 100000002],
          [3, 100000003],
          [null, 100000004],
          [5, 100000005],
          [null, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });

  it('should return correct timestamp when enough datapoints are present and several null values (3)', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [1, 100000001],
          [null, 100000002],
          [null, 100000003],
          [null, 100000004],
          [null, 100000005],
          [null, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });

  it('should return correct timestamp when enough datapoints are present and several null values (4)', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [1, 100000001],
          [2, 100000002],
          [null, 100000003],
          [4, 100000004],
          [null, 100000005],
          [null, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });

  it('should return correct timestamp when enough datapoints are present and several null values (5)', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [null, 100000001],
          [null, 100000002],
          [null, 100000003],
          [4, 100000004],
          [null, 100000005],
          [null, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });

  it('should return correct timestamp when enough datapoints are present and several null values (6)', () => {
    let series: any = [
      {
        datapoints: [
          [0, 100000000],
          [1, 100000001],
          [2, 100000002],
          [3, 100000003],
          [4, 100000004],
          [null, 100000005],
          [null, 100000006]
        ]
      }
    ];

    const deltaRequestTimestap = getDeltaRequestTimestamp(series, 12345, oneSecondRollup);
    expect(deltaRequestTimestap).toEqual(100000005);
  });

});

describe('Given a delta', () => {
  describe('with two overlapping timeFilter', () => {
    let preTimeFilter: TimeFilter = {
      from: 10300000,
      to: 10600000,
      windowSize: 300000,
    };

    it('should find after overlap', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10500000,
        to: 10700000,
        windowSize: 200000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(true);
    });

    it('should find same', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10300000,
        to: 10600000,
        windowSize: 300000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(true);
    });

    it('should find after overlap same to', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10500000,
        to: 10600000,
        windowSize: 100000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(true);
    });

    it('should not find after outerlap from=to', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10600000,
        to: 10800000,
        windowSize: 200000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find innerlap', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10400000,
        to: 10500000,
        windowSize: 100000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find innerlap same from', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10300000,
        to: 10500000,
        windowSize: 300000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find before and after overlap', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10200000,
        to: 10800000,
        windowSize: 600000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find before overlap', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10200000,
        to: 10400000,
        windowSize: 200000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find before overlap to=from', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10200000,
        to: 10300000,
        windowSize: 100000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find before outerlap', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10100000,
        to: 10200000,
        windowSize: 100000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });

    it('should not find after outerlap', () => {
      // pre= from: 10300000,to: 10600000
      let newTimeFilter: TimeFilter = {
        from: 10700000,
        to: 10800000,
        windowSize: 100000,
      };

      let result = hasIntersection(newTimeFilter, preTimeFilter);
      expect(result).toEqual(false);
    });
  });

  describe('with a target', () => {
    let target = buildTarget();

    it('should generate a stable hash and should have SelectableValue flattened', () => {
      let result = generateStableHash(target);
      expect(result).toEqual(
        JSON.stringify({
          callToEntity: '',
          aggregateGraphs: false,
          aggregation: {},
          applicationCallToEntity: '',
          customFilters: [],
          displayMaxMetricValue: false,
          endpoint: {},
          entity: 'key', //no more label
          entityQuery: 'query',
          entityType: {},
          filters: [],
          freeTextMetrics: '',
          group: {},
          groupbyTagSecondLevelKey: '',
          hideOriginalGraphs: false,
          labelFormat: 'labelFormat',
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
          aggregationFunction: {},
          applicationBoundaryScope: '',
          showAdvancedSettings: false,
        })
      );
    });
  });

  describe('with new data', () => {
    it('should override cached data with new data', () => {
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

    it('should add completly new data to cache', () => {
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

    it('should still contain cached data if not updated', () => {
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

    it('should dropp old cached data when new data was added', () => {
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
      timeseries.unshift([getRandomValue(), 10900000 - j * 100000]);
    }
    data.push({
      target: 'Metrics for ' + i,
      refId: 'A',
      datapoints: timeseries,
      key: 'Metrics for ' + i,
    });
  }
  return data;
}

function getRandomValue() {
  // return null once in a while
  if (Math.floor(Math.random() * 5) === 0) {
    return null;
  }
  return Math.floor(Math.random() * 100);
}

function buildTarget() {
  let target: InstanaQuery = buildTestTarget();
  target.entity = { key: 'key', label: 'test' };
  target.service = { key: null };
  target.entityQuery = 'query';
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
