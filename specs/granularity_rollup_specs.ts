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
          value: 1,
          label: '1s'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1s analyze granularity', function () {
      const expected = {
        value: 1,
        label: '1s'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1s infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24, // 1d
          rollup: 1000, // 1s
          label: '1s'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1s infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24, // 1d
        rollup: 1000, // 1s
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
          value: 1,
          label: '1s'
        },
        {
          value: 5,
          label: '5s'
        },
        {
          value: 10,
          label: '10s'
        },
        {
          value: 60,
          label: '1min'
        },
        {
          value: 60 * 5,
          label: '5min'
        },
        {
          value: 60 * 10,
          label: '10min'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 10s analyze granularity', function () {
      const expected = {
        value: 10,
        label: '10s'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1s, 5s, 1min, 5min, infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24, // 1d
          rollup: 1000, // 1s
          label: '1s'
        },
        {
          availableFor: 1000 * 60 * 60 * 24, // 1d
          rollup: 1000 * 5, // 5s
          label: '5s'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31, // 1 month
          rollup: 1000 * 60, // 1m
          label: '1min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1s infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24, // 1d
        rollup: 1000, // 1s
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
          value: 10,
          label: '10s'
        },
        {
          value: 60,
          label: '1min'
        },
        {
          value: 60 * 5,
          label: '5min'
        },
        {
          value: 60 * 10,
          label: '10min'
        },
        {
          value: 60 * 60,
          label: '1h'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1min analyze granularity', function () {
      const expected = {
        value: 60,
        label: '1min'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 5s, 1min, 5min, infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24, // 1d
          rollup: 1000 * 5, // 5s
          label: '5s'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31, // 1 month
          rollup: 1000 * 60, // 1m
          label: '1min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5s infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24, // 1d
        rollup: 5000, // 1s
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
          value: 60,
          label: '1min'
        },
        {
          value: 60 * 5,
          label: '5min'
        },
        {
          value: 60 * 10,
          label: '10min'
        },
        {
          value: 60 * 60,
          label: '1h'
        },
        {
          value: 60 * 60 * 5,
          label: '5h'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5min analyze granularity', function () {
      const expected = {
        value: 300,
        label: '5min'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1min, 5min, 1h infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31, // 1 month
          rollup: 1000 * 60, // 1m
          label: '1min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1min infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24 * 31, // 1 month
        rollup: 1000 * 60,
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
          value: 60 * 5,
          label: '5min'
        },
        {
          value: 60 * 10,
          label: '10min'
        },
        {
          value: 60 * 60,
          label: '1h'
        },
        {
          value: 60 * 60 * 5,
          label: '5h'
        },
        {
          value: 60 * 60 * 10,
          label: '10h'
        },
        {
          value: 60 * 60 * 24,
          label: '1d'
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h analyze granularity', function () {
      const expected = {
        value: 3600,
        label: '1h'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 5min, 1h infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5min infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
        rollup: 1000 * 60 * 5, // 5m
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
          value: 60 * 5,
          label: '5min'
        },
        {
          value: 60 * 10,
          label: '10min'
        },
        {
          value: 60 * 60,
          label: '1h'
        },
        {
          value: 60 * 60 * 5,
          label: '5h'
        },
        {
          value: 60 * 60 * 10,
          label: '10h'
        },
        {
          value: 60 * 60 * 24,
          label: '1d'
        },
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h analyze granularity', function () {
      const expected = {
        value: 3600,
        label: '1h'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 5min, infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        },
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
        rollup: 1000 * 60 * 5, // 5m
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
          value: 60 * 60 * 5, // 5h
          label: '5h'
        },
        {
          value: 60 * 60 * 10, // 10h
          label: '10h'
        },
        {
          value: 60 * 60 * 24, // 1d
          label: '1d'
        },
        {
          value: 60 * 60 * 24 * 5, // 5d
          label: '5d'
        },
        {
          value: 60 * 60 * 24 * 10, // 10d
          label: '10d'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 10h analyze granularity', function () {
      const expected = {
        value: 60 * 60 * 10,
        label: '10h'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1h infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
        rollup: 1000 * 60 * 60, // 1h
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
          value: 60 * 60 * 24, // 1d
          label: '1d'
        },
        {
          value: 60 * 60 * 24 * 5, // 5d
          label: '5d'
        },
        {
          value: 60 * 60 * 24 * 10, // 10d
          label: '10d'
        }
      ];
      let result = getPossibleGranularities(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 5d analyze granularity', function () {
      const expected = {
        value: 60 * 60 * 24 * 5, // 10d
        label: '5d'
      };
      let result = getDefaultChartGranularity(windowSize);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should allow 1h infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
    it('should default to 1h infrastructure rollup', function () {
      const expected = {
        availableFor: 1000 * 60 * 60 * 24 * 31 * 12, // forever
        rollup: 1000 * 60 * 60, // 1h
        label: '1h'
      };
      let result = getDefaultMetricRollupDuration(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });
})
;
