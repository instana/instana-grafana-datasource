import {describe, it, expect} from './lib/common';
import {
  getDefaultChartGranularity,
  getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups
} from "../src/util/rollup_granularity_util";
import TimeFilter from "../src/types/time_filter";

describe('Given a timeInterval', function () {
  describe('with 1 second time frame', function () {
    let windowSize = 1000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 1s analyze granularity', function () {
      const expected = [
        {
          key: '1',
          label: '1s'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1s analyze granularity', function () {
      const expected = {
        key: '1',
        label: '1s'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1s infrastructure rollup', function () {
      const expected = [
        {
          key: '1000', // 1s
          label: '1s'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1s infrastructure rollup', function () {
      const expected = {
        key: '1000', // 1s
        label: '1s'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 10 minute time frame', function () {
    let windowSize = 600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 1s, 5s, 10s, 1min, 5min, 10min analyze granularity', function () {
      const expected = [
        {
          key: '1',
          label: '1s'
        },
        {
          key: '5',
          label: '5s'
        },
        {
          key: '10',
          label: '10s'
        },
        {
          key: '60',
          label: '1min'
        },
        {
          key: '300',
          label: '5min'
        },
        {
          key: '600',
          label: '10min'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 10s analyze granularity', function () {
      const expected = {
        key: '10',
        label: '10s'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1s, 5s, 1min, 5min, infrastructure rollup', function () {
      const expected = [
        {
          key: '1000', // 1s
          label: '1s'
        },
        {
          key: '5000',
          label: '5s'
        },
        {
          key: '60000',
          label: '1min'
        },
        {
          key: '300000', // 5m
          label: '5min'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1s infrastructure rollup', function () {
      const expected = {
        key: '1000', // 1s
        label: '1s'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 1 hour time frame', function () {
    let windowSize = 3600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 10s, 1min, 5min, 10min, 1h analyze granularity', function () {
      const expected = [
        {
          key: '60',
          label: '1min'
        },
        {
          key: '300',
          label: '5min'
        },
        {
          key: '600',
          label: '10min'
        },
        {
          key: '3600',
          label: '1h'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1min analyze granularity', function () {
      const expected = {
        key: '60',
        label: '1min'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 5s, 1min, 5min, infrastructure rollup', function () {
      const expected = [
        {
          key: '5000', // 5s
          label: '5s'
        },
        {
          key: '60000', // 1m
          label: '1min'
        },
        {
          key: '300000', // 5m
          label: '5min'
        },
        {
          key: '3600000', // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5s infrastructure rollup', function () {
      const expected = {
        key: '5000', // 1s
        label: '5s'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 6 hour time frame', function () {
    let windowSize = 21600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 1min, 5min, 10min, 1h, 5h analyze granularity', function () {
      const expected = [
        {
          key: '60',
          label: '1min'
        },
        {
          key: '300',
          label: '5min'
        },
        {
          key: '600',
          label: '10min'
        },
        {
          key: '3600',
          label: '1h'
        },
        {
          key: '18000',
          label: '5h'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5min analyze granularity', function () {
      const expected = {
        key: '300',
        label: '5min'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1min, 5min, 1h infrastructure rollup', function () {
      const expected = [
        {
          key: '60000', // 1m
          label: '1min'
        },
        {
          key: '300000', // 5m
          label: '5min'
        },
        {
          key: '3600000', // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1min infrastructure rollup', function () {
      const expected = {
        key: '60000',
        label: '1min'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 24 hour time frame', function () {
    let windowSize = 86400000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 5min, 10min, 1h, 5h, 10h, 1d analyze granularity', function () {
      const expected = [
        {
          key: '3600',
          label: '1h'
        },
        {
          key: '18000',
          label: '5h'
        },
        {
          key: '36000',
          label: '10h'
        },
        {
          key: '86400',
          label: '1d'
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h analyze granularity', function () {
      const expected = {
        key: '3600',
        label: '1h'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 5min, 1h infrastructure rollup', function () {
      const expected = [
        {
          key: '300000', // 5m
          label: '5min'
        },
        {
          key: '3600000', // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5min infrastructure rollup', function () {
      const expected = {
        key: '300000', // 5m
        label: '5min'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 48 hour time frame', function () {
    let windowSize = 172800000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 5min, 10min, 1h, 5h, 10h, 1d analyze granularity', function () {
      const expected = [
        {
          key: '3600',
          label: '1h'
        },
        {
          key: '18000',
          label: '5h'
        },
        {
          key: '36000',
          label: '10h'
        },
        {
          key: '86400',
          label: '1d'
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h analyze granularity', function () {
      const expected = {
        key: '3600',
        label: '1h'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 5min, infrastructure rollup', function () {
      const expected = [
        {
          key: '300000', // 5m
          label: '5min'
        },
        {
          key: '3600000', // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        key: '300000', // 5m
        label: '5min'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 31 days time frame', function () {
    let windowSize = 2678400000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 5h, 10h, 1d, 5d, 10d, analyze granularity', function () {
      const expected = [
        {
          key: '18000', // 5h
          label: '5h'
        },
        {
          key: '36000', // 10h
          label: '10h'
        },
        {
          key: '86400', // 1d
          label: '1d'
        },
        {
          key: '432000', // 5d
          label: '5d'
        },
        {
          key: '864000', // 10d
          label: '10d'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 10h analyze granularity', function () {
      const expected = {
        key: '36000',
        label: '10h'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1h infrastructure rollup', function () {
      const expected = [
        {
          key: '3600000', // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        key: '3600000', // 1h
        label: '1h'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('with 365 days time frame', function () {
    let windowSize = 86400000 * 365;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 1d, 5d, 10d, analyze granularity', function () {
      const expected = [
        {
          key: '86400', // 1d
          label: '1d'
        },
        {
          key: '432000', // 5d
          label: '5d'
        },
        {
          key: '864000', // 10d
          label: '10d'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5d analyze granularity', function () {
      const expected = {
        key: '432000', // 10d
        label: '5d'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1h infrastructure rollup', function () {
      const expected = [
        {
          key: '3600000', // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        key: '3600000', // 1h
        label: '1h'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });
})
;
