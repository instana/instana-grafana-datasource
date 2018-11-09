System.register(['lodash'], function(exports_1) {
    var lodash_1;
    var InstanaDatasource;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaDatasource = (function () {
                /** @ngInject */
                function InstanaDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    var _this = this;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.MAX_NUMBER_OF_METRICS_FOR_CHARTS = 800;
                    this.CACHE_MAX_AGE = 60000;
                    this.rollupDurationThresholds = [
                        {
                            availableFor: 1000 * 60 * 10 + 3000,
                            rollup: 1000,
                            label: '1s'
                        },
                        {
                            availableFor: 1000 * 60 * 60 * 24,
                            rollup: 1000 * 5,
                            label: '5s'
                        },
                        {
                            availableFor: 1000 * 60 * 60 * 24 * 31,
                            rollup: 1000 * 60,
                            label: '1min'
                        },
                        {
                            availableFor: 1000 * 60 * 60 * 24 * 31 * 3,
                            rollup: 1000 * 60 * 5,
                            label: '5min'
                        },
                        {
                            availableFor: Number.MAX_VALUE,
                            rollup: 1000 * 60 * 60,
                            label: '1h'
                        }
                    ];
                    this.storeInCache = function (query, data) {
                        _this.snapshotCache[query] = data;
                    };
                    this.wasLastFetchedFromApi = function () { return _this.lastFetchedFromAPI; };
                    this.setLastFetchedFromApi = function (value) { _this.lastFetchedFromAPI = value; };
                    this.getCatalog = function () {
                        if (!_this.catalogPromise) {
                            _this.catalogPromise = _this.$q.resolve(_this.request('GET', "/api/metricsCatalog/custom").then(function (catalogResponse) {
                                return _this.$q.all(lodash_1.default.map(catalogResponse.data, function (entry) { return ({
                                    'key': entry.metricId,
                                    'label': entry.description,
                                    'entityType': entry.pluginId
                                }); }));
                            }));
                        }
                        return _this.catalogPromise;
                    };
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.url = instanceSettings.jsonData.url;
                    this.apiToken = instanceSettings.jsonData.apiToken;
                    this.snapshotCache = {};
                    this.currentTime = function () { return new Date().getTime(); };
                }
                InstanaDatasource.prototype.request = function (method, url, requestId) {
                    return this.backendSrv.datasourceRequest({
                        url: this.url + url,
                        method: method,
                        requestId: requestId,
                        headers: {
                            Authorization: 'apiToken ' + this.apiToken
                        }
                    });
                };
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (Object.keys(options.targets[0]).length === 0) {
                        return this.$q.resolve({ data: [] });
                    }
                    // Convert ISO 8601 timestamps to millis.
                    this.fromFilter = new Date(options.range.from).getTime();
                    this.toFilter = new Date(options.range.to).getTime();
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        // For every target, fetch snapshots that in the selected timeframe that satisfy the lucene query.
                        return _this.fetchSnapshotsForTarget(target, _this.fromFilter, _this.toFilter)
                            .then(function (snapshots) {
                            return {
                                'target': target,
                                'snapshots': snapshots
                            };
                        });
                    })).then(function (targetsWithSnapshots) {
                        return _this.$q.all(lodash_1.default.map(targetsWithSnapshots, function (targetWithSnapshots) {
                            // For every target with all snapshots that were returned by the lucene query...
                            // Cache the data if fresh
                            if (_this.wasLastFetchedFromApi()) {
                                _this.storeInCache(_this.buildQuery(targetWithSnapshots.target), { time: _this.toFilter, age: _this.currentTime(), snapshots: targetWithSnapshots.snapshots });
                            }
                            // do not try to retrieve data without selected metric
                            if (!targetWithSnapshots.target.metric) {
                                return _this.$q.resolve({ data: [] });
                            }
                            return _this.$q.all(lodash_1.default.map(targetWithSnapshots.snapshots, function (snapshot) {
                                // ...fetch the metric data for every snapshot in the results.
                                return _this.fetchMetricsForSnapshot(snapshot.snapshotId, targetWithSnapshots.target.metric.key, _this.fromFilter, _this.toFilter)
                                    .then(function (response) {
                                    var timeseries = response.data.values;
                                    var result = {
                                        'target': snapshot.label,
                                        'datapoints': lodash_1.default.map(timeseries, function (value) { return [value.value, value.timestamp]; })
                                    };
                                    return result;
                                });
                            }));
                        }));
                    }).then(function (results) {
                        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
                        return { data: [].concat.apply([], results) };
                    });
                };
                InstanaDatasource.prototype.fetchTypesForTarget = function (target) {
                    var fetchSnapshotTypesUrl = "/api/snapshots/types" +
                        ("?q=" + encodeURIComponent(target.entityQuery)) +
                        ("&from=" + this.fromFilter) +
                        ("&to=" + this.toFilter) +
                        "&newApplicationModelEnabled=true";
                    return this.request('GET', fetchSnapshotTypesUrl);
                };
                InstanaDatasource.prototype.fetchSnapshotsForTarget = function (target, from, to) {
                    var _this = this;
                    var query = this.buildQuery(target);
                    if (this.localCacheCopyAvailable(query)) {
                        this.setLastFetchedFromApi(false);
                        return this.$q.resolve(this.snapshotCache[query].snapshots);
                    }
                    this.setLastFetchedFromApi(true);
                    var fetchSnapshotContextsUrl = "/api/snapshots/context" +
                        ("?q=" + query) +
                        ("&from=" + from) +
                        ("&to=" + to) +
                        "&size=100" +
                        "&newApplicationModelEnabled=true";
                    return this.request('GET', fetchSnapshotContextsUrl).then(function (contextsResponse) {
                        return _this.$q.all(contextsResponse.data.map(function (_a) {
                            var snapshotId = _a.snapshotId, host = _a.host, plugin = _a.plugin;
                            var fetchSnapshotUrl = "/api/snapshots/" + snapshotId;
                            return _this.request('GET', fetchSnapshotUrl).then(function (snapshotResponse) {
                                return {
                                    snapshotId: snapshotId, host: host,
                                    'response': snapshotResponse,
                                    'label': _this.buildLabel(snapshotResponse, host, target)
                                };
                            });
                        }));
                    });
                };
                InstanaDatasource.prototype.modifyLocalCacheCopyFor = function (target) {
                    var _this = this;
                    var query = this.buildQuery(target);
                    if (this.localCacheCopyAvailable(query)) {
                        lodash_1.default.map(this.snapshotCache[query].snapshots, function (snapshot) {
                            snapshot.label = _this.buildLabel(snapshot.response, snapshot.host, target);
                        });
                        return true;
                    }
                    return false;
                };
                InstanaDatasource.prototype.localCacheCopyAvailable = function (query) {
                    return this.snapshotCache[query] &&
                        this.toFilter - this.snapshotCache[query].time < this.CACHE_MAX_AGE &&
                        this.currentTime() - this.snapshotCache[query].age < this.CACHE_MAX_AGE;
                };
                InstanaDatasource.prototype.buildQuery = function (target) {
                    return encodeURIComponent(target.entityQuery + " AND entity.pluginId:" + target.entityType);
                };
                InstanaDatasource.prototype.buildLabel = function (snapshotResponse, host, target) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, "$label", snapshotResponse.data.label);
                        label = lodash_1.default.replace(label, "$plugin", snapshotResponse.data.plugin);
                        label = lodash_1.default.replace(label, "$host", host ? host : "unknown");
                        label = lodash_1.default.replace(label, "$pid", lodash_1.default.get(snapshotResponse.data, ["data", "pid"], ""));
                        label = lodash_1.default.replace(label, "$type", lodash_1.default.get(snapshotResponse.data, ["data", "type"], ""));
                        label = lodash_1.default.replace(label, "$name", lodash_1.default.get(snapshotResponse.data, ["data", "name"], ""));
                        label = lodash_1.default.replace(label, "$service", lodash_1.default.get(snapshotResponse.data, ["data", "service_name"], ""));
                        label = lodash_1.default.replace(label, "$metric", lodash_1.default.get(target, ["metric", "key"], "n/a"));
                        return label;
                    }
                    return snapshotResponse.data.label + this.getHostSuffix(host);
                };
                InstanaDatasource.prototype.getHostSuffix = function (host) {
                    if (host) {
                        return ' (on host "' + host + '")';
                    }
                    return '';
                };
                InstanaDatasource.prototype.fetchMetricsForSnapshot = function (snapshotId, metric, from, to) {
                    var rollup = this.getDefaultMetricRollupDuration(from, to).rollup;
                    var url = "/api/metrics?metric=" + metric + "&from=" + from + "&to=" + to + "&rollup=" + rollup + "&snapshotId=" + snapshotId;
                    return this.request('GET', url);
                };
                InstanaDatasource.prototype.annotationQuery = function (options) {
                    throw new Error('Annotation Support not implemented yet.');
                };
                InstanaDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error('Template Variable Support not implemented yet.');
                };
                InstanaDatasource.prototype.testDatasource = function () {
                    return this.request('GET', '/api/snapshots/non-existing-snapshot-id')
                        .then(
                    // We always expect an error response, either a 404 (Not Found) or a 401 (Unauthorized).
                    function (result) {
                        return {
                            status: 'error',
                            message: 'Error connecting to the Instana API.',
                            title: 'Error'
                        };
                    }, function (error) {
                        if (error.status === 404) {
                            return {
                                status: 'success',
                                message: 'Successfully connected to the Instana API.',
                                title: 'Success'
                            };
                        }
                        else if (error.status === 401) {
                            return {
                                status: 'error',
                                message: 'Unauthorized. Please verify the API Token.',
                                title: 'Error'
                            };
                        }
                        else {
                            return {
                                status: 'error',
                                message: 'Error connecting to the Instana API.',
                                title: 'Error'
                            };
                        }
                    });
                };
                InstanaDatasource.prototype.getDefaultMetricRollupDuration = function (from, to, minRollup) {
                    if (minRollup === void 0) { minRollup = 1000; }
                    // Ignoring time differences for now since small time differences
                    // can be accepted. This time is only used to calculate the rollup.
                    var now = Date.now();
                    var windowSize = to - from;
                    var availableRollupDefinitions = this.rollupDurationThresholds.filter(function (rollupDefinition) { return from >= now - rollupDefinition.availableFor; });
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
                    console.log('from ' + from + ' to ' + to + ' resulting in rollup ' +
                        JSON.stringify(this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1]));
                    return this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1];
                };
                return InstanaDatasource;
            })();
            exports_1("default", InstanaDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map