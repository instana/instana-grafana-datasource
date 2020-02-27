System.register(['app/plugins/sdk', './lists/aggregation_function', './lists/beacon_types', './lists/max_metrics', './lists/operators', './migration', 'lodash', './css/query_editor.css!'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1, aggregation_function_1, beacon_types_1, max_metrics_1, operators_1, migration_1, lodash_1;
    var InstanaQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (aggregation_function_1_1) {
                aggregation_function_1 = aggregation_function_1_1;
            },
            function (beacon_types_1_1) {
                beacon_types_1 = beacon_types_1_1;
            },
            function (max_metrics_1_1) {
                max_metrics_1 = max_metrics_1_1;
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
                    this.aggregationFunctions = aggregation_function_1.default;
                    this.websiteApplicationLabel = "";
                    this.customFilters = [];
                    this.EMPTY_DROPDOWN_TEXT = ' - ';
                    this.NO_APPLICATION_FILTER = '-- No Application Filter --';
                    this.NO_SERVICE_FILTER = '-- No Service Filter --';
                    this.NO_ENDPOINT_FILTER = '-- No Endpoint Filter --';
                    this.OPERATOR_STRING = 'STRING';
                    this.OPERATOR_NUMBER = 'NUMBER';
                    this.OPERATOR_BOOLEAN = 'BOOLEAN';
                    this.OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';
                    this.BUILT_IN_METRICS = '0';
                    this.CUSTOM_METRICS = '1';
                    this.ANALYZE_APPLICATION_METRICS = '2';
                    this.ANALYZE_WEBSITE_METRICS = '3';
                    this.APPLICATION_SERVICE_ENDPOINT_METRICS = '4'; // replaces previous
                    // APPLICATION_METRICS = '4';
                    // SERVICE_METRICS = '5';
                    // ENDPOINT_METRICS = '6';
                    this.defaults = {};
                    // target migration for downwards compatibility
                    migration_1.default(this.target);
                    this.loadVersion();
                    this.target.pluginId = this.panelCtrl.panel.type || this.panelCtrl.pluginId;
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
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
                        this.target.canShowAllMetrics = false;
                    }
                    this.previousMetricCategory = this.target.metricCategory;
                    // infrastructure (built-in & custom)
                    if (this.isInfrastructure()) {
                        if (this.target.entityQuery) {
                            this.onFilterChange(false).then(function () {
                                // infrastructure metrics support available metrics on a selected entity type
                                if (_this.target.entityType) {
                                    _this.onEntityTypeSelect(false).then(function () {
                                        if (_this.target.metric || _this.target.showAllMetrics) {
                                            _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                                        }
                                    });
                                }
                            });
                        }
                    }
                    // analyze applications
                    if (this.isAnalyzeApplication()) {
                        this.websiteApplicationLabel = "Application";
                        this.onApplicationChanges(false, true).then(function () {
                            if (_this.target.metric) {
                                _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                            }
                        });
                    }
                    // analyze websites
                    if (this.isAnalyzeWebsite()) {
                        this.websiteApplicationLabel = "Website";
                        this.onWebsiteChanges(false, true).then(function () {
                            if (_this.target.metric) {
                                _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                            }
                        });
                    }
                    // application/service/endpoint metric
                    if (this.isApplicationServiceEndpointMetric()) {
                        this.onApplicationChanges(false, false).then(function () {
                            if (_this.target.metric) {
                                _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                            }
                        });
                        this.loadServices();
                        this.loadEndpoints();
                    }
                }
                InstanaQueryCtrl.prototype.loadServices = function () {
                    var _this = this;
                    this.onServiceChanges(false).then(function () {
                        if (_this.target.metric) {
                            _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                        }
                    });
                };
                InstanaQueryCtrl.prototype.loadEndpoints = function () {
                    var _this = this;
                    this.onEndpointChanges(false).then(function () {
                        if (_this.target.metric) {
                            _this.target.metric = lodash_1.default.find(_this.availableMetrics, function (m) { return m.key === _this.target.metric.key; });
                        }
                    });
                };
                InstanaQueryCtrl.prototype.isInfrastructure = function () {
                    return this.target.metricCategory === this.BUILT_IN_METRICS || this.target.metricCategory === this.CUSTOM_METRICS;
                };
                InstanaQueryCtrl.prototype.isBuiltInInfrastructure = function () {
                    return this.target.metricCategory === this.BUILT_IN_METRICS;
                };
                InstanaQueryCtrl.prototype.isCustomInfrastructure = function () {
                    return this.target.metricCategory === this.CUSTOM_METRICS;
                };
                InstanaQueryCtrl.prototype.isAnalyzeWebsite = function () {
                    return this.target.metricCategory === this.ANALYZE_WEBSITE_METRICS;
                };
                InstanaQueryCtrl.prototype.isAnalyzeApplication = function () {
                    return this.target.metricCategory === this.ANALYZE_APPLICATION_METRICS;
                };
                InstanaQueryCtrl.prototype.isApplicationServiceEndpointMetric = function () {
                    return this.target.metricCategory === this.APPLICATION_SERVICE_ENDPOINT_METRICS;
                };
                InstanaQueryCtrl.prototype.onWebsiteChanges = function (refresh, isAnalyze) {
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
                    if (isAnalyze) {
                        this.datasource.website.getWebsiteTags().then(function (websiteTags) {
                            _this.uniqueTags =
                                lodash_1.default.sortBy(websiteTags, 'key');
                            // select a meaningful default group
                            if (_this.target && !_this.target.group) {
                                _this.target.group = lodash_1.default.find(websiteTags, ['key', 'beacon.page.name']);
                            }
                        });
                    }
                    return this.datasource.website.getWebsiteMetricsCatalog().then(function (metrics) {
                        _this.allWebsiteMetrics = metrics;
                        _this.availableMetrics = lodash_1.default.filter(_this.allWebsiteMetrics, function (m) { return m.beaconTypes.includes(_this.target.entityType.key); });
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onApplicationChanges = function (refresh, isAnalyze) {
                    var _this = this;
                    this.datasource.application.getApplications(this.timeFilter).then(function (applications) {
                        _this.uniqueEntities = lodash_1.default.orderBy(applications, [function (application) { return application.label.toLowerCase(); }], ['asc']);
                        // if all is not existing, we insert it on top
                        if (!lodash_1.default.find(_this.uniqueEntities, { 'key': null })) {
                            _this.uniqueEntities.unshift({ key: null, label: _this.NO_APPLICATION_FILTER });
                        }
                        // replace removed application
                        if (_this.target && _this.target.entity && !lodash_1.default.find(applications, ['key', _this.target.entity.key])) {
                            _this.target.entity = _this.uniqueEntities[0];
                        }
                        else if (_this.target && !_this.target.entity && applications) {
                            _this.target.entity = _this.uniqueEntities[0];
                        }
                    });
                    if (isAnalyze) {
                        this.datasource.application.getApplicationTags().then(function (applicationTags) {
                            _this.uniqueTags =
                                lodash_1.default.sortBy(applicationTags, 'key');
                            // select a meaningful default group
                            if (_this.target && !_this.target.group) {
                                _this.target.group = lodash_1.default.find(applicationTags, ['key', 'endpoint.name']);
                            }
                        });
                    }
                    return this.datasource.application.getApplicationMetricsCatalog().then(function (metrics) {
                        _this.availableMetrics = metrics;
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onServiceChanges = function (refresh) {
                    var _this = this;
                    this.datasource.service.getServicesOfApplication(this.target, this.timeFilter).then(function (services) {
                        _this.uniqueServices = lodash_1.default.orderBy(services, [function (service) { return service.label.toLowerCase(); }], ['asc']);
                        if (!lodash_1.default.find(_this.uniqueServices, { 'key': null })) {
                            _this.uniqueServices.unshift({ key: null, label: _this.NO_SERVICE_FILTER });
                            if (!_this.target.service) {
                                _this.target.service = _this.uniqueServices[0];
                            }
                        }
                    });
                    return this.datasource.application.getApplicationMetricsCatalog().then(function (metrics) {
                        _this.availableMetrics = metrics;
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onEndpointChanges = function (refresh) {
                    var _this = this;
                    this.datasource.endpoint.getEndpointsOfService(this.target, this.timeFilter).then(function (endpoints) {
                        _this.uniqueEndpoints = lodash_1.default.orderBy(endpoints, [function (endpoint) { return endpoint.label.toLowerCase(); }], ['asc']);
                        if (!lodash_1.default.find(_this.uniqueEndpoints, { 'key': null })) {
                            _this.uniqueEndpoints.unshift({ key: null, label: _this.NO_ENDPOINT_FILTER });
                            if (!_this.target.endpoint) {
                                _this.target.endpoint = _this.uniqueEndpoints[0];
                            }
                        }
                    });
                    return this.datasource.application.getApplicationMetricsCatalog().then(function (metrics) {
                        _this.availableMetrics = metrics;
                        _this.checkMetricAndRefresh(refresh);
                        _this.adjustMetricSelectionPlaceholder();
                    });
                };
                InstanaQueryCtrl.prototype.onFilterChange = function (refresh, findMatchingEntityTypes) {
                    var _this = this;
                    if (findMatchingEntityTypes === void 0) { findMatchingEntityTypes = true; }
                    if (!this.target.entityQuery) {
                        this.selectionReset();
                        return this.$q.resolve();
                    }
                    else {
                        return this.datasource.infrastructure.fetchTypesForTarget(this.target, this.timeFilter)
                            .then(function (response) {
                            _this.target.queryIsValid = true;
                            _this.snapshots = response.data;
                            _this.filterForEntityType(refresh, findMatchingEntityTypes);
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
                            this.datasource.setRollupTimeInterval(this.target, this.timeFilter);
                            this.onFilterChange(false);
                        }
                        else {
                            this.datasource.setGranularityTimeInterval(this.target, this.timeFilter);
                            if (this.isAnalyzeApplication()) {
                                this.websiteApplicationLabel = "Application";
                                this.onApplicationChanges(false, true);
                            }
                            else if (this.isAnalyzeWebsite()) {
                                this.websiteApplicationLabel = "Website";
                                this.onWebsiteChanges(false, true);
                            }
                            else if (this.isApplicationServiceEndpointMetric()) {
                                this.onApplicationChanges(false, false);
                                this.loadServices();
                                this.loadEndpoints();
                            }
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
                InstanaQueryCtrl.prototype.filterForEntityType = function (refresh, findMatchingEntityTypes) {
                    var _this = this;
                    this.filterEntityTypes(findMatchingEntityTypes).then(function () {
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
                InstanaQueryCtrl.prototype.filterEntityTypes = function (findMatchingEntityTypes) {
                    var _this = this;
                    return this.datasource.infrastructure.getEntityTypes().then(function (entityTypes) {
                        if (findMatchingEntityTypes) {
                            _this.uniqueEntityTypes =
                                lodash_1.default.sortBy(lodash_1.default.filter(entityTypes, function (entityType) { return _this.findMatchingEntityTypes(entityType); }), 'label');
                        }
                        else {
                            _this.uniqueEntityTypes = lodash_1.default.sortBy(entityTypes, 'label');
                        }
                    });
                };
                InstanaQueryCtrl.prototype.findMatchingEntityTypes = function (entityType) {
                    // workaround as long the api does not support returning plugins with custom metrics only
                    if (this.target.metricCategory === this.BUILT_IN_METRICS ||
                        entityType.key === 'statsd' ||
                        entityType.key === 'prometheus' ||
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
                    if (!this.target.customFilters || this.target.customFilters.length === 0) {
                        // don't do any filtering if no custom filters are set.
                        this.availableMetrics = this.allCustomMetrics;
                        this.target.canShowAllMetrics = false;
                        this.target.showAllMetrics = false;
                        this.panelCtrl.refresh();
                    }
                    else {
                        var filteredMetrics = this.allCustomMetrics;
                        lodash_1.default.forEach(this.target.customFilters, function (filter) {
                            filteredMetrics =
                                lodash_1.default.sortBy(lodash_1.default.filter(filteredMetrics, function (metric) { return metric.key.toLowerCase().includes(filter.value.toLowerCase()); }), 'key');
                        });
                        this.availableMetrics = filteredMetrics;
                        this.target.canShowAllMetrics = this.isAbleToShowAllMetrics();
                        if (!this.target.canShowAllMetrics) {
                            this.target.showAllMetrics = false;
                        }
                    }
                    this.checkMetricAndRefresh(refresh);
                    this.adjustMetricSelectionPlaceholder();
                };
                InstanaQueryCtrl.prototype.isAbleToShowAllMetrics = function () {
                    return this.target.metricCategory === this.CUSTOM_METRICS
                        && this.availableMetrics.length > 0
                        && this.availableMetrics.length <= 5;
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
                        if (filter.operator.key.includes("EMPTY")) {
                            filter.isValid = true;
                            // to avoid sending value with filter operators that do not require a value (such as is-present/is-not-present)
                            filter.stringValue = "";
                            filter.numberValue = null;
                            filter.booleanValue = true;
                        }
                        else if (this.OPERATOR_STRING === filter.tag.type && filter.stringValue) {
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
                    else if (refresh && this.target.metric || this.target.showAllMetrics) {
                        this.panelCtrl.refresh();
                    }
                };
                InstanaQueryCtrl.prototype.selectionReset = function () {
                    if (!this.isInfrastructure()) {
                        this.target.entityQuery = null;
                    }
                    this.uniqueEntityTypes = [];
                    this.availableMetrics = [];
                    this.uniqueEntities = [];
                    this.uniqueTags = [];
                    this.target.timeInterval = null;
                    this.resetEntityTypeSelection();
                    this.resetEntitySelection();
                    this.resetMetricSelection();
                };
                InstanaQueryCtrl.prototype.resetEntityTypeSelection = function () {
                    this.target.entityType = null;
                    this.target.customFilters = [];
                    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.resetEntitySelection = function () {
                    this.target.entity = null;
                    this.target.group = null;
                    this.target.showGroupBySecondLevel = null;
                    this.target.groupbyTagSecondLevelKey = null;
                    this.target.aggregateGraphs = false;
                    this.target.aggregationFunction = null;
                    this.target.filters = [];
                    this.target.serviceNamefilter = null;
                    this.target.showWarningCantShowAllResults = false;
                    this.target.showAllMetrics = false;
                    this.target.canShowAllMetrics = false;
                    this.target.displayMaxMetricValue = false;
                    this.serviceEndpointSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.resetServices();
                    this.resetEndpoints();
                };
                InstanaQueryCtrl.prototype.resetMetricSelection = function () {
                    this.target.metric = null;
                    this.target.filter = null;
                    this.target.timeShift = null;
                    this.target.timeShiftIsValid = true;
                    this.target.showWarningCantShowAllResults = false;
                    this.target.showAllMetrics = false;
                    this.target.labelFormat = null;
                    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
                    this.target.freeTextMetrics = null;
                    this.target.useFreeTextMetrics = false;
                };
                InstanaQueryCtrl.prototype.resetServices = function () {
                    this.target.service = null;
                    this.uniqueServices = [];
                };
                InstanaQueryCtrl.prototype.resetEndpoints = function () {
                    this.target.endpoint = null;
                    this.uniqueEndpoints = [];
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
                InstanaQueryCtrl.prototype.adjustServiceEndpointSelectionPlaceholder = function () {
                    this.serviceEndpointSelectionText = this.uniqueEntities.length > 0
                        ? 'Please select (' + this.target.availableServicesEndpoints.length + '/' + this.uniqueEntities.length + ')'
                        : this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.buildSelectionPlaceholderText = function (selectableValues) {
                    if (selectableValues.length > 0) {
                        return 'Please select (' + selectableValues.length + ')';
                    }
                    return this.EMPTY_DROPDOWN_TEXT;
                };
                InstanaQueryCtrl.prototype.onNamefilterChanges = function () {
                    var _this = this;
                    if (!this.target.serviceNamefilter) {
                        this.target.availableServicesEndpoints = this.uniqueEntities;
                    }
                    else {
                        this.target.availableServicesEndpoints =
                            lodash_1.default.filter(this.uniqueEntities, function (entity) { return entity.label.includes(_this.target.serviceNamefilter); });
                    }
                    this.adjustServiceEndpointSelectionPlaceholder();
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onGroupChange = function () {
                    if (this.target.group && (this.isAnalyzeApplication() || this.isAnalyzeWebsite())) {
                        this.target.showGroupBySecondLevel = this.target.group.type === 'KEY_VALUE_PAIR';
                    }
                    if (!this.target.showGroupBySecondLevel) {
                        this.target.groupbyTagSecondLevelKey = null;
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
                    if (this.target.displayMaxMetricValue && !this.canShowMaxMetricValue()) {
                        this.target.displayMaxMetricValue = false;
                    }
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onAllMetricsSelect = function () {
                    if (this.target.showAllMetrics) {
                        this.target.allMetrics = this.availableMetrics;
                        this.target.metric = null;
                    }
                    else {
                        this.target.showAllMetrics = false;
                    }
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onFreeTextMetricChange = function () {
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onTimeShiftChange = function () {
                    if (this.target.timeShift) {
                        this.target.timeShiftIsValid = this.target.timeShift.match(/\d+[m,s,h,d,w]{1}/);
                    }
                    else {
                        this.target.timeShiftIsValid = true;
                    }
                    if (this.target.timeShiftIsValid) {
                        this.panelCtrl.refresh();
                    }
                };
                InstanaQueryCtrl.prototype.onApplicationSelect = function () {
                    this.resetServices();
                    this.resetEndpoints();
                    this.loadServices();
                    this.loadEndpoints();
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.onServiceSelect = function () {
                    this.resetEndpoints();
                    this.loadEndpoints();
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.toggleFreeTextMetrics = function () {
                    this.onFilterChange(true, false);
                };
                InstanaQueryCtrl.prototype.toggleAdvancedSettings = function () {
                    this.target.showAdvancedSettings = !this.target.showAdvancedSettings;
                };
                InstanaQueryCtrl.prototype.toggleGraphAggregation = function () {
                    if (!this.target.aggregationFunction) {
                        this.target.aggregationFunction = this.aggregationFunctions[0];
                        this.target.labelFormat = "";
                    }
                    this.panelCtrl.refresh();
                };
                InstanaQueryCtrl.prototype.canShowMaxMetricValue = function () {
                    var _this = this;
                    return this.target.entityType &&
                        this.target.entityType.key === 'host' &&
                        this.target.metric &&
                        lodash_1.default.find(max_metrics_1.default, function (m) { return m.key === _this.target.metric.key; });
                };
                InstanaQueryCtrl.prototype.addCustomFilter = function () {
                    if (!this.target.customFilters) {
                        this.target.customFilters = [];
                    }
                    this.target.customFilters.push({ value: '' });
                    // this can not result in metric changes, we do not need to refresh
                };
                InstanaQueryCtrl.prototype.removeCustomFilter = function (index, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    this.target.customFilters.splice(index, 1);
                    // removing a filter might result in more than 5 available metrics
                    this.onMetricsFilter(refresh);
                };
                InstanaQueryCtrl.prototype.isNotSingleStatOrGauge = function () {
                    return this.target.pluginId !== 'gauge' && this.target.pluginId !== 'singlestat';
                };
                InstanaQueryCtrl.prototype.canShowAggregation = function () {
                    return this.target.metricCategory >= '2' || this.isPluginThatSupportsAggregation();
                };
                InstanaQueryCtrl.prototype.isPluginThatSupportsAggregation = function () {
                    return this.target.pluginId === 'singlestat' || this.target.pluginId === 'gauge' || this.target.pluginId === 'table';
                };
                InstanaQueryCtrl.prototype.isAnalyzeCategory = function () {
                    return this.isAnalyzeApplication() || this.isAnalyzeWebsite();
                };
                InstanaQueryCtrl.prototype.getAvailableTimeIntervals = function () {
                    if (this.isInfrastructure()) {
                        return this.datasource.availableRollups;
                    }
                    return this.datasource.availableGranularities;
                };
                InstanaQueryCtrl.prototype.loadVersion = function () {
                    var _this = this;
                    if (this.datasource) {
                        this.datasource.getVersion().then(function (version) {
                            _this.version = version;
                        });
                    }
                };
                InstanaQueryCtrl.prototype.supportsApplicationPerspective = function () {
                    if (!this.target.entity || !this.target.entity.key) {
                        return false;
                    }
                    if (!this.version) {
                        return false;
                    }
                    else {
                        return this.version >= 163;
                    }
                };
                InstanaQueryCtrl.templateUrl = 'partials/query.editor.html';
                return InstanaQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("InstanaQueryCtrl", InstanaQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map