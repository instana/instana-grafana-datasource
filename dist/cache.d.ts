export default class Cache {
    store: any;
    constructor();
    put(key: any, value: any, ttl?: number): void;
    get(key: any): any;
    del(key: string): void;
}
