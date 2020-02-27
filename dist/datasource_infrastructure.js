System.register(["./util/rollup_granularity_util", './datasource_abstract', './lists/max_metrics', './cache', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var rollup_granularity_util_1, datasource_abstract_1, max_metrics_1, cache_1, lodash_1;
    var InstanaInfrastructureDataSource;
    return {
        setters:[
            function (rollup_granularity_util_1_1) {
                rollup_granularity_util_1 = rollup_granularity_util_1_1;
            },
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (max_metrics_1_1) {
                max_metrics_1 = max_metrics_1_1;
            },
            function (cache_1_1) {
                cache_1 = cache_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaInfrastructureDataSource = (function (_super) {
                __extends(InstanaInfrastructureDataSource, _super);
                /** @ngInject */
                function InstanaInfrastructureDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.timeToLiveSnapshotInfoCache = 60 * 60 * 1000;
                    this.showOffline = instanceSettings.jsonData.showOffline;
                    this.snapshotCache = new cache_1.default();
                    this.snapshotInfoCache = new cache_1.default();
                    this.catalogCache = new cache_1.default();
                }
                InstanaInfrastructureDataSource.prototype.getEntityTypes = function () {
                    var entityTypes = this.simpleCache.get('entityTypes');
                    if (entityTypes) {
                        return entityTypes;
                    }
                    entityTypes = this.doRequest('/api/infrastructure-monitoring/catalog/plugins').then(function (typesResponse) {
                        return typesResponse.data.map(function (entry) { return ({
                            'key': entry.plugin,
                            'label': entry.label
                        }); });
                    });
                    this.simpleCache.put('entityTypes', entityTypes);
                    return entityTypes;
                };
                InstanaInfrastructureDataSource.prototype.getMetricsCatalog = function (plugin, metricCategory) {
                    var _this = this;
                    var key = plugin.key + this.SEPARATOR + metricCategory;
                    var metrics = this.catalogCache.get(key);
                    if (metrics) {
                        return metrics;
                    }
                    var filter = metricCategory === this.CUSTOM_METRICS ? 'custom' : 'builtin';
                    metrics = this.doRequest("/api/infrastructure-monitoring/catalog/metrics/" + plugin.key + "?filter=" + filter).then(function (catalogResponse) {
                        return catalogResponse.data.map(function (entry) { return ({
                            'key': entry.metricId,
                            'label': metricCategory === _this.CUSTOM_METRICS ? entry.description : entry.label,
                            'aggregations': ['MEAN', 'SUM'],
                            'entityType': entry.pluginId
                        }); });
                    });
                    this.catalogCache.put(key, metrics);
                    return metrics;
                };
                InstanaInfrastructureDataSource.prototype.fetchTypesForTarget = function (target, timeFilter) {
                    var fetchSnapshotTypesUrl = "/api/snapshots/types" +
                        ("?q=" + encodeURIComponent(target.entityQuery)) +
                        ("&from=" + timeFilter.from) +
                        ("&to=" + timeFilter.to) +
                        (this.showOffline ? "" : "&time=" + timeFilter.to);
                    return this.doRequest(fetchSnapshotTypesUrl);
                };
                InstanaInfrastructureDataSource.prototype.fetchSnapshotsForTarget = function (target, timeFilter) {
                    var _this = this;
                    var query = this.buildQuery(target);
                    var key = this.buildSnapshotCacheKey(query, timeFilter);
                    var snapshots = this.snapshotCache.get(key);
                    if (snapshots) {
                        return snapshots;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var fetchSnapshotContextsUrl = "/api/snapshots/context" +
                        ("?q=" + query) +
                        ("&from=" + timeFilter.from) +
                        ("&to=" + timeFilter.to) +
                        (this.showOffline ? "" : "&time=" + timeFilter.to + "&size=100");
                    snapshots = this.doRequest(fetchSnapshotContextsUrl).then(function (contextsResponse) {
                        return _this.$q.all(contextsResponse.data.map(function (_a) {
                            var snapshotId = _a.snapshotId, host = _a.host, plugin = _a.plugin;
                            var snapshotInfo = _this.snapshotInfoCache.get(snapshotId);
                            if (snapshotInfo) {
                                return snapshotInfo;
                            }
                            var fetchSnapshotUrl = ("/api/snapshots/" + snapshotId) +
                                (_this.showOffline ?
                                    "?from=" + timeFilter.from + "&to=" + timeFilter.to :
                                    "?time=" + timeFilter.to); // @see SnapshotApiResource#getSnapshot
                            snapshotInfo = _this.doRequest(fetchSnapshotUrl, true).then(function (snapshotResponse) {
                                // check for undefined because the fetchSnapshotContexts is buggy
                                if (snapshotResponse !== undefined) {
                                    return {
                                        snapshotId: snapshotId, host: host,
                                        'response': _this.reduceSnapshot(snapshotResponse)
                                    };
                                }
                            });
                            _this.snapshotInfoCache.put(snapshotId, snapshotInfo, _this.timeToLiveSnapshotInfoCache);
                            return snapshotInfo;
                        }));
                    }).then(function (response) {
                        // undefined items need to be removed, because the fetchSnapshotContexts is buggy in the backend, maybe can be removed in the future
                        return lodash_1.default.compact(response);
                    });
                    this.snapshotCache.put(key, snapshots);
                    return snapshots;
                };
                InstanaInfrastructureDataSource.prototype.reduceSnapshot = function (snapshotResponse) {
                    // reduce data to used label formatting values
                    snapshotResponse.data = lodash_1.default.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
                    return snapshotResponse;
                };
                InstanaInfrastructureDataSource.prototype.buildQuery = function (target) {
                    // check for entity.pluginId or entity.selfType, because otherwise the backend has a problem with `AND entity.pluginId`
                    if (("" + target.entityQuery).includes("entity.pluginId:") || ("" + target.entityQuery).includes("entity.selfType:")) {
                        return encodeURIComponent("" + target.entityQuery);
                    }
                    else {
                        return encodeURIComponent(target.entityQuery + " AND entity.pluginId:" + target.entityType.key);
                    }
                };
                InstanaInfrastructureDataSource.prototype.buildSnapshotCacheKey = function (query, timeFilter) {
                    return query + this.SEPARATOR + this.getTimeKey(timeFilter);
                };
                InstanaInfrastructureDataSource.prototype.buildLabel = function (snapshotResponse, host, target, index, metric) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', snapshotResponse.data.label);
                        label = lodash_1.default.replace(label, '$plugin', snapshotResponse.data.plugin); // not documented
                        label = lodash_1.default.replace(label, '$snapshot', snapshotResponse.data.id); // not documented
                        label = lodash_1.default.replace(label, '$host', host ? host : 'unknown');
                        label = lodash_1.default.replace(label, '$pid', lodash_1.default.get(snapshotResponse.data, ['data', 'pid'], ''));
                        label = lodash_1.default.replace(label, '$type', lodash_1.default.get(snapshotResponse.data, ['data', 'type'], ''));
                        label = lodash_1.default.replace(label, '$name', lodash_1.default.get(snapshotResponse.data, ['data', 'name'], ''));
                        label = lodash_1.default.replace(label, '$service', lodash_1.default.get(snapshotResponse.data, ['data', 'service_name'], ''));
                        if (target.freeTextMetrics) {
                            label = lodash_1.default.replace(label, '$metric', metric.key);
                        }
                        else {
                            label = lodash_1.default.replace(label, '$metric', lodash_1.default.get(target, ['metric', 'key'], 'n/a'));
                        }
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        snapshotResponse.data.label + this.getHostSuffix(host) + " - " + target.timeShift
                        :
                            snapshotResponse.data.label + this.getHostSuffix(host);
                };
                InstanaInfrastructureDataSource.prototype.getHostSuffix = function (host) {
                    if (host) {
                        return ' (on host "' + host + '")';
                    }
                    return '';
                };
                InstanaInfrastructureDataSource.prototype.fetchMetricsForSnapshots = function (target, snapshots, timeFilter, metric) {
                    var _this = this;
                    var windowSize = this.getWindowSize(timeFilter);
                    var maxValues = [];
                    var res = lodash_1.default.map(snapshots, function (snapshot, index) {
                        // ...fetch the metric data for every snapshot in the results.
                        return _this.fetchMetricsForSnapshot(snapshot.snapshotId, timeFilter, target.timeInterval.key, metric).then(function (response) {
                            var timeseries = _this.readTimeSeries(response.data.values, target.aggregation, target.pluginId, timeFilter);
                            var result = {
                                'target': _this.buildLabel(snapshot.response, snapshot.host, target, index, metric),
                                'datapoints': lodash_1.default.map(timeseries, function (value) { return [value.value, value.timestamp]; }),
                                'refId': target.refId
                            };
                            if (target.displayMaxMetricValue) {
                                var maxValue = _this.getMaxMetricValue(target.metric, snapshot);
                                maxValues.push(_this.buildMaxMetricTarget(target, timeseries, maxValue, result.target));
                                result.datapoints = _this.convertRelativeToAbsolute(result.datapoints, maxValue);
                            }
                            return result;
                        });
                    });
                    return Promise.all(res).then(function (allResults) {
                        if (target.displayMaxMetricValue) {
                            allResults = lodash_1.default.concat(res, maxValues);
                        }
                        return _this.$q.all(allResults);
                    });
                };
                InstanaInfrastructureDataSource.prototype.buildMaxMetricTarget = function (target, timeseries, maxValue, resultLabel) {
                    var datapoints = lodash_1.default.map(timeseries, function (series, index) {
                        return [maxValue, series.timestamp];
                    });
                    return {
                        'target': resultLabel + ' ' + this.convertMetricNameToMaxLabel(target.metric),
                        'datapoints': datapoints,
                        'refId': target.refId
                    };
                };
                InstanaInfrastructureDataSource.prototype.convertRelativeToAbsolute = function (datapoints, maxValue) {
                    return lodash_1.default.map(datapoints, function (datapoint, index) {
                        if (datapoint[0]) {
                            return [datapoint[0] * maxValue, datapoint[1]];
                        }
                        return [null, datapoint[1]];
                    });
                };
                InstanaInfrastructureDataSource.prototype.convertMetricNameToMaxLabel = function (metric) {
                    return lodash_1.default.find(max_metrics_1.default, function (m) { return m.key === metric.key; }).label;
                };
                InstanaInfrastructureDataSource.prototype.getMaxMetricValue = function (metric, snapshot) {
                    return snapshot.response.data.data[lodash_1.default.find(max_metrics_1.default, function (m) { return m.key === metric.key; }).value];
                };
                InstanaInfrastructureDataSource.prototype.readTimeSeries = function (values, aggregation, pluginId, timeFilter) {
                    if (aggregation === 'SUM' && (pluginId === 'singlestat' || pluginId === 'gauge' || pluginId === 'table')) {
                        return this.correctMeanToSum(values, timeFilter);
                    }
                    return values;
                };
                InstanaInfrastructureDataSource.prototype.correctMeanToSum = function (values, timeFilter) {
                    var secondMultiplier = parseInt(rollup_granularity_util_1.getDefaultMetricRollupDuration(timeFilter).key) / 1000;
                    return lodash_1.default.map(values, function (value) {
                        return {
                            'value': value.value ? value.value * secondMultiplier : null,
                            'timestamp': value.timestamp
                        };
                    });
                };
                InstanaInfrastructureDataSource.prototype.fetchMetricsForSnapshot = function (snapshotId, timeFilter, rollup, metric) {
                    var url = ("/api/metrics?metric=" + metric.key)
                        + ("&from=" + timeFilter.from)
                        + ("&to=" + timeFilter.to)
                        + ("&rollup=" + rollup)
                        + "&fillTimeSeries=true"
                        + ("&snapshotId=" + snapshotId);
                    return this.doRequest(url);
                };
                return InstanaInfrastructureDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaInfrastructureDataSource);
        }
    }
});
//# sourceMappingURL=datasource_infrastructure.js.map