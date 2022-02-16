import { atLeastGranularity } from './time_util';

describe('Given windowSize calculation for analyze queries', () => {
  it('should return windowSize if bigger than granularity', () => {
    expect(atLeastGranularity(3600, 1)).toEqual(3600);
  });

  it('should return granularity in ms on small windowSize', () => {
    expect(atLeastGranularity(1000, 60)).toEqual(60000);
  });
});
