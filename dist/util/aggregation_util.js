System.register(['lodash'], function(exports_1) {
    var lodash_1;
    function aggregateTarget(data, target) {
        var concatedTargetData = concatTargetData(data);
        var dataGroupedByTimestamp = lodash_1.default.groupBy(concatedTargetData, function (d) {
            return d[1];
        });
        var aggregatedData = aggregateDataOfTimestamp(dataGroupedByTimestamp, target.aggregationFunction.label);
        aggregatedData = lodash_1.default.sortBy(aggregatedData, [function (datapoint) {
                return datapoint[1];
            }]);
        return buildResult(aggregatedData, target.refId, buildAggregationLabel(target));
    }
    exports_1("aggregateTarget", aggregateTarget);
    function concatTargetData(data) {
        var result = [];
        lodash_1.default.each(data, function (entry, index) {
            result = lodash_1.default.concat(result, entry.datapoints);
        });
        return result;
    }
    function aggregateDataOfTimestamp(dataGroupedByTimestamp, aggregationLabel) {
        var result = [];
        lodash_1.default.each(dataGroupedByTimestamp, function (timestampData, timestamp) {
            var valuesOfTimestamp = lodash_1.default.map(timestampData, function (datapoint, index) {
                return datapoint[0];
            });
            var aggregatedValue = aggregate(aggregationLabel, valuesOfTimestamp);
            result.push([aggregatedValue, parseInt(timestamp)]);
        });
        return result;
    }
    function aggregate(aggregation, data) {
        if (aggregation.toLowerCase() === "sum") {
            return lodash_1.default.sum(data);
        }
        else if (aggregation.toLowerCase() === "mean") {
            return lodash_1.default.mean(data);
        }
        else if (aggregation.toLowerCase() === "min") {
            return lodash_1.default.min(data);
        }
        else if (aggregation.toLowerCase() === "max") {
            return lodash_1.default.max(data);
        }
        else {
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
                    var label = "";
                    lodash_1.default.each(target.customFilters, function (filter, index) {
                        label += filter.value;
                        if (index !== target.customFilters.length - 1) {
                            label += ".";
                        }
                    });
                    label = label + " (" + target.aggregationFunction.label + ")";
                    return label;
                }
                else {
                    return target.aggregationFunction.label;
                }
            }
            else {
                return target.allMetrics[0].key + " (" + target.aggregationFunction.label + ")";
            }
        }
        else {
            return target.metric.key + " (" + target.aggregationFunction.label + ")";
        }
    }
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=aggregation_util.js.map