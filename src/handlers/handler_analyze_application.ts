import AbstractQueryUpdateHandler from "./handler_abstract";
import TimeFilter from "../types/time_filter";
import _ from "lodash";
import {QueryVariables} from "../query_variables";

export default class AnalyzeApplicationQueryUpdateHandler extends AbstractQueryUpdateHandler {

  ALL_APPLICATIONS = '-- No Application Filter --';
  application = null;

  constructor(datasource) {
    super();
    this.application = datasource;
  }

  onChange(target, timeFilter: TimeFilter) {
    QueryVariables.analyzeLabel = "Application";
    this.onApplicationChanges(false, target, timeFilter).then(() => {
      if (target.metric) {
        target.metric = _.find(QueryVariables.availableMetrics, m => m.key === target.metric.key);
      }
    });
  }

  onApplicationChanges(refresh, target, timeFilter) {
    this.application.getApplications(timeFilter).then(
      applications => {
        QueryVariables.uniqueEntities = applications;
        // if all is not existing, we insert it on top
        if (!_.find(QueryVariables.uniqueEntities, {'key': null})) {
          QueryVariables.uniqueEntities.unshift({key: null, label: this.ALL_APPLICATIONS});
        }
        // select the most loaded website for default/replacement
        if (target && !target.entity && applications) {
          target.entity = applications[0];
        } else if (target && target.entity && !_.find(applications, ['key', target.entity.key])) {
          target.entity = applications[0];
        }
      }
    );
    this.application.getApplicationTags().then(
      applicationTags => {
        QueryVariables.uniqueTags =
          _.sortBy(
            applicationTags,
            'key');
        // select a meaningful default group
        if (target && !target.group) {
          target.group = _.find(applicationTags, ['key', 'endpoint.name']);
        }
      }
    );
    return this.application.getApplicationMetricsCatalog().then(
      metrics => {
        QueryVariables.availableMetrics = metrics;
        //this.checkMetricAndRefresh(refresh);
        //this.adjustMetricSelectionPlaceholder();
      }
    );
  }
}
