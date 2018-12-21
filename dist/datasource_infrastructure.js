System.register(['./datasource_abstract', './rollups', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, rollups_1, lodash_1;
    var InstanaInfrastructureDataSource;
    return {
        setters:[
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (rollups_1_1) {
                rollups_1 = rollups_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaInfrastructureDataSource = (function (_super) {
                __extends(InstanaInfrastructureDataSource, _super);
                /** @ngInject */
                function InstanaInfrastructureDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    var _this = this;
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.rollupDurationThresholds = rollups_1.default;
                    this.MAX_NUMBER_OF_METRICS_FOR_CHARTS = 800;
                    this.CACHE_MAX_AGE = 60000;
                    this.CUSTOM_METRICS = '1';
                    // FIXME CACHE
                    this.storeInCache = function (query, data) {
                        _this.snapshotCache[query] = data;
                    };
                    this.wasLastFetchedFromApi = function () { return _this.lastFetchedFromAPI; };
                    this.setLastFetchedFromApi = function (value) { _this.lastFetchedFromAPI = value; };
                    this.snapshotCache = {};
                    this.catalogCache = {};
                }
                InstanaInfrastructureDataSource.prototype.getEntityTypes = function (metricCategory) {
                    var now = this.currentTime();
                    if (!this.entityTypesCache || now - this.entityTypesCache.age > this.CACHE_MAX_AGE) {
                        this.entityTypesCache = {
                            age: now,
                            entityTypes: this.doRequest('/api/infrastructure-monitoring/catalog/plugins').then(function (typesResponse) {
                                return typesResponse.data.map(function (entry) { return ({
                                    'key': entry.plugin,
                                    'label': entry.label
                                }); });
                            })
                        };
                    }
                    return this.entityTypesCache.entityTypes;
                };
                InstanaInfrastructureDataSource.prototype.getMetricsCatalog = function (plugin, metricCategory) {
                    var _this = this;
                    var id = plugin.key + '|' + metricCategory;
                    var now = this.currentTime();
                    if (!this.catalogCache[id] || now - this.catalogCache[id].age > this.CACHE_MAX_AGE) {
                        var filter = metricCategory === this.CUSTOM_METRICS ? 'custom' : 'builtin';
                        this.catalogCache[id] = {
                            age: now,
                            metrics: this.doRequest("/api/infrastructure-monitoring/catalog/metrics/" + plugin.key + "?filter=" + filter).then(function (catalogResponse) {
                                return catalogResponse.data.map(function (entry) { return ({
                                    'key': entry.metricId,
                                    'label': metricCategory === _this.CUSTOM_METRICS ? entry.description : entry.label,
                                    'entityType': entry.pluginId
                                }); });
                            })
                        };
                    }
                    return this.catalogCache[id].metrics;
                };
                InstanaInfrastructureDataSource.prototype.fetchTypesForTarget = function (target, timeFilter) {
                    var fetchSnapshotTypesUrl = "/api/snapshots/types" +
                        ("?q=" + encodeURIComponent(target.entityQuery)) +
                        ("&from=" + timeFilter.from + "&to=" + timeFilter.to) +
                        "&newApplicationModelEnabled=true";
                    return this.doRequest(fetchSnapshotTypesUrl);
                };
                InstanaInfrastructureDataSource.prototype.fetchSnapshotsForTarget = function (target, timeFilter) {
                    var _this = this;
                    var query = this.buildQuery(target);
                    // FIXME CACHE
                    if (this.localCacheCopyAvailable(query, timeFilter)) {
                        this.setLastFetchedFromApi(false);
                        return this.$q.resolve(this.snapshotCache[query].snapshots);
                    }
                    this.setLastFetchedFromApi(true);
                    var fetchSnapshotContextsUrl = "/api/snapshots/context" +
                        ("?q=" + query) +
                        ("&from=" + timeFilter.from) +
                        ("&to=" + timeFilter.to) +
                        "&size=100" +
                        "&newApplicationModelEnabled=true";
                    return this.doRequest(fetchSnapshotContextsUrl).then(function (contextsResponse) {
                        return _this.$q.all(contextsResponse.data.map(function (_a) {
                            var snapshotId = _a.snapshotId, host = _a.host, plugin = _a.plugin;
                            var fetchSnapshotUrl = "/api/snapshots/" + snapshotId;
                            return _this.doRequest(fetchSnapshotUrl).then(function (snapshotResponse) {
                                return {
                                    snapshotId: snapshotId, host: host,
                                    'response': _this.reduceSnapshot(snapshotResponse)
                                };
                            });
                        }));
                    });
                };
                InstanaInfrastructureDataSource.prototype.reduceSnapshot = function (snapshotResponse) {
                    // reduce data to used label formatting values
                    snapshotResponse.data = lodash_1.default.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
                    return snapshotResponse;
                };
                InstanaInfrastructureDataSource.prototype.localCacheCopyAvailable = function (query, timeFilter) {
                    return this.snapshotCache[query] &&
                        timeFilter.to - this.snapshotCache[query].to < this.CACHE_MAX_AGE &&
                        timeFilter.from - this.snapshotCache[query].from < this.CACHE_MAX_AGE &&
                        this.currentTime() - this.snapshotCache[query].at < this.CACHE_MAX_AGE;
                };
                InstanaInfrastructureDataSource.prototype.buildQuery = function (target) {
                    return encodeURIComponent(target.entityQuery + " AND entity.pluginId:" + target.entityType.key);
                };
                InstanaInfrastructureDataSource.prototype.buildLabel = function (snapshotResponse, host, target) {
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
                        label = lodash_1.default.replace(label, '$metric', lodash_1.default.get(target, ['metric', 'key'], 'n/a'));
                        return label;
                    }
                    return snapshotResponse.data.label + this.getHostSuffix(host);
                };
                InstanaInfrastructureDataSource.prototype.getHostSuffix = function (host) {
                    if (host) {
                        return ' (on host "' + host + '")';
                    }
                    return '';
                };
                InstanaInfrastructureDataSource.prototype.fetchMetricsForSnapshots = function (target, snapshots, timeFilter) {
                    var _this = this;
                    // Cache the data if fresh
                    if (this.wasLastFetchedFromApi()) {
                        // FIXME CACHE
                        this.storeInCache(this.buildQuery(target), { at: this.currentTime(), from: timeFilter.from, to: timeFilter.to, snapshots: snapshots });
                    }
                    return this.$q.all(lodash_1.default.map(snapshots, function (snapshot) {
                        // ...fetch the metric data for every snapshot in the results.
                        return _this.fetchMetricsForSnapshot(snapshot.snapshotId, target.metric.key, timeFilter).then(function (response) {
                            var timeseries = response.data.values;
                            var result = {
                                'target': _this.buildLabel(snapshot.response, snapshot.host, target),
                                'datapoints': lodash_1.default.map(timeseries, function (value) { return [value.value, value.timestamp]; })
                            };
                            return result;
                        });
                    }));
                };
                InstanaInfrastructureDataSource.prototype.fetchMetricsForSnapshot = function (snapshotId, metric, timeFilter) {
                    var rollup = this.getDefaultMetricRollupDuration(timeFilter).rollup;
                    var url = "/api/metrics?metric=" + metric + "&from=" + timeFilter.from + "&to=" + timeFilter.to + "&rollup=" + rollup + "&snapshotId=" + snapshotId;
                    return this.doRequest(url);
                };
                InstanaInfrastructureDataSource.prototype.getDefaultMetricRollupDuration = function (timeFilter, minRollup) {
                    if (minRollup === void 0) { minRollup = 1000; }
                    // Ignoring time differences for now since small time differences
                    // can be accepted. This time is only used to calculate the rollup.
                    var now = this.currentTime();
                    var windowSize = this.getWindowSize(timeFilter);
                    var availableRollupDefinitions = this.rollupDurationThresholds.filter(function (rollupDefinition) { return timeFilter.from >= now - rollupDefinition.availableFor; });
                    if (minRollup > 1000) {
                        availableRollupDefinitions = availableRollupDefinitions.filter(function (rollupDefinition) { return rollupDefinition.rollup != null && rollupDefinition.rollup >= minRollup; });
                    }
                    for (var i = 0, len = availableRollupDefinitions.length; i < len; i++) {
                        // this works because the rollupDurationThresholds array is sorted by rollup
                        // the first rollup matching the requirements is returned
                        var rollupDefinition = availableRollupDefinitions[i];
                        var rollup = rollupDefinition && rollupDefinition.rollup ? rollupDefinition.rollup : 1000;
                        if (windowSize / rollup <= this.MAX_NUMBER_OF_METRICS_FOR_CHARTS) {
                            return rollupDefinition;
                        }
                    }
                    return this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1];
                };
                return InstanaInfrastructureDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaInfrastructureDataSource);
        }
    }
});
//# sourceMappingURL=datasource_infrastructure.js.map