System.register(['./datasource_abstract', './cache', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, cache_1, lodash_1;
    var InstanaApplicationDataSource;
    return {
        setters:[
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (cache_1_1) {
                cache_1 = cache_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaApplicationDataSource = (function (_super) {
                __extends(InstanaApplicationDataSource, _super);
                /** @ngInject */
                function InstanaApplicationDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.maximumNumberOfUsefulDataPoints = 80;
                    this.sensibleGranularities = [
                        1,
                        5,
                        10,
                        60,
                        5 * 60,
                        10 * 60,
                        60 * 60,
                        5 * 60 * 60,
                        10 * 60 * 60,
                        24 * 60 * 60,
                        5 * 24 * 60 * 60,
                        10 * 24 * 60 * 60
                    ];
                    this.OPERATOR_NUMBER = 'NUMBER';
                    this.OPERATOR_BOOLEAN = 'BOOLEAN';
                    this.applicationsCache = new cache_1.default();
                }
                InstanaApplicationDataSource.prototype.getApplications = function (timeFilter) {
                    var key = this.getTimeKey(timeFilter);
                    var applications = this.applicationsCache.get(key);
                    if (applications) {
                        return applications;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var data = {
                        group: {
                            groupbyTag: 'application.name'
                        },
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        order: {
                            by: 'something',
                            direction: "desc"
                        },
                        metrics: [{
                                metric: 'calls',
                                aggregation: 'SUM'
                            }]
                    };
                    applications = this.postRequest('/api/application-monitoring/analyze/call-groups', data).then(function (applicationsResponse) {
                        return applicationsResponse.data.items.map(function (entry) { return ({
                            'key': entry.name,
                            'label': entry.name
                        }); });
                    });
                    this.applicationsCache.put(key, applications);
                    return applications;
                };
                InstanaApplicationDataSource.prototype.getApplicastionTags = function () {
                    var now = this.currentTime();
                    if (!this.applicationTagsCache || now - this.applicationTagsCache.age > this.CACHE_MAX_AGE) {
                        this.applicationTagsCache = {
                            age: now,
                            tags: this.doRequest('/api/application-monitoring/catalog/tags').then(function (tagsResponse) {
                                return tagsResponse.data.map(function (entry) { return ({
                                    'key': entry.name,
                                    'type': entry.type
                                }); });
                            }),
                        };
                    }
                    return this.applicationTagsCache.tags;
                };
                InstanaApplicationDataSource.prototype.getApplicationMetricsCatalog = function () {
                    var now = this.currentTime();
                    if (!this.applicationCatalogCache || now - this.applicationCatalogCache.age > this.CACHE_MAX_AGE) {
                        this.applicationCatalogCache = {
                            age: now,
                            metrics: this.doRequest('/api/application-monitoring/catalog/metrics').then(function (catalogResponse) {
                                return catalogResponse.data.map(function (entry) { return ({
                                    'key': entry.metricId,
                                    'label': entry.label,
                                    'aggregations': entry.aggregations ? entry.aggregations.sort() : []
                                }); });
                            })
                        };
                    }
                    return this.applicationCatalogCache.metrics;
                };
                InstanaApplicationDataSource.prototype.fetchMetricsForApplication = function (target, timeFilter) {
                    var _this = this;
                    // avoid invalid calls
                    if (!target || !target.metric || !target.group || !target.entity) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    // our is limited to maximumNumberOfUsefulDataPoints results, to stay comparable
                    var windowSize = this.getWindowSize(timeFilter);
                    var granularity = this.getChartGranularity(windowSize);
                    var tagFilters = [{
                            name: 'application.name',
                            operator: 'EQUALS',
                            value: target.entity.key
                        }];
                    lodash_1.default.forEach(target.filters, function (filter) {
                        if (filter.isValid) {
                            tagFilters.push(_this.createTagFilter(filter));
                        }
                    });
                    var data = {
                        group: {
                            groupbyTag: target.group.key
                        },
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        tagFilters: tagFilters,
                        metrics: [{
                                metric: target.metric.key,
                                aggregation: target.aggregation ? target.aggregation : 'SUM',
                                granularity: granularity
                            }]
                    };
                    return this.postRequest('/api/application-monitoring/analyze/call-groups', data);
                };
                InstanaApplicationDataSource.prototype.getChartGranularity = function (windowSize) {
                    var _this = this;
                    var granularity = this.sensibleGranularities.find(function (granularity) { return windowSize / 1000 / granularity <= _this.maximumNumberOfUsefulDataPoints; });
                    return granularity || this.sensibleGranularities[this.sensibleGranularities.length - 1];
                };
                InstanaApplicationDataSource.prototype.createTagFilter = function (filter) {
                    var tagFilter = {
                        name: filter.tag.key,
                        operator: filter.operator.key,
                        value: filter.stringValue
                    };
                    if (this.OPERATOR_NUMBER === filter.tag.type) {
                        tagFilter.value = filter.numberValue;
                    }
                    else if (this.OPERATOR_BOOLEAN === filter.tag.type) {
                        tagFilter.value = filter.booleanValue;
                    }
                    return tagFilter;
                };
                return InstanaApplicationDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaApplicationDataSource);
        }
    }
});
//# sourceMappingURL=datasource_application.js.map