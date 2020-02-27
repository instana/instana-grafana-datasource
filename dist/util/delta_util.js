System.register(['lodash'], function(exports_1) {
    var lodash_1;
    var omitLabels;
    function generateStableHash(obj) {
        var pseudoHash = lodash_1.default.omit(obj, omitLabels);
        pseudoHash = lodash_1.default.mapValues(pseudoHash, function (value) {
            // to reduce overhead of interface Selectable
            if (value != null && typeof value === 'object' && 'key' in value) {
                value = value.key;
            }
            return value;
        });
        return JSON.stringify(pseudoHash);
    }
    exports_1("generateStableHash", generateStableHash);
    /*
      Check if two time filters are overlapping.
    
      Return true when:
    
      from |-------------------| to (t2)
                  from |--------------------| to (t1)
    
      Returns false when:
    
         from |-------------------| to (t2)
    from |----------------------------------------| to (t1)
    
      from |-------------------| to (t2)
                            from |-------------------| to (t1)
    */
    function hasIntersection(t1, t2) {
        return t1.from < t2.to && t1.from > t2.from; // t1.windowSize === t2.windowSize
    }
    exports_1("hasIntersection", hasIntersection);
    /*
      Appends new found items to already existing data in cache.
      Also removes old data accordingly (e.g. if 4 new datapoints were added,
      the corresponding oldest four datapoints are removed).
    */
    function appendData(newDeltaData, cachedData) {
        lodash_1.default.each(newDeltaData, function (deltaData, index) {
            var matchingCachedData = lodash_1.default.find(cachedData, function (o) { return o.target === deltaData.target; });
            if (matchingCachedData && deltaData.datapoints) {
                var size = matchingCachedData.datapoints.length;
                var datapoints = deltaData.datapoints.concat(matchingCachedData.datapoints);
                datapoints = lodash_1.default.sortedUniqBy(datapoints.sort(function (a, b) { return a[1] - b[1]; }), function (a) { return a[1]; });
                matchingCachedData.datapoints = lodash_1.default.takeRight(datapoints, size);
            }
            else {
                cachedData.push(deltaData);
            }
        });
        return cachedData;
    }
    exports_1("appendData", appendData);
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            omitLabels = [
                'refId',
                'pluginId',
                'showWarningCantShowAllResults',
                'labelFormat',
                'timeShiftIsValid',
                'useFreeTextMetrics',
                'showGroupBySecondLevel',
                'aggregateGraphs',
                'canShowAllMetrics',
                'aggregationFunction',
                'timeFilter',
                'stableHash'
            ];
        }
    }
});
//# sourceMappingURL=delta_util.js.map