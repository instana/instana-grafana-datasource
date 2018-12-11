System.register(['./rollups', 'lodash'], function(exports_1) {
    var rollups_1, lodash_1;
    var InstanaDatasource;
    return {
        setters:[
            function (rollups_1_1) {
                rollups_1 = rollups_1_1;
            },
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
                    this.rollupDurationThresholds = rollups_1.default;
                    this.MAX_NUMBER_OF_METRICS_FOR_CHARTS = 800;
                    this.CACHE_MAX_AGE = 60000;
                    this.CUSTOM_METRICS = '1';
                    this.storeInCache = function (query, data) {
                        _this.snapshotCache[query] = data;
                    };
                    this.wasLastFetchedFromApi = function () { return _this.lastFetchedFromAPI; };
                    this.setLastFetchedFromApi = function (value) { _this.lastFetchedFromAPI = value; };
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.snapshotCache = {};
                    this.catalogCache = {};
                    // 5.3+ wanted to resolve dynamic routes in proxy mode
                    var version = lodash_1.default.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');
                    var versions = lodash_1.default.split(version, '.', 2);
                    if (versions[0] >= 5 && versions[1] >= 3) {
                        this.url = instanceSettings.url + '/instana'; // to match proxy route in plugin.json
                    }
                    else {
                        this.url = instanceSettings.jsonData.url;
                        this.apiToken = instanceSettings.jsonData.apiToken;
                        console.log("No proxy mode, send request to " + this.url + " directly.");
                    }
                    this.currentTime = function () { return new Date().getTime(); };
                }
                InstanaDatasource.prototype.doRequest = function (url, maxRetries) {
                    var _this = this;
                    if (maxRetries === void 0) { maxRetries = 1; }
                    var request = {
                        method: 'GET',
                        url: this.url + url
                    };
                    if (this.apiToken) {
                        request['headers'] = { Authorization: 'apiToken ' + this.apiToken };
                    }
                    return this.backendSrv
                        .datasourceRequest(request)
                        .catch(function (error) {
                        if (maxRetries > 0) {
                            return _this.doRequest(url, maxRetries - 1);
                        }
                        throw error;
                    });
                };
                InstanaDatasource.prototype.postRequest = function (url, data, maxRetries) {
                    var _this = this;
                    if (maxRetries === void 0) { maxRetries = 0; }
                    var request = {
                        method: 'POST',
                        url: this.url + url,
                        data: data
                    };
                    if (this.apiToken) {
                        request['headers'] = { Authorization: 'apiToken ' + this.apiToken };
                    }
                    return this.backendSrv
                        .datasourceRequest(request)
                        .catch(function (error) {
                        if (maxRetries > 0) {
                            return _this.postRequest(url, data, maxRetries - 1);
                        }
                        throw error;
                    });
                };
                InstanaDatasource.prototype.getEntityTypes = function (metricCategory) {
                    var now = this.currentTime();
                    if (!this.entityTypesCache || now - this.entityTypesCache.age > this.CACHE_MAX_AGE) {
                        this.entityTypesCache = {
                            age: now,
                            entityTypes: this.doRequest('/api/infrastructure-monitoring/catalog/plugins/').then(function (typesResponse) {
                                return typesResponse.data.map(function (entry) { return ({
                                    'key': entry.plugin,
                                    'label': entry.label
                                }); });
                            })
                        };
                    }
                    return this.entityTypesCache.entityTypes;
                };
                InstanaDatasource.prototype.getMetricsCatalog = function (plugin, metricCategory) {
                    var _this = this;
                    var id = plugin + '|' + metricCategory;
                    var now = this.currentTime();
                    if (!this.catalogCache[id] || now - this.catalogCache[id].age > this.CACHE_MAX_AGE) {
                        var filter = metricCategory === this.CUSTOM_METRICS ? 'custom' : 'builtin';
                        this.catalogCache[id] = {
                            age: now,
                            metrics: this.doRequest("/api/infrastructure-monitoring/catalog/metrics/" + plugin + "?filter=" + filter).then(function (catalogResponse) {
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
                InstanaDatasource.prototype.getWebsites = function () {
                    var now = this.currentTime();
                    if (!this.websitesCache || now - this.websitesCache.age > this.CACHE_MAX_AGE) {
                        var data = {
                            group: {
                                groupbyTag: "beacon.website.name"
                            },
                            order: {
                                by: "pageLoads",
                                direction: "desc"
                            },
                            metrics: [{
                                    metric: "pageLoads",
                                    aggregation: "sum"
                                }]
                        };
                        this.websitesCache = {
                            age: now,
                            websites: this.postRequest('/api/website-monitoring/analyze/beacon-groups', data).then(function (websitesResponse) {
                                return websitesResponse.items.map(function (entry) { return ({
                                    'key': entry.name,
                                    'label': entry.name
                                }); });
                            })
                        };
                    }
                    return this.websitesCache.websites;
                };
                InstanaDatasource.prototype.getWebsiteTags = function () {
                    var now = this.currentTime();
                    if (!this.websiteTagsCache || now - this.websiteTagsCache.age > this.CACHE_MAX_AGE) {
                        this.websiteTagsCache = {
                            age: now,
                            tags: this.doRequest('/api/website-monitoring/catalog/tags').then(function (tagsResponse) {
                                return tagsResponse.data.map(function (entry) { return ({
                                    'key': entry.name,
                                    'type': entry.type
                                }); });
                            })
                        };
                    }
                    return this.websiteTagsCache.tags;
                };
                InstanaDatasource.prototype.getWebsiteMetricsCatalog = function (plugin, metricCategory) {
                    var _this = this;
                    var id = plugin + '|' + metricCategory;
                    var now = this.currentTime();
                    if (!this.catalogCache[id] || now - this.catalogCache[id].age > this.CACHE_MAX_AGE) {
                        var filter = metricCategory === this.CUSTOM_METRICS ? 'custom' : 'builtin';
                        this.catalogCache[id] = {
                            age: now,
                            metrics: this.doRequest("/api/infrastructure-monitoring/catalog/metrics/" + plugin + "?filter=" + filter).then(function (catalogResponse) {
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
                                        'target': _this.buildLabel(snapshot.response, snapshot.host, targetWithSnapshots.target),
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
                    // as long no timewindow was adjusted for newly created dashboards (now-6h)
                    var timeQuery = (this.fromFilter && this.toFilter) ?
                        "&from=" + this.fromFilter + "&to=" + this.toFilter :
                        "&time=" + Date.now();
                    var fetchSnapshotTypesUrl = "/api/snapshots/types" +
                        ("?q=" + encodeURIComponent(target.entityQuery)) +
                        ("" + timeQuery) +
                        "&newApplicationModelEnabled=true";
                    return this.doRequest(fetchSnapshotTypesUrl);
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
                InstanaDatasource.prototype.reduceSnapshot = function (snapshotResponse) {
                    // reduce data to used label formatting values
                    snapshotResponse.data = lodash_1.default.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
                    return snapshotResponse;
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
                InstanaDatasource.prototype.getHostSuffix = function (host) {
                    if (host) {
                        return ' (on host "' + host + '")';
                    }
                    return '';
                };
                InstanaDatasource.prototype.fetchMetricsForSnapshot = function (snapshotId, metric, from, to) {
                    var rollup = this.getDefaultMetricRollupDuration(from, to).rollup;
                    var url = "/api/metrics?metric=" + metric + "&from=" + from + "&to=" + to + "&rollup=" + rollup + "&snapshotId=" + snapshotId;
                    return this.doRequest(url);
                };
                InstanaDatasource.prototype.annotationQuery = function (options) {
                    throw new Error('Annotation Support not implemented yet.');
                };
                InstanaDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error('Template Variable Support not implemented yet.');
                };
                InstanaDatasource.prototype.testDatasource = function () {
                    return this.doRequest('/api/snapshots/non-existing-snapshot-id?time=0')
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