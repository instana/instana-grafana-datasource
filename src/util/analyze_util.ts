import TagFilter from "../types/tag_filter";
import _ from "lodash";
import granularities from "../lists/granularities";
import Granularity from "../types/granularity";

const MAX_ALLOWED_DATA_POINTS = 1000;

export function createTagFilter(filter: TagFilter) {
  const tagFilter = {
    name: filter.tag.key,
    operator: filter.operator.key,
    value: filter.stringValue
  };

  if ('NUMBER' === filter.tag.type) {
    if (filter.numberValue !== null) {
      tagFilter.value = filter.numberValue.toString();
    }
  } else if ('BOOLEAN' === filter.tag.type) {
    tagFilter.value = filter.booleanValue.toString();
  }

  return tagFilter;
}

export function getChartGranularity(windowSize: number,
                                    maximumNumberOfUsefulDataPoints: number): Granularity {
  const granularity = granularities.find(
    granularity => windowSize / 1000 / granularity.value <= maximumNumberOfUsefulDataPoints
  );
  return granularity || granularities[granularities.length - 1];
}

export function getPossibleGranularities(windowSize: number): Granularity[] {
  const possibleGranularities = granularities.filter(
    granularity => windowSize / 1000 / granularity.value <= MAX_ALLOWED_DATA_POINTS &&
      granularity.value * 1000 <= windowSize
  );

  return possibleGranularities || [granularities[granularities.length - 1]];
}

export function readItemMetrics(target, response, getLabel) {
  // as we map two times we need to flatten the result
  console.log(response.data.items);
  return _.flatten(response.data.items.map((item, index) => {
    return _.map(item.metrics, (value, key) => {
      return {
        'target': getLabel(target, item, key, index),
        'datapoints': _.map(value, metric => [metric[1], metric[0]]),
        'refId': target.refId
      };
    });
  }));
}


