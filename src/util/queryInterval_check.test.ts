import { isInvalidQueryInterval } from './queryInterval_check';

describe('Given no queryInterval limit', function () {
  it('should mark the queryInterval as invalid (return false)', function () {
    let windowSize = 16091997;
    expect(isInvalidQueryInterval(windowSize, undefined)).toEqual(false);
  });
});

describe('Given a query interval limit that equals 0', function () {
  it('should mark the queryInterval as invalid (return false)', function () {
    let windowSize = 16091997;
    expect(isInvalidQueryInterval(windowSize, 0)).toEqual(false);
  });
});

describe('Given a query interval limit that is 1 ms smaller than windowSize', function () {
  it('should mark the queryInterval as valid (return true)', function () {
    let windowSize = 10000;
    let queryIntervalLimit = 9999;
    expect(isInvalidQueryInterval(windowSize, queryIntervalLimit)).toEqual(true);
  });
});

describe('Given a query interval limit that is equals windowSize', function () {
  it('should mark the queryInterval as invalid (return false)', function () {
    let windowSize = 10000;
    let queryIntervalLimit = 10000;
    expect(isInvalidQueryInterval(windowSize, queryIntervalLimit)).toEqual(false);
  });
});

describe('Given a query interval limit that is larger than windowSize', function () {
  it('should mark the queryInterval as invalid (return false)', function () {
    let windowSize = 10000;
    let queryIntervalLimit = 10001;
    expect(isInvalidQueryInterval(windowSize, queryIntervalLimit)).toEqual(false);
  });
});
