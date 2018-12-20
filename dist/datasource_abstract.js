System.register(['lodash'], function(exports_1) {
    var lodash_1;
    var AbstractDatasource;
    return {
        setters:[
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
                    this.CACHE_MAX_AGE = 60000;
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    // 5.3+ wanted to resolve dynamic routes in proxy mode
                    var version = lodash_1.default.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');
                    var versions = lodash_1.default.split(version, '.', 2);
                    if (versions[0] >= 5 && versions[1] >= 3) {
                        this.url = instanceSettings.url + '/instana'; // to match proxy route in plugin.json
                    }
                    else {
                        this.url = instanceSettings.jsonData.url;
                        this.apiToken = instanceSettings.jsonData.apiToken;
                    }
                }
                AbstractDatasource.prototype.currentTime = function () {
                    return new Date().getTime();
                };
                AbstractDatasource.prototype.getWindowSize = function (timeFilter) {
                    return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
                };
                AbstractDatasource.prototype.doRequest = function (url, maxRetries) {
                    if (maxRetries === void 0) { maxRetries = 1; }
                    var request = {
                        method: 'GET',
                        url: this.url + url
                    };
                    return this.execute(request, maxRetries);
                };
                AbstractDatasource.prototype.postRequest = function (url, data, maxRetries) {
                    if (maxRetries === void 0) { maxRetries = 0; }
                    var request = {
                        method: 'POST',
                        url: this.url + url,
                        data: data
                    };
                    return this.execute(request, maxRetries);
                };
                AbstractDatasource.prototype.execute = function (request, maxRetries) {
                    var _this = this;
                    // TODO request['headers'] = { x-client-app: 'Grafana 2.0.1' };
                    if (this.apiToken) {
                        request['headers'] = { Authorization: 'apiToken ' + this.apiToken };
                    }
                    return this.backendSrv
                        .datasourceRequest(request)
                        .catch(function (error) {
                        if (maxRetries > 0) {
                            return _this.execute(request, maxRetries - 1);
                        }
                        throw error;
                    });
                };
                return AbstractDatasource;
            })();
            exports_1("default", AbstractDatasource);
        }
    }
});
//# sourceMappingURL=datasource_abstract.js.map