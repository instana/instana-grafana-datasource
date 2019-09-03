import AbstractQueryUpdateHandler from "./handler_abstract";
import TimeFilter from "../types/time_filter";
import {QueryVariables} from "../query_variables";
import _ from "lodash";
import Selectable from "../types/selectable";

export default class InfrastructureQueryUpdateHandler extends AbstractQueryUpdateHandler {

  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  infrastructure = null;

  constructor(datasource) {
    super();
    this.infrastructure = datasource;
  }

  onChange(target, timeFilter: TimeFilter) {
    this.onFilterChange(false, target, timeFilter).then(() => {
      // infrastructure metrics support available metrics on a selected entity type
      if (target.entityType) {
        this.onEntityTypeSelect(false, target).then(() => {
          if (target.metric || target.showAllMetrics) {
            target.metric = _.find(QueryVariables.availableMetrics, m => m.key === target.metric.key);
          }
        });

        target.timeInterval = this.infrastructure.getDefaultMetricRollupDuration(timeFilter);
      }
    });
  }

  onFilterChange(refresh: boolean, target, timeFilter) {
    if (!target.entityQuery) {
      this.selectionReset(target, true);
      //return this.$q.resolve();
    } else {
      return this.infrastructure.fetchTypesForTarget(target, timeFilter)
        .then(
          response => {
            target.queryIsValid = true;
            QueryVariables.snapshots = response.data;

            this.filterForEntityType(target, refresh);
          },
          error => {
            target.queryIsValid = false;
            this.selectionReset(target, true);
          });
    }
  }

  onEntityTypeSelect(refresh: boolean, target) {
    return this.infrastructure.getMetricsCatalog(target.entityType, target.metricCategory).then(
      metrics => {
        QueryVariables.availableMetrics =
          _.sortBy(
            metrics,
            'key');

        // store all metrics in addition for filtering
        if (target.metricCategory === this.CUSTOM_METRICS) {
          QueryVariables.allCustomMetrics = metrics;
          this.onMetricsFilter(target, refresh);
        }

        //this.checkMetricAndRefresh(refresh);
        //this.adjustMetricSelectionPlaceholder();
      }
    );
  }

  onMetricsFilter(target, refresh: boolean) {
    if (!target.customFilters || target.customFilters.length === 0) {
      // don't do any filtering if no custom filters are set.
      QueryVariables.availableMetrics = QueryVariables.allCustomMetrics;
      target.canShowAllMetrics = false;
      target.showAllMetrics = false;
      //this.panelCtrl.refresh();
    } else {
      let filteredMetrics = QueryVariables.allCustomMetrics;
      _.forEach(target.customFilters, filter => {
        filteredMetrics =
          _.sortBy(
            _.filter(
              filteredMetrics,
              metric => metric.key.toLowerCase().includes(filter.value.toLowerCase())),
            'key');
      });

      QueryVariables.availableMetrics = filteredMetrics;
      target.canShowAllMetrics = this.isAbleToShowAllMetrics(target);

      if (!target.canShowAllMetrics) {
        target.showAllMetrics = false;
      }
    }

    //  this.checkMetricAndRefresh(refresh);
    //  this.adjustMetricSelectionPlaceholder();
  }


  isAbleToShowAllMetrics(target) {
    return target.metricCategory === this.CUSTOM_METRICS
      && QueryVariables.availableMetrics.length > 0
      && QueryVariables.availableMetrics.length <= 5;
  }

  filterForEntityType(target, refresh: boolean) {
    this.filterEntityTypes(target).then(() => {
      this.adjustEntitySelectionPlaceholder();

      if (target.entityType && !_.find(QueryVariables.uniqueEntityTypes, ['key', target.entityType.key])) {
        target.entityType = null; // entity selection label will be untouched
        this.resetMetricSelection(target);
      } else if (target.metric && refresh) {
        //this.panelCtrl.refresh();
      }
    });
  }

  adjustEntitySelectionPlaceholder() {
    QueryVariables.entitySelectionText = QueryVariables.uniqueEntityTypes.length > 0
      ? 'Please select (' + QueryVariables.uniqueEntityTypes.length + ')'
      : this.EMPTY_DROPDOWN_TEXT;
  }

  filterEntityTypes(target) {
    return this.infrastructure.getEntityTypes(target.metricCategory).then(
      entityTypes => {
        QueryVariables.uniqueEntityTypes =
          _.sortBy(
            _.filter(
              entityTypes,
              entityType => this.findMatchingEntityTypes(target, entityType)),
            'label');
      }
    );
  }

  findMatchingEntityTypes(target, entityType: Selectable) {
    // workaround as long the api does not support returning plugins with custom metrics only
    if (target.metricCategory === this.BUILT_IN_METRICS ||
      entityType.key === 'statsd' ||
      entityType.key === 'prometheus' ||
      entityType.key === 'jvmRuntimePlatform' ||
      entityType.key === 'dropwizardApplicationContainer') {
      return QueryVariables.snapshots.find(type => type === entityType.key) && entityType.label != null;
    }
  }
}
