///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk', './css/query_editor.css!', './metrics'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1, metrics_1;
    var InstanaQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (_1) {},
            function (metrics_1_1) {
                metrics_1 = metrics_1_1;
            }],
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
                    this.metricsDefinition = metrics_1.default;
                    this.EMPTY_DROPDOWN_TEXT = ' - ';
                    this.BUILD_IN_METRICS = '0';
                    this.CUSTOM_METRICS = '1';
                    this.FREE_METRICS = '2';
                    this.defaults = {};
                    this.target.pluginId = this.panelCtrl.pluginId;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.target.metricCategorie = '0';
                    if (this.target.entityQuery) {
                        this.onFilterChange(false).then(function () {
                            if (_this.target.entityType) {
                                _this.onEntityTypeSelect(false);
                            }
                            if (_this.target && _this.target.metric) {
                                _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                            }
                        });
                    }
                }
                InstanaQueryCtrl.prototype.onFilterChange = function (refresh) {
                    var _this = this;
                    if (this.target.entityQuery === '') {
                        this.uniqueEntityTypes = [];
                        this.target.entityType = null;
                        this.target.metric = null;
                        this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                        this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                        return this.$q.resolve();
                    }
                    else {
                        var url = ("/api/snapshots/types?q=" + encodeURIComponent(this.target.entityQuery)) +
                            ("&time=" + Date.now() + "&newApplicationModelEnabled=" + (this.datasource.newApplicationModelEnabled === true));
                        return this.datasource.request('GET', url)
                            .then(function (response) {
                            _this.target.queryIsValid = true;
                            if (_this.target.metricCategorie === _this.BUILD_IN_METRICS) {
                                _this.filterBuildIn(response, refresh);
                            }
                            else if (_this.target.metricCategorie === _this.CUSTOM_METRICS) {
                                _this.filterCustom(refresh);
                            }
                            else {
                                alert("FREE_METRICS not yet supported!");
                            }
                        }, function (error) {
                            _this.target.queryIsValid = false;
                            _this.target.entityType = null;
                            _this.uniqueEntityTypes = [];
                        });
                    }
                };
                InstanaQueryCtrl.prototype.filterCustom = function (refresh) {
                    var _this = this;
                    this.datasource.getCatalog().then(function (customMetrics) {
                        _this.availableMetrics =
                            lodash_1.default.filter(customMetrics, function (metric) { return lodash_1.default.includes(_this.datasource.CUSTOM_METRIC_TYPES, metric.type); });
                        _this.metricSelectionText = _this.availableMetrics.length > 0
                            ? 'Please select (' + _this.availableMetrics.length + ')'
                            : _this.EMPTY_DROPDOWN_TEXT;
                        if (_this.target.metric && !lodash_1.default.includes(lodash_1.default.map(_this.availableMetrics, function (m) { return m.key; }), _this.target.metric.key)) {
                            _this.target.metric = null;
                            _this.target.metricSelectionText = _this.EMPTY_DROPDOWN_TEXT;
                        }
                        else {
                            if (_this.target.metric && refresh) {
                                _this.panelCtrl.refresh();
                            }
                        }
                    });
                };
                InstanaQueryCtrl.prototype.filterBuildIn = function (response, refresh) {
                    this.uniqueEntityTypes =
                        lodash_1.default.filter(response.data, function (entityType) { return metrics_1.default[entityType.toLowerCase()] && metrics_1.default[entityType.toLowerCase()].label != null; });
                    this.entitySelectionText = this.uniqueEntityTypes.length > 0
                        ? 'Please select (' + this.uniqueEntityTypes.length + ')'
                        : this.EMPTY_DROPDOWN_TEXT;
                    if (!lodash_1.default.includes(this.uniqueEntityTypes, this.target.entityType)) {
                        this.target.entityType = null;
                        this.target.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                        this.target.metric = null;
                        this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    }
                    else {
                        if (this.target.metric && refresh) {
                            this.panelCtrl.refresh();
                        }
                    }
                };
                InstanaQueryCtrl.prototype.onMetricCategorieSelect = function () {
                    this.selectionReset();
                    this.onFilterChange(true);
                };
                InstanaQueryCtrl.prototype.selectionReset = function () {
                    this.uniqueEntityTypes = null;
                    this.availableMetrics = null;
                    this.target.metric = null;
                    this.target.entityType = null;
                    this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.target.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.onEntityTypeSelect = function (refresh) {
                    this.availableMetrics =
                        lodash_1.default.map(this.metricsDefinition[this.target.entityType.toLowerCase()].metrics, function (value, key) {
                            return {
                                "key": key,
                                "label": value };
                        });
                    this.metricSelectionText = this.availableMetrics.length > 0
                        ? 'Please select (' + this.availableMetrics.length + ')'
                        : this.EMPTY_DROPDOWN_TEXT;
                    if (this.target.metric && !lodash_1.default.includes(lodash_1.default.map(this.availableMetrics, function (m) { return m.key; }), this.target.metric.key)) {
                        this.target.metric = null;
                        this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    }
                    else {
                        if (this.target.metric && refresh) {
                            this.panelCtrl.refresh();
                        }
                    }
                };
                InstanaQueryCtrl.prototype.onMetricSelect = function () {
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