import TimeFilter from '../types/time_filter';
import {
  getDefaultChartGranularity,
  getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups,
} from './rollup_granularity_util';

describe('Given a timeInterval', () => {
  describe('with 1 second time frame', () => {
    let windowSize = 1000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1s analyze granularity', () => {
      const expected = [
        {
          key: '1',
          label: '1s',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1s analyze granularity', () => {
      const expected = {
        key: '1',
        label: '1s',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 1s infrastructure rollup', () => {
      const expected = [
        {
          key: '1000',
          label: '1s',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1s infrastructure rollup', () => {
      const expected = {
        key: '1000',
        label: '1s',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 10 minute time frame', () => {
    let windowSize = 600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1s, 5s, 10s, 1min, 5min, 10min analyze granularity', () => {
      const expected = [
        {
          key: '1',
          label: '1s',
        },
        {
          key: '5',
          label: '5s',
        },
        {
          key: '10',
          label: '10s',
        },
        {
          key: '60',
          label: '1min',
        },
        {
          key: '300',
          label: '5min',
        },
        {
          key: '600',
          label: '10min',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 10s analyze granularity', () => {
      const expected = {
        key: '10',
        label: '10s',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 1s, 5s, 1min, 5min, infrastructure rollup', () => {
      const expected = [
        {
          key: '1000',
          label: '1s',
        },
        {
          key: '5000',
          label: '5s',
        },
        {
          key: '60000',
          label: '1min',
        },
        {
          key: '300000',
          label: '5min',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1s infrastructure rollup', () => {
      const expected = {
        key: '1000',
        label: '1s',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 1 hour time frame', () => {
    let windowSize = 3600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1min, 5min, 10min, 30min, 1h analyze granularity', () => {
      const expected = [
        {
          key: '60',
          label: '1min',
        },
        {
          key: '300',
          label: '5min',
        },
        {
          key: '600',
          label: '10min',
        },
        {
          key: '1800',
          label: '30min',
        },
        {
          key: '3600',
          label: '1h',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1min analyze granularity', () => {
      const expected = {
        key: '60',
        label: '1min',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 5s, 1min, 5min, infrastructure rollup', () => {
      const expected = [
        {
          key: '5000',
          label: '5s',
        },
        {
          key: '60000',
          label: '1min',
        },
        {
          key: '300000',
          label: '5min',
        },
        {
          key: '3600000',
          label: '1h',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 5s infrastructure rollup', () => {
      const expected = {
        key: '5000', // 1s
        label: '5s',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 6 hour time frame', () => {
    let windowSize = 21600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1min, 5min, 10min, 30min, 1h, 4h, 6h analyze granularity', () => {
      const expected = [
        {
          key: '60',
          label: '1min',
        },
        {
          key: '300',
          label: '5min',
        },
        {
          key: '600',
          label: '10min',
        },
        {
          key: '1800',
          label: '30min',
        },
        {
          key: '3600',
          label: '1h',
        },
        {
          key: '14400',
          label: '4h',
        },
        {
          key: '21600',
          label: '6h',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 5min analyze granularity', () => {
      const expected = {
        key: '300',
        label: '5min',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 1min, 5min, 1h infrastructure rollup', () => {
      const expected = [
        {
          key: '60000',
          label: '1min',
        },
        {
          key: '300000',
          label: '5min',
        },
        {
          key: '3600000',
          label: '1h',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1min infrastructure rollup', () => {
      const expected = {
        key: '60000',
        label: '1min',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 24 hour time frame', () => {
    let windowSize = 86400000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1h, 4h, 6h, 8h, 12h, 1d analyze granularity', () => {
      const expected = [
        {
          key: '3600',
          label: '1h',
        },
        {
          key: '14400',
          label: '4h',
        },
        {
          key: '21600',
          label: '6h',
        },
        {
          key: '28800',
          label: '8h',
        },
        {
          key: '43200',
          label: '12h',
        },
        {
          key: '86400',
          label: '1d',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1h analyze granularity', () => {
      const expected = {
        key: '3600',
        label: '1h',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 5min, 1h infrastructure rollup', () => {
      const expected = [
        {
          key: '300000',
          label: '5min',
        },
        {
          key: '3600000',
          label: '1h',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 5min infrastructure rollup', () => {
      const expected = {
        key: '300000',
        label: '5min',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 48 hour time frame', () => {
    let windowSize = 172800000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1h, 4h, 6h, 8h, 12h, 1d analyze granularity', () => {
      const expected = [
        {
          key: '3600',
          label: '1h',
        },
        {
          key: '14400',
          label: '4h',
        },
        {
          key: '21600',
          label: '6h',
        },
        {
          key: '28800',
          label: '8h',
        },
        {
          key: '43200',
          label: '12h',
        },
        {
          key: '86400',
          label: '1d',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1h analyze granularity', () => {
      const expected = {
        key: '3600',
        label: '1h',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 5min, 1h infrastructure rollup', () => {
      const expected = [
        {
          key: '300000',
          label: '5min',
        },
        {
          key: '3600000',
          label: '1h',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', () => {
      const expected = {
        key: '300000',
        label: '5min',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 31 days time frame', () => {
    let windowSize = 2678400000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 4h, 6h, 8h, 12h, 1d, 5d, 10d, analyze granularity', () => {
      const expected = [
        {
          key: '14400',
          label: '4h',
        },
        {
          key: '21600',
          label: '6h',
        },
        {
          key: '28800',
          label: '8h',
        },
        {
          key: '43200',
          label: '12h',
        },
        {
          key: '86400',
          label: '1d',
        },
        {
          key: '432000',
          label: '5d',
        },
        {
          key: '864000',
          label: '10d',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 12h analyze granularity', () => {
      const expected = {
        key: '43200',
        label: '12h',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 1h infrastructure rollup', () => {
      const expected = [
        {
          key: '3600000',
          label: '1h',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', () => {
      const expected = {
        key: '3600000',
        label: '1h',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('with 365 days time frame', () => {
    let windowSize = 86400000 * 365;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize,
    };
    it('should allow 1d, 5d, 10d, analyze granularity', () => {
      const expected = [
        {
          key: '86400',
          label: '1d',
        },
        {
          key: '432000',
          label: '5d',
        },
        {
          key: '864000',
          label: '10d',
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 5d analyze granularity', () => {
      const expected = {
        key: '432000',
        label: '5d',
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should allow 1h infrastructure rollup', () => {
      const expected = [
        {
          key: '3600000',
          label: '1h',
        },
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        key: '3600000',
        label: '1h',
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });
});
