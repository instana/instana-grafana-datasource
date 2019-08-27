///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import {QueryCtrl} from 'app/plugins/sdk';

import beaconTypes from './lists/beacon_types';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import operators from './lists/operators';
import aggregation_functions from './lists/aggregation_function';
import migrate from './migration';

import _ from 'lodash';

import './css/query_editor.css!';

export class InstanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  uniqueOperators: Array<Selectable> = operators;
  uniqueBeaconTypes: Array<Selectable> = beaconTypes;
  aggregationFunctions = aggregation_functions;

  uniqueEntityTypes: Array<Selectable>; // subset of allEntityTypes filtered by DF
  allCustomMetrics: Array<Selectable>; // internal reference only to speed up filtering // TODO needed ?
  availableMetrics: Array<Selectable>; // subset of allCustomMetrics for display only
  uniqueEntities: Array<Selectable>;
  uniqueTags: Array<Selectable>;
  allWebsiteMetrics: Array<Selectable>;

  snapshots: Array<string>;
  entitySelectionText: string;
  metricSelectionText: string;
  previousMetricCategory: string;
  timeIntervalLabel = "Rollup";
  analyzeLabel = "Test";
  timeFilter: TimeFilter;
  customFilters = [];

  EMPTY_DROPDOWN_TEXT = ' - ';
  ALL_APPLICATIONS = '-- No Application Filter --';

  OPERATOR_STRING = 'STRING';
  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';
  OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';

  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  APPLICATION_METRICS = '2';
  WEBSITE_METRICS = '3';

  defaults = {};

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv, private backendSrv, private $q) {
    super($scope, $injector);
    // target migration for downwards compability
    migrate(this.target);

    this.target.pluginId = this.panelCtrl.panel.type || this.panelCtrl.pluginId;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;

    // can we read the options here ??
    const now = Date.now();
    const windowSize = 6 * 60 * 60 * 1000; // 6h
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
    if (this.isInfrastructure() && this.target.entityQuery) {
      this.timeIntervalLabel = "Rollup";
      this.onFilterChange(false).then(() => {
        // infrastructure metrics support available metrics on a selected entity type
        if (this.target.entityType) {
          this.onEntityTypeSelect(false).then(() => {
            if (this.target.metric || this.target.showAllMetrics) {
              this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
            }
          });

          this.target.timeInterval = this.datasource.infrastructure.getDefaultMetricRollupDuration(this.timeFilter);
        }
      });
    }

    // websites
    if (this.isWebsite()) {
      this.analyzeLabel = "Website";
      this.timeIntervalLabel = "Granularity";
      this.onWebsiteChanges(false).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }

    // applications
    if (this.isApplication()) {
      this.analyzeLabel = "Application";
      this.timeIntervalLabel = "Granularity";
      this.onApplicationChanges(false).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }
  }

  isInfrastructure() {
    return this.target.metricCategory === this.BUILT_IN_METRICS || this.target.metricCategory === this.CUSTOM_METRICS;
  }

  isWebsite() {
    return this.target.metricCategory === this.WEBSITE_METRICS;
  }

  isApplication() {
    return this.target.metricCategory === this.APPLICATION_METRICS;
  }

  onWebsiteChanges(refresh) {
    // select a meaningful default group
    if (this.target && !this.target.entityType) {
      this.target.entityType = _.find(this.uniqueBeaconTypes, ['key', 'pageLoad']);
    }

    this.datasource.website.getWebsites(this.timeFilter).then(
      websites => {
        this.uniqueEntities = websites;
        // select the most loaded website for default/replacement
        if (this.target && !this.target.entity && websites) {
          this.target.entity = websites[0];
        } else if (this.target && this.target.entity && !_.find(websites, ['key', this.target.entity.key])) {
          this.target.entity = websites[0];
        }
      }
    );
    this.datasource.website.getWebsiteTags().then(
      websiteTags => {
        this.uniqueTags =
          _.sortBy(
            websiteTags,
            'key');
        // select a meaningful default group
        if (this.target && !this.target.group) {
          this.target.group = _.find(websiteTags, ['key', 'beacon.page.name']);
        }
      }
    );

    return this.datasource.website.getWebsiteMetricsCatalog().then(
      metrics => {
        this.allWebsiteMetrics = metrics;
        this.availableMetrics = _.filter(this.allWebsiteMetrics, m => m.beaconTypes.includes(this.target.entityType.key));
        this.checkMetricAndRefresh(refresh);
        this.adjustMetricSelectionPlaceholder();
      }
    );
  }

  onApplicationChanges(refresh) {
    this.datasource.application.getApplications(this.timeFilter).then(
      applications => {
        this.uniqueEntities = applications;
        // if all is not existing, we insert it on top
        if (!_.find(this.uniqueEntities, {'key': null})) {
          this.uniqueEntities.unshift({key: null, label: this.ALL_APPLICATIONS});
        }
        // select the most loaded website for default/replacement
        if (this.target && !this.target.entity && applications) {
          this.target.entity = applications[0];
        } else if (this.target && this.target.entity && !_.find(applications, ['key', this.target.entity.key])) {
          this.target.entity = applications[0];
        }
      }
    );
    this.datasource.application.getApplicastionTags().then(
      applicationTags => {
        this.uniqueTags =
          _.sortBy(
            applicationTags,
            'key');
        // select a meaningful default group
        if (this.target && !this.target.group) {
          this.target.group = _.find(applicationTags, ['key', 'endpoint.name']);
        }
      }
    );
    return this.datasource.application.getApplicationMetricsCatalog().then(
      metrics => {
        this.availableMetrics = metrics;
        this.checkMetricAndRefresh(refresh);
        this.adjustMetricSelectionPlaceholder();
      }
    );
  }

  onFilterChange(refresh: boolean) {
    if (!this.target.entityQuery) {
      this.selectionReset();
      return this.$q.resolve();
    } else {
      return this.datasource.infrastructure.fetchTypesForTarget(this.target, this.timeFilter)
        .then(
          response => {
            this.target.queryIsValid = true;
            this.snapshots = response.data;

            this.filterForEntityType(refresh);
          },
          error => {
            this.target.queryIsValid = false;
            this.selectionReset();
          });
    }
  }

  onMetricCategorySelect() {
    if (this.previousMetricCategory === this.target.metricCategory) {
      // nothing needs to be done
    } else {
      this.selectionReset();
      // fresh internal used lists without re-rendering

      if (this.target.metricCategory === '0' || this.target.metricCategory === '1') {
        this.timeIntervalLabel = "Rollup";
      } else {
        this.timeIntervalLabel = "Granularity";
      }

      if (this.isInfrastructure()) {
        this.onFilterChange(false);
      } else if (this.isWebsite()) {
        this.analyzeLabel = "Website";
        this.onWebsiteChanges(false);
      } else if (this.isApplication()) {
        this.analyzeLabel = "Application";
        this.onApplicationChanges(false);
      }
    }
    this.previousMetricCategory = this.target.metricCategory;
  }

  onBeaconTypeSelect(refresh) {
    this.availableMetrics = _.filter(this.allWebsiteMetrics, m => m.beaconTypes.includes(this.target.entityType.key));
    this.checkMetricAndRefresh(refresh);
    this.adjustMetricSelectionPlaceholder();
  }

  filterForEntityType(refresh: boolean) {
    this.filterEntityTypes().then(() => {
      this.adjustEntitySelectionPlaceholder();

      if (this.target.entityType && !_.find(this.uniqueEntityTypes, ['key', this.target.entityType.key])) {
        this.target.entityType = null; // entity selection label will be untouched
        this.resetMetricSelection();
      } else if (this.target.metric && refresh) {
        this.panelCtrl.refresh();
      }
    });
  }

  filterEntityTypes() {
    return this.datasource.infrastructure.getEntityTypes(this.target.metricCategory).then(
      entityTypes => {
        this.uniqueEntityTypes =
          _.sortBy(
            _.filter(
              entityTypes,
              entityType => this.findMatchingEntityTypes(entityType)),
            'label');
      }
    );
  }

  findMatchingEntityTypes(entityType: Selectable) {
    // workaround as long the api does not support returning plugins with custom metrics only
    if (this.target.metricCategory === this.BUILT_IN_METRICS ||
      entityType.key === 'statsd' ||
      entityType.key === 'prometheus' ||
      entityType.key === 'jvmRuntimePlatform' ||
      entityType.key === 'dropwizardApplicationContainer') {
      return this.snapshots.find(type => type === entityType.key) && entityType.label != null;
    }
  }

  onEntityTypeSelect(refresh: boolean) {
    return this.datasource.infrastructure.getMetricsCatalog(this.target.entityType, this.target.metricCategory).then(
      metrics => {
        this.availableMetrics =
          _.sortBy(
            metrics,
            'key');

        // store all metrics in addition for filtering
        if (this.target.metricCategory === this.CUSTOM_METRICS) {
          this.allCustomMetrics = metrics;
          this.onMetricsFilter(refresh);
        }

        this.checkMetricAndRefresh(refresh);
        this.adjustMetricSelectionPlaceholder();
      }
    );
  }

  onMetricsFilter(refresh: boolean) {
    if (!this.target.customFilters || this.target.customFilters.length === 0) {
      // don't do any filtering if no custom filters are set.
      this.availableMetrics = this.allCustomMetrics;
      this.target.canShowAllMetrics = false;
      this.target.showAllMetrics = false;
      this.panelCtrl.refresh();
    } else {
      let filteredMetrics = this.allCustomMetrics;
      _.forEach(this.target.customFilters, filter => {
        filteredMetrics =
          _.sortBy(
            _.filter(
              filteredMetrics,
              metric => metric.key.toLowerCase().includes(filter.value.toLowerCase())),
            'key');
      });

      this.availableMetrics = filteredMetrics;
      this.target.canShowAllMetrics = this.isAbleToShowAllMetrics();

      if (!this.target.canShowAllMetrics) {
        this.target.showAllMetrics = false;
      }
    }

    this.checkMetricAndRefresh(refresh);
    this.adjustMetricSelectionPlaceholder();
  }

  isAbleToShowAllMetrics() {
    return this.target.metricCategory === this.CUSTOM_METRICS
      && this.availableMetrics.length > 0
      && this.availableMetrics.length <= 5;
  }

  addFilter() {
    if (!this.target.filters) {
      this.target.filters = [];
    }

    this.target.filters.push({
      tag: this.target.group,
      operator: {key: 'EQUALS', type: this.target.group.type},
      stringValue: "",
      numberValue: null,
      booleanValue: "true",
      isValid: false
    });
  }

  removeFilter(index: number) {
    this.target.filters.splice(index, 1);
    this.panelCtrl.refresh();
  }

  onTagFilterChange(index: number) {
    let filter: TagFilter = this.target.filters[index];

    // select a matching operator if not provided
    if (filter.tag && (!filter.operator || filter.tag.type !== filter.operator.type)) {
      filter.operator = _.find(this.uniqueOperators, ['type', filter.tag.type]);
    }
    // validate changed filter
    if (filter.tag) {
      if (filter.operator.key.includes("EMPTY")) {
        filter.isValid = true;
        // to avoid sending value with filter operators that do not require a value (such as is-present/is-not-present)
        filter.stringValue = "";
        filter.numberValue = null;
        filter.booleanValue = true;
      } else if (this.OPERATOR_STRING === filter.tag.type && filter.stringValue) {
        filter.isValid = true;
      } else if (this.OPERATOR_KEY_VALUE === filter.tag.type && filter.stringValue && filter.stringValue.includes('=')) {
        filter.isValid = true;
      } else if (this.OPERATOR_NUMBER === filter.tag.type && filter.numberValue !== null) {
        filter.isValid = true;
      } else if (this.OPERATOR_BOOLEAN === filter.tag.type && filter.booleanValue) {
        filter.isValid = true;
      } else {
        filter.isValid = false;
      }
    } else {
      filter.isValid = false;
    }
    this.panelCtrl.refresh();
  }

  checkMetricAndRefresh(refresh: boolean) {
    if (this.target.metric && !_.includes(_.map(this.availableMetrics, m => m.key), this.target.metric.key)) {
      this.resetMetricSelection();
    } else if (refresh && this.target.metric || this.target.showAllMetrics) {
      this.panelCtrl.refresh();
    }
  }

  selectionReset() {
    if (!this.isInfrastructure()) {
      this.target.entityQuery = null;
    }
    this.uniqueEntityTypes = [];
    this.availableMetrics = [];
    this.uniqueEntities = [];
    this.uniqueTags = [];
    this.target.timeShift = null; // do we want to reset this ?
    this.resetEntityTypeSelection();
    this.resetEntitySelection();
    this.resetMetricSelection();
  }

  resetEntityTypeSelection() {
    this.target.entityType = null;
    this.target.customFilters = [];
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetEntitySelection() {
    this.target.entity = null;
    this.target.group = null;
    this.target.showGroupBySecondLevel = null;
    this.target.groupbyTagSecondLevelKey = null;
    this.target.timeInterval = null;
    this.target.timeShift = null;
    this.target.aggregateGraphs = false;
    this.target.aggregationFunction = null;
    this.target.filters = [];
    this.target.showWarningCantShowAllResults = false;
    this.target.showAllMetrics = false;
    this.target.canShowAllMetrics = false;
  }

  resetMetricSelection() {
    this.target.metric = null;
    this.target.filter = null;
    this.target.timeInterval = null;
    this.target.timeShift = null;
    this.target.showWarningCantShowAllResults = false;
    this.target.showAllMetrics = false;
    this.target.labelFormat = null;
    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  adjustEntitySelectionPlaceholder() {
    this.entitySelectionText = this.uniqueEntityTypes.length > 0
      ? 'Please select (' + this.uniqueEntityTypes.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;
  }

  adjustMetricSelectionPlaceholder() {
    if (this.target.metricCategory === this.CUSTOM_METRICS) {
      this.metricSelectionText = this.allCustomMetrics.length > 0
        ? 'Please select (' + this.availableMetrics.length + '/' + this.allCustomMetrics.length + ')'
        : this.EMPTY_DROPDOWN_TEXT;
    } else {
      this.metricSelectionText = this.availableMetrics.length > 0
        ? 'Please select (' + this.availableMetrics.length + ')'
        : this.EMPTY_DROPDOWN_TEXT;
    }
  }

  onGroupChange() {
    if (this.target.group && this.isApplication()) {
      this.target.showGroupBySecondLevel = this.target.group.key === 'call.http.header';
    } else if (this.target.group && this.isWebsite()) {
      this.target.showGroupBySecondLevel = this.target.group.key === 'beacon.meta';
    }
    if (!this.target.showGroupBySecondLevel) {
      this.target.groupbyTagSecondLevelKey = null;
    }
    this.panelCtrl.refresh();
  }

  onChange() {
    this.panelCtrl.refresh();
  }

  onMetricSelect() {
    if (this.target.metric && !_.includes(this.target.metric.aggregations, this.target.aggregation)) {
      this.target.aggregation = this.target.metric.aggregations[0];
    }
    this.panelCtrl.refresh();
  }

  onAllMetricsSelect() {
    if (this.target.showAllMetrics) {
      this.target.allMetrics = this.availableMetrics;
      this.target.metric = null;
    } else {
      this.target.showAllMetrics = false;
    }
    this.panelCtrl.refresh();
  }

  toggleAdvancedSettings() {
    this.target.showAdvancedSettings = !this.target.showAdvancedSettings;
  }

  toggleGraphAggregation() {
    if (!this.target.aggregationFunction) {
      this.target.aggregationFunction = this.aggregationFunctions[0];
      this.target.labelFormat = "";
    }

    this.panelCtrl.refresh();
  }

  addCustomFilter() {
    if (!this.target.customFilters) {
      this.target.customFilters = [];
    }
    this.target.customFilters.push({value: ''});
    // this can not result in metric changes, we do not need to refresh
  }

  removeCustomFilter(index: number, refresh = true) {
    this.target.customFilters.splice(index, 1);
    // removing a filter might result in more than 5 available metrics
    this.onMetricsFilter(refresh);
  }

  isNotSingleStatOrGauge() {
    return this.target.pluginId !== 'gauge' && this.target.pluginId !== 'singlestat';
  }

  isPluginThatSupportsAggregation() {
    return this.target.pluginId === 'singlestat' || this.target.pluginId === 'gauge' || this.target.pluginId === 'table';
  }
}
