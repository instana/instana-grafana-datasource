///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';
import './css/query_editor.css!';
import metricsDefinition from './metrics';

export class InstanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  metricsDefinition = metricsDefinition;
  uniqueEntityTypes: Array<string>;
  availableMetrics: Array<Object>;
  entitySelectionText: string;
  metricSelectionText: string;

  EMPTY_DROPDOWN_TEXT = ' - ';

  BUILD_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  FREE_METRICS = '2';

  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv, private backendSrv, private $q) {
    super($scope, $injector);

    this.target.pluginId = this.panelCtrl.pluginId;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;

    // on new panel creation we default to built-in
    if (!this.target.metricCategorie) {
      this.target.metricCategorie = this.BUILD_IN_METRICS;
    }

    if (this.target.entityQuery) {
      this.onFilterChange(false).then(() => {

        // only build-in metrics support a selected entity type
        if (this.target.entityType && this.target.metricCategorie === this.BUILD_IN_METRICS) {
          this.onEntityTypeSelect(false);
        }

        if (this.target && this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }
  }

  onFilterChange(refresh) {
    if (this.target.entityQuery === '') { // FIXME should be (!this.target.entityQuery), but this breaks tests?
      this.uniqueEntityTypes = [];
      this.resetMetricSelection();
      this.resetEntityTypeSelection();
      return this.$q.resolve();
    } else {
      const url = `/api/snapshots/types?q=${encodeURIComponent(this.target.entityQuery)}` +
        `&time=${Date.now()}&newApplicationModelEnabled=${this.datasource.newApplicationModelEnabled === true}`;

      return this.datasource.request('GET', url)
        .then(
          response => {
            this.target.queryIsValid = true;
            if (this.target.metricCategorie === this.BUILD_IN_METRICS) {
              this.filterBuildIn(response, refresh);
            } else if (this.target.metricCategorie === this.CUSTOM_METRICS) {
              this.filterCustom(response, refresh);
            } else {
              alert("not yet supported!");
            }
          },
          error => {
            this.target.queryIsValid = false;
            this.uniqueEntityTypes = [];
            this.resetEntityTypeSelection();
          });
    }
  }

  filterBuildIn(response, refresh) {
    this.uniqueEntityTypes =
      _.filter(
        response.data,
        entityType => metricsDefinition[entityType.toLowerCase()] && metricsDefinition[entityType.toLowerCase()].label != null);

    this.entitySelectionText = this.uniqueEntityTypes.length > 0
      ? 'Please select (' + this.uniqueEntityTypes.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;

    if (!_.includes(this.uniqueEntityTypes, this.target.entityType)) {
      this.resetMetricSelection();
      this.resetEntityTypeSelection();
    } else if (this.target.metric && refresh) {
      this.panelCtrl.refresh();
    }
  }

  filterCustom(response, refresh) {
    this.datasource.getCatalog().then(customMetrics => {
      this.availableMetrics =
        _.sortBy(
          _.filter(
            customMetrics,
            metric => _.includes(this.datasource.CUSTOM_METRIC_TYPES, metric.entityType)),
          ['key']);

      this.metricSelectionText = this.availableMetrics.length > 0
        ? 'Please select (' + this.availableMetrics.length + ')'
        : this.EMPTY_DROPDOWN_TEXT;

      if (this.target.metric && !_.includes(_.map(this.availableMetrics, m => m.key), this.target.metric.key)) {
        this.resetMetricSelection();
      } else if (this.target.metric && refresh) {
        this.panelCtrl.refresh();
      }
    });
  }

  onMetricCategorieSelect() {
    this.selectionReset();
    this.onFilterChange(true);
  }

  selectionReset() {
    this.uniqueEntityTypes = [];
    this.availableMetrics = [];
    this.resetMetricSelection();
    this.resetEntityTypeSelection();
  }

  resetMetricSelection() {
    this.target.metric = null;
    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetEntityTypeSelection() {
    this.target.entityType = null;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  onEntityTypeSelect(refresh) {
    this.availableMetrics =
      _.map(
        this.metricsDefinition[this.target.entityType.toLowerCase()].metrics,
          (value, key) => {
            return {
              "key": key,
              "label": value};
      });

    this.metricSelectionText = this.availableMetrics.length > 0
      ? 'Please select (' + this.availableMetrics.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;

    if (this.target.metric && !_.includes(_.map(this.availableMetrics, m => m.key), this.target.metric.key)) {
      this.resetMetricSelection();
    } else if (this.target.metric && refresh) {
      this.panelCtrl.refresh();
    }
  }

  onMetricSelect() {
    if (this.target.metricCategorie === this.CUSTOM_METRICS) {
      // as there was no type selection upfront, but the metric itself contains the type
      this.target.entityType = this.target.metric.entityType;
    }
    this.panelCtrl.refresh();
  }
}
