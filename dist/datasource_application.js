System.register(["./util/rollup_granularity_util", './datasource_abstract', "./util/analyze_util", './cache', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var rollup_granularity_util_1, datasource_abstract_1, analyze_util_1, cache_1, lodash_1;
    var InstanaApplicationDataSource;
    return {
        setters:[
            function (rollup_granularity_util_1_1) {
                rollup_granularity_util_1 = rollup_granularity_util_1_1;
            },
            function (datasource_abstract_1_1) {
                datasource_abstract_1 = datasource_abstract_1_1;
            },
            function (analyze_util_1_1) {
                analyze_util_1 = analyze_util_1_1;
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
                    // our ui is limited to 80 results, same logic to stay comparable
                    this.maximumNumberOfUsefulDataPoints = 80;
                    // duplicate to QueryCtrl.ALL_APPLICATIONS
                    this.ALL_APPLICATIONS = '-- No Application Filter --';
                    this.applicationsCache = new cache_1.default();
                }
                InstanaApplicationDataSource.prototype.getApplications = function (timeFilter) {
                    var key = this.getTimeKey(timeFilter);
                    var applications = this.applicationsCache.get(key);
                    if (applications) {
                        return applications;
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var page = 1;
                    var pageSize = 200;
                    applications = this.paginateApplications([], windowSize, timeFilter.to, page, pageSize, this.PAGINATION_LIMIT).then(function (response) {
                        var allResults = lodash_1.default.flattenDeep(lodash_1.default.map(response, function (pageSet, index) {
                            return pageSet.items;
                        }));
                        return allResults.map(function (entry) {
                            return {
                                'key': entry.id,
                                'label': entry.label
                            };
                        });
                    });
                    this.applicationsCache.put(key, applications, 600000);
                    return applications;
                };
                InstanaApplicationDataSource.prototype.paginateApplications = function (results, windowSize, to, page, pageSize, pageLimit) {
                    var _this = this;
                    if (page > pageLimit) {
                        return results;
                    }
                    var queryParameters = "windowSize=" + windowSize
                        + "&to=" + to
                        + "&page=" + page
                        + "&pageSize=" + pageSize;
                    return this.doRequest('/api/application-monitoring/applications?' + queryParameters).then(function (response) {
                        results.push(response.data);
                        if (page * pageSize < response.data.totalHits) {
                            page++;
                            return _this.paginateApplications(results, windowSize, to, page, pageSize, pageLimit);
                        }
                        else {
                            return results;
                        }
                    });
                };
                InstanaApplicationDataSource.prototype.getApplicationTags = function () {
                    var applicationTags = this.simpleCache.get('applicationTags');
                    if (applicationTags) {
                        return applicationTags;
                    }
                    applicationTags = this.doRequest('/api/application-monitoring/catalog/tags').then(function (tagsResponse) {
                        return tagsResponse.data.map(function (entry) { return ({
                            'key': entry.name,
                            'type': entry.type,
                            'canApplyToSource': entry.canApplyToSource,
                            'canApplyToDestination': entry.canApplyToDestination
                        }); });
                    });
                    this.simpleCache.put('applicationTags', applicationTags);
                    return applicationTags;
                };
                InstanaApplicationDataSource.prototype.getApplicationMetricsCatalog = function () {
                    var applicationCatalog = this.simpleCache.get('applicationCatalog');
                    if (applicationCatalog) {
                        return applicationCatalog;
                    }
                    applicationCatalog = this.doRequest('/api/application-monitoring/catalog/metrics').then(function (catalogResponse) {
                        return catalogResponse.data.map(function (entry) { return ({
                            'key': entry.metricId,
                            'label': entry.label,
                            'aggregations': entry.aggregations ? entry.aggregations.sort() : []
                        }); });
                    }).then(function (catalogResponse) {
                        // not all metrics in the metric catalog are working right now, so it is hard coded and manually set. Might be needless in the future
                        var hardCodedResponse = [
                            { key: "calls", label: "Call count", aggregations: ["SUM"] },
                            { key: "latency", label: "Call latency", aggregations: ["MAX", "MEAN", "MIN", "P25", "P50", "P75", "P90", "P95", "P98", "P99"] },
                            { key: "errors", label: "Error rate", aggregations: ["MEAN"] },
                            { key: "services", label: "Service Count", aggregations: ["DISTINCT_COUNT"] },
                        ];
                        return hardCodedResponse;
                    });
                    this.simpleCache.put('applicationCatalog', applicationCatalog);
                    return applicationCatalog;
                };
                InstanaApplicationDataSource.prototype.fetchAnalyzeMetricsForApplication = function (target, timeFilter) {
                    var _this = this;
                    // avoid invalid calls
                    if (!target || !target.metric || !target.group || !target.entity) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var tagFilters = [];
                    return Promise.resolve(this.getApplicationTags()).then(function (applicationTags) {
                        if (target.entity.key) {
                            tagFilters.push({
                                name: 'application.name',
                                operator: 'EQUALS',
                                value: target.entity.label,
                                entity: target.applicationCallToEntity ? target.applicationCallToEntity.key : 'DESTINATION'
                            });
                        }
                        lodash_1.default.forEach(target.filters, function (filter) {
                            if (filter.isValid) {
                                var tagFilter = analyze_util_1.createTagFilter(filter);
                                var tag_1 = lodash_1.default.find(applicationTags, ['key', filter.tag.key]);
                                if (tag_1.canApplyToDestination || tag_1.canApplyToSource) {
                                    tagFilter['entity'] = _this.getTagEntity(filter.entity, tag_1);
                                }
                                tagFilters.push(tagFilter);
                            }
                        });
                        var metric = {
                            metric: target.metric.key,
                            aggregation: target.aggregation ? target.aggregation : 'SUM'
                        };
                        if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") {
                            if (!target.timeInterval) {
                                target.timeInterval = rollup_granularity_util_1.getDefaultChartGranularity(windowSize);
                            }
                            metric['granularity'] = target.timeInterval.key;
                        }
                        var group = {
                            groupbyTag: target.group.key
                        };
                        var tag = lodash_1.default.find(applicationTags, ['key', target.group.key]);
                        if (tag.canApplyToDestination || tag.canApplyToSource) {
                            group['groupbyTagEntity'] = _this.getTagEntity(target.group, tag);
                        }
                        if (target.group.type === "KEY_VALUE_PAIR" && target.groupbyTagSecondLevelKey) {
                            group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
                        }
                        var data = {
                            group: group,
                            timeFrame: {
                                to: timeFilter.to,
                                windowSize: windowSize
                            },
                            tagFilters: tagFilters,
                            metrics: [metric]
                        };
                        return _this.postRequest('/api/application-monitoring/analyze/call-groups?fillTimeSeries=true', data);
                    });
                };
                InstanaApplicationDataSource.prototype.getTagEntity = function (selectedEntity, tag) {
                    if (selectedEntity && selectedEntity.key === 'DESTINATION' && tag.canApplyToDestination) {
                        return 'DESTINATION';
                    }
                    if (selectedEntity && selectedEntity.key === 'SOURCE' && tag.canApplyToSource) {
                        return 'SOURCE';
                    }
                    return tag.canApplyToDestination ? 'DESTINATION' : 'SOURCE';
                };
                InstanaApplicationDataSource.prototype.fetchApplicationMetrics = function (target, timeFilter) {
                    // avoid invalid calls
                    if (!target || !target.metric) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    var windowSize = this.getWindowSize(timeFilter);
                    var metric = {
                        metric: target.metric.key,
                        aggregation: target.aggregation ? target.aggregation : 'SUM',
                    };
                    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") {
                        if (!target.timeInterval) {
                            target.timeInterval = rollup_granularity_util_1.getDefaultChartGranularity(windowSize);
                        }
                        metric['granularity'] = target.timeInterval.key;
                    }
                    var data = {
                        timeFrame: {
                            to: timeFilter.to,
                            windowSize: windowSize
                        },
                        metrics: [metric]
                    };
                    if (target.entity.key !== null) {
                        data['applicationId'] = target.entity.key;
                    }
                    return this.postRequest('/api/application-monitoring/metrics/applications?fillTimeSeries=true', data);
                };
                InstanaApplicationDataSource.prototype.buildAnalyzeApplicationLabel = function (target, item, key, index) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', item.name);
                        label = lodash_1.default.replace(label, '$application', target.entity.label);
                        label = lodash_1.default.replace(label, '$metric', target.metric.label);
                        label = lodash_1.default.replace(label, '$key', key);
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    if (target.entity.label === this.ALL_APPLICATIONS) {
                        return target.timeShift ? item.name + ' - ' + key + " - " + target.timeShift : item.name + ' - ' + key;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        item.name + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
                        :
                            item.name + ' (' + target.entity.label + ')' + ' - ' + key;
                };
                InstanaApplicationDataSource.prototype.buildApplicationMetricLabel = function (target, item, key, index) {
                    if (target.labelFormat) {
                        var label = target.labelFormat;
                        label = lodash_1.default.replace(label, '$label', item.application.label);
                        label = lodash_1.default.replace(label, '$application', target.entity.label);
                        label = lodash_1.default.replace(label, '$metric', target.metric.label);
                        label = lodash_1.default.replace(label, '$key', key);
                        label = lodash_1.default.replace(label, '$index', index + 1);
                        label = lodash_1.default.replace(label, '$timeShift', target.timeShift);
                        return label;
                    }
                    if (target.entity.label === this.ALL_APPLICATIONS) {
                        return target.timeShift ? item.application.label + ' - ' + key + " - " + target.timeShift : item.application.label + ' - ' + key;
                    }
                    return target.timeShift && target.timeShiftIsValid ?
                        item.application.label + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
                        :
                            item.application.label + ' (' + target.entity.label + ')' + ' - ' + key;
                };
                return InstanaApplicationDataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaApplicationDataSource);
        }
    }
});
//# sourceMappingURL=datasource_application.js.map
