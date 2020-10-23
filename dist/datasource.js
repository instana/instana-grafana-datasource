System.register(["./util/rollup_granularity_util", './util/delta_util', './datasource_infrastructure', './datasource_application', "./datasource_endpoint", "./datasource_service", './datasource_website', "./util/aggregation_util", './datasource_abstract', './util/analyze_util', './datasource_slo', './migration', './cache', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var rollup_granularity_util_1, delta_util_1, datasource_infrastructure_1, datasource_application_1, datasource_endpoint_1, datasource_service_1, datasource_website_1, aggregation_util_1, datasource_abstract_1, analyze_util_1, datasource_slo_1, migration_1, cache_1, lodash_1;
    var InstanaDatasource;
    return {
        setters:[
            function (rollup_granularity_util_1_1) {
                rollup_granularity_util_1 = rollup_granularity_util_1_1;
            },
            function (delta_util_1_1) {
                delta_util_1 = delta_util_1_1;
            },
            function (datasource_infrastructure_1_1) {
                datasource_infrastructure_1 = datasource_infrastructure_1_1;
            },
            function (datasource_application_1_1) {
                datasource_application_1 = datasource_application_1_1;
            },
            function (datasource_endpoint_1_1) {
                datasource_endpoint_1 = datasource_endpoint_1_1;
            },
            function (datasource_service_1_1) {
                datasource_service_1 = datasource_service_1_1;
            },
            function (datasource_website_1_1) {
                datasource_website_1 = datasource_website_1_1;
            },
            function (aggregation_util_1_1) {
                aggregation_util_1 = aggregation_util_1_1;
            },
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (analyze_util_1_1) {
                analyze_util_1 = analyze_util_1_1;
            },
            function (datasource_slo_1_1) {
                datasource_slo_1 = datasource_slo_1_1;
            },
            function (migration_1_1) {
                migration_1 = migration_1_1;
            },
            function (cache_1_1) {
                cache_1 = cache_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaDatasource = (function (_super) {
                __extends(InstanaDatasource, _super);
                /** @ngInject */
                function InstanaDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.infrastructure = new datasource_infrastructure_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.application = new datasource_application_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.website = new datasource_website_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.service = new datasource_service_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.endpoint = new datasource_endpoint_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.slo = new datasource_slo_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.availableGranularities = [];
                    this.availableRollups = [];
                    this.maxWindowSizeInfrastructure = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_infra);
                    this.maxWindowSizeAnalyzeWebsites = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_website_metrics);
                    this.maxWindowSizeAnalyzeApplications = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_app_calls);
                    this.maxWindowSizeAnalyzeMetrics = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_app_metrics);
                    this.resultCache = new cache_1.default();
                    this.sloIsEnabled = instanceSettings.jsonData.allowSlo;
                }
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (Object.keys(options.targets[0]).length === 0) {
                        return this.$q.resolve({ data: [] });
                    }
                    var panelTimeFilter = this.readTime(options);
                    this.availableRollups = rollup_granularity_util_1.getPossibleRollups(panelTimeFilter);
                    this.availableGranularities = rollup_granularity_util_1.getPossibleGranularities(panelTimeFilter.windowSize);
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        var timeFilter = _this.readTime(options);
                        // grafana setting to disable query execution
                        if (target.hide) {
                            return { data: [], target: target };
                        }
                        // target migration for downwards compatibility
                        migration_1.default(target);
                        if (target.timeShift) {
                            timeFilter = _this.applyTimeShiftOnTimeFilter(timeFilter, _this.convertTimeShiftToMillis(target.timeShift));
                        }
                        target['timeFilter'] = timeFilter;
                        target['stableHash'] = delta_util_1.generateStableHash(target);
                        timeFilter = _this.adjustTimeFilterIfCached(timeFilter, target);
                        if (target.metricCategory === _this.BUILT_IN_METRICS || target.metricCategory === _this.CUSTOM_METRICS) {
                            _this.setRollupTimeInterval(target, target.timeFilter);
                            return _this.getInfrastructureMetrics(target, timeFilter).then(function (data) {
                                return _this.buildTargetWithAppendedDataResult(target, timeFilter, data);
                            });
                        }
                        else if (target.metricCategory) {
                            _this.setGranularityTimeInterval(target, target.timeFilter);
                            if (target.metricCategory === _this.ANALYZE_WEBSITE_METRICS) {
                                return _this.getAnalyzeWebsiteMetrics(target, timeFilter).then(function (data) {
                                    return _this.buildTargetWithAppendedDataResult(target, timeFilter, data);
                                });
                            }
                            else if (target.metricCategory === _this.ANALYZE_APPLICATION_METRICS) {
                                return _this.getAnalyzeApplicationMetrics(target, timeFilter).then(function (data) {
                                    return _this.buildTargetWithAppendedDataResult(target, timeFilter, data);
                                });
                            }
                            else if (target.metricCategory === _this.APPLICATION_SERVICE_ENDPOINT_METRICS) {
                                return _this.getApplicationServiceEndpointMetrics(target, timeFilter).then(function (data) {
                                    return _this.buildTargetWithAppendedDataResult(target, timeFilter, data);
                                });
                            }
                            else if (target.metricCategory === _this.SLO_INFORMATION) {
                                return _this.getSloInformation(target, timeFilter).then(function (data) {
                                    return _this.buildTargetWithAppendedDataResult(target, timeFilter, data);
                                });
                            }
                        }
                        return { data: [], target: target };
                    })).then(function (targetData) {
                        var result = [];
                        lodash_1.default.each(targetData, function (targetAndData, index) {
                            // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
                            var resultData = lodash_1.default.compact(lodash_1.default.flatten(targetAndData.data)); // Also remove empty data items
                            _this.applyTimeShiftIfNecessary(resultData, targetAndData.target);
                            resultData = _this.aggregateDataIfNecessary(resultData, targetAndData.target);
                            _this.cacheResultIfNecessary(resultData, targetAndData.target);
                            result.push(resultData);
                        });
                        return { data: lodash_1.default.flatten(result) };
                    });
                };
                InstanaDatasource.prototype.appendResult = function (data, target) {
                    var cachedResult = this.resultCache.get(target.stableHash);
                    if (cachedResult && cachedResult.results) {
                        data = delta_util_1.appendData(data, cachedResult.results);
                    }
                    return data;
                };
                InstanaDatasource.prototype.adjustTimeFilterIfCached = function (timeFilter, target) {
                    var cachedResult = this.resultCache.get(target.stableHash);
                    if (cachedResult && delta_util_1.hasIntersection(timeFilter, cachedResult.timeFilter)) {
                        var newFrom = this.getDeltaRequestTimestamp(cachedResult.results, cachedResult.timeFilter.from);
                        var newTo = Math.floor(timeFilter.to / 10000) * 10000;
                        return {
                            from: newFrom,
                            to: newTo,
                            windowSize: newTo - newFrom
                        };
                    }
                    return timeFilter;
                };
                InstanaDatasource.prototype.getDeltaRequestTimestamp = function (series, fromDefault) {
                    var length = series[0].datapoints.length;
                    if (length === 0) {
                        return fromDefault;
                    }
                    var penultimate = length > 1 ? length - 2 : 1;
                    return series[0].datapoints[penultimate][1];
                };
                InstanaDatasource.prototype.buildTargetWithAppendedDataResult = function (target, timeFilter, data) {
                    if (timeFilter.from !== target.timeFilter.from && data) {
                        data = this.appendResult(data, target);
                    }
                    return {
                        target: target,
                        data: data
                    };
                };
                InstanaDatasource.prototype.cacheResultIfNecessary = function (result, target) {
                    if (this.supportsDeltaRequests(target) && this.hasResult(result)) {
                        var cachedObj = {
                            timeFilter: target.timeFilter,
                            results: result
                        };
                        this.resultCache.put(target.stableHash, cachedObj, 400000); // to cover at least 5 min refreshs
                    }
                };
                InstanaDatasource.prototype.hasResult = function (result) {
                    return result && result.length > 0;
                };
                InstanaDatasource.prototype.removeEmptyTargetsFromResultData = function (data) {
                    return lodash_1.default.filter(data.data, function (d) { return d && d.refId; });
                };
                InstanaDatasource.prototype.applyTimeShiftIfNecessary = function (data, target) {
                    var _this = this;
                    data.forEach(function (data) {
                        if (target.timeShift) {
                            _this.applyTimeShiftOnData(data, _this.convertTimeShiftToMillis(target.timeShift));
                        }
                    });
                };
                InstanaDatasource.prototype.aggregateDataIfNecessary = function (data, target) {
                    var newData = [];
                    if (target.aggregateGraphs) {
                        newData.push(aggregation_util_1.aggregateTarget(data, target));
                        if (!target.hideOriginalGraphs) {
                            lodash_1.default.each(data, function (dt, index) { return newData.push(dt); });
                        }
                        return newData;
                    }
                    return data;
                };
                InstanaDatasource.prototype.groupTargetsByRefId = function (data) {
                    return lodash_1.default.groupBy(data.data, function (target) {
                        return target.refId;
                    });
                };
                InstanaDatasource.prototype.setRollupTimeInterval = function (target, timeFilter) {
                    if (!target.timeInterval || !lodash_1.default.find(this.availableRollups, ['key', target.timeInterval.key])) {
                        target.timeInterval = rollup_granularity_util_1.getDefaultMetricRollupDuration(timeFilter);
                    }
                };
                InstanaDatasource.prototype.setGranularityTimeInterval = function (target, timeFilter) {
                    if (!target.timeInterval || !lodash_1.default.find(this.availableGranularities, ['key', target.timeInterval.key])) {
                        target.timeInterval = rollup_granularity_util_1.getDefaultChartGranularity(timeFilter.windowSize);
                    }
                };
                InstanaDatasource.prototype.applyTimeShiftOnData = function (data, timeshift) {
                    data.datapoints.forEach(function (datapoint) {
                        datapoint[1] = datapoint[1] + timeshift;
                    });
                };
                InstanaDatasource.prototype.getAllDatapointsOfTimestamp = function (data, index) {
                    var valuesForSameTimestamp = [];
                    lodash_1.default.each(data, function (graph, i) {
                        var datapointValue = graph.datapoints[index];
                        if (datapointValue && datapointValue[0] > 0) {
                            valuesForSameTimestamp.push(datapointValue);
                        }
                    });
                    return valuesForSameTimestamp;
                };
                InstanaDatasource.prototype.convertTimeShiftToMillis = function (timeShift) {
                    if (!timeShift) {
                        return null;
                    }
                    try {
                        return this.parseTimeShift(timeShift);
                    }
                    catch (e) {
                        return null;
                    }
                };
                InstanaDatasource.prototype.parseTimeShift = function (timeShift) {
                    var milliSeconds = 1000;
                    if (timeShift.endsWith('s')) {
                        return parseInt(timeShift.split('s')[0]) * milliSeconds;
                    }
                    else if (timeShift.endsWith('m')) {
                        return parseInt(timeShift.split('m')[0]) * 60 * milliSeconds;
                    }
                    else if (timeShift.endsWith('h')) {
                        return parseInt(timeShift.split('h')[0]) * 60 * 60 * milliSeconds;
                    }
                    else if (timeShift.endsWith('d')) {
                        return parseInt(timeShift.split('d')[0]) * 60 * 60 * 24 * milliSeconds;
                    }
                    else if (timeShift.endsWith('w')) {
                        return parseInt(timeShift.split('w')[0]) * 60 * 60 * 24 * 7 * milliSeconds;
                    }
                    return null;
                };
                InstanaDatasource.prototype.applyTimeShiftOnTimeFilter = function (timeFilter, timeShift) {
                    return {
                        from: timeFilter.from - timeShift,
                        to: timeFilter.to - timeShift,
                        windowSize: timeFilter.windowSize
                    };
                };
                InstanaDatasource.prototype.readTime = function (options) {
                    var from = Math.floor(new Date(options.range.from).getTime() / 1000) * 1000;
                    var to = Math.floor(new Date(options.range.to).getTime() / 1000) * 1000;
                    return {
                        from: from,
                        to: to,
                        windowSize: to - from
                    };
                };
                InstanaDatasource.prototype.getInfrastructureMetrics = function (target, timeFilter) {
                    var _this = this;
                    // do not try to execute to big queries
                    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeInfrastructure)) {
                        return this.rejectLargeTimeWindow(this.maxWindowSizeInfrastructure);
                    }
                    // do not try to retrieve data without selected metric
                    if (!target.metric && !target.showAllMetrics && !target.freeTextMetrics) {
                        return this.$q.resolve({ data: [] });
                    }
                    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
                    return this.infrastructure.fetchSnapshotsForTarget(target, timeFilter).then(function (snapshots) {
                        if (target.showAllMetrics) {
                            // only available for custom metrics
                            return _this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, target.allMetrics);
                        }
                        else if (target.freeTextMetrics) {
                            // only available for custom metrics
                            var metrics = _this.extractMetricsFromText(target.freeTextMetrics);
                            return _this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, metrics);
                        }
                        else {
                            return _this.infrastructure.fetchMetricsForSnapshots(target, snapshots, timeFilter, target.metric);
                        }
                    });
                };
                InstanaDatasource.prototype.extractMetricsFromText = function (freeText) {
                    var metricsString = freeText.replace(/\s/g, '').split(',');
                    var metrics = [];
                    lodash_1.default.each(metricsString, function (metricString) { return metrics.push(JSON.parse('{ "key": "' + metricString + '"}')); });
                    if (metrics.length > 4) {
                        metrics.slice(0, 3); // API supports up to 4 metrics at once
                    }
                    return metrics;
                };
                InstanaDatasource.prototype.fetchMultipleMetricsForSnapshots = function (target, snapshots, timeFilter, metrics) {
                    var _this = this;
                    var resultPromises = [];
                    lodash_1.default.forEach(metrics, function (metric) {
                        resultPromises.push(_this.infrastructure.fetchMetricsForSnapshots(target, snapshots, timeFilter, metric));
                    });
                    return Promise.all(resultPromises).then(function (allResults) {
                        var allMetrics = [];
                        allResults.forEach(function (result) { return result.forEach(function (s) { return allMetrics.push(s); }); });
                        return allMetrics;
                    });
                };
                InstanaDatasource.prototype.getAnalyzeWebsiteMetrics = function (target, timeFilter) {
                    var _this = this;
                    // do not try to execute to big queries
                    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeAnalyzeWebsites)) {
                        return this.rejectLargeTimeWindow(this.maxWindowSizeAnalyzeWebsites);
                    }
                    return this.website.fetchAnalyzeMetricsForWebsite(target, timeFilter).then(function (response) {
                        return analyze_util_1.readItemMetrics(target, response, _this.website.buildAnalyzeWebsiteLabel);
                    });
                };
                InstanaDatasource.prototype.getAnalyzeApplicationMetrics = function (target, timeFilter) {
                    var _this = this;
                    // do not try to execute to big queries
                    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeAnalyzeApplications)) {
                        return this.rejectLargeTimeWindow(this.maxWindowSizeAnalyzeApplications);
                    }
                    return this.application.fetchAnalyzeMetricsForApplication(target, timeFilter).then(function (response) {
                        target.showWarningCantShowAllResults = response.data.canLoadMore;
                        return analyze_util_1.readItemMetrics(target, response, _this.application.buildAnalyzeApplicationLabel);
                    });
                };
                InstanaDatasource.prototype.getApplicationServiceEndpointMetrics = function (target, timeFilter) {
                    var _this = this;
                    // do not try to execute to big queries
                    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeAnalyzeMetrics)) {
                        return this.rejectLargeTimeWindow(this.maxWindowSizeAnalyzeMetrics);
                    }
                    if (this.isEndpointSet(target.endpoint)) {
                        return this.endpoint.fetchEndpointMetrics(target, timeFilter).then(function (response) {
                            return analyze_util_1.readItemMetrics(target, response, _this.endpoint.buildEndpointMetricLabel);
                        });
                    }
                    else if (this.isServiceSet(target.service)) {
                        return this.service.fetchServiceMetrics(target, timeFilter).then(function (response) {
                            return analyze_util_1.readItemMetrics(target, response, _this.service.buildServiceMetricLabel);
                        });
                    }
                    else if (this.isApplicationSet(target.entity)) {
                        return this.application.fetchApplicationMetrics(target, timeFilter).then(function (response) {
                            target.showWarningCantShowAllResults = response.data.canLoadMore;
                            return analyze_util_1.readItemMetrics(target, response, _this.application.buildApplicationMetricLabel);
                        });
                    }
                    return this.$q.resolve({ data: { items: [] } });
                };
                InstanaDatasource.prototype.getSloInformation = function (target, timeFilter) {
                    return this.slo.fetchSLOReport(target, timeFilter);
                };
                InstanaDatasource.prototype.isInvalidQueryInterval = function (windowSize, queryIntervalLimit) {
                    if (queryIntervalLimit > 0) {
                        return Math.floor(windowSize / 1000) * 1000 > queryIntervalLimit;
                    }
                    return false;
                };
                InstanaDatasource.prototype.rejectLargeTimeWindow = function (maxWindowSize) {
                    return this.$q.reject("Limit for maximum selectable windowsize exceeded, " +
                        "max is: " + (maxWindowSize / 60 / 60 / 1000) + " hours");
                };
                InstanaDatasource.prototype.isApplicationSet = function (application) {
                    return application && application.key;
                };
                InstanaDatasource.prototype.isServiceSet = function (service) {
                    return service && service.key;
                };
                InstanaDatasource.prototype.isEndpointSet = function (endpoint) {
                    return endpoint && endpoint.key;
                };
                InstanaDatasource.prototype.annotationQuery = function (options) {
                    throw new Error('Annotation Support not implemented yet.');
                };
                InstanaDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error('Template Variable Support not implemented yet.');
                };
                InstanaDatasource.prototype.supportsDeltaRequests = function (target) {
                    var _this = this;
                    if (this.SLO_INFORMATION === target.metricCategory) {
                        return false;
                    }
                    var version = this.resultCache.get('version');
                    if (!version) {
                        return this.getVersion().then(function (version) {
                            _this.resultCache.put('version', version, 4000000); // this is over an hour and 11 minutes
                            return version >= 171;
                        });
                    }
                    return version >= 171;
                };
                InstanaDatasource.prototype.getVersion = function () {
                    return this.doRequest('/api/instana/version').then(function (result) {
                        if (result.data && result.data.imageTag) {
                            return parseInt(result.data.imageTag.split('.', 2)[1], 10) || null;
                        }
                        return null;
                    }, function (error) {
                        return null;
                    });
                };
                InstanaDatasource.prototype.isSloEnabled = function () {
                    return this.sloIsEnabled;
                };
                InstanaDatasource.prototype.testDatasource = function () {
                    return this.doRequest('/api/monitoringState').then(function (result) {
                        return {
                            status: 'success',
                            message: 'Successfully connected to the Instana API.',
                            title: 'Success'
                        };
                    }, function (error) {
                        if (error.status === 401) {
                            return {
                                status: 'error',
                                message: 'Unauthorized. Please verify the API Token.',
                                title: 'Error'
                            };
                        }
                        else {
                            console.log(error);
                            return {
                                status: 'error',
                                message: 'Error (' + error.status + ') connecting to the Instana API: ' + error.statusText,
                                title: 'Error'
                            };
                        }
                    });
                };
                return InstanaDatasource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map