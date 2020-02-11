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
export function appendData(newData, cachedData): any {
  _.each(newData, (targetData, index) => {
    var appendedData = _.find(cachedData, function(o) { return o.target === targetData.target; });
    if (appendedData) {
      var numberOfNewPoints = 0;
      _.each(targetData.datapoints, (datapoint, index) => {
        //add or replace value for timestamp
        var d = _.find(appendedData.datapoints, function(o)  {  return  o[1] === datapoint[1];  });
        if (d) {
          d[0] = datapoint[0];
        } else {
          appendedData.datapoints.push(datapoint);
          numberOfNewPoints++;
        }
      });

      newData[index].datapoints = _.slice(appendedData.datapoints, numberOfNewPoints, appendedData.datapoints.length);
    }
  });
  return newData;
}
