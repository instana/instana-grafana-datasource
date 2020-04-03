System.register(['./proxy_check', './cache', 'lodash'], function(exports_1) {
    var proxy_check_1, cache_1, lodash_1;
    var AbstractDatasource;
    return {
        setters:[
            function (proxy_check_1_1) {
                proxy_check_1 = proxy_check_1_1;
            },
            function (cache_1_1) {
                cache_1 = cache_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            AbstractDatasource = (function () {
                /** @ngInject */
                function AbstractDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.PAGINATION_LIMIT = 15; // pagesize=200 => 3000 results in dropdown (~30sec.)
                    this.CACHE_MAX_AGE = 60000;
                    this.SEPARATOR = '|';
                    this.BUILT_IN_METRICS = '0';
                    this.CUSTOM_METRICS = '1';
                    this.ANALYZE_APPLICATION_METRICS = '2';
                    this.ANALYZE_WEBSITE_METRICS = '3';
                    this.APPLICATION_SERVICE_ENDPOINT_METRICS = '4'; // replaces previous
                    // APPLICATION_METRICS = '4';
                    // SERVICE_METRICS = '5';
                    // ENDPOINT_METRICS = '6';
                    this.SLO_INFORMATION = '7';
                    this.currentTime = function () {
                        return Date.now();
                    };
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.simpleCache = new cache_1.default();
                    // old versions have not saved proxy usage, so we switch to the default assumption
                    if (instanceSettings.jsonData.useProxy === undefined) {
                        instanceSettings.jsonData.useProxy = proxy_check_1.default();
                    }
                    if (instanceSettings.jsonData.useProxy) {
                        this.url = instanceSettings.url + '/instana'; // to match proxy route in plugin.json
                    }
                    else {
                        this.url = instanceSettings.jsonData.url;
                        this.apiToken = instanceSettings.jsonData.apiToken;
                    }
                }
                AbstractDatasource.prototype.getWindowSize = function (timeFilter) {
                    return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
                };
                AbstractDatasource.prototype.getTimeKey = function (timeFilter) {
                    // time might be part of a cache key as this can cause different results
                    return this.msToMin(timeFilter.from) + this.SEPARATOR + this.msToMin(timeFilter.to);
                };
                AbstractDatasource.prototype.msToMin = function (time) {
                    return Math.floor(time / 60000);
                };
                AbstractDatasource.prototype.hoursToMs = function (hours) {
                    if (hours > 0) {
                        return hours * 60 * 60 * 1000;
                    }
                    return 0;
                };
                AbstractDatasource.prototype.doRequest = function (url, swallowError, maxRetries) {
                    if (swallowError === void 0) { swallowError = false; }
                    if (maxRetries === void 0) { maxRetries = 1; }
                    var request = {
                        method: 'GET',
                        url: this.url + url
                    };
                    return this.execute(request, swallowError, maxRetries);
                };
                AbstractDatasource.prototype.postRequest = function (url, data, swallowError, maxRetries) {
                    if (swallowError === void 0) { swallowError = false; }
                    if (maxRetries === void 0) { maxRetries = 0; }
                    var request = {
                        method: 'POST',
                        url: this.url + url,
                        data: data
                    };
                    return this.execute(request, swallowError, maxRetries);
                };
                AbstractDatasource.prototype.execute = function (request, swallowError, maxRetries) {
                    var _this = this;
                    if (this.apiToken) {
                        request['headers'] = {
                            "Authorization": 'apiToken ' + this.apiToken
                        };
                    }
                    return this.backendSrv
                        .datasourceRequest(request)
                        .catch(function (error) {
                        if (error.status === 429) {
                            throw new Error("API limit is reached.");
                            return;
                        }
                        if (swallowError && (error.status >= 400 || error.status < 500)) {
                            console.log(error);
                            return;
                        }
                        if (maxRetries > 0) {
                            return _this.execute(request, swallowError, maxRetries - 1);
                        }
                        throw error;
                    });
                };
                AbstractDatasource.prototype.sortByTimestamp = function (datapoints) {
                    return lodash_1.default.sortBy(datapoints, [function (o) {
                            return o[1];
                        }]);
                };
                return AbstractDatasource;
            })();
            exports_1("default", AbstractDatasource);
        }
    }
});
//# sourceMappingURL=datasource_abstract.js.map