import {
  ANALYZE_APPLICATION_METRICS,
  ANALYZE_MOBILE_APP_METRICS,
  ANALYZE_WEBSITE_METRICS,
  APPLICATION_SERVICE_ENDPOINT_METRICS,
  BUILT_IN_METRICS,
  CUSTOM_METRICS,
  INFRASTRUCTURE_ANALYZE,
  SLO_INFORMATION,
  SLO2_INFORMATION,
  SYNTHETIC_MONITORING,
} from '../GlobalVariables';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  SelectableValue,
  MetricFindValue,
} from '@grafana/data';
import { getTemplateSrv, TemplateSrv } from '@grafana/runtime';
import { appendData, generateStableHash, getDeltaRequestTimestamp, hasIntersection } from '../util/delta_util';
import {
  getDefaultChartGranularity,
  getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups,
} from '../util/rollup_granularity_util';
import { getRequest, instanaUrl } from '../util/request_handler';
import { hoursToMs, readTime } from '../util/time_util';

import Cache from '../cache';
import { DataSourceApplication } from './DataSource_Application';
import { DataSourceEndpoint } from './DataSource_Endpoint';
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import { DataSourceMobileApp } from './DataSource_MobileApp';
import { DataSourceService } from './DataSource_Service';
import { DataSourceSlo } from './DataSource_Slo';
import { DataSourceSlo2 } from './DataSource_Slo2';
import { DataSourceWebsite } from './DataSource_Website';
import { DataSourceSyntheticMonitoring } from './DataSource_SyntheticMonitoring';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import MetricCategories from '../lists/metric_categories';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import { aggregateTarget } from '../util/aggregation_util';
import { emptyResultData } from '../util/target_util';
import getVersion from '../util/instana_version';
import { isInvalidQueryInterval } from '../util/queryInterval_check';
import migrate from '../migration';
import { readItemMetrics } from '../util/analyze_util';

export class DataSource extends DataSourceApi<InstanaQuery, InstanaOptions> {
  options: InstanaOptions;
  templateSrv: TemplateSrv;
  dataSourceInfrastructure: DataSourceInfrastructure;
  dataSourceWebsite: DataSourceWebsite;
  dataSourceMobileapp: DataSourceMobileApp;
  dataSourceApplication: DataSourceApplication;
  dataSourceService: DataSourceService;
  dataSourceEndpoint: DataSourceEndpoint;
  dataSourceSlo: DataSourceSlo;
  dataSourceSlo2: DataSourceSlo2;
  dataSourceSyntheticMonitoring: DataSourceSyntheticMonitoring;
  timeFilter!: TimeFilter;
  availableGranularities: SelectableValue[];
  availableRollups: SelectableValue[];
  availableTimeIntervals: SelectableValue[];
  resultCache: Cache<any>;

  constructor(instanceSettings: DataSourceInstanceSettings<InstanaOptions>) {
    super(instanceSettings);
    this.options = instanceSettings.jsonData;
    this.options.url = instanaUrl(instanceSettings);
    this.templateSrv = getTemplateSrv();
    this.availableGranularities = [];
    this.availableRollups = [];
    this.availableTimeIntervals = [];
    this.dataSourceSlo = new DataSourceSlo(instanceSettings.jsonData);
    this.dataSourceSlo2 = new DataSourceSlo2(instanceSettings.jsonData);
    this.dataSourceInfrastructure = new DataSourceInfrastructure(instanceSettings.jsonData, this.templateSrv);
    this.dataSourceWebsite = new DataSourceWebsite(instanceSettings.jsonData);
    this.dataSourceMobileapp = new DataSourceMobileApp(instanceSettings.jsonData);
    this.dataSourceApplication = new DataSourceApplication(instanceSettings.jsonData);
    this.dataSourceService = new DataSourceService(instanceSettings.jsonData);
    this.dataSourceEndpoint = new DataSourceEndpoint(instanceSettings.jsonData);
    this.dataSourceSyntheticMonitoring = new DataSourceSyntheticMonitoring(instanceSettings.jsonData);

    this.resultCache = new Cache<any>();
  }

  /**
   * Checks if a value contains template variables
   * @param value - The value to check
   * @returns True if value contains variables ($var or ${var})
   */
  private isVariable(value: string | undefined): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    return value.includes('$');
  }

  /**
   * Replaces template variables in a string value
   * @param value - The string containing variables to replace
   * @param scopedVars - Scoped variables from the query context
   * @returns The string with variables replaced
   */
  private replaceVariables(value: string | undefined, scopedVars?: any): string {
    if (!value) {
      return '';
    }
    return this.templateSrv.replace(value, scopedVars);
  }

  /**
   * Interpolates variables in all relevant fields of the query target
   * @param target - The query target to interpolate
   * @param scopedVars - Scoped variables from the query context
   * @returns A new target with variables interpolated
   */
  interpolateVariables(target: InstanaQuery, scopedVars?: any): InstanaQuery {
    const interpolated = { ...target };

    // Replace variables in entity query (Dynamic Focus query)
    if (interpolated.entityQuery) {
      interpolated.entityQuery = this.replaceVariables(interpolated.entityQuery, scopedVars);
    }

    if (interpolated.entityType?.key && this.isVariable(interpolated.entityType.key)) {
      const interpolatedValue = this.replaceVariables(interpolated.entityType.key, scopedVars);
      interpolated.entityType = {
        key: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const metricKey = interpolated.metric?.key || interpolated.metric?.value;
    if (metricKey && this.isVariable(metricKey)) {
      const interpolatedValue = this.replaceVariables(metricKey, scopedVars);
      interpolated.metric = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
        aggregations: interpolated.metric.aggregations || [],
      };
    }

    const entityTypeKey = interpolated.entityType?.key || interpolated.entityType?.value;
    if (entityTypeKey && this.isVariable(entityTypeKey)) {
      const interpolatedValue = this.replaceVariables(entityTypeKey, scopedVars);
      interpolated.entityType = {
        key: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const entityKey = interpolated.entity?.key || interpolated.entity?.value;
    if (entityKey && this.isVariable(entityKey)) {
      const interpolatedValue = this.replaceVariables(entityKey, scopedVars);
      interpolated.entity = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
      };
      if (interpolated.metricCategory?.key === SYNTHETIC_MONITORING) {
        interpolated.testId = interpolatedValue;
      }
    }

    const selectedEntityKey = interpolated.selectedEntity?.key || interpolated.selectedEntity?.value;
    if (selectedEntityKey && this.isVariable(selectedEntityKey)) {
      const interpolatedValue = this.replaceVariables(selectedEntityKey, scopedVars);
      interpolated.selectedEntity = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const serviceKey = interpolated.service?.key || interpolated.service?.value;
    if (serviceKey && this.isVariable(serviceKey)) {
      const interpolatedValue = this.replaceVariables(serviceKey, scopedVars);
      interpolated.service = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const endpointKey = interpolated.endpoint?.key || interpolated.endpoint?.value;
    if (endpointKey && this.isVariable(endpointKey)) {
      const interpolatedValue = this.replaceVariables(endpointKey, scopedVars);
      interpolated.endpoint = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const groupKey = interpolated.group?.key || interpolated.group?.value;
    if (groupKey && this.isVariable(groupKey)) {
      const interpolatedValue = this.replaceVariables(groupKey, scopedVars);
      interpolated.group = {
        ...interpolated.group,
        key: interpolatedValue,
        label: interpolatedValue,
        value: interpolatedValue,
      };
    } else if (interpolated.group) {
      interpolated.group = { ...interpolated.group };
    }

    if (interpolated.filters && interpolated.filters.length > 0) {
      interpolated.filters = interpolated.filters.map((filter) => ({
        ...filter,
        stringValue: this.replaceVariables(filter.stringValue, scopedVars),
      }));
    }

    if (interpolated.tagFilterExpression) {
      interpolated.tagFilterExpression = this.replaceVariables(interpolated.tagFilterExpression, scopedVars);
    }

    if (interpolated.freeTextMetrics) {
      interpolated.freeTextMetrics = this.replaceVariables(interpolated.freeTextMetrics, scopedVars);
    }

    if (interpolated.customFilters && interpolated.customFilters.length > 0) {
      interpolated.customFilters = interpolated.customFilters.map((filter) =>
        this.replaceVariables(filter, scopedVars)
      );
    }

    if (interpolated.groupbyTagSecondLevelKey) {
      interpolated.groupbyTagSecondLevelKey = this.replaceVariables(interpolated.groupbyTagSecondLevelKey, scopedVars);
    }

    const aggregationKey = interpolated.aggregation?.key || interpolated.aggregation?.value;
    if (aggregationKey && this.isVariable(aggregationKey)) {
      const interpolatedValue = this.replaceVariables(aggregationKey, scopedVars);
      interpolated.aggregation = {
        key: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const timeIntervalKey = interpolated.timeInterval?.key || interpolated.timeInterval?.value;
    if (timeIntervalKey && this.isVariable(timeIntervalKey)) {
      const interpolatedValue = this.replaceVariables(timeIntervalKey, scopedVars);
      interpolated.timeInterval = {
        key: interpolatedValue,
        label: interpolatedValue,
      };
    }

    if (interpolated.timeShift) {
      interpolated.timeShift = this.replaceVariables(interpolated.timeShift, scopedVars);
    }

    if (interpolated.labelFormat) {
      interpolated.labelFormat = this.replaceVariables(interpolated.labelFormat, scopedVars);
    }

    if (interpolated.applicationCallToEntity) {
      interpolated.applicationCallToEntity = this.replaceVariables(interpolated.applicationCallToEntity, scopedVars);
    }

    if (interpolated.callToEntity) {
      interpolated.callToEntity = this.replaceVariables(interpolated.callToEntity, scopedVars);
    }

    const sloReportKey = interpolated.sloReport?.key || interpolated.sloReport?.value;
    if (sloReportKey && this.isVariable(sloReportKey)) {
      const interpolatedValue = this.replaceVariables(sloReportKey, scopedVars);
      interpolated.sloReport = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
      };
    }

    const slo2ReportKey = interpolated.slo2Report?.key || interpolated.slo2Report?.value;
    if (slo2ReportKey && this.isVariable(slo2ReportKey)) {
      const interpolatedValue = this.replaceVariables(slo2ReportKey, scopedVars);
      interpolated.slo2Report = {
        key: interpolatedValue,
        value: interpolatedValue,
        label: interpolatedValue,
      };
    }

    if (interpolated.sloValue) {
      interpolated.sloValue = this.replaceVariables(interpolated.sloValue, scopedVars);
    }

    const testTypeValue = interpolated.testType?.value;
    if (testTypeValue && this.isVariable(testTypeValue)) {
      const interpolatedValue = this.replaceVariables(testTypeValue, scopedVars);
      interpolated.testType = {
        value: interpolatedValue,
        label: interpolatedValue,
      };
    }

    return interpolated;
  }

  async query(options: DataQueryRequest<InstanaQuery>): Promise<DataQueryResponse> {
    const { range, scopedVars } = options;
    this.timeFilter = readTime(range!);
    this.availableRollups = getPossibleRollups(this.timeFilter);
    this.availableGranularities = getPossibleGranularities(this.timeFilter.windowSize);

    return Promise.all(
      options.targets.map((target) => {
        let targetTimeFilter = readTime(range!);

        // grafana setting to disable query execution
        if (target.hide) {
          return { data: [], target: target };
        }

        // Interpolate variables in the target
        target = this.interpolateVariables(target, scopedVars);

        // target migration for downwards compatibility
        migrate(target);

        if (!target.metricCategory) {
          target.metricCategory = MetricCategories[0];
        }

        this.setPossibleTimeIntervals(target);
        if (!this.availableTimeIntervals.find((i) => i.key === target.timeInterval.key)) {
          target.timeInterval = this.getDefaultTimeInterval(target);
        }

        if (target.timeShift) {
          let millis = this.convertTimeShiftToMillis(target.timeShift);
          if (millis > 0) {
            targetTimeFilter = this.applyTimeShiftOnTimeFilter(targetTimeFilter, millis);
          }
        }

        target.timeFilter = targetTimeFilter;
        target.stableHash = generateStableHash(target);
        targetTimeFilter = this.adjustTimeFilterIfCached(targetTimeFilter, target);
        const category = target.metricCategory.key;

        if (category === SLO_INFORMATION) {
          return this.dataSourceSlo.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (category === SLO2_INFORMATION) {
          return this.dataSourceSlo2.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (category === SYNTHETIC_MONITORING) {
          return this.dataSourceSyntheticMonitoring.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTarget(target, data);
          });
        } else if (category === INFRASTRUCTURE_ANALYZE) {
          return this.dataSourceInfrastructure.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTarget(target, data);
          });
        } else if (category === BUILT_IN_METRICS || category === CUSTOM_METRICS) {
          return this.dataSourceInfrastructure.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (category === ANALYZE_WEBSITE_METRICS) {
          return this.dataSourceWebsite.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (category === ANALYZE_MOBILE_APP_METRICS) {
          return this.dataSourceMobileapp.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (category === ANALYZE_APPLICATION_METRICS) {
          return this.dataSourceApplication.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (category === APPLICATION_SERVICE_ENDPOINT_METRICS) {
          return this.getApplicationServiceEndpointMetrics(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        }

        return Promise.resolve(emptyResultData(target.refId));
      })
    ).then((targetData) => {
      let result: any = [];
      _.each(targetData, (targetAndData) => {
        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
        let resultData: any = _.compact(_.flatten(targetAndData.data)); // Also remove empty data items
        this.cacheResultIfNecessary(_.cloneDeep(resultData), targetAndData.target); // clone to store results without timeshift re-calculation
        this.applyTimeShiftIfNecessary(resultData, targetAndData.target); // adjust resultdata after caching the result
        resultData = this.aggregateDataIfNecessary(resultData, targetAndData.target);
        result.push(resultData);
      });

      return { data: _.flatten(result) };
    });
  }

  getApplicationServiceEndpointMetrics(target: InstanaQuery, timeFilter: TimeFilter) {
    // do not try to execute too big queries
    if (isInvalidQueryInterval(timeFilter.windowSize, hoursToMs(this.options.queryinterval_limit_app_metrics))) {
      throw new Error(
        'Limit for maximum selectable windowsize exceeded, max is: ' +
          this.options.queryinterval_limit_app_metrics +
          ' hours'
      );
    }

    if (target.endpoint && target.endpoint.key) {
      return this.dataSourceEndpoint.fetchEndpointMetrics(target, timeFilter).then((response: any) => {
        return readItemMetrics(target, response, this.dataSourceEndpoint.buildEndpointMetricLabel);
      });
    } else if (target.service && target.service.key !== null && target.service.key !== undefined) {
      return this.dataSourceService.fetchServiceMetrics(target, timeFilter).then((response: any) => {
        return readItemMetrics(target, response, this.dataSourceService.buildServiceMetricLabel);
      });
    } else if (target.entity && target.entity.key) {
      return this.dataSourceApplication.fetchApplicationMetrics(target, timeFilter).then((response: any) => {
        if (response.data) {
          target.showWarningCantShowAllResults = response.data.canLoadMore;
        }
        return readItemMetrics(target, response, this.dataSourceApplication.buildApplicationMetricLabel);
      });
    }

    return Promise.resolve({ data: { items: [] } });
  }

  applyTimeShiftIfNecessary(data: any, target: InstanaQuery) {
    if (target.timeShift) {
      let millis = this.convertTimeShiftToMillis(target.timeShift);
      if (millis > 0) {
        data.forEach((data: any) => {
          this.applyTimeShiftOnData(data, millis);
        });
      }
    }
  }

  cacheResultIfNecessary(result: any, target: InstanaQuery) {
    if (this.supportsDeltaRequests(target) && this.hasResult(result)) {
      let cachedObj = {
        timeFilter: target.timeFilter,
        results: result,
      };
      this.resultCache.put(target.stableHash, cachedObj, 4000000); // set to 1,11 hour
    }
  }

  supportsDeltaRequests(target: InstanaQuery): boolean {
    if (target.metricCategory) {
      if (
        target.metricCategory.key === SLO_INFORMATION ||
        target.metricCategory.key === SLO2_INFORMATION ||
        target.metricCategory.key === INFRASTRUCTURE_ANALYZE
      ) {
        return false;
      }
    }

    let version = this.resultCache.get('version');
    if (!version) {
      return getVersion(this.options).then((version: any) => {
        this.resultCache.put('version', version, 4000000); // set to 1,11 hour
        return version >= 171;
      });
    }

    return version >= 171;
  }

  hasResult(result: any) {
    return result && result.length > 0;
  }

  applyTimeShiftOnData(data: any, timeshift: number) {
    data.datapoints.forEach((datapoint: any) => {
      datapoint[1] = datapoint[1] + timeshift;
    });
  }

  aggregateDataIfNecessary(data: any, target: InstanaQuery): any[] {
    let newData = [];

    if (target.aggregateGraphs) {
      const aggregatedData = aggregateTarget(data, target);
      newData.push(aggregatedData);
      if (!target.hideOriginalGraphs) {
        _.each(data, (dt) => {
          if (dt.target !== aggregatedData.target) {
            newData.push(dt);
          }
        });
      }
      return newData;
    }

    return data;
  }

  buildTarget(target: InstanaQuery, data: any) {
    return {
      target: target,
      data: data,
    };
  }

  buildTargetWithAppendedDataResult(target: InstanaQuery, timeFilter: TimeFilter, data: any) {
    if (timeFilter.from !== target.timeFilter.from && data) {
      data = this.appendResult(data, target);

      data.forEach((t: any) => {
        t.datapoints = t.datapoints.filter((d: any) => d[1] >= target.timeFilter.from);
      });
    }

    return this.buildTarget(target, data);
  }

  appendResult(data: any, target: InstanaQuery) {
    let cachedResult = this.resultCache.get(target.stableHash);
    if (cachedResult && cachedResult.results) {
      data = appendData(data, cachedResult.results);
    }
    return data;
  }

  adjustTimeFilterIfCached(timeFilter: TimeFilter, target: InstanaQuery): TimeFilter {
    let cachedResult = this.resultCache.get(target.stableHash);
    if (cachedResult && hasIntersection(timeFilter, cachedResult.timeFilter)) {
      let newFrom = getDeltaRequestTimestamp(cachedResult.results, cachedResult.timeFilter.from, target.timeInterval);
      let newTo = timeFilter.to;
      return {
        from: newFrom,
        to: newTo,
        windowSize: newTo - newFrom,
      };
    }
    return timeFilter;
  }

  getSliReports(): Promise<SelectableValue[]> {
    return this.dataSourceSlo.getConfiguredSLIs();
  }

  getSloReports(): Promise<SelectableValue[]> {
    return this.dataSourceSlo2.getSLOConfigurations();
  }

  getEntityTypes(): Promise<SelectableValue[]> {
    return this.dataSourceInfrastructure.getEntityTypes();
  }

  fetchApplications() {
    return this.dataSourceApplication.getApplications(this.getTimeFilter());
  }

  fetchApplicationTags() {
    return this.dataSourceApplication.getApplicationTags(this.getTimeFilter());
  }

  fetchServices(target: InstanaQuery) {
    const interpolatedTarget = this.interpolateVariables(target);
    return this.dataSourceService.getServicesOfApplication(interpolatedTarget, this.getTimeFilter());
  }

  fetchEndpoints(target: InstanaQuery) {
    const interpolatedTarget = this.interpolateVariables(target);
    return this.dataSourceEndpoint.getEndpointsOfService(interpolatedTarget, this.getTimeFilter());
  }

  fetchTypesForTarget(query: InstanaQuery) {
    const interpolatedQuery = this.interpolateVariables(query);
    return this.dataSourceInfrastructure.fetchTypesForTarget(interpolatedQuery, this.getTimeFilter());
  }

  fetchWebsites(): Promise<SelectableValue[]> {
    return this.dataSourceWebsite.getWebsites(this.getTimeFilter());
  }

  fetchMobileapp(): Promise<SelectableValue[]> {
    return this.dataSourceMobileapp.getMobileapp(this.getTimeFilter());
  }
  fetchMetricsForEntityType(target: InstanaQuery): Promise<SelectableValue[]> {
    const interpolatedTarget = this.interpolateVariables(target);

    if (
      interpolatedTarget.metricCategory.key === BUILT_IN_METRICS ||
      interpolatedTarget.metricCategory.key === CUSTOM_METRICS
    ) {
      return this.dataSourceInfrastructure.getMetricsCatalog(
        interpolatedTarget.entityType,
        interpolatedTarget.metricCategory.key
      );
    }

    return this.dataSourceInfrastructure.fetchAvailableMetricsForEntityType(interpolatedTarget, this.timeFilter);
  }

  getDefaultTimeInterval(query: InstanaQuery) {
    const category = query.metricCategory.key;
    if (category === BUILT_IN_METRICS || category === CUSTOM_METRICS || category === INFRASTRUCTURE_ANALYZE) {
      return getDefaultMetricRollupDuration(this.getTimeFilter());
    } else {
      return getDefaultChartGranularity(this.getTimeFilter().windowSize);
    }
  }

  convertTimeShiftToMillis(timeShift: string): number {
    if (!timeShift) {
      return 0;
    }

    try {
      return this.parseTimeShift(timeShift);
    } catch (e) {
      return 0;
    }
  }

  parseTimeShift(timeShift: string): number {
    let milliSeconds = 1000;

    if (timeShift.endsWith('s')) {
      return parseInt(timeShift.split('s')[0], 10) * milliSeconds;
    } else if (timeShift.endsWith('m')) {
      return parseInt(timeShift.split('m')[0], 10) * 60 * milliSeconds;
    } else if (timeShift.endsWith('h')) {
      return parseInt(timeShift.split('h')[0], 10) * 60 * 60 * milliSeconds;
    } else if (timeShift.endsWith('d')) {
      return parseInt(timeShift.split('d')[0], 10) * 60 * 60 * 24 * milliSeconds;
    } else if (timeShift.endsWith('w')) {
      return parseInt(timeShift.split('w')[0], 10) * 60 * 60 * 24 * 7 * milliSeconds;
    }
    return 0;
  }

  applyTimeShiftOnTimeFilter(timeFilter: TimeFilter, timeShift: number): TimeFilter {
    return {
      from: timeFilter.from - timeShift,
      to: timeFilter.to - timeShift,
      windowSize: timeFilter.windowSize,
    };
  }

  setPossibleTimeIntervals(target: InstanaQuery) {
    const category = target.metricCategory.key;
    if (category === BUILT_IN_METRICS || category === CUSTOM_METRICS || category === INFRASTRUCTURE_ANALYZE) {
      this.availableTimeIntervals = this.availableRollups;
    } else {
      this.availableTimeIntervals = this.availableGranularities;
    }
  }

  getTimeFilter(): TimeFilter {
    if (!this.timeFilter || !this.timeFilter.from) {
      const now = Date.now();
      const windowSize = 6 * 60 * 60 * 1000; // 6h
      this.timeFilter = {
        from: now - windowSize,
        to: now,
        windowSize: windowSize,
      };
    }

    return this.timeFilter;
  }

  /**
   * Implements variable query support for Grafana template variables
   * Allows users to create variables populated from Instana data
   *
   * Supported query formats:
   * - applications() - Returns list of all applications
   * - applicationTags() - Returns list of application tags (for Group by)
   * - applicationMetrics() - Returns list of application metrics
   * - services() - Returns list of all services
   * - services(applicationId) - Returns services for a specific application
   * - endpoints() - Returns list of all endpoints
   * - endpoints(applicationId) - Returns endpoints for a specific application
   * - endpoints(applicationId, serviceId) - Returns endpoints for a specific application and service
   * - entityTypes() - Returns list of all entity types
   * - entityTypes(query) - Returns entity types matching a query
   * - metrics(entityType) - Returns metrics for a specific infrastructure entity type
   * - websites() - Returns list of all websites
   * - websiteBeaconTypes() - Returns list of website beacon types (for Type field)
   * - websiteTags() - Returns list of website tags (for Group by)
   * - websiteMetrics() - Returns list of all website metrics
   * - websiteMetrics(beaconType) - Returns website metrics for a specific beacon type
   * - mobileApps() - Returns list of all mobile apps
   * - mobileAppBeaconTypes() - Returns list of mobile app beacon types (for Type field)
   * - mobileAppTags() - Returns list of mobile app tags (for Group by)
   * - mobileappMetrics() - Returns list of all mobile app metrics
   * - mobileappMetrics(beaconType) - Returns mobile app metrics for a specific beacon type
   * - sliReports() - Returns list of SLI reports
   * - sloReports() - Returns list of SLO configurations
   * - syntheticTests() - Returns list of all synthetic tests
   * - syntheticMetrics() - Returns list of all synthetic monitoring metrics
   *
   * @param query - The query string defining what data to fetch
   * @param options - Optional query options
   * @returns Promise resolving to array of metric find values
   */
  async metricFindQuery(query: string, options?: any): Promise<MetricFindValue[]> {
    const normalizedQuery = query.trim().toLowerCase();

    try {
      if (normalizedQuery === 'applications()' || normalizedQuery === 'applications') {
        const applications = await this.fetchApplications();
        const results = applications.map((app) => ({
          text: app.label || app.key,
          value: app.key,
        }));
        results.unshift({ text: 'Select application...', value: '' });
        return results;
      }

      if (normalizedQuery.startsWith('services')) {
        // Extract application ID if provided: services(appId)
        const match = normalizedQuery.match(/services\(([^)]+)\)/);
        if (match && match[1]) {
          const applicationId = match[1].trim();
          const target = {
            entity: { key: applicationId },
            applicationBoundaryScope: 'ALL',
          } as Partial<InstanaQuery>;
          const services = await this.fetchServices(target as InstanaQuery);
          const results = services.map((svc) => ({
            text: svc.label || svc.key,
            value: svc.key,
          }));
          results.unshift({ text: 'Select service...', value: '' });
          return results;
        } else {
          const target = {
            entity: {},
            applicationBoundaryScope: 'ALL',
          } as Partial<InstanaQuery>;
          const services = await this.fetchServices(target as InstanaQuery);
          const results = services.map((svc) => ({
            text: svc.label || svc.key,
            value: svc.key,
          }));
          results.unshift({ text: 'Select service...', value: '' });
          return results;
        }
      }

      if (normalizedQuery.startsWith('endpoints')) {
        // Extract parameters if provided: endpoints(appId, serviceId) or endpoints(appId)
        const match = normalizedQuery.match(/endpoints\(([^)]*)\)/);
        let applicationId = '';
        let serviceId = '';

        if (match && match[1]) {
          const params = match[1].split(',').map((p) => p.trim());
          if (params.length === 1) {
            applicationId = this.templateSrv.replace(params[0], options?.scopedVars);
          } else if (params.length >= 2) {
            applicationId = this.templateSrv.replace(params[0], options?.scopedVars);
            serviceId = this.templateSrv.replace(params[1], options?.scopedVars);
          }
        }

        const target = {
          entity: applicationId ? { key: applicationId } : {},
          service: serviceId ? { key: serviceId } : {},
          applicationBoundaryScope: 'ALL',
        } as Partial<InstanaQuery>;

        const endpoints = await this.fetchEndpoints(target as InstanaQuery);
        const results = endpoints.map((ep) => ({
          text: ep.label || ep.key,
          value: ep.key,
        }));
        results.unshift({ text: 'Select endpoint...', value: '' });
        return results;
      }

      if (normalizedQuery.startsWith('entitytypes')) {
        // Extract query if provided: entityTypes(entity.type:host)
        const match = normalizedQuery.match(/entitytypes\(([^)]+)\)/);
        if (match && match[1]) {
          const entityQuery = match[1].trim();
          const interpolatedQuery = this.templateSrv.replace(entityQuery, options?.scopedVars);

          const target = {
            entityQuery: interpolatedQuery,
          } as Partial<InstanaQuery>;

          const response = await this.fetchTypesForTarget(target as InstanaQuery);
          const types = response.data || [];
          const results = types.map((type: any) => ({
            text: type,
            value: type,
          }));
          results.unshift({ text: 'Select entity type...', value: '' });
          return results;
        } else {
          const entityTypes = await this.getEntityTypes();
          const results = entityTypes.map((type) => ({
            text: type.label || type.key,
            value: type.key,
          }));
          results.unshift({ text: 'Select entity type...', value: '' });
          return results;
        }
      }

      // Infrastructure entities query - with optional plugin parameter
      if (normalizedQuery.startsWith('entities')) {
        // Extract parameters from ORIGINAL query (not normalized) to preserve variable names
        const match = query.trim().match(/entities\(([^)]*)\)/i);
        let plugin: string | undefined;

        if (match && match[1]) {
          const params = match[1].split(',').map((p) => p.trim().replace(/['"]/g, ''));

          if (params.length >= 1) {
            // Single parameter - treat as plugin (entity_type)
            plugin = this.templateSrv.replace(params[0], options?.scopedVars);
          }
        }

        const entities = await this.dataSourceInfrastructure.getInfrastructureEntities(plugin);
        const results = entities.map((entity: SelectableValue) => ({
          text: entity.label || entity.key,
          value: entity.key || entity.value,
        }));
        results.unshift({ text: 'Select entity...', value: '' });
        return results;
      }

      // Metrics query - with entity type parameter
      if (normalizedQuery.startsWith('metrics')) {
        // Extract entity type if provided: metrics(host)
        const match = normalizedQuery.match(/metrics\(([^)]+)\)/);
        if (match && match[1]) {
          const entityTypeKey = match[1].trim();
          // Interpolate any variables in the entity type parameter
          const interpolatedEntityType = this.templateSrv.replace(entityTypeKey, options?.scopedVars);

          const target = {
            entityType: { key: interpolatedEntityType, label: interpolatedEntityType },
            metricCategory: { key: BUILT_IN_METRICS },
          } as Partial<InstanaQuery>;

          const metrics = await this.fetchMetricsForEntityType(target as InstanaQuery);
          const results = metrics.map((metric: SelectableValue) => ({
            text: metric.label || metric.key,
            value: metric.key,
          }));
          results.unshift({ text: 'Select metric...', value: '' });
          return results;
        } else {
          console.warn('Instana datasource: metrics() requires an entity type parameter, e.g., metrics(host)');
          return [];
        }
      }

      // Application tags query (for Group by dropdown in Analyze Application Calls)
      if (normalizedQuery === 'applicationtags()' || normalizedQuery === 'applicationtags') {
        const applicationTags = await this.fetchApplicationTags();
        const results = applicationTags.map((tag: any) => ({
          text: tag.label || tag.key,
          value: tag.key,
        }));
        results.unshift({ text: 'Select tag...', value: '' });
        return results;
      }

      // Application metrics query (for Metric dropdown in Analyze Application Calls)
      if (normalizedQuery === 'applicationmetrics()' || normalizedQuery === 'applicationmetrics') {
        const applicationMetrics = await this.dataSourceApplication.getApplicationMetricsCatalog();
        const results = applicationMetrics.map((metric: any) => ({
          text: metric.label || metric.key,
          value: metric.key,
        }));
        results.unshift({ text: 'Select metric...', value: '' });
        return results;
      }

      // Websites query
      if (normalizedQuery === 'websites()' || normalizedQuery === 'websites') {
        const websites = await this.fetchWebsites();
        const results = websites.map((website) => ({
          text: website.label || website.key,
          value: website.key,
        }));
        results.unshift({ text: 'Select website...', value: '' });
        return results;
      }

      // Mobile apps query
      if (normalizedQuery === 'mobileapps()' || normalizedQuery === 'mobileapps') {
        const mobileApps = await this.fetchMobileapp();
        const results = mobileApps.map((app) => ({
          text: app.label || app.key,
          value: app.key,
        }));
        results.unshift({ text: 'Select mobile app...', value: '' });
        return results;
      }

      // SLI reports query
      if (normalizedQuery === 'slireports()' || normalizedQuery === 'slireports') {
        const sliReports = await this.getSliReports();
        const results = sliReports.map((report) => ({
          text: report.label || report.key,
          value: report.key,
        }));
        results.unshift({ text: 'Select SLI report...', value: '' });
        return results;
      }

      // SLO reports query
      if (normalizedQuery === 'sloreports()' || normalizedQuery === 'sloreports') {
        const sloReports = await this.getSloReports();
        const results = sloReports.map((report) => ({
          text: report.label || report.key,
          value: report.key,
        }));
        results.unshift({ text: 'Select SLO report...', value: '' });
        return results;
      }

      // Synthetic tests query
      if (normalizedQuery === 'synthetictests()' || normalizedQuery === 'synthetictests') {
        const syntheticTests = await this.dataSourceSyntheticMonitoring.getSyntheticMonitoringtests();
        const results = syntheticTests.map((test: any) => ({
          text: test.label || test.key,
          value: test.label,
        }));
        results.unshift({ text: 'Select synthetic test...', value: '' });
        return results;
      }

      // Synthetic metrics query
      if (normalizedQuery === 'syntheticmetrics()' || normalizedQuery === 'syntheticmetrics') {
        const syntheticMetrics = await this.dataSourceSyntheticMonitoring.getSyntheticMonitoringMetricsCatalog();
        const results = syntheticMetrics.map((metric: any) => ({
          text: metric.label || metric.key,
          value: metric.key,
        }));
        results.unshift({ text: 'Select metric...', value: '' });
        return results;
      }

      // Website metrics query - with optional beacon type parameter
      if (normalizedQuery.startsWith('websitemetrics')) {
        // Extract beacon type if provided: websiteMetrics(pageLoad) or websiteMetrics($beaconType)
        const match = normalizedQuery.match(/websitemetrics\(([^)]+)\)/);
        if (match && match[1]) {
          let beaconType = match[1].trim();

          beaconType = beaconType.replace(/['"]/g, '');

          // Interpolate any variables in the beacon type parameter
          const interpolatedBeaconType = this.templateSrv.replace(beaconType, options?.scopedVars);

          // If interpolation resulted in empty string or the variable itself, return all metrics
          if (!interpolatedBeaconType || (interpolatedBeaconType === beaconType && beaconType.startsWith('$'))) {
            const allMetrics = await this.dataSourceWebsite.getWebsiteMetricsCatalog();
            const results = allMetrics.map((metric: any) => ({
              text: metric.label || metric.key,
              value: metric.key,
            }));
            results.unshift({ text: 'Select metric...', value: '' });
            return results;
          }

          // Fetch all website metrics
          const allMetrics = await this.dataSourceWebsite.getWebsiteMetricsCatalog();

          // Filter by beacon type
          const filteredMetrics = allMetrics.filter(
            (metric: any) => metric.beaconTypes && metric.beaconTypes.includes(interpolatedBeaconType)
          );

          const results = filteredMetrics.map((metric: any) => ({
            text: metric.label || metric.key,
            value: metric.key,
          }));

          results.unshift({ text: 'Select metric...', value: '' });
          return results;
        } else {
          // Return all website metrics without filtering
          const allMetrics = await this.dataSourceWebsite.getWebsiteMetricsCatalog();
          const results = allMetrics.map((metric: any) => ({
            text: metric.label || metric.key,
            value: metric.key,
          }));
          results.unshift({ text: 'Select metric...', value: '' });
          return results;
        }
      }

      // Mobile app metrics query - with optional beacon type parameter
      if (normalizedQuery.startsWith('mobileappmetrics')) {
        // Extract beacon type if provided: mobileappMetrics(session_start) or mobileappMetrics($beaconType)
        const match = normalizedQuery.match(/mobileappmetrics\(([^)]+)\)/);
        if (match && match[1]) {
          let beaconType = match[1].trim();

          beaconType = beaconType.replace(/['"]/g, '');

          // Interpolate any variables in the beacon type parameter
          const interpolatedBeaconType = this.templateSrv.replace(beaconType, options?.scopedVars);

          // If interpolation resulted in empty string or the variable itself, return all metrics
          if (!interpolatedBeaconType || (interpolatedBeaconType === beaconType && beaconType.startsWith('$'))) {
            const allMetrics = await this.dataSourceMobileapp.getMobileappMetricsCatalog();
            const results = allMetrics.map((metric: any) => ({
              text: metric.label || metric.key,
              value: metric.key,
            }));
            results.unshift({ text: 'Select metric...', value: '' });
            return results;
          }

          // Fetch all mobile app metrics
          const allMetrics = await this.dataSourceMobileapp.getMobileappMetricsCatalog();

          // Filter by beacon type
          const filteredMetrics = allMetrics.filter(
            (metric: any) => metric.beaconTypes && metric.beaconTypes.includes(interpolatedBeaconType)
          );

          const results = filteredMetrics.map((metric: any) => ({
            text: metric.label || metric.key,
            value: metric.key,
          }));

          results.unshift({ text: 'Select metric...', value: '' });
          return results;
        } else {
          const allMetrics = await this.dataSourceMobileapp.getMobileappMetricsCatalog();
          const results = allMetrics.map((metric: any) => ({
            text: metric.label || metric.key,
            value: metric.key,
          }));
          results.unshift({ text: 'Select metric...', value: '' });
          return results;
        }
      }

      // Mobile app beacon types query
      if (normalizedQuery === 'mobileappbeacontypes()' || normalizedQuery === 'mobileappbeacontypes') {
        const beaconTypes = [
          { key: 'session_start', label: 'Session Starts' },
          { key: 'view_change', label: 'View Transitions' },
          { key: 'crash', label: 'Crashes' },
          { key: 'http_request', label: 'HTTP Requests' },
          { key: 'custom', label: 'Custom Events' },
        ];
        const results = beaconTypes.map((type) => ({
          text: type.label,
          value: type.key,
        }));
        results.unshift({ text: 'Select beacon type...', value: '' });
        return results;
      }

      // Mobile app tags query (for Group by dropdown)
      if (normalizedQuery === 'mobileapptags()' || normalizedQuery === 'mobileapptags') {
        const mobileAppTags = await this.dataSourceMobileapp.getMobileappTags();
        const results = mobileAppTags.map((tag: any) => ({
          text: tag.label || tag.key,
          value: tag.key,
        }));
        results.unshift({ text: 'Select tag...', value: '' });
        return results;
      }

      // Website beacon types query
      if (normalizedQuery === 'websitebeacontypes()' || normalizedQuery === 'websitebeacontypes') {
        const beaconTypes = [
          { key: 'pageLoad', label: 'Page Loads' },
          { key: 'resourceLoad', label: 'Resources' },
          { key: 'httpRequest', label: 'HTTP Requests' },
          { key: 'error', label: 'Errors' },
          { key: 'pageChange', label: 'Page Transitions' },
        ];
        const results = beaconTypes.map((type) => ({
          text: type.label,
          value: type.key,
        }));
        results.unshift({ text: 'Select beacon type...', value: '' });
        return results;
      }

      // Website tags query (for Group by dropdown)
      if (normalizedQuery === 'websitetags()' || normalizedQuery === 'websitetags') {
        const websiteTags = await this.dataSourceWebsite.getWebsiteTags();
        const results = websiteTags.map((tag: any) => ({
          text: tag.label || tag.key,
          value: tag.key,
        }));
        results.unshift({ text: 'Select tag...', value: '' });
        return results;
      }

      // If query doesn't match any pattern, return empty array
      console.warn(`Instana datasource: Unknown variable query format: ${query}`);
      return [];
    } catch (error) {
      console.error('Instana datasource: Error in metricFindQuery:', error);
      return [];
    }
  }

  testDatasource(): Promise<any> {
    return getRequest(this.options, '/api/infrastructure-monitoring/monitoring-state').then(
      () => {
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
