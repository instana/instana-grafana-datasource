import {describe, it, expect} from './lib/common';
import {getPossibleGranularities, getPossibleRollups} from "../src/util/rollup_granularity_util";
import TimeFilter from "../src/types/time_filter";

describe('Given a timeInterval', function () {
  describe('with 10 minute time frame', function () {
    let windowSize = 600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 1s, 5s, 10s, 1min, 5min, 10min application granularity', function () {
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
  });

  describe('with 1 hour time frame', function () {
    let windowSize = 3600000;
    let timeFilter: TimeFilter = {
      from: Date.now() - windowSize,
      to: Date.now(),
      windowSize: windowSize
    };
    it('should allow 5s, 10s, 1min, 5min, 10min, 1h application granularity', function () {
      const expected = [
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
        },
        {
          value: 60 * 60,
          label: '1h'
        }
      ];
      let result = getPossibleGranularities(windowSize);
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
          availableFor: Number.MAX_VALUE, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
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
    it('should allow 1min, 5min, 10min, 1h, 5h application granularity', function () {
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
    it('should allow 1min, 5min, infrastructure rollup', function () {
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
          availableFor: Number.MAX_VALUE, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
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
    it('should allow 5min, 10min, 1h, 5h, 10h, 1d application granularity', function () {
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
    it('should allow 5min, infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        },
        {
          availableFor: Number.MAX_VALUE, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
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
    it('should allow 5min, 10min, 1h, 5h, 10h, 1d application granularity', function () {
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
    it('should allow 5min, infrastructure rollup', function () {
      const expected = [
        {
          availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
          rollup: 1000 * 60 * 5, // 5m
          label: '5min'
        },
        {
          availableFor: Number.MAX_VALUE, // forever
          rollup: 1000 * 60 * 60, // 1h
          label: '1h'
        }
      ];
      let result = getPossibleRollups(timeFilter);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });
});
