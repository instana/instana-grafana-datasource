import TagFilter from "../types/tag_filter";
import _ from "lodash";
import { InstanaQuery } from '../types/instana_query';

export function createTagFilter(filter: TagFilter) {
  let tagFilter = {
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

export function readItemMetrics(target: InstanaQuery, response: any, getLabel: any) {
  // as we map two times we need to flatten the result
  return _.flatten(response.data.items.map((item: any, index: number) => {
    return _.map(item.metrics, (value, key) => {
      return {
        'target': getLabel(target, item, key, index),
        'datapoints': _.map(value, metric => [metric[1], metric[0]]),
        'refId': target.refId,
        'key': target.stableHash
      };
    });
  }));
}
