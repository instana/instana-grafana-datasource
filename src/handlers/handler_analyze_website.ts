import AbstractQueryUpdateHandler from "./handler_abstract";
import _ from "lodash";
import TimeFilter from "../types/time_filter";
import {QueryVariables} from "../query_variables";

export default class AnalyzeWebsiteQueryUpdateHandler extends AbstractQueryUpdateHandler {

  website = null;

  constructor(datasource) {
    super();
    this.website = datasource;
  }

  onChange(target, timeFilter: TimeFilter) {
    QueryVariables.analyzeLabel = "Website";
    this.onWebsiteChanges(false, target, timeFilter).then(() => {
      if (target.metric) {
        target.metric = _.find(QueryVariables.availableMetrics, m => m.key === target.metric.key);
      }
    });
  }

  onWebsiteChanges(refresh, target, timeFilter) {
    // select a meaningful default group
    if (target && !target.entityType) {
      target.entityType = _.find(QueryVariables.uniqueBeaconTypes, ['key', 'pageLoad']);
    }

    this.website.getWebsites(timeFilter).then(
      websites => {
        QueryVariables.uniqueEntities = websites;
        // select the most loaded website for default/replacement
        if (target && !target.entity && websites) {
          target.entity = websites[0];
        } else if (target && target.entity && !_.find(websites, ['key', target.entity.key])) {
          target.entity = websites[0];
        }
      }
    );

    this.website.getWebsiteTags().then(
      websiteTags => {
        QueryVariables.uniqueTags =
          _.sortBy(
            websiteTags,
            'key');
        // select a meaningful default group
        if (target && !target.group) {
          target.group = _.find(websiteTags, ['key', 'beacon.page.name']);
        }
      }
    );

    return this.website.getWebsiteMetricsCatalog().then(
      metrics => {
        QueryVariables.allWebsiteMetrics = metrics;
        QueryVariables.availableMetrics = _.filter(QueryVariables.allWebsiteMetrics, m => m.beaconTypes.includes(target.entityType.key));
        //this.checkMetricAndRefresh(refresh);
        //this.adjustMetricSelectionPlaceholder();
      }
    );
  }

}
