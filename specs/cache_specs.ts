import {describe, beforeEach, it, expect} from './lib/common';
import Cache from '../src/cache';

describe('Given a cache', function() {
  let cache;
  beforeEach(() => {
    cache = new Cache();
  });

  describe('with ttl', function() {
    beforeEach(() => {
      cache.put('key', 'value', 100);
    });

    it('should contain the value after it was added', function() {
      const value = cache.get('key');
      expect(value).to.equal('value');
    });

    it('should not contain the value after ttl has passed', done => {
      setTimeout(() => {
        const value = cache.get('key');
        expect(value).to.equal(undefined);
        done();
      }, 150);
    });
  });

  describe('using delete', function() {
    beforeEach(() => {
      cache.put('key', 'value');
    });

    it('should not contain the value after delete', function() {
      const value = cache.del('key');
      expect(value).to.equal(undefined);
    });
  });
});
