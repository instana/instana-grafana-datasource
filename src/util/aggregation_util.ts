import _ from 'lodash';

export function aggregate(aggregation: string, data) {
  if (aggregation.toLowerCase() === "sum") {
    return _.sum(data);
  } else if (aggregation.toLowerCase() === "mean") {
    return _.mean(data);
  } else if (aggregation.toLowerCase() === "min") {
    return _.min(data);
  } else if (aggregation.toLowerCase() === "max") {
    return _.max(data);
  } else {
    //apply not aggregation
    return data;
  }
}

export function buildAggregationLabel(target) {
  if (target.showAllMetrics) {
    if (target.allMetrics.length > 1) {
      if (target.customFilters && target.customFilters.length > 0) {
        let label = "";
        _.each(target.customFilters, (filter, index) => {
          label += filter.value;
          if (index !== target.customFilters.length - 1) {
            label += ".";
          }
        });
        label = label + " (" + target.aggregationFunction.label + ")";
        return label;
      } else {
        return target.aggregationFunction.label;
      }
    } else {
      return target.allMetrics[0].key + " (" + target.aggregationFunction.label + ")";
    }
  } else {
    return target.metric.key + " (" + target.aggregationFunction.label + ")";
  }
}
