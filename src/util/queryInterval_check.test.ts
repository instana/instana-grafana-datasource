import { isInvalidQueryInterval } from './queryInterval_check';

describe('Given no queryInterval limit', () => {
  it('should mark the queryInterval as invalid (return false)', () => {
    let windowSize = 16091997;
    expect(isInvalidQueryInterval(windowSize, undefined)).toBe(false);
  });
});

describe('Given a query interval limit that equals 0', () => {
  it('should mark the queryInterval as invalid (return false)', () => {
    let windowSize = 16091997;
    expect(isInvalidQueryInterval(windowSize, 0)).toBe(false);
  });
});

describe('Given a query interval limit that is 1 ms smaller than windowSize', () => {
  it('should mark the queryInterval as valid (return true)', () => {
    let windowSize = 10000;
    let queryIntervalLimit = 9999;
    expect(isInvalidQueryInterval(windowSize, queryIntervalLimit)).toBe(true);
  });
});

describe('Given a query interval limit that is equals windowSize', () => {
  it('should mark the queryInterval as invalid (return false)', () => {
    let windowSize = 10000;
    let queryIntervalLimit = 10000;
    expect(isInvalidQueryInterval(windowSize, queryIntervalLimit)).toBe(false);
  });
});

describe('Given a query interval limit that is larger than windowSize', () => {
  it('should mark the queryInterval as invalid (return false)', () => {
    let windowSize = 10000;
    let queryIntervalLimit = 10001;
    expect(isInvalidQueryInterval(windowSize, queryIntervalLimit)).toBe(false);
  });
});
