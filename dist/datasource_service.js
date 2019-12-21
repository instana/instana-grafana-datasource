System.register(["./util/rollup_granularity_util", "./datasource_abstract", './cache', "lodash"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var rollup_granularity_util_1, datasource_abstract_1, cache_1, lodash_1;
    var InstanaServiceDataSource;
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
            InstanaServiceDataSource = (function (_super) {
                __extends(InstanaServiceDataSource, _super);
                /** @ngInject */
                function InstanaServiceDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.maximumNumberOfUsefulDataPoints = 80;
                    // duplicate to QueryCtrl.NO_SERVICE_FILTER
                    this.NO_SERVICE_FILTER = '-- No Service Filter --';
                    this.servicesCache = new cache_1.default();
                }
                InstanaServiceDataSource.prototype.getServicesOfApplication = function (target, timeFilter) {
                    var applicationId = "";
                    if (target.entity && target.entity.key) {
                        applicationId = target.entity.key;
                    }
                    var key = this.getTimeKey(timeFilter) + applicationId;
                    var services = this.servicesCache.get(key);
                    if (services) {
                        return services;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var page = 1;
                    var pageSize = 200;
                    services = this.paginateServices([], applicationId, windowSize, timeFilter.to, page, pageSize, this.PAGINATION_LIMIT).then(function (response) {
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
                    this.servicesCache.put(key, services, 600000);
                    return services;
                };
                InstanaServiceDataSource.prototype.paginateServices = function (results, applicationId, windowSize, to, page, pageSize, pageLimit) {
                    var _this = this;
                    if (page > pageLimit) {
                        return results;
                    }
                    var queryParameters = "windowSize=" + windowSize
                        + "&to=" + to
                        + "&page=" + page
                        + "&pageSize=" + pageSize;
                    var url = '/api/application-monitoring/applications;id='
                        + applicationId
                        + '/services?'
                        + queryParameters;
                    return this.doRequest(url).then(function (response) {
                        results.push(response.data);
                        if (page * pageSize < response.data.totalHits) {
                            page++;
                            return _this.paginateServices(results, applicationId, windowSize, to, page, pageSize, pageLimit);
                        }
                        else {
                            return results;
                        }
                    });
                };
                InstanaServiceDataSource.prototype.fetchServiceMetrics = function (target, timeFilter) {
                    // avoid invalid calls
                    if (!target || !target.metric) {
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
                    if (target.entity && target.entity.key) {
                        data['applicationId'] = target.entity.key;
                    }
                    if (target.service && target.service.key) {
                        data['serviceId'] = target.service.key;
                    }
                    return this.postRequest('/api/application-monitoring/metrics/services?fillTimeSeries=true', data);
                };
                InstanaServiceDataSource.prototype.buildServiceMetricLabel = function (target, item, key, index) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', item.service.label);
                        label = lodash_1.default.replace(label, '$service', target.service.label);
                        label = lodash_1.default.replace(label, '$application', target.entity.label);
                        label = lodash_1.default.replace(label, '$metric', target.metric.label);
                        label = lodash_1.default.replace(label, '$key', key);
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    if (target.service.label === this.NO_SERVICE_FILTER) {
                        return target.timeShift ? item.service.label + ' - ' + key + " - " + target.timeShift : item.service.label + ' - ' + key;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        item.service.label + ' (' + target.service.label + ')' + ' - ' + key + " - " + target.timeShift
                        :
                            item.service.label + ' (' + target.service.label + ')' + ' - ' + key;
                };
                return InstanaServiceDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaServiceDataSource);
        }
    }
});
//# sourceMappingURL=datasource_service.js.map