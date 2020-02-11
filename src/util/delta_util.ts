import _ from 'lodash';

import TimeFilter from '../types/time_filter';

const omitLabels = [
  'refId',
  'pluginId',
  'showWarningCantShowAllResults',
  'labelFormat',
  'timeShiftIsValid',
  'useFreeTextMetrics',
  'showGroupBySecondLevel',
  'aggregateGraphs',
  'canShowAllMetrics',
  'aggregationFunction',
  'timeFilter',
  'stableHash'
];

export function generateStableHash(obj): string {
  let pseudoHash = _.omit(obj, omitLabels);
  pseudoHash = _.mapValues(pseudoHash, value => {
      // to reduce overhead of interface Selectable
      if (value != null && typeof value === 'object' && 'key' in value) {
        value = value.key;
      }
      return value;
  });
  return JSON.stringify(pseudoHash);
}

/*
  Check if two time filters are overlapping.

  Return true when:

  from |-------------------| to (t2)
              from |--------------------| to (t1)

  Returns false when:

     from |-------------------| to (t2)
from |----------------------------------------| to (t1)

  from |-------------------| to (t2)
                        from |-------------------| to (t1)
*/
export function isOverlapping(t1: TimeFilter, t2: TimeFilter): boolean {
  return t1.from < t2.to && t1.from > t2.from; // t1.windowSize === t2.windowSize
}

/*
  Appends new found items to already existing data in cache.
  Also removes old data accordingly (e.g. if 4 new datapoints were added,
  the corresponding oldest four datapoints are removed).
*/
export function appendData(newDeltaData, cachedData): any {
  _.each(newDeltaData, (deltaData, index) => {
    var matchingCachedData = _.find(cachedData, o => o.target === deltaData.target);
    if (matchingCachedData && deltaData.datapoints) {
      const size = matchingCachedData.datapoints.length;
      let datapoints = deltaData.datapoints.concat(matchingCachedData.datapoints);
      datapoints = _.sortedUniqBy(datapoints.sort((a, b) => a[1] - b[1]), a => a[1]);
      matchingCachedData.datapoints = _.takeRight(datapoints, size);
    } else {
      cachedData.push(deltaData);
    }
  });
  return cachedData;
}
