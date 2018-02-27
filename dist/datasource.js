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
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.url = instanceSettings.jsonData.url;
                    this.apiToken = instanceSettings.jsonData.apiToken;
                    this.cacheSnapshotData = {};
                    this.currentTime = function () { return new Date().getTime(); };
                }
                InstanaDatasource.prototype.registerCacheSnapshotDataCallback = function (id, callback) {
                    this.cacheSnapshotData[id] = callback;
                };
                InstanaDatasource.prototype.request = function (method, url, requestId) {
                    var options = {
                        url: this.url + url,
                        method: method,
                        requestId: requestId,
                    };
                    options.headers = {
                        Authorization: 'apiToken ' + this.apiToken,
                    };
                    return this.backendSrv.datasourceRequest(options);
                };
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (Object.keys(options.targets[0]).length === 0)
                        return this.$q.resolve({ data: [] });
                    // Convert ISO 8601 timestamps to millis.
                    var fromInMs = new Date(options.range.from).getTime();
                    var toInMs = new Date(options.range.to).getTime();
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        // For every target, fetch snapshots that in the selected timeframe that satisfy the lucene query.
                        return _this.fetchSnapshotsForTarget(target, fromInMs, toInMs)
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
                            if (_this.lastFetchedFromAPI)
                                _this.cacheSnapshotData[targetWithSnapshots.target.refId](_this.buildQuery(targetWithSnapshots.target), { time: toInMs, snapshots: targetWithSnapshots.snapshots });
                            return _this.$q.all(lodash_1.default.map(targetWithSnapshots.snapshots, function (snapshot) {
                                // ...fetch the metric data for every snapshot in the results.
                                return _this.fetchMetricsForSnapshot(snapshot.snapshotId, targetWithSnapshots.target.metric.key, fromInMs, toInMs)
                                    .then(function (response) {
                                    var result = {
                                        'target': snapshot.label,
                                        'datapoints': lodash_1.default.map(response.data.values, function (value) { return [value.value, value.timestamp]; })
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
                InstanaDatasource.prototype.fetchSnapshotsForTarget = function (target, from, to) {
                    var _this = this;
                    var query = this.buildQuery(target);
                    if (target.snapshotCache && lodash_1.default.includes(Object.keys(target.snapshotCache), query) && this.currentTime() - target.snapshotCache[query].time < this.CACHE_MAX_AGE) {
                        this.lastFetchedFromAPI = false;
                        return this.$q.resolve(target.snapshotCache[query].snapshots);
                    }
                    this.lastFetchedFromAPI = true;
                    var fetchSnapshotsUrl = '/api/snapshots?from=' + from + '&to=' + to + '&q=' + query;
                    var fetchSnapshotContextsUrl = '/api/snapshots/context?q=' + encodeURIComponent(target.entityQuery + ' AND entity.pluginId:' + target.entityType) + '&time=' + to;
                    return this.$q.all([this.request('GET', fetchSnapshotsUrl), this.request('GET', fetchSnapshotContextsUrl)]).then(function (snapshotsWithContextsResponse) {
                        return _this.$q.all(lodash_1.default.map(snapshotsWithContextsResponse[0].data, function (snapshotId) {
                            var fetchSnapshotUrl = '/api/snapshots/' + snapshotId + '?time=' + to;
                            return _this.request('GET', fetchSnapshotUrl).then(function (snapshotResponse) {
                                return {
                                    'snapshotId': snapshotId,
                                    'label': snapshotResponse.data.label + _this.getHostSuffix(snapshotsWithContextsResponse[1].data, snapshotId)
                                };
                            });
                        }));
                    });
                };
                InstanaDatasource.prototype.buildQuery = function (target) {
                    return encodeURIComponent(target.entityQuery + ' AND entity.pluginId:' + target.entityType);
                };
                InstanaDatasource.prototype.getHostSuffix = function (contexts, snapshotId) {
                    var host = lodash_1.default.find(contexts, function (context) { return context.snapshotId == snapshotId; }).host;
                    if (!host)
                        return '';
                    return ' (on host "' + host + '")';
                };
                InstanaDatasource.prototype.fetchMetricsForSnapshot = function (snapshotId, metric, from, to) {
                    var rollup = this.getDefaultMetricRollupDuration(from, to).rollup;
                    var url = '/api/metrics?metric=' + metric + '&from=' + from + '&to=' + to + '&rollup=' + rollup + '&snapshotId=' + snapshotId;
                    return this.request('GET', url);
                };
                InstanaDatasource.prototype.annotationQuery = function (options) {
                    throw new Error("Annotation Support not implemented yet.");
                };
                InstanaDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error("Template Variable Support not implemented yet.");
                };
                InstanaDatasource.prototype.testDatasource = function () {
                    return this.request('GET', '/api/snapshots/non-existing-snapshot-id?time=0')
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
                    return this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1];
                };
                return InstanaDatasource;
            })();
            exports_1("default", InstanaDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map