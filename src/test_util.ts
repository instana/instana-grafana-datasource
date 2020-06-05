import { InstanaQuery } from './types/instana_query';

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
    aggregateGraphs: false,
    aggregation: { },
    applicationCallToEntity: { },
    canShowAllMetrics: false,
    customFilters: [],
    displayMaxMetricValue: false,
    endpoint: { },
    entity: { },
    entityQuery: '',
    entityType: { } ,
    filter: '',
    filters: [],
    freeTextMetrics: '',
    group: { },
    groupbyTagSecondLevelKey: '',
    hideOriginalGraphs: false,
    labelFormat: '',
    metric: { },
    metricCategory: { },
    pluginId: '',
    service: { },
    showGroupBySecondLevel: false,
    showWarningCantShowAllResults: false,
    sloReport: { },
    sloSpecific: { },
    sloValue: '',
    stableHash: '',
    timeFilter: { from: 0, to: 0, windowSize: 0 },
    timeInterval: { },
    timeShift: '',
    timeShiftIsValid: false,
    useFreeTextMetrics: false,
    showAllMetrics: false,
    allMetrics: [ ],
    aggregationFunction: { },
    refId: "A"
  };
}
