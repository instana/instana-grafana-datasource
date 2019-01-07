///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';

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

  uniqueOperators: Array<Selectable> = operators;
  uniqueBeaconTypes: Array<Selectable> = beaconTypes;

  uniqueEntityTypes: Array<Selectable>; // subset of allEntityTypes filtered by DF
  allCustomMetrics: Array<Selectable>; // internal reference only to speed up filtering // TODO needed ?
  availableMetrics: Array<Selectable>; // subset of allCustomMetrics for display only
  uniqueEntities: Array<Selectable>;
  uniqueTags: Array<Selectable>;

  snapshots: Array<string>;
  entitySelectionText: string;
  metricSelectionText: string;
  previousMetricCategory: string;
  timeFilter: TimeFilter;

  EMPTY_DROPDOWN_TEXT = ' - ';

  OPERATOR_STRING = 'STRING';
  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';
  OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';

  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  APPLICATION_METRICS = '2';
  WEBSITE_METRICS = '3';

  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv, private backendSrv, private $q) {
    super($scope, $injector);

    // target migration for downwards compability
    migrate(this.target);

    this.target.pluginId = this.panelCtrl.pluginId;
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
    }
    this.previousMetricCategory = this.target.metricCategory;

    // infrastructure (built-in & custom)
    if (this.isInfrastructure() && this.target.entityQuery) {
      this.onFilterChange(false).then(() => {

        // infrastructure metrics support available metrics on a selected entity type
        if (this.target.entityType) {
          this.onEntityTypeSelect(false).then(() => {
            if (this.target.metric) {
              this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
            }
          });
        }
      });
    }

    // websites & applications
    if (this.isEntity()) {
      this.onEntityChanges(false).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }
  }

  isInfrastructure() {
    return this.target.metricCategory === this.BUILT_IN_METRICS || this.target.metricCategory === this.CUSTOM_METRICS;
  }

  isEntity() {
    return this.target.metricCategory === this.WEBSITE_METRICS;
  }

  onEntityChanges(refresh: boolean) {
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
        this.onFilterChange(false);
      }
      if (this.isEntity()) {
        this.onEntityChanges(false);
      }
    }
    this.previousMetricCategory = this.target.metricCategory;
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
    let filter = this.target.filter ? this.target.filter.toLowerCase() : '';
    this.availableMetrics =
      _.sortBy(
        _.filter(
          this.allCustomMetrics,
          metric => metric.key.toLowerCase().includes(filter)),
        'key');

    this.checkMetricAndRefresh(refresh);
    this.adjustMetricSelectionPlaceholder();
  }

  addFilter() {
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
  }

  removeFilter(index: number) {
    this.target.filters.splice(index, 1);

    this.panelCtrl.refresh();
  }

  onTagFilterChange(index: number) {
    let filter: TagFilter = this.target.filters[index];

    // select a matching operator if not provided
    if (filter.tag && (!filter.operator || filter.tag.type !== filter.operator.type)) {
      filter.operator = _.find(this.uniqueOperators, ['type', filter.tag.type]);
    }
    // validate changed filter
    if (filter.tag) {
      if (this.OPERATOR_STRING === filter.tag.type && filter.stringValue) {
        filter.isValid = true;
      } else if (this.OPERATOR_KEY_VALUE === filter.tag.type && filter.stringValue && filter.stringValue.includes('=') ) {
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
    } else if (this.target.metric && refresh) {
      this.panelCtrl.refresh();
    }
  }

  selectionReset() {
    this.uniqueEntityTypes = [];
    this.availableMetrics = [];
    this.uniqueEntities = [];
    this.uniqueTags = [];
    this.resetEntityTypeSelection();
    this.resetEntitySelection();
    this.resetMetricSelection();
  }

  resetEntityTypeSelection() {
    this.target.entityType = null;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetEntitySelection() {
    this.target.entity = null;
    this.target.group = null;
    this.target.filters = [];
  }

  resetMetricSelection() {
    this.target.metric = null;
    this.target.filter = null;
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

  onChange() {
    this.panelCtrl.refresh();
  }

  onMetricSelect() {
    if (this.target.metricCategory === this.WEBSITE_METRICS && !_.includes(this.target.metric.aggregations, this.target.aggregation)) {
      this.target.aggregation = this.target.metric.aggregations[0];
    }
    this.panelCtrl.refresh();
  }
}
