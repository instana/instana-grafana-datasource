///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import metricsDefinition from './metrics';
import {QueryCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import './css/query_editor.css!';

export class InstanaQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  metricsDefinition = metricsDefinition;
  uniqueEntityTypes: Array<string>;
  allCustomMetrics: Array<Object>;
  availableMetrics: Array<Object>; // subset of allCustomMetrics for display only
  snapshots: Array<Object>;
  entitySelectionText: string;
  metricSelectionText: string;
  previousMetricCategory: string;
  buildInMetricCount: number;

  EMPTY_DROPDOWN_TEXT = ' - ';
  BUILD_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  INSERTED_METRIC = '2';

  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv, private backendSrv, private $q) {
    super($scope, $injector);

    this.target.pluginId = this.panelCtrl.pluginId;
    this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
    this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;

    // on new panel creation we default the category selection to built-in
    if (!this.target.metricCategorie) {
      this.target.metricCategorie = this.BUILD_IN_METRICS;
    }
    this.previousMetricCategory = this.target.metricCategorie;

    if (this.target.entityQuery) {
      this.onFilterChange(false).then(() => {

        // build-in metrics support available metrics on a selected entity type
        if (this.target.entityType && this.hasEntityTypeSelection()) {
          this.onEntityTypeSelect(false);
        }

        // custom metrics include their entity type but can be filtered
        if (this.target.metricCategorie === this.CUSTOM_METRICS) {
          this.onMetricsFilter(false);
        }

        // ui inserted metrics will not be available in any known metric list
        if (this.target.metric && this.target.metricCategorie !== this.INSERTED_METRIC) {
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
      const url = `/api/snapshots/types?q=${encodeURIComponent(this.target.entityQuery)}` +
        `&time=${Date.now()}` +
        `&newApplicationModelEnabled=${this.datasource.newApplicationModelEnabled === true}`;

      return this.datasource.request('GET', url)
        .then(
          response => {
            this.target.queryIsValid = true;
            this.snapshots = response.data;

            if (this.target.metricCategorie === this.CUSTOM_METRICS) {
              this.filterForCustom(refresh);
            } else if (this.hasEntityTypeSelection()) {
              this.filterForEntityType(refresh);
            }
          },
          error => {
            this.target.queryIsValid = false;
            this.selectionReset();
          });
    }
  }

  onMetricCategorieSelect() {
    if (this.previousMetricCategory === this.target.metricCategorie) {
      // nothing needs to be done
    } else {
      this.selectionReset();
      this.onFilterChange(true);
    }
    this.previousMetricCategory = this.target.metricCategorie;
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
    if (!this.allCustomMetrics) {
      this.datasource.getCatalog().then(customMetrics => {
        this.allCustomMetrics = customMetrics;
        this.onMetricsFilter(refresh);
      });
    } else {
      this.onMetricsFilter(refresh);
    }
  }

  filterEntityTypes() {
    this.uniqueEntityTypes =
      _.sortBy(
        _.filter(
          this.snapshots,
          entityType => metricsDefinition[entityType.toLowerCase()] && metricsDefinition[entityType.toLowerCase()].label != null),
        'label');
  }

  filterBuildInMetrics(refresh) {
    this.availableMetrics =
      _.sortBy(
        _.map(
          this.metricsDefinition[this.target.entityType.toLowerCase()].metrics,
            (value, key) => {
              return { 'key' : key, 'label' : value};
            }),
        'key');

    this.adjustMetricSelectionPlaceholder();
    this.checkMetricAndRefresh(refresh);
  }

  onMetricsFilter(refresh) {
    let filter = this.target.filter ? this.target.filter.toLowerCase() : '';
    this.availableMetrics =
      _.sortBy(
        _.filter(
          this.allCustomMetrics,
          metric => metric.key.toLowerCase().includes(filter)),
        'key');

        // TODO
        // combine filter and filter in filter or what ?
        // _.filter(
        // this.snapshots,
        // entityType => metricsDefinition[entityType.toLowerCase()] && metricsDefinition[entityType.toLowerCase()].label != null);
        //
        //
        // _.filter(
        //   this.allCustomMetrics,
        //   metric => _.includes(['dropwizardApplicationContainer'], metric.entityType))

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

  hasEntityTypeSelection() {
    return this.target.metricCategorie === this.BUILD_IN_METRICS ||
           this.target.metricCategorie === this.INSERTED_METRIC;
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

    this.target.metricInput = null;
  }

  adjustEntitySelectionPlaceholder() {
    this.entitySelectionText = this.uniqueEntityTypes.length > 0
      ? 'Please select (' + this.uniqueEntityTypes.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;
  }

  adjustMetricSelectionPlaceholder() {
    if (this.target.metricCategorie === this.CUSTOM_METRICS) {
      this.metricSelectionText = this.allCustomMetrics.length > 0
      ? 'Please select (' + this.availableMetrics.length + '/' + this.allCustomMetrics.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;
    } else {
      this.metricSelectionText = this.availableMetrics.length > 0
      ? 'Please select (' + this.availableMetrics.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;
    }
  }

  onEntityTypeSelect(refresh) {
    if (this.target.metricCategorie === this.BUILD_IN_METRICS) {
      this.filterBuildInMetrics(refresh);
    } else if (this.target.metricCategorie === this.INSERTED_METRIC && this.target.metric && refresh) {
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

  onMetricInput() {
    if (this.target.metricCategorie === this.INSERTED_METRIC) {
      // convert, as inserted metrics do not match out expect metric object
      this.target.metric = {'key' : this.target.metricInput, 'label' : 'handmade metric input'};
    }
    this.panelCtrl.refresh();
  }
}
