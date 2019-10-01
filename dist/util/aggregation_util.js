System.register(['lodash'], function(exports_1) {
    var lodash_1;
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
    exports_1("aggregate", aggregate);
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
    exports_1("buildAggregationLabel", buildAggregationLabel);
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