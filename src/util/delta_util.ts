import _ from 'lodash';

import TimeFilter from '../types/time_filter';

const omitLabels = [
  'refId',
  'pluginId',
  'showWarningCantShowAllResults',
  'timeShiftIsValid',
  'useFreeTextMetrics',
  'showGroupBySecondLevel',
  'canShowAllMetrics',
  'timeFilter',
  'stableHash',
];

export function generateStableHash(obj: any): string {
  let pseudoHash = _.omit(obj, omitLabels);
  pseudoHash = _.mapValues(pseudoHash, (value: any) => {
    // to reduce overhead of interface Selectable
    if (value != null && typeof value === 'object' && 'key' in value) {
      value = value.key;
    }

    return value;
  });
  return JSON.stringify(pseudoHash);
}

/* Check if two time filters are overlapping.

Return true when:
a)
  from |-------------------| to (t2)
              from |--------------------| to (t1)
b)
  from |-------------------| to (t2)
  from |-------------------| to (t1)
c)
  from |-------------------| to (t2)
              from |-------| to (t1)

Returns false when:
d)
  from |-------------------| to (t2)
                      from |-------| to (t1)
e)
  from |-------------------| to (t2)
       from |--------| to (t1)
f)
     from |-------------------| to (t2)
from |----------------------------------------| to (t1)
g)
                from |-------------------| to (t2)
  from |--------------------| to (t1)
h)
                from |-------------------| to (t2)
  from |-------------| to (t1)
i)
                from |-------------------| to (t2)
  from |--------| to (t1)
j)
  from |-------------------| to (t2)
                        from |----------| to (t1)
k)
  from |-------------------| to (t2)
  from |----------| to (t1)
*/
export function hasIntersection(t1: TimeFilter, t2: TimeFilter): boolean {
  return t1.from < t2.to && t1.from >= t2.from && t1.to >= t2.to;
}

/*
  Appends new found items to already existing data in cache.
  Also removes old data accordingly (e.g. if 4 new datapoints were added,
  the corresponding oldest four datapoints are removed).
*/
export function appendData(newDeltaData: any, cachedData: any): any {
  _.each(newDeltaData, (deltaData) => {
    let matchingCachedDataIndex = _.findIndex(cachedData, (o: any) => o.key === deltaData.key && o.target === deltaData.target);
    if (cachedData[matchingCachedDataIndex] && deltaData.datapoints) {
      // const size = matchingCachedData.datapoints.length;
      let datapoints = deltaData.datapoints.concat(cachedData[matchingCachedDataIndex].datapoints);
      datapoints = _.sortedUniqBy(
        datapoints.sort((a: any, b: any) => a[1] - b[1]),
        (a: any) => a[1]
      );
      cachedData[matchingCachedDataIndex].datapoints = _.takeRight(datapoints, 800);
      cachedData[matchingCachedDataIndex].target = deltaData.target;
    } else {
        cachedData.push(deltaData);
      }
    });

  return cachedData;
}

export function getDeltaRequestTimestamp(series: any, fromDefault: number, timeInterval: any): number {
  // we do not apply any delta for requests that contain a one second granularity (application requests)
  if (timeInterval.key === '1') {
    return fromDefault;
  }

  // the found series can have multiple results, it's ok just to use the first one
  // because data is written in batches and we know that once there is a datapoint
  // for a series, the other series' datapoints are up-to-date as well.
  const length = series[0].datapoints.length;
  if (length < 2) {
    return fromDefault;
  }

  const penultimate = length - 2;
  return series[0].datapoints[penultimate][1];
}
