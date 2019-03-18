System.register(['./datasource_abstract', './cache', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, cache_1, lodash_1;
    var InstanaWebsiteDataSource;
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
            InstanaWebsiteDataSource = (function (_super) {
                __extends(InstanaWebsiteDataSource, _super);
                /** @ngInject */
                function InstanaWebsiteDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    // our ui is limited to 80 results, same logic to stay comparable
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
                    this.websitesCache = new cache_1.default();
                }
                InstanaWebsiteDataSource.prototype.getWebsites = function (timeFilter) {
                    var key = this.getTimeKey(timeFilter);
                    var websites = this.websitesCache.get(key);
                    if (websites) {
                        return websites;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var data = {
                        group: {
                            groupbyTag: 'beacon.website.name'
                        },
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        type: 'PAGELOAD',
                        metrics: [{
                                metric: 'pageLoads',
                                aggregation: 'SUM'
                            }],
                        order: {
                            by: 'pageLoads',
                            direction: 'desc'
                        }
                    };
                    websites = this.postRequest('/api/website-monitoring/analyze/beacon-groups', data).then(function (websitesResponse) {
                        return websitesResponse.data.items.map(function (entry) { return ({
                            'key': entry.name,
                            'label': entry.name
                        }); });
                    });
                    this.websitesCache.put(key, websites);
                    return websites;
                };
                InstanaWebsiteDataSource.prototype.getWebsiteTags = function () {
                    var websiteTags = this.simpleCache.get('websiteTags');
                    if (websiteTags) {
                        return websiteTags;
                    }
                    websiteTags = this.doRequest('/api/website-monitoring/catalog/tags').then(function (tagsResponse) {
                        return tagsResponse.data.map(function (entry) { return ({
                            'key': entry.name,
                            'type': entry.type
                        }); });
                    });
                    this.simpleCache.put('websiteTags', websiteTags);
                    return websiteTags;
                };
                InstanaWebsiteDataSource.prototype.getWebsiteMetricsCatalog = function () {
                    var websiteCatalog = this.simpleCache.get('websiteCatalog');
                    if (websiteCatalog) {
                        return websiteCatalog;
                    }
                    websiteCatalog = this.doRequest('/api/website-monitoring/catalog/metrics').then(function (catalogResponse) {
                        return catalogResponse.data.map(function (entry) { return ({
                            'key': entry.metricId,
                            'label': entry.label,
                            'aggregations': entry.aggregations ? entry.aggregations.sort() : [],
                            'beaconTypes': entry.beaconTypes
                        }); });
                    });
                    this.simpleCache.put('websiteCatalog', websiteCatalog);
                    return websiteCatalog;
                };
                InstanaWebsiteDataSource.prototype.fetchMetricsForWebsite = function (target, timeFilter) {
                    var _this = this;
                    // avoid invalid calls
                    if (!target || !target.metric || !target.group || !target.entity) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    var windowSize = this.getWindowSize(timeFilter);
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
                    var metric = {
                        metric: target.metric.key,
                        aggregation: target.aggregation ? target.aggregation : 'SUM'
                    };
                    if (target.pluginId !== "singlestat") {
                        metric['granularity'] = this.getChartGranularity(windowSize);
                    }
                    var data = {
                        group: {
                            groupbyTag: target.group.key
                        },
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        tagFilters: tagFilters,
                        type: target.entityType.key,
                        metrics: [metric]
                    };
                    return this.postRequest('/api/website-monitoring/analyze/beacon-groups', data);
                };
                InstanaWebsiteDataSource.prototype.getChartGranularity = function (windowSize) {
                    var _this = this;
                    var granularity = this.sensibleGranularities.find(function (granularity) { return windowSize / 1000 / granularity <= _this.maximumNumberOfUsefulDataPoints; });
                    return granularity || this.sensibleGranularities[this.sensibleGranularities.length - 1];
                };
                InstanaWebsiteDataSource.prototype.createTagFilter = function (filter) {
                    var tagFilter = {
                        name: filter.tag.key,
                        operator: filter.operator.key,
                        value: filter.stringValue
                    };
                    if (this.OPERATOR_NUMBER === filter.tag.type) {
                        tagFilter.value = filter.numberValue.toString();
                    }
                    else if (this.OPERATOR_BOOLEAN === filter.tag.type) {
                        tagFilter.value = filter.booleanValue.toString();
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