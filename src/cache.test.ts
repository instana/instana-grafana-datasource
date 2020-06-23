import Cache from './cache';

describe('Given a cache', () => {
  let cache: Cache<any>;
  beforeEach(() => {
    cache = new Cache();
  });

  describe('with ttl', () => {
    beforeEach(() => {
      cache.put('key', 'value', 100);
    });

    it('should contain the value after it was added', () => {
      const value = cache.get('key');
      expect(value).toEqual('value');
    });

    it('should not contain the value after ttl has passed', (done) => {
      setTimeout(() => {
        const value = cache.get('key');
        expect(value).toEqual(undefined);
        done();
      }, 150);
    });
  });
});
