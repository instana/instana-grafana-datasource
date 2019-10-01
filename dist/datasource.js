System.register(['./datasource_infrastructure', './datasource_application', './datasource_website', './datasource_abstract', "./datasource_service", "./datasource_endpoint", './migration', 'lodash', "./util/analyze_util", "./util/aggregation_util"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_infrastructure_1, datasource_application_1, datasource_website_1, datasource_abstract_1, datasource_service_1, datasource_endpoint_1, migration_1, lodash_1, analyze_util_1, aggregation_util_1;
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
            function (datasource_service_1_1) {
                datasource_service_1 = datasource_service_1_1;
            },
            function (datasource_endpoint_1_1) {
                datasource_endpoint_1 = datasource_endpoint_1_1;
            },
            function (migration_1_1) {
                migration_1 = migration_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (analyze_util_1_1) {
                analyze_util_1 = analyze_util_1_1;
            },
            function (aggregation_util_1_1) {
                aggregation_util_1 = aggregation_util_1_1;
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
                    this.endpoint = new datasource_endpoint_1.default(instanceSettings, backendSrv, templateSrv, $q, this.service);
                }
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (Object.keys(options.targets[0]).length === 0) {
                        return this.$q.resolve({ data: [] });
                    }
                    var targets = [];
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        var timeFilter = _this.readTime(options);
                        targets[target.refId] = target;
                        // grafana setting to disable query execution
                        if (target.hide) {
                            return { data: [] };
                        }
                        // target migration for downwards compatibility
                        migration_1.default(target);
                        if (target.timeShift) {
                            timeFilter = _this.applyTimeShiftOnTimeFilter(timeFilter, _this.convertTimeShiftToMillis(target.timeShift));
                            target.timeShiftIsValid = true;
                        }
                        else {
                            target.timeShiftIsValid = false;
                        }
                        if (target.metricCategory === _this.ANALYZE_WEBSITE_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilter.windowSize);
                            return _this.getAnalyzeWebsiteMetrics(target, timeFilter);
                        }
                        else if (target.metricCategory === _this.ANALYZE_APPLICATION_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilter.windowSize);
                            return _this.getAnalyzeApplicationMetrics(target, timeFilter);
                        }
                        else if (target.metricCategory === _this.APPLICATION_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilter.windowSize);
                            return _this.getApplicationMetrics(target, timeFilter);
                        }
                        else if (target.metricCategory === _this.SERVICE_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilter.windowSize);
                            return _this.getServiceMetrics(target, timeFilter);
                        }
                        else if (target.metricCategory === _this.ENDPOINT_METRICS) {
                            target.availableTimeIntervals = analyze_util_1.getPossibleGranularities(timeFilter.windowSize);
                            return _this.getEndpointMetrics(target, timeFilter);
                        }
                        else {
                            target.availableTimeIntervals = _this.infrastructure.getPossibleRollups(timeFilter);
                            if (!target.timeInterval) {
                                target.timeInterval = _this.infrastructure.getDefaultMetricRollupDuration(timeFilter);
                            }
                            return _this.getInfrastructureMetrics(target, target.timeInterval, timeFilter);
                        }
                    })).then(function (results) {
                        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
                        var flatData = { data: lodash_1.default.flatten(results) };
                        flatData.data.forEach(function (data) {
                            if (targets[data.refId] && targets[data.refId].timeShift) {
                                _this.applyTimeShiftOnData(data, _this.convertTimeShiftToMillis(targets[data.refId].timeShift));
                            }
                        });
                        var targetsGroupedByRefId = lodash_1.default.groupBy(flatData.data, function (data) {
                            return data.refId;
                        });
                        var newData = [];
                        lodash_1.default.each(targetsGroupedByRefId, function (target, index) {
                            var refId = target[0].refId;
                            if (targets[refId] && targets[refId].aggregateGraphs) {
                                newData.push(_this.aggregateTarget(target, targets[refId]));
                                if (!targets[refId].hideOriginalGraphs) {
                                    newData.push(target);
                                }
                            }
                            else {
                                newData.push(target);
                            }
                        });
                        return { data: lodash_1.default.flatten(newData) };
                    });
                };
                InstanaDatasource.prototype.aggregateTarget = function (target, targetMetaData) {
                    var refId = target[0].refId;
                    var concatedTargetData = this.concatTargetData(target);
                    var dataGroupedByTimestamp = lodash_1.default.groupBy(concatedTargetData, function (data) {
                        return data[1];
                    });
                    var aggregatedData = this.aggregateDataOfTimestamp(dataGroupedByTimestamp, targetMetaData.aggregationFunction.label);
                    aggregatedData = lodash_1.default.sortBy(aggregatedData, [function (datapoint) {
                            return datapoint[1];
                        }]);
                    return this.buildResult(aggregatedData, refId, aggregation_util_1.buildAggregationLabel(targetMetaData));
                };
                InstanaDatasource.prototype.aggregateDataOfTimestamp = function (dataGroupedByTimestamp, aggregationLabel) {
                    var result = [];
                    lodash_1.default.each(dataGroupedByTimestamp, function (timestampData, timestamp) {
                        var valuesOfTimestamp = lodash_1.default.map(timestampData, function (datapoint, index) {
                            return datapoint[0];
                        });
                        var aggregatedValue = aggregation_util_1.aggregate(aggregationLabel, valuesOfTimestamp);
                        result.push([aggregatedValue, parseInt(timestamp)]);
                    });
                    return result;
                };
                InstanaDatasource.prototype.concatTargetData = function (target) {
                    var result = [];
                    lodash_1.default.each(target, function (data, index) {
                        result = lodash_1.default.concat(result, data.datapoints);
                    });
                    return result;
                };
                InstanaDatasource.prototype.applyTimeShiftOnData = function (data, timeshift) {
                    data.datapoints.forEach(function (datapoint) {
                        datapoint[1] = datapoint[1] + timeshift;
                    });
                };
                InstanaDatasource.prototype.buildResult = function (aggregatedData, refId, target) {
                    return {
                        datapoints: aggregatedData,
                        refId: refId,
                        target: target
                    };
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
                InstanaDatasource.prototype.getAnalyzeWebsiteMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.website.fetchAnalyzeMetricsForWebsite(target, timeFilter).then(function (response) {
                        return analyze_util_1.readItemMetrics(target, response, _this.website.buildAnalyzeWebsiteLabel);
                    });
                };
                InstanaDatasource.prototype.getAnalyzeApplicationMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.application.fetchAnalyzeMetricsForApplication(target, timeFilter).then(function (response) {
                        target.showWarningCantShowAllResults = response.data.canLoadMore;
                        return analyze_util_1.readItemMetrics(target, response, _this.application.buildAnalyzeApplicationLabel);
                    });
                };
                InstanaDatasource.prototype.getApplicationMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.application.fetchApplicationMetrics(target, timeFilter).then(function (response) {
                        target.showWarningCantShowAllResults = response.data.canLoadMore;
                        return analyze_util_1.readItemMetrics(target, response, _this.application.buildApplicationMetricLabel);
                    });
                };
                InstanaDatasource.prototype.getServiceMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.service.fetchServiceMetrics(target, timeFilter).then(function (response) {
                        return analyze_util_1.readItemMetrics(target, response, _this.service.buildServiceMetricLabel);
                    });
                };
                InstanaDatasource.prototype.getEndpointMetrics = function (target, timeFilter) {
                    var _this = this;
                    return this.endpoint.fetchEndpointMetrics(target, timeFilter).then(function (response) {
                        return analyze_util_1.readItemMetrics(target, response, _this.endpoint.buildEndpointMetricLabel);
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