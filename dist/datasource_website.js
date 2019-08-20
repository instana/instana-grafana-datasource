System.register(['./datasource_abstract', './cache', 'lodash', "./util/analyze_util"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, cache_1, lodash_1, analyze_util_1;
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
            },
            function (analyze_util_1_1) {
                analyze_util_1 = analyze_util_1_1;
            }],
        execute: function() {
            InstanaWebsiteDataSource = (function (_super) {
                __extends(InstanaWebsiteDataSource, _super);
                /** @ngInject */
                function InstanaWebsiteDataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    // our ui is limited to 80 results, same logic to stay comparable
                    this.maximumNumberOfUsefulDataPoints = 80;
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
                        },
                        pagination: {
                            ingestionTime: 0,
                            offset: 0,
                            retrievalSize: 200
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
                            'beaconTypes': entry.beaconTypes ? entry.beaconTypes : ['pageLoad', 'resourceLoad', 'httpRequest', 'error']
                        }); });
                    });
                    this.simpleCache.put('websiteCatalog', websiteCatalog);
                    return websiteCatalog;
                };
                InstanaWebsiteDataSource.prototype.fetchMetricsForWebsite = function (target, timeFilter) {
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
                            tagFilters.push(analyze_util_1.createTagFilter(filter));
                        }
                    });
                    var metric = {
                        metric: target.metric.key,
                        aggregation: target.aggregation ? target.aggregation : 'SUM'
                    };
                    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") {
                        if (!target.timeInterval) {
                            target.timeInterval = analyze_util_1.getChartGranularity(windowSize, this.maximumNumberOfUsefulDataPoints);
                        }
                        metric['granularity'] = target.timeInterval.value;
                    }
                    var group = {
                        groupbyTag: target.group.key
                    };
                    if (target.group.key === "beacon.meta" && target.groupbyTagSecondLevelKey) {
                        group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
                    }
                    var data = {
                        group: group,
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        tagFilters: tagFilters,
                        type: target.entityType.key,
                        metrics: [metric]
                    };
                    return this.postRequest('/api/website-monitoring/analyze/beacon-groups?fillTimeSeries=true', data);
                };
                InstanaWebsiteDataSource.prototype.buildWebsiteLabel = function (target, item, key, index) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', item.name);
                        label = lodash_1.default.replace(label, '$website', target.entity.label);
                        label = lodash_1.default.replace(label, '$type', target.entityType.label);
                        label = lodash_1.default.replace(label, '$metric', target.metric.label);
                        label = lodash_1.default.replace(label, '$key', key);
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        item.name + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
                        :
                            item.name + ' (' + target.entity.label + ')' + ' - ' + key;
                };
                return InstanaWebsiteDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaWebsiteDataSource);
        }
    }
});
//# sourceMappingURL=datasource_website.js.map