///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['app/plugins/sdk', 'lodash', './css/query_editor.css!'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1, lodash_1;
    var InstanaQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (_1) {}],
        execute: function() {
            InstanaQueryCtrl = (function (_super) {
                __extends(InstanaQueryCtrl, _super);
                /** @ngInject **/
                function InstanaQueryCtrl($scope, $injector, templateSrv, backendSrv, $q) {
                    var _this = this;
                    _super.call(this, $scope, $injector);
                    this.templateSrv = templateSrv;
                    this.backendSrv = backendSrv;
                    this.$q = $q;
                    this.EMPTY_DROPDOWN_TEXT = ' - ';
                    this.BUILT_IN_METRICS = '0';
                    this.CUSTOM_METRICS = '1';
                    this.defaults = {};
                    this.target.pluginId = this.panelCtrl.pluginId;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    // on new panel creation we default the category selection to built-in
                    if (!this.target.metricCategory) {
                        this.target.metricCategory = this.BUILT_IN_METRICS;
                    }
                    this.previousMetricCategory = this.target.metricCategory;
                    if (this.target.entityQuery) {
                        this.onFilterChange(false).then(function () {
                            // built-in metrics support available metrics on a selected entity type
                            if (_this.target.entityType && _this.target.metricCategory === _this.BUILT_IN_METRICS) {
                                _this.onEntityTypeSelect(false).then(function () {
                                    if (_this.target.metric) {
                                        _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                                    }
                                });
                            }
                            // custom metrics include their entity type but can be filtered
                            if (_this.target.metricCategory === _this.CUSTOM_METRICS) {
                                _this.onMetricsFilter(false);
                                if (_this.target.metric) {
                                    _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                                }
                            }
                        });
                    }
                }
                InstanaQueryCtrl.prototype.onFilterChange = function (refresh) {
                    var _this = this;
                    if (this.target.entityQuery === '') {
                        this.selectionReset();
                        return this.$q.resolve();
                    }
                    else {

                            .then(function (response) {
                            _this.target.queryIsValid = true;
                            _this.snapshots = response.data;
                            if (_this.target.metricCategory === _this.CUSTOM_METRICS) {
                                _this.filterForCustom(refresh);
                            }
                            else if (_this.target.metricCategory === _this.BUILT_IN_METRICS) {
                                _this.filterForEntityType(refresh);
                            }
                        }, function (error) {
                            _this.target.queryIsValid = false;
                            _this.selectionReset();
                        });
                    }
                };
                InstanaQueryCtrl.prototype.onMetricCategorySelect = function () {
                    if (this.previousMetricCategory === this.target.metricCategory) {
                    }
                    else {
                        this.selectionReset();
                        this.onFilterChange(true);
                    }
                    this.previousMetricCategory = this.target.metricCategory;
                };
                InstanaQueryCtrl.prototype.filterForEntityType = function (refresh) {
                    var _this = this;
                    this.filterEntityTypes().then(function () {
                        _this.adjustEntitySelectionPlaceholder();
                        if (!lodash_1.default.find(_this.uniqueEntityTypes, ['key', _this.target.entityType])) {
                            _this.target.entityType = null; // entity selection label will be untouched
                            _this.resetMetricSelection();
                        }
                        else if (_this.target.metric && refresh) {
                            _this.panelCtrl.refresh();
                        }
                    });
                };
                InstanaQueryCtrl.prototype.filterForCustom = function (refresh) {
                    var _this = this;
                    this.datasource.getMetricsCatalog(this.target.entityType, this.CUSTOM_METRICS).then(function (customMetrics) {
                        _this.allCustomMetrics = customMetrics;
                        _this.onMetricsFilter(refresh);
                    });
                };
                InstanaQueryCtrl.prototype.filterEntityTypes = function () {
                    var _this = this;
                    return this.datasource.getEntityTypes().then(function (entityTypes) {
                        _this.uniqueEntityTypes =
                            lodash_1.default.sortBy(lodash_1.default.filter(entityTypes, function (entityType) { return _this.snapshots.find(function (type) { return type === entityType.key; }) && entityType.label != null; }), 'label');
                    });
                };
                InstanaQueryCtrl.prototype.onEntityTypeSelect = function (refresh) {
                    var _this = this;
                    return this.datasource.getMetricsCatalog(this.target.entityType, this.target.metricCategory).then(function (metrics) {
                        _this.availableMetrics =
                            lodash_1.default.sortBy(metrics, 'key');
                        _this.adjustMetricSelectionPlaceholder();
                        _this.checkMetricAndRefresh(refresh);
                    });
                };
                InstanaQueryCtrl.prototype.onMetricsFilter = function (refresh) {
                    var _this = this;
                    var filter = this.target.filter ? this.target.filter.toLowerCase() : '';
                    this.availableMetrics =
                        lodash_1.default.sortBy(lodash_1.default.filter(this.allCustomMetrics, function (metric) { return lodash_1.default.includes(_this.snapshots, metric.entityType) && metric.key.toLowerCase().includes(filter); }), 'key');
                    this.adjustMetricSelectionPlaceholder();
                    this.checkMetricAndRefresh(refresh);
                };
                InstanaQueryCtrl.prototype.checkMetricAndRefresh = function (refresh) {
                    if (this.target.metric && !lodash_1.default.includes(lodash_1.default.map(this.availableMetrics, function (m) { return m.key; }), this.target.metric.key)) {
                        this.resetMetricSelection();
                    }
                    else if (this.target.metric && refresh) {
                        this.panelCtrl.refresh();
                    }
                };
                InstanaQueryCtrl.prototype.selectionReset = function () {
                    this.uniqueEntityTypes = [];
                    this.availableMetrics = [];
                    this.resetEntityTypeSelection();
                    this.resetMetricSelection();
                };
                InstanaQueryCtrl.prototype.resetEntityTypeSelection = function () {
                    this.target.entityType = null;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.resetMetricSelection = function () {
                    this.target.metric = null;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.adjustEntitySelectionPlaceholder = function () {
                    this.entitySelectionText = this.uniqueEntityTypes.length > 0
                        ? 'Please select (' + this.uniqueEntityTypes.length + ')'
                        : this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.adjustMetricSelectionPlaceholder = function () {
                    if (this.target.metricCategory === this.CUSTOM_METRICS) {
                        this.metricSelectionText = this.allCustomMetrics.length > 0
                            ? 'Please select (' + this.availableMetrics.length + '/' + this.allCustomMetrics.length + ')'
                            : this.EMPTY_DROPDOWN_TEXT;
                    }
                    else {
                        this.metricSelectionText = this.availableMetrics.length > 0
                            ? 'Please select (' + this.availableMetrics.length + ')'
                            : this.EMPTY_DROPDOWN_TEXT;
                    }
                };
                InstanaQueryCtrl.prototype.onMetricSelect = function () {
                    if (this.target.metricCategory === this.CUSTOM_METRICS) {
                        // as there was no type selection upfront, but the metric itself contains the type
                        this.target.entityType = this.target.metric.entityType;
                    }
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onLabelChange = function () {
                    // we just want to refresh, even this is expensive
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.templateUrl = 'partials/query.editor.html';
                return InstanaQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("InstanaQueryCtrl", InstanaQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map