///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import {QueryCtrl} from 'app/plugins/sdk';

import aggregation_functions from './lists/aggregation_function';
import beaconTypes from './lists/beacon_types';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import operators from './lists/operators';
import migrate from './migration';

import _ from 'lodash';

import './css/query_editor.css!';

export class InstanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
  version: number;

  uniqueOperators: Array<Selectable> = operators;
  uniqueBeaconTypes: Array<Selectable> = beaconTypes;
  aggregationFunctions = aggregation_functions;

  uniqueEntityTypes: Array<Selectable>; // subset of allEntityTypes filtered by DF
  allCustomMetrics: Array<Selectable>; // internal reference only to speed up filtering // TODO needed ?
  availableMetrics: Array<Selectable>; // subset of allCustomMetrics for display only
  uniqueEntities: Array<Selectable>;
  uniqueServices: Array<Selectable>;
  uniqueEndpoints: Array<Selectable>;
  uniqueTags: Array<Selectable>;
  allWebsiteMetrics: Array<Selectable>;

  snapshots: Array<string>;
  entitySelectionText: string;
  serviceSelectionText: string;
  endpointSelectionText: string;
  metricSelectionText: string;
  serviceEndpointSelectionText: string;
  previousMetricCategory: string;
  websiteApplicationLabel = "";
  serviceEndpointTitle: string;
  timeFilter: TimeFilter;
  customFilters = [];

  EMPTY_DROPDOWN_TEXT = ' - ';
  ALL_APPLICATIONS = '-- No Application Filter --';
  ALL_SERVICES = '-- No Service Filter --';
  ALL_ENDPOINTS = '-- No Endpoint Filter --';

  OPERATOR_STRING = 'STRING';
  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';
  OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';

  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  ANALYZE_APPLICATION_METRICS = '2';
  ANALYZE_WEBSITE_METRICS = '3';
  APPLICATION_METRICS = '4';
  SERVICE_METRICS = '5';
  ENDPOINT_METRICS = '6';
  APPLICATION_SERVICE_ENDPOINT_METRICS = '4';

  defaults = {};

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv, private backendSrv, private $q) {
    super($scope, $injector);
    // target migration for downwards compatibility
    migrate(this.target);
    this.loadVersion();

    this.target.pluginId = this.panelCtrl.panel.type || this.panelCtrl.pluginId;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;

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
    if (this.isInfrastructure()) {
      if (this.target.entityQuery) {
        this.onFilterChange(false).then(() => {
          // infrastructure metrics support available metrics on a selected entity type
          if (this.target.entityType) {
            this.onEntityTypeSelect(false).then(() => {
              if (this.target.metric || this.target.showAllMetrics) {
                this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
              }
            });
          }
        });
      }
    }

    // analyze applications
    if (this.isAnalyzeApplication()) {
      this.websiteApplicationLabel = "Application";
      this.onApplicationChanges(false, true).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }

    // analyze websites
    if (this.isAnalyzeWebsite()) {
      this.websiteApplicationLabel = "Website";
      this.onWebsiteChanges(false, true).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }

    // application/service/endpoint metric
    if (this.isApplicationServiceEndpointMetric()) {
      this.onApplicationChanges(false, false).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
      this.loadServices();
      this.loadEndpoints();
    }
  }

  loadServices() {
    this.onServiceChanges(false).then(() => {
      if (this.target.metric) {
        this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
      }
    });
  }

  loadEndpoints() {
    this.onEndpointChanges(false).then(() => {
      if (this.target.metric) {
        this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
      }
    });
  }


  isInfrastructure() {
    return this.target.metricCategory === this.BUILT_IN_METRICS || this.target.metricCategory === this.CUSTOM_METRICS;
  }

  isAnalyzeWebsite() {
    return this.target.metricCategory === this.ANALYZE_WEBSITE_METRICS;
  }

  isAnalyzeApplication() {
    return this.target.metricCategory === this.ANALYZE_APPLICATION_METRICS;
  }

  isApplicationServiceEndpointMetric() {
    return this.target.metricCategory === this.APPLICATION_SERVICE_ENDPOINT_METRICS;
  }

  isApplicationMetric() {
    return this.target.metricCategory === this.APPLICATION_METRICS;
  }

  isServiceMetric() {
    return this.target.metricCategory === this.SERVICE_METRICS;
  }

  isEndpointMetric() {
    return this.target.metricCategory === this.ENDPOINT_METRICS;
  }

  onWebsiteChanges(refresh, isAnalyze: boolean) {
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

    if (isAnalyze) {
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
    }

    return this.datasource.website.getWebsiteMetricsCatalog().then(
      metrics => {
        this.allWebsiteMetrics = metrics;
        this.availableMetrics = _.filter(this.allWebsiteMetrics, m => m.beaconTypes.includes(this.target.entityType.key));
        this.checkMetricAndRefresh(refresh);
        this.adjustMetricSelectionPlaceholder();
      }
    );
  }

  onApplicationChanges(refresh, isAnalyze: boolean) {
    this.datasource.application.getApplications(this.timeFilter).then(
      applications => {
        this.uniqueEntities = _.orderBy(applications, [application => application.label.toLowerCase()], ['asc']);
        // if all is not existing, we insert it on top
        if (!_.find(this.uniqueEntities, {'key': null})) {
          this.uniqueEntities.unshift({key: null, label: this.ALL_APPLICATIONS});
        }
        // replace removed application
        if (this.target && this.target.entity && !_.find(applications, ['key', this.target.entity.key])) {
          this.target.entity = this.uniqueEntities[0];
        } else if (this.target && !this.target.entity && applications) {
          this.target.entity = this.uniqueEntities[0];
        }
      }
    );

    if (isAnalyze) {
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
    }

    return this.datasource.application.getApplicationMetricsCatalog().then(
      metrics => {
        this.availableMetrics = metrics;
        this.checkMetricAndRefresh(refresh);
        this.adjustMetricSelectionPlaceholder();
      }
    );
  }

  onServiceChanges(refresh: boolean) {
    this.datasource.service.getServices(this.target, this.timeFilter).then(
      services => {
        this.uniqueServices = _.orderBy(services, [service => service.label.toLowerCase()], ['asc']);
        // if all is not existing, we insert it on top
        //if (!_.find(this.uniqueServices, {'key': null})) {
        //  this.uniqueServices.unshift({key: null, label: this.ALL_SERVICES});
        //}
        this.serviceSelectionText = this.buildSelectionPlaceholderText(this.uniqueServices);
        // replace removed service
        //if (this.target && this.target.service && !_.find(services, ['key', this.target.service.key])) {
        //  this.target.service = this.uniqueServices[0];
        //} else if (this.target && !this.target.service && services) {
        //  this.target.service = this.uniqueServices[0];
        //}
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

  onEndpointChanges(refresh: boolean) {
    this.datasource.endpoint.getEndpoints(this.target, this.timeFilter).then(
      endpoints => {
        this.uniqueEndpoints = _.orderBy(endpoints, [endpoint => endpoint.label.toLowerCase()], ['asc']);
        // if all is not existing, we insert it on top
        //if (!_.find(this.uniqueEndpoints, {'key': null})) {
        //  this.uniqueEndpoints.unshift({key: null, label: this.ALL_ENDPOINTS});
        //}
        this.endpointSelectionText = this.buildSelectionPlaceholderText(this.uniqueEndpoints);
        // replace removed endpoint
        //if (this.target && this.target.endpoint && !_.find(endpoints, ['key', this.target.endpoint.key])) {
        //  this.target.endpoint = this.uniqueEndpoints[0];
        //} else if (this.target && !this.target.entity && endpoints) {
        //  this.target.endpoint = this.uniqueEndpoints[0];
        //}
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
      if (this.isInfrastructure()) {
        this.datasource.setRollupTimeInterval(this.target, this.timeFilter);
        this.onFilterChange(false);
      } else {
        this.datasource.setGranularityTimeInterval(this.target, this.timeFilter);
        if (this.isAnalyzeApplication()) {
          this.websiteApplicationLabel = "Application";
          this.onApplicationChanges(false, true);
        } else if (this.isAnalyzeWebsite()) {
          this.websiteApplicationLabel = "Website";
          this.onWebsiteChanges(false, true);
        } else if (this.isApplicationMetric()) {
          this.websiteApplicationLabel = "Application";
          this.onApplicationChanges(false, false);
        } else if (this.isServiceMetric()) {
          this.serviceEndpointTitle = "Service";
          this.onFilterChange(false);
          this.onServiceChanges(false);
        } else if (this.isEndpointMetric()) {
          this.serviceEndpointTitle = "Endpoint";
          this.onFilterChange(false);
          this.onEndpointChanges(false);
        }
      }
    }
    this.previousMetricCategory = this.target.metricCategory;
  }

  onBeaconTypeSelect(refresh: boolean) {
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
    return this.datasource.infrastructure.getEntityTypes().then(
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
    this.target.timeInterval = null;
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
    this.target.aggregateGraphs = false;
    this.target.aggregationFunction = null;
    this.target.filters = [];
    this.target.serviceNamefilter = null;
    this.target.showWarningCantShowAllResults = false;
    this.target.showAllMetrics = false;
    this.target.canShowAllMetrics = false;
    this.serviceEndpointSelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetMetricSelection() {
    this.target.metric = null;
    this.target.filter = null;
    this.target.timeShift = null;
    this.target.timeShiftIsValid = true;
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

  adjustServiceEndpointSelectionPlaceholder() {
    this.serviceEndpointSelectionText = this.uniqueEntities.length > 0
      ? 'Please select (' + this.target.availableServicesEndpoints.length + '/' + this.uniqueEntities.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;
  }

  buildSelectionPlaceholderText(selectableValues) {
    if (selectableValues.length > 0) {
      return 'Please select (' + selectableValues.length + ')';
    }
    return this.EMPTY_DROPDOWN_TEXT;
  }

  onNamefilterChanges() {
    if (!this.target.serviceNamefilter) {
      this.target.availableServicesEndpoints = this.uniqueEntities;
    } else {
      this.target.availableServicesEndpoints =
        _.filter(this.uniqueEntities, entity => entity.label.includes(this.target.serviceNamefilter));
    }

    this.adjustServiceEndpointSelectionPlaceholder();
    this.panelCtrl.refresh();
  }

  onGroupChange() {
    if (this.target.group && (this.isAnalyzeApplication() || this.isAnalyzeWebsite())) {
      this.target.showGroupBySecondLevel = this.target.group.type === 'KEY_VALUE_PAIR';
    }

    if (!this.target.showGroupBySecondLevel) {
      this.target.groupbyTagSecondLevelKey = null;
    }
    this.panelCtrl.refresh();
  }

  onChange() {
    this.panelCtrl.refresh();
  }

  onServiceEndpointSelected() {
    if (this.isServiceMetric()) {
      this.datasource.service.getApplicationsUsingService(this.target, this.timeFilter).then(applications => {
        this.target.relatedApplications = applications;
        this.target.relatedApplications.unshift({key: null, label: "No Application Selected"});
        this.target.selectedApplication = this.target.relatedApplications[0];
      });
    } else {
      this.datasource.endpoint.getApplicationsUsingEndpoint(this.target, this.timeFilter).then(applications => {
        this.target.relatedApplications = applications;
        this.target.relatedApplications.unshift({key: null, label: "No Application Selected"});
        this.target.selectedApplication = this.target.relatedApplications[0];
      });
    }
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

  onTimeShiftChange() {
    if (this.target.timeShift) {
      this.target.timeShiftIsValid = this.target.timeShift.match(/\d+[m,s,h,d,w]{1}/);
      this.panelCtrl.refresh();
    } else {
      this.target.timeShiftIsValid = true;
    }
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

  canShowAggregation() {
    return this.target.metricCategory >= '2' || this.isPluginThatSupportsAggregation();
  }

  isPluginThatSupportsAggregation() {
    return this.target.pluginId === 'singlestat' || this.target.pluginId === 'gauge' || this.target.pluginId === 'table';
  }

  isAnalyzeCategory() {
    return this.isAnalyzeApplication() || this.isAnalyzeWebsite();
  }

  getAvailableTimeIntervals() {
    if (this.isInfrastructure()) {
      return this.datasource.availableRollups;
    }

    return this.datasource.availableGranularities;
  }

  loadVersion() {
    if (this.datasource) {
      this.datasource.getVersion().then(version => {
        this.version = version;
      });
    }
  }

  supportsApplicationPerspective() {
    if (!this.target.entity || !this.target.entity.key) {
      return false;
    }

    if (!this.version) {
      return false;
    } else {
      return this.version >= 1.163;
    }
  }
}
