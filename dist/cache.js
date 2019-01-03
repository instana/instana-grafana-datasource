System.register([], function(exports_1) {
    var Cache;
    return {
        setters:[],
        execute: function() {
            Cache = (function () {
                function Cache() {
                    this.store = {};
                }
                Cache.prototype.put = function (key, value, ttl) {
                    var _this = this;
                    if (ttl === void 0) { ttl = 60000; }
                    if (key === undefined || value === undefined) {
                        return;
                    }
                    this.del(key);
                    this.store[key] = {
                        value: value,
                        expiry: Date.now() + ttl,
                        timeout: setTimeout(function () {
                            _this.del(key);
                        }, ttl),
                    };
                };
                Cache.prototype.get = function (key) {
                    var item = this.store[key];
                    if (item && !(item.expiry && item.expiry > Date.now())) {
                        this.del(key);
                        item = undefined;
                    }
                    return item && item.value;
                };
                Cache.prototype.del = function (key) {
                    if (this.store.hasOwnProperty(key)) {
                        clearTimeout(this.store[key].timeout);
                        delete this.store[key];
                    }
                };
                return Cache;
            })();
            exports_1("default", Cache);
        }
    }
});
//# sourceMappingURL=cache.js.map