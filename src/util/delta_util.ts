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
