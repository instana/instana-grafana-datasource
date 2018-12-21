System.register(['./datasource_infrastructure', './datasource_website', './datasource_abstract', './migration', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_infrastructure_1, datasource_website_1, datasource_abstract_1, migration_1, lodash_1;
    var InstanaDatasource;
    return {
        setters:[
            function (datasource_infrastructure_1_1) {
                datasource_infrastructure_1 = datasource_infrastructure_1_1;
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
            }],
        execute: function() {
            InstanaDatasource = (function (_super) {
                __extends(InstanaDatasource, _super);
                /** @ngInject */
                function InstanaDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.CUSTOM_METRICS = '1';
                    this.WEBSITE_METRICS = '3';
                    this.infrastructure = new datasource_infrastructure_1.default(instanceSettings, backendSrv, templateSrv, $q);
                    this.website = new datasource_website_1.default(instanceSettings, backendSrv, templateSrv, $q);
                }
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (Object.keys(options.targets[0]).length === 0) {
                        return this.$q.resolve({ data: [] });
                    }
                    var timeFilter = this.readTime(options);
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        // target migration for downwards compability
                        migration_1.default(target);
                        if (target.metricCategory === _this.WEBSITE_METRICS) {
                            return _this.getWebsiteMetrics(target, timeFilter);
                        }
                        else {
                            return _this.getInfrastructureMetrics(target, timeFilter);
                        }
                    })).then(function (results) {
                        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
                        return { data: [].concat.apply([], results) };
                    });
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
                InstanaDatasource.prototype.getInfrastructureMetrics = function (target, timeFilter) {
                    var _this = this;
                    // do not try to retrieve data without selected metric
                    if (!target.metric) {
                        return this.$q.resolve({ data: [] });
                    }
                    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
                    return this.infrastructure.fetchSnapshotsForTarget(target, timeFilter).then(function (snapshots) {
                        return _this.infrastructure.fetchMetricsForSnapshots(target, snapshots, timeFilter);
                    });
                };
                InstanaDatasource.prototype.getWebsiteMetrics = function (target, timeFilter) {
                    return this.website.fetchMetricsForEntity(target, timeFilter).then(function (response) {
                        // as we map two times we need to flatten the result
                        return lodash_1.default.flatten(response.data.items.map(function (item) {
                            return lodash_1.default.map(item.metrics, function (value, key) {
                                return {
                                    'target': item.name + ' (' + target.entity.key + ') - ' + key,
                                    'datapoints': lodash_1.default.map(value, function (metric) { return [metric[1], metric[0]]; })
                                };
                            });
                        }));
                    });
                };
                InstanaDatasource.prototype.annotationQuery = function (options) {
                    throw new Error('Annotation Support not implemented yet.');
                };
                InstanaDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error('Template Variable Support not implemented yet.');
                };
                InstanaDatasource.prototype.testDatasource = function () {
                    return this.doRequest('/api/snapshots/non-existing-snapshot-id?time=0').then(
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
                return InstanaDatasource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map