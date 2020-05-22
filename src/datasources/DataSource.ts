import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  SelectableValue,
} from '@grafana/data';

import { InstanaQuery } from '../types/instana_query';
import { InstanaOptions } from '../types/instana_options';
import { getRequest } from '../util/request_handler';
import { DataSourceSlo } from "./DataSource_Slo";
import MetricCategories from '../lists/metric_categories';
import TimeFilter from "../types/time_filter";
import { readTime } from "../util/time_util";
import { emptyResultData } from "../util/target_util";
import _ from "lodash";
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import {
  getDefaultChartGranularity, getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups
} from '../util/rollup_granularity_util';

export class DataSource extends DataSourceApi<InstanaQuery, InstanaOptions> {
  options: InstanaOptions;
  dataSourceInfrastructure: DataSourceInfrastructure;
  dataSourceSlo: DataSourceSlo;
  timeFilter!: TimeFilter;
  availableGranularities: SelectableValue[];
  availableRollups: SelectableValue[];
  availableTimeIntervals: SelectableValue[];

  constructor(instanceSettings: DataSourceInstanceSettings<InstanaOptions>) {
    super(instanceSettings);
    this.options = instanceSettings.jsonData;
    this.availableGranularities = [];
    this.availableRollups = [];
    this.availableTimeIntervals = [];
    this.dataSourceSlo = new DataSourceSlo(instanceSettings.jsonData);
    this.dataSourceInfrastructure = new DataSourceInfrastructure(instanceSettings.jsonData);
  }

  async query(options: DataQueryRequest<InstanaQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    this.timeFilter = readTime(range!);
    this.availableRollups = getPossibleRollups(this.timeFilter);
    this.availableGranularities = getPossibleGranularities(this.timeFilter.windowSize);

    return Promise.all(options.targets.map(target => {
      if (!target.metricCategory) {
        target.metricCategory = MetricCategories[0];
      }

      this.setPossibleTimeIntervals(target);

      if (target.metricCategory.key === 7) {
        return this.dataSourceSlo.runQuery(target, this.timeFilter);
      } else if (target.metricCategory.key === 0 || target.metricCategory.key === 1) {
        return this.dataSourceInfrastructure.runQuery(target, this.timeFilter);
      }

      return Promise.resolve(emptyResultData(target.refId));
    })).then(targets => {
      return { data: _.flatten(targets) };
    })
  }

  getSloReports(): Promise<SelectableValue<string>[]> {
    return this.dataSourceSlo.getConfiguredSLOs();
  }

  getEntityTypes(): Promise<SelectableValue<string>[]> {
    return this.dataSourceInfrastructure.getEntityTypes();
  }

  fetchTypesForTarget(query: InstanaQuery) {
    return this.dataSourceInfrastructure.fetchTypesForTarget(query, this.timeFilter);
  }

  getDefaultTimeInterval(query: InstanaQuery) {
    if (query.metricCategory.key === 0 || query.metricCategory.key === 1) {
      return getDefaultMetricRollupDuration(this.timeFilter);
    } else {
      return getDefaultChartGranularity(this.timeFilter.windowSize);
    }
  }

  setPossibleTimeIntervals(target: InstanaQuery) {
    if (target.metricCategory.key === 0 || target.metricCategory.key === 1) {
      this.availableTimeIntervals = this.availableRollups;
    } else {
      this.availableTimeIntervals = this.availableGranularities;
    }
  }

  testDatasource(): Promise<any> {
    return getRequest(this.options, '/api/monitoringState').then(
      (result: any) => {
        return {
          status: 'success',
          message: 'Successfully connected to the Instana API.',
          title: 'Success',
        };
      },
      (error: any) => {
        if (error.status === 401) {
          return {
            status: 'error',
            message: 'Unauthorized. Please verify the API Token.',
            title: 'Error',
          };
        } else {
          console.log(error);
          return {
            status: 'error',
            message: 'Error (' + error.status + ') connecting to the Instana API: ' + error.statusText,
            title: 'Error',
          };
        }
      }
    );
  }
}
