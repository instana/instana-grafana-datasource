import { InstanaQuery } from '../types/instana_query';
import { InstanaOptions } from '../types/instana_options';
import TimeFilter from '../types/time_filter';

/*
  [
    {
      datapoints: [
        [0, 0],
        [1, 100000000],
        [2, 200000000]
      ]
    },
    {
      datapoints: [
        [1, 0],
        [2, 100000000],
        [3, 200000000]
      ]
    },
    {
      datapoints: [
        [2, 0],
        [3, 100000000],
        [4, 200000000]
      ]
    }
  ]
*/
export function generateTestData(amountOfTimeseries: number, numberOfEntries: number) {
  let data = [];
  for (let i = 0; i < amountOfTimeseries; i++) {
    let timeseries = [];
    for (let j = 0; j < numberOfEntries; j++) {
      timeseries.push([j + i, j * 100000000]);
    }
    data.push({ datapoints: timeseries });
  }
  return data;
}

/*
  Returns an InstanaQuery object with example values
 */
export function buildTestTarget(): InstanaQuery {
  return {
    testType:{},
    callToEntity: '',
    aggregateGraphs: false,
    aggregation: {},
    applicationCallToEntity: '',
    canShowAllMetrics: false,
    customFilters: [],
    displayMaxMetricValue: false,
    endpoint: {},
    entity: {},
    entityQuery: '',
    entityType: {},
    filters: [],
    freeTextMetrics: '',
    group: {},
    groupbyTagSecondLevelKey: '',
    hideOriginalGraphs: false,
    labelFormat: '',
    metric: {},
    metricCategory: {},
    service: {},
    showGroupBySecondLevel: false,
    showWarningCantShowAllResults: false,
    sloReport: {},
    sloSpecific: {},
    sloValue: '',
    slo2Report: {},
    slo2Specific: {},
    stableHash: '',
    timeFilter: { from: 0, to: 0, windowSize: 0 },
    timeInterval: {},
    timeShift: '',
    timeShiftIsValid: false,
    useFreeTextMetrics: false,
    showAllMetrics: false,
    allMetrics: [],
    aggregationFunction: {},
    refId: 'A',
    applicationBoundaryScope: '',
    showAdvancedSettings: false,
    tagFilterExpression: '',
    testId: '',
  };
}

export function buildInstanaOptions(): InstanaOptions {
  return {
    url: process.env.INSTANA_BACKEND_URL || 'http://mountebank:8010',
    apiToken: process.env.INSTANA_API_TOKEN || 'valid-api-token',
    useProxy: true,
    showOffline: true,
    allowInfraExplore: true,
  };
}

export function buildTimeFilter(): TimeFilter {
  const currentTime = new Date().getTime();
  return {
    to: currentTime,
    from: currentTime - 3600000,
    windowSize: 3600000,
  };
}
