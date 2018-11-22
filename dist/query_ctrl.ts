///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {QueryCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import './css/query_editor.css!';

export class InstanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  uniqueEntityTypes: Array<Object>; // subset of allEntityTypes filtered by DF
  allCustomMetrics: Array<Object>; // internal reference only to speed up filtering // TODO needed ?
  availableMetrics: Array<Object>; // subset of allCustomMetrics for display only
  snapshots: Array<string>;
  entitySelectionText: string;
  metricSelectionText: string;
  previousMetricCategory: string;

  EMPTY_DROPDOWN_TEXT = ' - ';
  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';

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

    if (this.target.entityQuery) {
      this.onFilterChange(false).then(() => {

        // built-in metrics support available metrics on a selected entity type
        if (this.target.entityType && this.target.metricCategory === this.BUILT_IN_METRICS) {
          this.onEntityTypeSelect(false);
        }

        // custom metrics include their entity type but can be filtered
        if (this.target.metricCategory === this.CUSTOM_METRICS) {
          this.onMetricsFilter(false);
        }

        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
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

            if (this.target.metricCategory === this.CUSTOM_METRICS) {
              this.filterForCustom(refresh);
            } else if (this.target.metricCategory === this.BUILT_IN_METRICS) {
              this.filterForEntityType(refresh);
            }
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
    this.previousMetricCategory = this.target.metricCategory;
  }

  filterForEntityType(refresh) {
    this.filterEntityTypes();
    this.adjustEntitySelectionPlaceholder();

    if (!_.includes(this.uniqueEntityTypes, this.target.entityType)) {
      this.target.entityType = null; // entity selection label will be untouched
      this.resetMetricSelection();
    } else if (this.target.metric && refresh) {
      this.panelCtrl.refresh();
    }
  }

  filterForCustom(refresh) {
    this.datasource.getMetricsCatalog(this.target.entityType, this.CUSTOM_METRICS).then(
      customMetrics => {
        this.allCustomMetrics = customMetrics;
        this.onMetricsFilter(refresh);
      }
    );
  }

  filterEntityTypes() {
    this.datasource.getEntityTypes().then(
      entityTypes => {
        this.uniqueEntityTypes =
          _.sortBy(
            _.filter(
              entityTypes,
              entityType => this.snapshots.find(type => type === entityType.key) && entityType.label != null),
            'label');
      }
    );
  }

  onEntityTypeSelect(refresh) {
    this.datasource.getMetricsCatalog(this.target.entityType, this.target.metricCategory).then(
      metrics => {
        this.availableMetrics =
        _.sortBy(
          metrics,
          'key');

        this.adjustMetricSelectionPlaceholder();
        this.checkMetricAndRefresh(refresh);
      }
    );

  }

  onMetricsFilter(refresh) {
    let filter = this.target.filter ? this.target.filter.toLowerCase() : '';
    this.availableMetrics =
      _.sortBy(
        _.filter(
          this.allCustomMetrics,
          metric => _.includes(this.snapshots, metric.entityType) && metric.key.toLowerCase().includes(filter)),
        'key');

    this.adjustMetricSelectionPlaceholder();
    this.checkMetricAndRefresh(refresh);
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
    if (this.target.metricCategory === this.CUSTOM_METRICS) {
      // as there was no type selection upfront, but the metric itself contains the type
      this.target.entityType = this.target.metric.entityType;
    }
    this.panelCtrl.refresh();
  }

  onLabelChange() {
    // we just want to refresh, even this is expensive
    this.panelCtrl.refresh();
  }
}
