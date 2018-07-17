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
                function InstanaQueryCtrl($scope, $injector, templateSrv, backendSrv) {
                    var _this = this;
                    _super.call(this, $scope, $injector);
                    this.templateSrv = templateSrv;
                    this.backendSrv = backendSrv;
                    this.metricsDefinition = metrics_1.default;
                    this.EMPTY_DROPDOWN_TEXT = ' - ';
                    this.defaults = {};
                    this.target.pluginId = this.panelCtrl.pluginId;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    if (this.target.entityQuery) {
                        this.onFilterChange(false).then(function (_) {
                            if (_this.target.entityType) {
                                _this.onEntityTypeSelect(false);
                            }
                        });
                    }
                    if (this.target.metric) {
                        this.target.metric = lodash_1.default.find(this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
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
                    }
                    else {
                        return this.datasource.request('GET', '/api/snapshots/types?q=' + encodeURIComponent(this.target.entityQuery) +
                            '&time=' + new Date().getTime())
                            .then(function (response) {
                            _this.target.queryIsValid = true;
                            _this.uniqueEntityTypes =
                                lodash_1.default.filter(response.data, function (entityType) { return metrics_1.default[entityType] && metrics_1.default[entityType].label != null; });
                            _this.entitySelectionText = _this.uniqueEntityTypes.length > 0
                                ? 'Please select (' + _this.uniqueEntityTypes.length + ')'
                                : _this.EMPTY_DROPDOWN_TEXT;
                            if (!lodash_1.default.includes(_this.uniqueEntityTypes, _this.target.entityType)) {
                                _this.target.entityType = null;
                                _this.target.entitySelectionText = _this.EMPTY_DROPDOWN_TEXT;
                                _this.target.metric = null;
                                _this.target.metricSelectionText = _this.EMPTY_DROPDOWN_TEXT;
                            }
                            else {
                                if (_this.target.metric && refresh) {
                                    _this.panelCtrl.refresh();
                                }
                            }
                        }, function (error) {
                            _this.target.queryIsValid = false;
                            _this.target.entityType = null;
                            _this.uniqueEntityTypes = [];
                        });
                    }
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