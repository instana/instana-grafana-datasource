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
    this.target.metricCategorie = '0';

    if (this.target.entityQuery) {
      this.onFilterChange(false).then(() => {
        if (this.target.entityType) {
          this.onEntityTypeSelect(false);
        }

        if (this.target && this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }
  }

  onFilterChange(refresh) {
    if (this.target.entityQuery === '') {
      this.uniqueEntityTypes = [];
      this.target.entityType = null;
      this.target.metric = null;
      this.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
      this.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
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
              this.filterCustom(refresh);
            } else {
              alert("FREE_METRICS not yet supported!");
            }
          },
          error => {
            this.target.queryIsValid = false;
            this.target.entityType = null;
            this.uniqueEntityTypes = [];
          });
    }
  }

  filterCustom(refresh) {
    this.datasource.getCatalog().then(customMetrics => {

       this.availableMetrics =
         _.filter(
           customMetrics,
           metric => _.includes(this.datasource.CUSTOM_METRIC_TYPES, metric.type));

       this.metricSelectionText = this.availableMetrics.length > 0
         ? 'Please select (' + this.availableMetrics.length + ')'
         : this.EMPTY_DROPDOWN_TEXT;

       if (this.target.metric && !_.includes(_.map(this.availableMetrics, m => m.key), this.target.metric.key)) {
         this.target.metric = null;
         this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
       } else {
         if (this.target.metric && refresh) {
           this.panelCtrl.refresh();
         }
       }
    });
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
      this.target.entityType = null;
      this.target.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
      this.target.metric = null;
      this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
    } else {
      if (this.target.metric && refresh) {
        this.panelCtrl.refresh();
      }
    }
  }

  onMetricCategorieSelect(){
    this.selectionReset();
    this.onFilterChange(true);
  }

  selectionReset(){
    this.uniqueEntityTypes = null;
    this.availableMetrics = null;
    this.target.metric = null;
    this.target.entityType = null;
    this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
    this.target.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
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
       this.target.metric = null;
       this.target.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
     } else {
       if (this.target.metric && refresh) {
         this.panelCtrl.refresh();
       }
     }
  }

  onMetricSelect() {
    this.panelCtrl.refresh();
  }
}
