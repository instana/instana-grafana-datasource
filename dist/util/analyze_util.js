System.register(["lodash", "../lists/granularities"], function(exports_1) {
    var lodash_1, granularities_1;
    var MAX_ALLOWED_DATA_POINTS;
    function createTagFilter(filter) {
        var tagFilter = {
            name: filter.tag.key,
            operator: filter.operator.key,
            value: filter.stringValue
        };
        if ('NUMBER' === filter.tag.type) {
            if (filter.numberValue !== null) {
                tagFilter.value = filter.numberValue.toString();
            }
        }
        else if ('BOOLEAN' === filter.tag.type) {
            tagFilter.value = filter.booleanValue.toString();
        }
        return tagFilter;
    }
    exports_1("createTagFilter", createTagFilter);
    function getChartGranularity(windowSize, maximumNumberOfUsefulDataPoints) {
        var granularity = granularities_1.default.find(function (granularity) { return windowSize / 1000 / granularity.value <= maximumNumberOfUsefulDataPoints; });
        return granularity || granularities_1.default[granularities_1.default.length - 1];
    }
    exports_1("getChartGranularity", getChartGranularity);
    function getPossibleGranularities(windowSize) {
        console.log(windowSize);
        var possibleGranularities = granularities_1.default.filter(function (granularity) { return windowSize / 1000 / granularity.value <= MAX_ALLOWED_DATA_POINTS &&
            granularity.value * 1000 <= windowSize; });
        return possibleGranularities || [granularities_1.default[granularities_1.default.length - 1]];
    }
    exports_1("getPossibleGranularities", getPossibleGranularities);
    function readItemMetrics(target, response, getLabel) {
        // as we map two times we need to flatten the result
        return lodash_1.default.flatten(response.data.items.map(function (item, index) {
            return lodash_1.default.map(item.metrics, function (value, key) {
                return {
                    'target': getLabel(target, item, key, index),
                    'datapoints': lodash_1.default.map(value, function (metric) { return [metric[1], metric[0]]; }),
                    'refId': target.refId
                };
            });
        }));
    }
    exports_1("readItemMetrics", readItemMetrics);
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (granularities_1_1) {
                granularities_1 = granularities_1_1;
            }],
        execute: function() {
            MAX_ALLOWED_DATA_POINTS = 1000;
        }
    }
});
//# sourceMappingURL=analyze_util.js.map