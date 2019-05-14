System.register(['app/plugins/sdk', './lists/beacon_types', './lists/operators', './migration', 'lodash', './css/query_editor.css!'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1, beacon_types_1, operators_1, migration_1, lodash_1;
    var InstanaQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (beacon_types_1_1) {
                beacon_types_1 = beacon_types_1_1;
            },
            function (operators_1_1) {
                operators_1 = operators_1_1;
            },
            function (migration_1_1) {
                migration_1 = migration_1_1;
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
                    this.uniqueOperators = operators_1.default;
                    this.uniqueBeaconTypes = beacon_types_1.default;
                    this.EMPTY_DROPDOWN_TEXT = ' - ';
                    this.ALL_APPLICATIONS = '-- All Applications --';
                    this.OPERATOR_STRING = 'STRING';
                    this.OPERATOR_NUMBER = 'NUMBER';
                    this.OPERATOR_BOOLEAN = 'BOOLEAN';
                    this.OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';
                    this.BUILT_IN_METRICS = '0';
                    this.CUSTOM_METRICS = '1';
                    this.APPLICATION_METRICS = '2';
                    this.WEBSITE_METRICS = '3';
                    this.defaults = {};
                    // target migration for downwards compability
                    migration_1.default(this.target);
                    this.target.pluginId = this.panelCtrl.pluginId;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    // can we read the options here ??
                    var now = Date.now();
                    var windowSize = 6 * 60 * 60 * 1000; // 6h
                    this.timeFilter = {
                        from: now - windowSize,
                        to: now,
                        windowSize: windowSize
                    };
                    // on new panel creation we default the category selection to built-in
                    if (!this.target.metricCategory) {
                        this.target.metricCategory = this.BUILT_IN_METRICS;
                    }
                    this.previousMetricCategory = this.target.metricCategory;
                    // infrastructure (built-in & custom)
                    if (this.isInfrastructure() && this.target.entityQuery) {
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
                    // websites
                    if (this.isWebsite()) {
                        this.onWebsiteChanges(false).then(function () {
                            if (_this.target.metric) {
                                _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                            }
                        });
                    }
                    // applications
                    if (this.isApplication()) {
                        this.onApplicationChanges(false).then(function () {
                            if (_this.target.metric) {
                                _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                            }
                        });
                    }
                }
                InstanaQueryCtrl.prototype.isInfrastructure = function () {
                    return this.target.metricCategory === this.BUILT_IN_METRICS || this.target.metricCategory === this.CUSTOM_METRICS;
                };
                InstanaQueryCtrl.prototype.isWebsite = function () {
                    return this.target.metricCategory === this.WEBSITE_METRICS;
                };
                InstanaQueryCtrl.prototype.isApplication = function () {
                    return this.target.metricCategory === this.APPLICATION_METRICS;
                };
                InstanaQueryCtrl.prototype.onWebsiteChanges = function (refresh) {
                    var _this = this;
                    // select a meaningful default group
                    if (this.target && !this.target.entityType) {
                        this.target.entityType = lodash_1.default.find(this.uniqueBeaconTypes, ['key', 'pageLoad']);
                    }
                    this.datasource.website.getWebsites(this.timeFilter).then(function (websites) {
                        _this.uniqueEntities = websites;
                        // select the most loaded website for default/replacement
                        if (_this.target && !_this.target.entity && websites) {
                            _this.target.entity = websites[0];
                        }
                        else if (_this.target && _this.target.entity && !lodash_1.default.find(websites, ['key', _this.target.entity.key])) {
                            _this.target.entity = websites[0];
                        }
                    });
                    this.datasource.website.getWebsiteTags().then(function (websiteTags) {
                        _this.uniqueTags =
                            lodash_1.default.sortBy(websiteTags, 'key');
                        // select a meaningful default group
                        if (_this.target && !_this.target.group) {
                            _this.target.group = lodash_1.default.find(websiteTags, ['key', 'beacon.page.name']);
                        }
                    });
                    return this.datasource.website.getWebsiteMetricsCatalog().then(function (metrics) {
                        _this.allWebsiteMetrics = metrics;
                        _this.availableMetrics = lodash_1.default.filter(_this.allWebsiteMetrics, function (m) { return m.beaconTypes.includes(_this.target.entityType.key); });
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onApplicationChanges = function (refresh) {
                    var _this = this;
                    this.datasource.application.getApplications(this.timeFilter).then(function (applications) {
                        _this.uniqueEntities = applications;
                        // if all is not existing, we insert it on top
                        if (!lodash_1.default.find(_this.uniqueEntities, { 'key': null })) {
                            _this.uniqueEntities.unshift({ key: null, label: _this.ALL_APPLICATIONS });
                        }
                        // select the most loaded website for default/replacement
                        if (_this.target && !_this.target.entity && applications) {
                            _this.target.entity = applications[0];
                        }
                        else if (_this.target && _this.target.entity && !lodash_1.default.find(applications, ['key', _this.target.entity.key])) {
                            _this.target.entity = applications[0];
                        }
                    });
                    this.datasource.application.getApplicastionTags().then(function (applicationTags) {
                        _this.uniqueTags =
                            lodash_1.default.sortBy(applicationTags, 'key');
                        // select a meaningful default group
                        if (_this.target && !_this.target.group) {
                            _this.target.group = lodash_1.default.find(applicationTags, ['key', 'endpoint.name']);
                        }
                    });
                    return this.datasource.application.getApplicationMetricsCatalog().then(function (metrics) {
                        _this.availableMetrics = metrics;
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onFilterChange = function (refresh) {
                    var _this = this;
                    if (!this.target.entityQuery) {
                        this.selectionReset();
                        return this.$q.resolve();
                    }
                    else {
                        return this.datasource.infrastructure.fetchTypesForTarget(this.target, this.timeFilter)
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
                    if (this.previousMetricCategory === this.target.metricCategory) {
                    }
                    else {
                        this.selectionReset();
                        // fresh internal used lists without re-rendering
                        if (this.isInfrastructure()) {
                            this.onFilterChange(false);
                        }
                        else if (this.isWebsite()) {
                            this.onWebsiteChanges(false);
                        }
                        else if (this.isApplication()) {
                            this.onApplicationChanges(false);
                        }
                    }
                    this.previousMetricCategory = this.target.metricCategory;
                };
                InstanaQueryCtrl.prototype.onBeaconTypeSelect = function (refresh) {
                    var _this = this;
                    this.availableMetrics = lodash_1.default.filter(this.allWebsiteMetrics, function (m) { return m.beaconTypes.includes(_this.target.entityType.key); });
                    this.checkMetricAndRefresh(refresh);
                    this.adjustMetricSelectionPlaceholder();
                };
                InstanaQueryCtrl.prototype.filterForEntityType = function (refresh) {
                    var _this = this;
                    this.filterEntityTypes().then(function () {
                        _this.adjustEntitySelectionPlaceholder();
                        if (_this.target.entityType && !lodash_1.default.find(_this.uniqueEntityTypes, ['key', _this.target.entityType.key])) {
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
                    return this.datasource.infrastructure.getEntityTypes(this.target.metricCategory).then(function (entityTypes) {
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
                    return this.datasource.infrastructure.getMetricsCatalog(this.target.entityType, this.target.metricCategory).then(function (metrics) {
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
                InstanaQueryCtrl.prototype.addFilter = function () {
                    if (!this.target.filters) {
                        this.target.filters = [];
                    }
                    this.target.filters.push({
                        tag: this.target.group,
                        operator: { key: 'EQUALS', type: this.target.group.type },
                        stringValue: "",
                        numberValue: null,
                        booleanValue: "true",
                        isValid: false
                    });
                };
                InstanaQueryCtrl.prototype.removeFilter = function (index) {
                    this.target.filters.splice(index, 1);
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onTagFilterChange = function (index) {
                    var filter = this.target.filters[index];
                    // select a matching operator if not provided
                    if (filter.tag && (!filter.operator || filter.tag.type !== filter.operator.type)) {
                        filter.operator = lodash_1.default.find(this.uniqueOperators, ['type', filter.tag.type]);
                    }
                    // validate changed filter
                    if (filter.tag) {
                        if (this.OPERATOR_STRING === filter.tag.type && filter.stringValue) {
                            filter.isValid = true;
                        }
                        else if (this.OPERATOR_KEY_VALUE === filter.tag.type && filter.stringValue && filter.stringValue.includes('=')) {
                            filter.isValid = true;
                        }
                        else if (this.OPERATOR_NUMBER === filter.tag.type && filter.numberValue !== null) {
                            filter.isValid = true;
                        }
                        else if (this.OPERATOR_BOOLEAN === filter.tag.type && filter.booleanValue) {
                            filter.isValid = true;
                        }
                        else {
                            filter.isValid = false;
                        }
                    }
                    else {
                        filter.isValid = false;
                    }
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
                    this.uniqueEntities = [];
                    this.uniqueTags = [];
                    this.resetEntityTypeSelection();
                    this.resetEntitySelection();
                    this.resetMetricSelection();
                };
                InstanaQueryCtrl.prototype.resetEntityTypeSelection = function () {
                    this.target.entityType = null;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.resetEntitySelection = function () {
                    this.target.entity = null;
                    this.target.group = null;
                    this.target.groupbyTagSecondLevelKey = null;
                    this.target.filters = [];
                };
                InstanaQueryCtrl.prototype.resetMetricSelection = function () {
                    this.target.metric = null;
                    this.target.filter = null;
                    this.target.labelFormat = null;
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
                InstanaQueryCtrl.prototype.onGroupChange = function () {
                    if (this.target.group && this.target.metricCategory === this.APPLICATION_METRICS) {
                        this.target.showGroupBySecondLevel = this.target.group.key === "call.http.header";
                    }
                    else if (this.target.group && this.target.metricCategory === this.WEBSITE_METRICS) {
                        this.target.showGroupBySecondLevel = this.target.group.key === "beacon.meta";
                    }
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onChange = function () {
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onMetricSelect = function () {
                    if (this.target.metric && !lodash_1.default.includes(this.target.metric.aggregations, this.target.aggregation)) {
                        this.target.aggregation = this.target.metric.aggregations[0];
                    }
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