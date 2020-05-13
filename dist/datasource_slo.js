System.register(["./datasource_abstract", './cache', "lodash"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_abstract_1, cache_1, lodash_1;
    var InstanaSLODataSource;
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
            InstanaSLODataSource = (function (_super) {
                __extends(InstanaSLODataSource, _super);
                /** @ngInject */
                function InstanaSLODataSource(instanceSettings, backendSrv, templateSrv, $q) {
                    _super.call(this, instanceSettings, backendSrv, templateSrv, $q);
                    this.sloCache = new cache_1.default();
                }
                InstanaSLODataSource.prototype.getConfiguredSLOs = function (target, timeFilter) {
                    var url = '/api/settings/sli';
                    return this.doRequest(url).then(function (response) {
                        return lodash_1.default.map(response.data, function (r, index) {
                            return {
                                'key': r.id,
                                'label': r.sliName
                            };
                        });
                    });
                };
                InstanaSLODataSource.prototype.fetchSLOReport = function (target, timeFilter) {
                    var _this = this;
                    //avoid involid calls
                    if (!target || !target.sloReport || !target.sloReport.key || !target.sloSpecific || !target.sloSpecific.key || !target.sloValue) {
                        return this.$q.resolve({ data: { items: [] } });
                    }
                    var url = '/api/sli/report/' + target.sloReport.key + '?from=' + timeFilter.from + '&to=' + timeFilter.to + '&slo=' + target.sloValue;
                    return this.doRequest(url).then(function (response) {
                        return _this.extractSpecificValueFromSLI(target, response.data, target.sloSpecific, timeFilter);
                    });
                };
                InstanaSLODataSource.prototype.extractSpecificValueFromSLI = function (target, sliResult, sloSpecific, timeFilter) {
                    if (sloSpecific.key === 'SLI') {
                        return [this.createTarget(sloSpecific.label, this.buildResultArray(sliResult.sli), target.refId)];
                    }
                    else if (sloSpecific.key === 'Remaining Error Budget') {
                        return [this.createTarget(sloSpecific.label, this.buildResultArray(sliResult.errorBudgetRemaining), target.refId)];
                    }
                    else if (sloSpecific.key === 'Timeseries') {
                        return [this.splitAndPopulate(target, sliResult.violationDistribution, timeFilter)];
                    }
                    return this.$q.resolve({ data: { items: [] } });
                };
                InstanaSLODataSource.prototype.buildResultArray = function (result) {
                    return [[result, Date.now()]];
                };
                InstanaSLODataSource.prototype.splitAndPopulate = function (target, series, timeFilter) {
                    var greens = [];
                    var reds = [];
                    var greys = [];
                    var granularity = this.getWindowSize(timeFilter) / Object.keys(series).length;
                    lodash_1.default.forEach(series, function (value, index) {
                        if (value === 1) {
                            greens.push([1, timeFilter.from + (index * granularity)]);
                        }
                        else if (value === 0) {
                            greys.push([1, timeFilter.from + (index * granularity)]);
                        }
                        else if (value === -1) {
                            reds.push([1, timeFilter.from + (index * granularity)]);
                        }
                    });
                    var result = [];
                    result.push(this.createTarget("No violation", greens, target.refId));
                    result.push(this.createTarget("Violation", reds, target.refId));
                    result.push(this.createTarget("No data", greys, target.refId));
                    return result;
                };
                InstanaSLODataSource.prototype.createTarget = function (target, datapoints, refId) {
                    return {
                        'target': target,
                        'datapoints': datapoints,
                        'refId': refId
                    };
                };
                return InstanaSLODataSource;
            })(datasource_abstract_1.default);
            exports_1("default", InstanaSLODataSource);
        }
    }
});
//# sourceMappingURL=datasource_slo.js.map