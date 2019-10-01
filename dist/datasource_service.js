System.register(["./datasource_abstract", './cache', "./util/analyze_util", "lodash"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, cache_1, analyze_util_1, lodash_1;
    var InstanaServiceDataSource;
    return {
        setters:[
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (cache_1_1) {
                cache_1 = cache_1_1;
            },
            function (analyze_util_1_1) {
                analyze_util_1 = analyze_util_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaServiceDataSource = (function (_super) {
                __extends(InstanaServiceDataSource, _super);
                /** @ngInject */
                function InstanaServiceDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.maximumNumberOfUsefulDataPoints = 80;
                    // duplicate to QueryCtrl.ALL_SERVICES
                    this.ALL_SERVICES = '-- No Service Filter --';
                    this.servicesCache = new cache_1.default();
                }
                InstanaServiceDataSource.prototype.getServices = function (target, timeFilter) {
                    var key = this.getTimeKey(timeFilter);
                    var services = this.servicesCache.get(key);
                    if (services) {
                        return services;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var page = 1;
                    var pageSize = 200;
                    services = this.paginateServices([], windowSize, timeFilter.to, page, pageSize).then(function (response) {
                        var allResults = lodash_1.default.flattenDeep(lodash_1.default.map(response, function (pageSet, index) {
                            return pageSet.items;
                        }));
                        return allResults.map(function (entry) {
                            return {
                                'key': entry.id,
                                'label': entry.label
                            };
                        });
                    });
                    this.servicesCache.put(key, services);
                    return services;
                };
                InstanaServiceDataSource.prototype.paginateServices = function (results, windowSize, to, page, pageSize) {
                    var _this = this;
                    var queryParameters = "windowSize=" + windowSize
                        + "&to=" + to
                        + "&page=" + page
                        + "&pageSize=" + pageSize;
                    return this.doRequest('/api/application-monitoring/applications/services?' + queryParameters).then(function (response) {
                        results.push(response.data);
                        if (page * pageSize < response.data.totalHits) {
                            page++;
                            return _this.paginateServices(results, windowSize, to, page, pageSize);
                        }
                        else {
                            return results;
                        }
                    });
                };
                InstanaServiceDataSource.prototype.getApplicationsUsingService = function (target, timeFilter) {
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
                        serviceId: target.entity.key
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
                InstanaServiceDataSource.prototype.fetchServiceMetrics = function (target, timeFilter) {
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
                            target.timeInterval = analyze_util_1.getChartGranularity(windowSize, this.maximumNumberOfUsefulDataPoints);
                        }
                        metric['granularity'] = target.timeInterval.value;
                    }
                    var data = {
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        metrics: [metric]
                    };
                    if (target.entity.key !== null) {
                        data['serviceId'] = target.entity.key;
                    }
                    if (target.selectedApplication && target.selectedApplication.key) {
                        data['applicationId'] = target.selectedApplication.key;
                    }
                    return this.postRequest('/api/application-monitoring/metrics/services?fillTimeSeries=true', data);
                };
                InstanaServiceDataSource.prototype.buildServiceMetricLabel = function (target, item, key, index) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', item.service.label);
                        label = lodash_1.default.replace(label, '$service', target.entity.label);
                        label = lodash_1.default.replace(label, '$application', target.selectedApplication.label);
                        label = lodash_1.default.replace(label, '$metric', target.metric.label);
                        label = lodash_1.default.replace(label, '$key', key);
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    if (target.entity.label === this.ALL_SERVICES) {
                        return target.timeShift ? item.service.label + ' - ' + key + " - " + target.timeShift : item.service.label + ' - ' + key;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        item.service.label + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
                        :
                            item.service.label + ' (' + target.entity.label + ')' + ' - ' + key;
                };
                return InstanaServiceDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaServiceDataSource);
        }
    }
});
//# sourceMappingURL=datasource_service.js.map