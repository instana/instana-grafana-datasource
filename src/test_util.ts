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

export function buildTestTarget(): InstanaQuery {
  return {
    aggregateGraphs: false,
    aggregation: { key: null },
    applicationCallToEntity: { key: null },
    canShowAllMetrics: false,
    customFilters: [],
    displayMaxMetricValue: false,
    endpoint: { key: null },
    entity: { key: null },
    entityQuery: '',
    entityType: { key: null },
    filter: '',
    filters: [],
    freeTextMetrics: '',
    group: { key: null },
    groupbyTagSecondLevelKey: '',
    hideOriginalGraphs: false,
    labelFormat: '',
    metric: { key: null },
    metricCategory: { key: null },
    pluginId: '',
    service: { key: null },
    showGroupBySecondLevel: false,
    sloReport: { key: null },
    sloSpecific: { key: null },
    sloValue: '',
    stableHash: '',
    timeFilter: { from: 0, to: 0, windowSize: 0 },
    timeInterval: { key: null },
    timeShift: '',
    timeShiftIsValid: false,
    useFreeTextMetrics: false,
    showAllMetrics: true,
    allMetrics: [
      { key: '1' }, { key: '2' }
    ],
    aggregationFunction: {
      label: "SUM"
    },
    refId: "A"
  };
}
