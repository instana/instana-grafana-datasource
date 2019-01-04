export default class Cache<T> {
  store: any;

  constructor() {
    this.store = {};
  }

  put(key: string, value: T, ttl = 60000): void {
    if (key === undefined || value === undefined) {
      return;
    }

    this.del(key);
    this.store[key] = {
      value,
      expiry: Date.now() + ttl,
      timeout: setTimeout(() => {
        this.del(key);
      }, ttl),
    };
  }

  get(key: string): T {
    var item = this.store[key];
    if (item && !(item.expiry && item.expiry > Date.now())) {
      this.del(key);
      item = undefined;
    }
    return item && item.value;
  }

  del(key: string): void {
    if (this.store.hasOwnProperty(key)) {
      clearTimeout(this.store[key].timeout);
      delete this.store[key];
    }
  }
}
