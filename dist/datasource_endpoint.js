System.register(["./util/rollup_granularity_util", "./datasource_abstract", './cache', "lodash"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var rollup_granularity_util_1, datasource_abstract_1, cache_1, lodash_1;
    var InstanaEndpointDataSource;
    return {
        setters:[
            function (rollup_granularity_util_1_1) {
                rollup_granularity_util_1 = rollup_granularity_util_1_1;
            },
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (cache_1_1) {
                cache_1 = cache_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaEndpointDataSource = (function (_super) {
                __extends(InstanaEndpointDataSource, _super);
                /** @ngInject */
                function InstanaEndpointDataSource(instanceSettings, backendSrv, templateSrv, $q, serviceDataSource) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.maximumNumberOfUsefulDataPoints = 80;
                    // duplicate to QueryCtrl.ALL_ENDPOINTS
                    this.ALL_ENDPOINTS = '-- No Endpoint Filter --';
                    this.serviceDataSource = serviceDataSource;
                    this.endpointsCache = new cache_1.default();
                }
                InstanaEndpointDataSource.prototype.getEndpoints = function (target, timeFilter) {
                    var _this = this;
                    var key = this.getTimeKey(timeFilter);
                    var endpoints = this.endpointsCache.get(key);
                    if (endpoints) {
                        return endpoints;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var page = 1;
                    var pageSize = 200;
                    endpoints = this.serviceDataSource.getServices(target, timeFilter).then(function (services) {
                        return _this.paginateEndpoints([], windowSize, timeFilter.to, page, pageSize).then(function (response) {
                            var allResults = lodash_1.default.flattenDeep(lodash_1.default.map(response, function (pageSet, index) {
                                return pageSet.items;
                            }));
                            return allResults.map(function (entry) {
                                var serviceName = lodash_1.default.find(services, function (service) {
                                    return service.key === entry.serviceId;
                                });
                                return {
                                    'key': entry.id,
                                    'label': serviceName ? entry.label + ' (' + serviceName.label + ')' : entry.label
                                };
                            });
                        });
                    });
                    this.endpointsCache.put(key, endpoints, 600000);
                    return endpoints;
                };
                InstanaEndpointDataSource.prototype.paginateEndpoints = function (results, windowSize, to, page, pageSize) {
                    var _this = this;
                    var queryParameters = "windowSize=" + windowSize
                        + "&to=" + to
                        + "&page=" + page
                        + "&pageSize=" + pageSize;
                    return this.doRequest('/api/application-monitoring/applications/services/endpoints?' + queryParameters).then(function (response) {
                        results.push(response.data);
                        if (page * pageSize < response.data.totalHits) {
                            page++;
                            return _this.paginateEndpoints(results, windowSize, to, page, pageSize);
                        }
                        else {
                            return results;
                        }
                    });
                };
                InstanaEndpointDataSource.prototype.getApplicationsUsingEndpoint = function (target, timeFilter) {
                    var windowSize = this.getWindowSize(timeFilter);
                    var metric = {
                        metric: "calls",
                        aggregation: "SUM"
                    };
                    var data = {
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        metrics: [metric],
                        endpointId: target.entity.key
                    };
                    var page = 1;
                    var pageSize = 200;
                    var pagination = {
                        page: page,
                        pageSize: pageSize
                    };
                    data['pagination'] = pagination;
                    return this.postRequest('/api/application-monitoring/metrics/applications', data).then(function (response) {
                        var filteredData = lodash_1.default.filter(response.data.items, function (item) { return item.metrics['calls.sum'][0][0] > 0; });
                        return filteredData.map(function (entry) { return ({
                            'key': entry.application.id,
                            'label': entry.application.label
                        }); });
                    });
                };
                InstanaEndpointDataSource.prototype.fetchEndpointMetrics = function (target, timeFilter) {
                    // avoid invalid calls
                    if (!target || !target.metric || !target.entity) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var metric = {
                        metric: target.metric.key,
                        aggregation: target.aggregation ? target.aggregation : 'SUM',
                    };
                    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") {
                        if (!target.timeInterval) {
                            target.timeInterval = rollup_granularity_util_1.getDefaultChartGranularity(windowSize);
                        }
                        metric['granularity'] = target.timeInterval.key;
                    }
                    var data = {
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        metrics: [metric]
                    };
                    if (target.entity.key !== null) {
                        data['endpointId'] = target.entity.key;
                    }
                    if (target.selectedApplication && target.selectedApplication.key) {
                        data['applicationId'] = target.selectedApplication.key;
                    }
                    return this.postRequest('/api/application-monitoring/metrics/endpoints?fillTimeSeries=true', data);
                };
                InstanaEndpointDataSource.prototype.buildEndpointMetricLabel = function (target, item, key, index) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', item.endpoint.label);
                        label = lodash_1.default.replace(label, 'endpoint', target.entity.label);
                        label = lodash_1.default.replace(label, '$application', target.selectedApplication.label);
                        label = lodash_1.default.replace(label, '$metric', target.metric.label);
                        label = lodash_1.default.replace(label, '$key', key);
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    if (target.entity.label === this.ALL_ENDPOINTS) {
                        return target.timeShift ? item.endpoint.label + ' - ' + key + " - " + target.timeShift : item.endpoint.label + ' - ' + key;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        item.endpoint.label + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
                        :
                            item.endpoint.label + ' (' + target.entity.label + ')' + ' - ' + key;
                };
                return InstanaEndpointDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaEndpointDataSource);
        }
    }
});
//# sourceMappingURL=datasource_endpoint.js.map