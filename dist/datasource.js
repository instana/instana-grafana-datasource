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
                    this.storeInCache = function (id, query, data) {
                        if (!_this.snapshotCache) {
                            _this.snapshotCache = {};
                        }
                        if (!_this.snapshotCache[id]) {
                            _this.snapshotCache[id] = {};
                        }
                        if (!_this.snapshotCache[id][query]) {
                            _this.snapshotCache[id][query] = {};
                        }
                        _this.snapshotCache[id][query] = data;
                    };
                    this.getSnapshotCache = function () { return _this.snapshotCache; };
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
                                _this.storeInCache(targetWithSnapshots.target.refId, _this.buildQuery(targetWithSnapshots.target), { time: _this.toFilter, snapshots: targetWithSnapshots.snapshots });
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
                    var url = ("/api/snapshots/types?q=" + encodeURIComponent(target.entityQuery)) +
                        ("&from=" + this.fromFilter) +
                        ("&to=" + this.toFilter) +
                        "&newApplicationModelEnabled=true";
                    return this.request('GET', url);
                };
                InstanaDatasource.prototype.fetchSnapshotsForTarget = function (target, from, to) {
                    var _this = this;
                    var query = this.buildQuery(target);
                    if (this.localCacheCopyAvailable(target, query)) {
                        this.setLastFetchedFromApi(false);
                        return this.$q.resolve(this.getSnapshotCache()[target.refId][query].snapshots);
                    }
                    this.setLastFetchedFromApi(true);
                    var fetchSnapshotsUrl = ("/api/snapshots?from=" + from + "&to=" + to + "&q=" + query + "&size=100") +
                        "&newApplicationModelEnabled=true";
                    var fetchSnapshotContextsUrl = ("/api/snapshots/context?q=" + query + "&from=" + from + "&to=" + to + "&size=100") +
                        "&newApplicationModelEnabled=true";
                    return this.$q.all([
                        this.request('GET', fetchSnapshotsUrl),
                        this.request('GET', fetchSnapshotContextsUrl)
                    ]).then(function (snapshotsWithContextsResponse) {
                        return _this.$q.all(lodash_1.default.map(snapshotsWithContextsResponse[0].data, function (snapshotId) {
                            var fetchSnapshotUrl = '/api/snapshots/' + snapshotId;
                            return _this.request('GET', fetchSnapshotUrl).then(function (snapshotResponse) {
                                return {
                                    'snapshotId': snapshotId,
                                    'label': snapshotResponse.data.label + _this.getHostSuffix(snapshotsWithContextsResponse[1].data, snapshotId)
                                };
                            });
                        }));
                    });
                };
                InstanaDatasource.prototype.localCacheCopyAvailable = function (target, query) {
                    return this.snapshotCache[target.refId] &&
                        lodash_1.default.includes(Object.keys(this.snapshotCache[target.refId]), query) &&
                        this.currentTime() - this.snapshotCache[target.refId][query].time < this.CACHE_MAX_AGE;
                };
                InstanaDatasource.prototype.buildQuery = function (target) {
                    return encodeURIComponent(target.entityQuery + " AND entity.pluginId:" + target.entityType);
                };
                InstanaDatasource.prototype.getHostSuffix = function (contexts, snapshotId) {
                    var host = lodash_1.default.find(contexts, function (context) { return context.snapshotId === snapshotId; }).host;
                    if (!host) {
                        return '';
                    }
                    return ' (on host "' + host + '")';
                };
                InstanaDatasource.prototype.fetchMetricsForSnapshot = function (snapshotId, metric, from, to) {
                    var rollup = this.getDefaultMetricRollupDuration(from, to).rollup;
                    var url = '/api/metrics?metric=' + metric + '&from=' + from + '&to=' + to + '&rollup=' + rollup + '&snapshotId=' + snapshotId;
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