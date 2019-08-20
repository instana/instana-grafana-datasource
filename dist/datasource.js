System.register(['./datasource_infrastructure', './datasource_application', './datasource_website', './datasource_abstract', './migration', 'lodash', "./util/analyze_util"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_infrastructure_1, datasource_application_1, datasource_website_1, datasource_abstract_1, migration_1, lodash_1, analyze_util_1;
    var InstanaDatasource;
    return {
        setters:[
            function (datasource_infrastructure_1_1) {
                datasource_infrastructure_1 = datasource_infrastructure_1_1;
            },
            function (datasource_application_1_1) {
                datasource_application_1 = datasource_application_1_1;
            },
            function (datasource_website_1_1) {
                datasource_website_1 = datasource_website_1_1;
            },
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (migration_1_1) {
                migration_1 = migration_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (analyze_util_1_1) {
                analyze_util_1 = analyze_util_1_1;
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
                }
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (Object.keys(options.targets[0]).length === 0) {
                        return this.$q.resolve({ data: [] });
                    }
                    var timeFilters = {};
                    var timeShifts = {};
                    var targetRefId;
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        targetRefId = target.refId;
                        timeFilters[targetRefId] = _this.readTime(options);
                        timeShifts[targetRefId] = _this.convertTimeShiftToMillis(target.timeShift);
                        // grafana setting to disable query execution
                        if (target.hide) {
                            return { data: [] };
                        }
                        // target migration for downwards compatibility
                        migration_1.default(target);
                        if (timeShifts[targetRefId]) {
                            timeFilters[targetRefId] = _this.applyTimeShiftOnTimeFilter(timeFilters[targetRefId], timeShifts[targetRefId]);
                            target.timeShiftIsValid = true;
                        }
                        else {
                            target.timeShiftIsValid = false;
                        }
                        if (target.metricCategory === _this.WEBSITE_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilters[targetRefId].windowSize);
                            return _this.getWebsiteMetrics(target, timeFilters[targetRefId]);
                        }
                        else if (target.metricCategory === _this.APPLICATION_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilters[targetRefId].windowSize);
                            return _this.getApplicationMetrics(target, timeFilters[targetRefId]);
                        }
                        else {
                            target.availableTimeIntervals = _this.infrastructure.getPossibleRollups(timeFilters[targetRefId]);
                            if (!target.timeInterval) {
                                target.timeInterval = _this.infrastructure.getDefaultMetricRollupDuration(timeFilters[targetRefId]);
                            }
                            return _this.getInfrastructureMetrics(target, target.timeInterval, timeFilters[targetRefId]);
                        }
                    })).then(function (results) {
                        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
                        var flatData = { data: lodash_1.default.flatten(results) };
                        flatData.data.forEach(function (data) {
                            if (timeShifts[data.refId]) {
                                data.datapoints.forEach(function (datapoint) {
                                    datapoint[1] = datapoint[1] + timeShifts[data.refId];
                                });
                            }
                        });
                        return flatData;
                    });
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
                    var from = new Date(options.range.from).getTime();
                    var to = new Date(options.range.to).getTime();
                    return {
                        from: from,
                        to: to,
                        windowSize: to - from
                    };
                };
                InstanaDatasource.prototype.getInfrastructureMetrics = function (target, rollUp, timeFilter) {
                    var _this = this;
                    // do not try to retrieve data without selected metric
                    if (!target.metric && !target.showAllMetrics) {
                        return this.$q.resolve({ data: [] });
                    }
                    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
                    return this.infrastructure.fetchSnapshotsForTarget(target, timeFilter).then(function (snapshots) {
                        if (target.showAllMetrics) {
                            var resultPromises = [];
                            lodash_1.default.forEach(target.allMetrics, function (metric) {
                                resultPromises.push(_this.infrastructure.fetchMetricsForSnapshots(target, snapshots, rollUp, timeFilter, metric));
                            });
                            return Promise.all(resultPromises).then(function (allResults) {
                                var allMetrics = [];
                                allResults.forEach(function (result) { return result.forEach(function (s) { return allMetrics.push(s); }); });
                                return allMetrics;
                            });
                        }
                        else {
                            return _this.infrastructure.fetchMetricsForSnapshots(target, snapshots, rollUp, timeFilter, target.metric);
                        }
                    });
                };
                InstanaDatasource.prototype.getWebsiteMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.website.fetchMetricsForWebsite(target, timeFilter).then(function (response) {
                        return analyze_util_1.readItemMetrics(target, response, _this.website.buildWebsiteLabel);
                    });
                };
                InstanaDatasource.prototype.getApplicationMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.application.fetchMetricsForApplication(target, timeFilter).then(function (response) {
                        target.showWarningCantShowAllResults = response.data.canLoadMore;
                        return analyze_util_1.readItemMetrics(target, response, _this.application.buildApplicationLabel);
                    });
                };
                InstanaDatasource.prototype.annotationQuery = function (options) {
                    throw new Error('Annotation Support not implemented yet.');
                };
                InstanaDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error('Template Variable Support not implemented yet.');
                };
                InstanaDatasource.prototype.getVersion = function () {
                    return this.doRequest('/api/instana/version').then(function (result) {
                        if (result.data) {
                            return parseFloat(result.data.imageTag) || null;
                        }
                        return null;
                    }, function (error) {
                        return null;
                    });
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