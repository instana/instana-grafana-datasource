System.register([], function(exports_1) {
    // can be removed once mixpanel shows no old plugins around
    function default_1(target) {
        // 1.3.1 towards 2.0.0
        if (target.entityType && typeof target.entityType === 'string') {
            target.entityType = { key: target.entityType, label: target.entityType };
        }
        // 2.3.1 towards 2.4.0
        if (target.filter && target.filter !== '') {
            if (!target.customFilters) {
                target.customFilters = [];
                target.customFilters.push({ value: target.filter });
            }
        }
        // 2.4.2 towards 2.4.3
        if (target.timeInterval && target.timeInterval.value) {
            target.timeInterval.key = target.timeInterval.value;
            target.timeInterval.value = undefined;
        }
        if (target.timeInterval && target.timeInterval.rollup) {
            target.timeInterval.key = target.timeInterval.rollup;
            target.timeInterval.rollup = undefined;
        }
    }
    exports_1("default", default_1);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=migration.js.map