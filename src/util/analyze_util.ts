import TagFilter from "../types/tag_filter";
import _ from "lodash";

const sensibleGranularities = [
  1, // second
  5,
  10,
  60, // minute
  5 * 60,
  10 * 60,
  60 * 60, // hour
  5 * 60 * 60,
  10 * 60 * 60,
  24 * 60 * 60, // day
  5 * 24 * 60 * 60,
  10 * 24 * 60 * 60
];

const APPLICATION_METRICS = '2';
const WEBSITE_METRICS = '3';

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

export function getChartGranularity(windowSize: number, maximumNumberOfUsefulDataPoints: number): number {
  const granularity = sensibleGranularities.find(
    granularity => windowSize / 1000 / granularity <= maximumNumberOfUsefulDataPoints
  );
  return granularity || sensibleGranularities[sensibleGranularities.length - 1];
}

export function readItemMetrics(target, response, getLabel) {
  // as we map two times we need to flatten the result
  return _.flatten(response.data.items.map((item, index) => {
    return _.map(item.metrics, (value, key) => {
      return {
        'target': getLabel(target, item, key, index),
        'datapoints': _.map(value, metric => [metric[1], metric[0]])
      };
    });
  }));
}


