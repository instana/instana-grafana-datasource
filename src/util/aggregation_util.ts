import _ from 'lodash';

export function aggregateTarget(data, target) {
  var concatedTargetData = concatTargetData(data);

  var dataGroupedByTimestamp = _.groupBy(concatedTargetData, function (d) {
    return d[1];
  });

  var aggregatedData = aggregateDataOfTimestamp(dataGroupedByTimestamp, target.aggregationFunction.label);
  aggregatedData = _.sortBy(aggregatedData, [function (datapoint) {
    return datapoint[1];
  }]);

  return buildResult(aggregatedData, target.refId, buildAggregationLabel(target));
}

function concatTargetData(data) {
  var result = [];
  _.each(data, (entry, index) => {
    result = _.concat(result, entry.datapoints);
  });
  return result;
}

function aggregateDataOfTimestamp(dataGroupedByTimestamp, aggregationLabel: string) {
  var result = [];
  _.each(dataGroupedByTimestamp, (timestampData, timestamp) => {
    var valuesOfTimestamp = _.map(timestampData, (datapoint, index) => {
      return datapoint[0];
    });
    var aggregatedValue = aggregate(aggregationLabel, valuesOfTimestamp);
    result.push([aggregatedValue, parseInt(timestamp)]);
  });
  return result;
}

function aggregate(aggregation: string, data) {
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

function buildResult(aggregatedData, refId, target) {
  return {
    datapoints: aggregatedData,
    refId: refId,
    target: target
  };
}

function buildAggregationLabel(target) {
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
