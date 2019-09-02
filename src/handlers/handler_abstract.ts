import {QueryVariables} from "../query_variables";

export default class AbstractQueryUpdateHandler {

  EMPTY_DROPDOWN_TEXT = ' - ';

  selectionReset(target, isInfrastructure: boolean) {
    if (!isInfrastructure) {
      target.entityQuery = null;
    }
    QueryVariables.uniqueEntityTypes = [];
    QueryVariables.availableMetrics = [];
    QueryVariables.uniqueEntities = [];
    QueryVariables.uniqueTags = [];
    target.timeShift = null; // do we want to reset this ?
    this.resetEntityTypeSelection(target);
    this.resetEntitySelection(target);
    this.resetMetricSelection(target);
  }

  resetEntityTypeSelection(target) {
    target.entityType = null;
    target.customFilters = [];
    QueryVariables.entitySelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

  resetEntitySelection(target) {
    target.entity = null;
    target.group = null;
    target.showGroupBySecondLevel = null;
    target.groupbyTagSecondLevelKey = null;
    target.timeInterval = null;
    target.timeShift = null;
    target.aggregateGraphs = false;
    target.aggregationFunction = null;
    target.filters = [];
    target.showWarningCantShowAllResults = false;
    target.showAllMetrics = false;
    target.canShowAllMetrics = false;
  }

  resetMetricSelection(target) {
    target.metric = null;
    target.filter = null;
    target.timeInterval = null;
    target.timeShift = null;
    target.showWarningCantShowAllResults = false;
    target.showAllMetrics = false;
    target.labelFormat = null;
    QueryVariables.metricSelectionText = this.EMPTY_DROPDOWN_TEXT;
  }

}
