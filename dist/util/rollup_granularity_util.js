System.register(["../lists/granularities", "../lists/rollups"], function(exports_1) {
    var granularities_1, rollups_1;
    var MAX_DATAPOINTS_ANALYZE, MAX_DATAPOINTS_INFRASTRUCTURE, UI_DATAPOINTS_ANALYZE;
    function currentTime() {
        return Date.now();
    }
    function getWindowSize(timeFilter) {
        return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
    }
    function getDefaultChartGranularity(windowSize) {
        return getPossibleGranularities(windowSize, UI_DATAPOINTS_ANALYZE)[0];
    }
    exports_1("getDefaultChartGranularity", getDefaultChartGranularity);
    function getPossibleGranularities(windowSize, maxValues) {
        if (maxValues === void 0) { maxValues = MAX_DATAPOINTS_ANALYZE; }
        var possibleGranularities = granularities_1.default.filter(function (granularity) { return windowSize / 1000 / granularity.value <= maxValues &&
            granularity.value * 1000 <= windowSize; });
        if (possibleGranularities.length > 0) {
            return possibleGranularities.map(function (granularity) { return ({
                key: granularity.value.toString(),
                label: granularity.label
            }); });
        }
        return [{
                key: granularities_1.default[granularities_1.default.length - 1].value.toString(),
                label: granularities_1.default[granularities_1.default.length - 1].label
            }];
    }
    exports_1("getPossibleGranularities", getPossibleGranularities);
    function getDefaultMetricRollupDuration(timeFilter) {
        return getPossibleRollups(timeFilter)[0];
    }
    exports_1("getDefaultMetricRollupDuration", getDefaultMetricRollupDuration);
    function getPossibleRollups(timeFilter) {
        // Ignoring time differences for now since small time differences
        // can be accepted. This time is only used to calculate the rollup.
        var now = currentTime();
        var windowSize = getWindowSize(timeFilter);
        var possibleRollups = rollups_1.default
            .filter(function (rollupDefinition) { return timeFilter.from >= now - rollupDefinition.availableFor; })
            .filter(function (rollUp) { return windowSize >= rollUp.rollup && windowSize / rollUp.rollup <= MAX_DATAPOINTS_INFRASTRUCTURE; });
        if (possibleRollups.length > 0) {
            return possibleRollups.map(function (rollup) { return ({
                key: rollup.rollup.toString(),
                label: rollup.label
            }); });
        }
        return [{
                key: rollups_1.default[rollups_1.default.length - 1].rollup.toString(),
                label: rollups_1.default[rollups_1.default.length - 1].label
            }];
    }
    exports_1("getPossibleRollups", getPossibleRollups);
    return {
        setters:[
            function (granularities_1_1) {
                granularities_1 = granularities_1_1;
            },
            function (rollups_1_1) {
                rollups_1 = rollups_1_1;
            }],
        execute: function() {
            MAX_DATAPOINTS_ANALYZE = 600;
            MAX_DATAPOINTS_INFRASTRUCTURE = 800;
            UI_DATAPOINTS_ANALYZE = 80;
        }
    }
});
//# sourceMappingURL=rollup_granularity_util.js.map