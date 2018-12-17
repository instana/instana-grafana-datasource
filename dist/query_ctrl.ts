///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {QueryCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import './css/query_editor.css!';

export interface TagFilter {
  id: number;
  name: string;
  operator: string;
  stringValue: string;
  numberValue: number;
  booleanValue: boolean;
}

export class InstanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  uniqueEntityTypes: Array<Object>; // subset of allEntityTypes filtered by DF
  allCustomMetrics: Array<Object>; // internal reference only to speed up filtering // TODO needed ?
  availableMetrics: Array<Object>; // subset of allCustomMetrics for display only
  snapshots: Array<string>;
  entitySelectionText: string;
  metricSelectionText: string;
  previousMetricCategory: string;
  uniqueEntities: Array<Object>;
  uniqueTags: Array<Object>;
  uniqueOperators: Array<Object>;

  EMPTY_DROPDOWN_TEXT = ' - ';
  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  APPLICATION_METRICS = '2';
  WEBSITE_METRICS = '3';

  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv, private backendSrv, private $q) {
    super($scope, $injector);


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

    // websites & application
    if (this.target.entity) {

    }
  }

  onFilterChange(refresh) {
    if (this.target.entityQuery === '') {
      this.selectionReset();
      return this.$q.resolve();
    } else {
      return this.datasource.fetchTypesForTarget(this.target)
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
      this.onFilterChange(true);
    }

    if (this.target.metricCategory === this.WEBSITE_METRICS) {
      this.uniqueOperators = [
        { key: "EQUALS", label: "equals", type: "STRING" },
        { key: "CONTAINS", label: "contains", type: "STRING" },
        { key: "LESS", label: "less than", type: "NUMBER" }
      ];
      this.datasource.getWebsites().then(
        websites => {
          this.uniqueEntities = websites;
        }
      );
      this.datasource.getWebsiteTags().then(
        websiteTags => {
          this.uniqueTags = websiteTags;
        }
      );
      this.datasource.getWebsiteMetricsCatalog().then(
        metrics => {
          this.availableMetrics = metrics;
        }
      );
    }

    this.previousMetricCategory = this.target.metricCategory;
  }

  filterForEntityType(refresh) {
    this.filterEntityTypes().then(() => {
      this.adjustEntitySelectionPlaceholder();

      if (!_.find(this.uniqueEntityTypes, ['key', this.target.entityType])) {
        this.target.entityType = null; // entity selection label will be untouched
        this.resetMetricSelection();
      } else if (this.target.metric && refresh) {
        this.panelCtrl.refresh();
      }
    });
  }

  filterEntityTypes() {
    return this.datasource.getEntityTypes(this.target.metricCategory).then(
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

  findMatchingEntityTypes(entityType) {
    // workaround as long the api does not support returning plugins with custom metrics only
    if (this.target.metricCategory === this.BUILT_IN_METRICS ||
        entityType.key === 'statsd' ||
        entityType.key === 'jvmRuntimePlatform' ||
        entityType.key === 'dropwizardApplicationContainer') {
      return this.snapshots.find(type => type === entityType.key) && entityType.label != null;
    }
  }

  onEntityTypeSelect(refresh) {
    return this.datasource.getMetricsCatalog(this.target.entityType, this.target.metricCategory).then(
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

  onMetricsFilter(refresh) {
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

  onEntitySelect(refresh) {
    this.resetEntitySelection();
  }

  addFilter() {
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
  }

  removeFilter(index) {
    this.target.filters.splice(index, 1);
  }

  onTagFilterChange(refresh, index) {
    console.log("refresh " + refresh + "-" + index);
    // TODO validate dat filter, before
    this.panelCtrl.refresh();
  }

  checkMetricAndRefresh(refresh) {
    if (this.target.metric && !_.includes(_.map(this.availableMetrics, m => m.key), this.target.metric.key)) {
      this.resetMetricSelection();
    } else if (this.target.metric && refresh) {
      this.panelCtrl.refresh();
    }
  }

  selectionReset() {
    this.uniqueEntityTypes = [];
    this.availableMetrics = [];
    this.resetEntityTypeSelection();
    this.resetMetricSelection();
  }

  resetEntityTypeSelection() {
    this.target.entityType = null;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetEntitySelection() {
    // this.target.entity = null;
    // this.target.filters = [];
    // this.availableMetrics = [];
  }

  resetMetricSelection() {
    this.target.metric = null;
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

  onMetricSelect() {
    this.panelCtrl.refresh();
  }

  onLabelChange() {
    // we just want to refresh, even this is expensive
    this.panelCtrl.refresh();
  }
}
