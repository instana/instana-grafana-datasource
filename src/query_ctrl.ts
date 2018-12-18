///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {QueryCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import './css/query_editor.css!';

export interface Selectable {
  key: string;
  label: string;
  type: string;
}

export interface TagFilter {
  tag: Selectable;
  operator: string;
  stringValue: string;
  numberValue: number;
  booleanValue: boolean;
  isValid: boolean;
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
  uniqueAggregations: Array<Object>;

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

    // infrastructure (built-in & custom)
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

    // websites & applications
    if (this.target.entity) {
      this.onSomeChange(false).then(() => {
        if (this.target.metric) {
          this.target.metric = _.find(this.availableMetrics, m => m.key === this.target.metric.key);
        }
      });
    }
  }

  onEveryChange(refresh) {
    if (this.target.metricCategory === this.BUILT_IN_METRICS || this.target.metricCategory === this.CUSTOM_METRICS) {
      this.onFilterChange(refresh);
    }
    if (this.target.metricCategory === this.WEBSITE_METRICS) {
      this.onSomeChange(refresh);
    }
  }

  onSomeChange(refresh) {
    // TODO all operatos
    this.uniqueOperators = [
      { key: "EQUALS", label: "equals", type: "STRING" },
      { key: "CONTAINS", label: "contains", type: "STRING" },
      { key: "NOT_CONTAIN", label: "not contains", type: "STRING" },
      { key: "NOT_EQUAL", label: "is empty", type: "STRING" },
      { key: "IS_EMPTY", label: "is empty", type: "STRING" },

      { key: "EQUALS", label: "equals", type: "NUMBER" },
      { key: "LESS_THAN", label: "less than", type: "NUMBER" },
      { key: "GREATER_THAN", label: "greater than", type: "NUMBER" },

      { key: "EQUALS", label: "not empty", type: "BOOLEAN" },
    ];

    this.uniqueAggregations = [
      { key: "SUM", label: "sum", type: ""},
      { key: "MEAN", label: "mean", type: ""},
      { key: "MAX", label: "max", type: ""},
      { key: "MIN", label: "min", type: ""},
      { key: "P25", label: "p 25", type: ""},
      { key: "P50", label: "p 50", type: ""},
      { key: "P90", label: "p 90", type: ""},
      { key: "P95", label: "p 95", type: ""},
      { key: "P98", label: "p 98", type: ""},
      { key: "P99", label: "p 99", type: ""},
      { key: "DISTINCT_COUNT", label: "count", type: ""},
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

    if (this.target.entity === '') {
      this.selectionReset();
      return this.$q.resolve();
    } else {
      this.checkMetricAndRefresh(refresh);
      return this.$q.resolve();
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
      this.onEveryChange(true);
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
    this.panelCtrl.refresh();
  }

  addFilter() {
    if (!this.target.filters) {
      this.target.filters = [];
    }
    this.target.filters.push({
      tag: undefined,
      operator: "",
      stringValue: "",
      numberValue: 0,
      booleanValue: false,
      isValid: false
    });
  }

  removeFilter(index) {
    this.target.filters.splice(index, 1);

    this.panelCtrl.refresh();
  }

  onTagFilterChange(index) {
    // validate changed filter
    let filter: TagFilter = this.target.filters[index];
    if (filter.tag && filter.operator) {
      if ("STRING" === filter.tag.type && filter.stringValue) {
        filter.isValid = true;
      } else if ("NUMBER" === filter.tag.type && filter.numberValue) {
        filter.isValid = true;
      } else if ("BOOLEAN" === filter.tag.type && filter.booleanValue) {
        filter.isValid = true;
      } else {
        filter.isValid = false;
      }
    } else {
      filter.isValid = false;
    }
    this.panelCtrl.refresh();
  }

  onGroupChange() {
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
    console.log(this.target);
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
    this.panelCtrl.refresh();
  }
}
