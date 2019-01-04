export default class Cache<T> {
    store: any;
    constructor();
    put(key: string, value: T, ttl?: number): void;
    get(key: string): T;
    del(key: string): void;
}
