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
                    this.APPLICATION_METRICS = '2';
                    this.WEBSITE_METRICS = '3';
                    this.defaults = {};
                    this.target.pluginId = this.panelCtrl.pluginId;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    // on new panel creation we default the category selection to built-in
                    if (!this.target.metricCategory) {
                        this.target.metricCategory = this.BUILT_IN_METRICS;
                    }
                    this.previousMetricCategory = this.target.metricCategory;
                    // infrastructure
                    if (this.target.entityQuery) {
                        this.onFilterChange(false).then(function () {
                            // infrastructure metrics support available metrics on a selected entity type
                            if (_this.target.entityType) {
                                _this.onEntityTypeSelect(false).then(function () {
                                    if (_this.target.metric) {
                                        _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                                    }
                                });
                            }
                        });
                    }
                    // websites & application
                    if (this.target.entity) {
                    }
                }
                InstanaQueryCtrl.prototype.onFilterChange = function (refresh) {
                    var _this = this;
                    if (this.target.entityQuery === '') {
                        this.selectionReset();
                        return this.$q.resolve();
                    }
                    else {
                        return this.datasource.fetchTypesForTarget(this.target)
                            .then(function (response) {
                            _this.target.queryIsValid = true;
                            _this.snapshots = response.data;
                            _this.filterForEntityType(refresh);
                        }, function (error) {
                            _this.target.queryIsValid = false;
                            _this.selectionReset();
                        });
                    }
                };
                InstanaQueryCtrl.prototype.onMetricCategorySelect = function () {
                    var _this = this;
                    if (this.previousMetricCategory === this.target.metricCategory) {
                    }
                    else {
                        this.selectionReset();
                        this.onFilterChange(true);
                    }
                    if (this.target.metricCategory === this.WEBSITE_METRICS) {
                        this.uniqueOperators = [
                            { key: "EQUALS", label: "equals", type: "STRING" },
                            { key: "CONTAINS", label: "contains", type: "STRING" },
                            { key: "LESS", label: "less than", type: "NUMBER" }
                        ];
                        this.datasource.getWebsites().then(function (websites) {
                            _this.uniqueEntities = websites;
                        });
                        this.datasource.getWebsiteTags().then(function (websiteTags) {
                            _this.uniqueTags = websiteTags;
                        });
                        this.datasource.getWebsiteMetricsCatalog().then(function (metrics) {
                            _this.availableMetrics = metrics;
                        });
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
                InstanaQueryCtrl.prototype.filterEntityTypes = function () {
                    var _this = this;
                    return this.datasource.getEntityTypes(this.target.metricCategory).then(function (entityTypes) {
                        _this.uniqueEntityTypes =
                            lodash_1.default.sortBy(lodash_1.default.filter(entityTypes, function (entityType) { return _this.findMatchingEntityTypes(entityType); }), 'label');
                    });
                };
                InstanaQueryCtrl.prototype.findMatchingEntityTypes = function (entityType) {
                    // workaround as long the api does not support returning plugins with custom metrics only
                    if (this.target.metricCategory === this.BUILT_IN_METRICS ||
                        entityType.key === 'statsd' ||
                        entityType.key === 'jvmRuntimePlatform' ||
                        entityType.key === 'dropwizardApplicationContainer') {
                        return this.snapshots.find(function (type) { return type === entityType.key; }) && entityType.label != null;
                    }
                };
                InstanaQueryCtrl.prototype.onEntityTypeSelect = function (refresh) {
                    var _this = this;
                    return this.datasource.getMetricsCatalog(this.target.entityType, this.target.metricCategory).then(function (metrics) {
                        _this.availableMetrics =
                            lodash_1.default.sortBy(metrics, 'key');
                        // store all metrics in addition for filtering
                        if (_this.target.metricCategory === _this.CUSTOM_METRICS) {
                            _this.allCustomMetrics = metrics;
                            _this.onMetricsFilter(refresh);
                        }
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onMetricsFilter = function (refresh) {
                    var filter = this.target.filter ? this.target.filter.toLowerCase() : '';
                    this.availableMetrics =
                        lodash_1.default.sortBy(lodash_1.default.filter(this.allCustomMetrics, function (metric) { return metric.key.toLowerCase().includes(filter); }), 'key');
                    this.checkMetricAndRefresh(refresh);
                    this.adjustMetricSelectionPlaceholder();
                };
                InstanaQueryCtrl.prototype.onEntitySelect = function (refresh) {
                    this.resetEntitySelection();
                };
                InstanaQueryCtrl.prototype.addFilter = function () {
                    if (!this.target.filters) {
                        this.target.filters = [];
                    }
                    this.target.filters.push({
                        id: this.target.filters.length,
                        name: "",
                        operator: "",
                        stringValue: "",
                        numberValue: 0,
                        booleanValue: false
                    });
                };
                InstanaQueryCtrl.prototype.removeFilter = function (index) {
                    this.target.filters.splice(index, 1);
                };
                InstanaQueryCtrl.prototype.onTagFilterChange = function (refresh, index) {
                    console.log("refresh " + refresh + "-" + index);
                    // TODO validate dat filter, before
                    this.panelCtrl.refresh();
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
                InstanaQueryCtrl.prototype.resetEntitySelection = function () {
                    // this.target.entity = null;
                    // this.target.filters = [];
                    // this.availableMetrics = [];
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