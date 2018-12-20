System.register(['./datasource_abstract', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, lodash_1;
    var InstanaWebsiteDataSource;
    return {
        setters:[
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            InstanaWebsiteDataSource = (function (_super) {
                __extends(InstanaWebsiteDataSource, _super);
                /** @ngInject */
                function InstanaWebsiteDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.MAX_NUMBER_OF_RESULTS = 600;
                    this.OPERATOR_NUMBER = 'NUMBER';
                    this.OPERATOR_BOOLEAN = 'BOOLEAN';
                }
                InstanaWebsiteDataSource.prototype.getWebsites = function (timeFilter) {
                    var now = this.currentTime();
                    var windowSize = this.getWindowSize(timeFilter);
                    if (!this.websitesCache ||
                        timeFilter.to - this.websitesCache.time > this.CACHE_MAX_AGE ||
                        now - this.websitesCache.age > this.CACHE_MAX_AGE) {
                        var data = {
                            group: {
                                groupbyTag: 'beacon.website.name'
                            },
                            timeFrame: {
                                to: timeFilter.to,
                                windowSize: windowSize
                            },
                            order: {
                                by: 'pageLoads',
                                direction: "desc"
                            },
                            metrics: [{
                                    metric: 'pageLoads',
                                    aggregation: 'sum'
                                }]
                        };
                        this.websitesCache = {
                            time: timeFilter.to,
                            age: now,
                            websites: this.postRequest('/api/website-monitoring/analyze/beacon-groups', data).then(function (websitesResponse) {
                                return websitesResponse.data.items.map(function (entry) { return ({
                                    'key': entry.name.replace(/"/g, ''),
                                    'label': entry.name.replace(/"/g, '') // TODO FIXME in API
                                }); });
                            })
                        };
                    }
                    return this.websitesCache.websites;
                };
                InstanaWebsiteDataSource.prototype.getWebsiteTags = function () {
                    var now = this.currentTime();
                    if (!this.websiteTagsCache || now - this.websiteTagsCache.age > this.CACHE_MAX_AGE) {
                        this.websiteTagsCache = {
                            age: now,
                            tags: this.doRequest('/api/website-monitoring/catalog/tags').then(function (tagsResponse) {
                                return tagsResponse.data.map(function (entry) { return ({
                                    'key': entry.name,
                                    'type': entry.type
                                }); });
                            }),
                        };
                    }
                    return this.websiteTagsCache.tags;
                };
                InstanaWebsiteDataSource.prototype.getWebsiteMetricsCatalog = function () {
                    var now = this.currentTime();
                    if (!this.websiteCatalogCache || now - this.websiteCatalogCache.age > this.CACHE_MAX_AGE) {
                        this.websiteCatalogCache = {
                            age: now,
                            metrics: this.doRequest('/api/website-monitoring/catalog/metrics').then(function (catalogResponse) {
                                return catalogResponse.data.map(function (entry) { return ({
                                    'key': entry.metricId,
                                    'label': entry.label,
                                    'entityType': 'website'
                                }); });
                            })
                        };
                    }
                    return this.websiteCatalogCache.metrics;
                };
                InstanaWebsiteDataSource.prototype.fetchMetricsForEntity = function (target, timeFilter) {
                    var _this = this;
                    // avoid invalid calls
                    if (!target || !target.metric || !target.group || !target.entity) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    // new api is limited to MAX_NUMBER_OF_RESULTS results
                    var windowSize = this.getWindowSize(timeFilter);
                    var bestGuess = lodash_1.default.toInteger(windowSize / 1000 / this.MAX_NUMBER_OF_RESULTS);
                    var granularity = bestGuess < 1 ? 1 : bestGuess; // must be at least a second
                    var tagFilters = [{
                            name: 'beacon.website.name',
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
                                aggregation: 'sum',
                                granularity: granularity
                            }]
                    };
                    return this.postRequest('/api/website-monitoring/analyze/beacon-groups', data);
                };
                InstanaWebsiteDataSource.prototype.createTagFilter = function (filter) {
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
                return InstanaWebsiteDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaWebsiteDataSource);
        }
    }
});
//# sourceMappingURL=datasource_website.js.map