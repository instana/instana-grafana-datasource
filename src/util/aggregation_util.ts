import _ from 'lodash';
import { InstanaQuery } from '../types/instana_query';

export function aggregateTarget(data: any, target: InstanaQuery) {
  const targetLabel = buildAggregationLabel(target);
  data = _.filter(data, d => d.target !== targetLabel); // filter out any previously calculated aggregations
  let concatedTargetData = concatTargetData(data);

  let dataGroupedByTimestamp = _.groupBy(concatedTargetData, function (d) {
    return d[1];
  });

  let aggregatedData = aggregateDataOfTimestamp(dataGroupedByTimestamp, target.aggregationFunction.label!);
  aggregatedData = _.sortBy(aggregatedData, [
    function (datapoint) {
      return datapoint[1];
    },
  ]);

  return buildResult(aggregatedData, target.refId, targetLabel);
}

function concatTargetData(data: any) {
  let result: any = [];
  _.each(data, (entry) => {
    result = _.concat(result, entry.datapoints);
  });
  return result;
}

function aggregateDataOfTimestamp(dataGroupedByTimestamp: any, aggregationLabel: string) {
  let result: any = [];
  _.each(dataGroupedByTimestamp, (timestampData, timestamp) => {
    let valuesOfTimestamp = _.map(timestampData, (datapoint) => {
      return datapoint[0];
    });
    let aggregatedValue = aggregate(aggregationLabel, valuesOfTimestamp);
    result.push([aggregatedValue, parseInt(timestamp, 10)]);
  });
  return result;
}

function aggregate(aggregation: string, data: any) {
  if (aggregation.toLowerCase() === 'sum') {
    return _.sum(data);
  } else if (aggregation.toLowerCase() === 'mean') {
    return _.mean(data);
  } else if (aggregation.toLowerCase() === 'min') {
    return _.min(data);
  } else if (aggregation.toLowerCase() === 'max') {
    return _.max(data);
  } else {
    //apply not aggregation
    return data;
  }
}

function buildResult(aggregatedData: any, refId: string, target: string) {
  return {
    datapoints: aggregatedData,
    refId: refId,
    target: target,
  };
}

function buildAggregationLabel(target: InstanaQuery): string {
  if (target.showAllMetrics) {
    if (target.allMetrics.length > 1) {
      if (target.customFilters && target.customFilters.length > 0) {
        let label = '';
        _.each(target.customFilters, (filter, index) => {
          label += filter;
          if (index !== target.customFilters.length - 1) {
            label += '.';
          }
        });
        label = label + ' (' + target.aggregationFunction.label + ')';
        return label;
      } else {
        return target.aggregationFunction.label!;
      }
    } else {
      return target.allMetrics[0].key + ' (' + target.aggregationFunction.label + ')';
    }
  } else {
    return target.metric.key + ' (' + target.aggregationFunction.label + ')';
  }
}
