System.register(['./datasource_infrastructure', './datasource_website', './datasource_abstract', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_infrastructure_1, datasource_website_1, datasource_abstract_1, lodash_1;
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
                    this.timeFilter = {
                        to: this.currentTime(),
                        windowSize: 3600
                    };
                }
                InstanaDatasource.prototype.query = function (options) {
                    var _this = this;
                    this.timeFilter.from = options.range.from.valueOf();
                    this.timeFilter.to = options.range.to.valueOf();
                    this.timeFilter.windowSize = this.timeFilter.to - this.timeFilter.from;
                    if (Object.keys(options.targets[0]).length === 0) {
                        return this.$q.resolve({ data: [] });
                    }
                    return this.$q.all(lodash_1.default.map(options.targets, function (target) {
                        if (target.metricCategory === _this.WEBSITE_METRICS) {
                            return _this.getWebsiteMetrics(target);
                        }
                        else {
                            return _this.getInfrastructureMetrics(target);
                        }
                    })).then(function (results) {
                        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
                        return { data: [].concat.apply([], results) };
                    });
                };
                InstanaDatasource.prototype.getInfrastructureMetrics = function (target) {
                    var _this = this;
                    // do not try to retrieve data without selected metric
                    if (!target.metric) {
                        return this.$q.resolve({ data: [] });
                    }
                    // For every target, fetch snapshots that in the selected timeframe that satisfy the lucene query.
                    return this.infrastructure.fetchSnapshotsForTarget(target, this.timeFilter)
                        .then(function (snapshots) {
                        return _this.infrastructure.getMetricsForTarget(target, snapshots, _this.timeFilter);
                    });
                };
                InstanaDatasource.prototype.getWebsiteMetrics = function (target) {
                    return this.website.fetchMetricsForEntity(target, this.timeFilter).then(function (response) {
                        // as we map two times we need to flatten the result
                        return lodash_1.default.flatten(response.data.items.map(function (item) {
                            return lodash_1.default.map(item.metrics, function (value, key) {
                                return {
                                    'target': item.name.replace(/"/g, '') + ' (' + target.entity.key + ') - ' + key,
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
                return InstanaDatasource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map