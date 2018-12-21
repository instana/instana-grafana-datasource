System.register([], function(exports_1) {
    // can be removed once mixpanel shows no old plugins around
    function default_1(target) {
        // 1.3.1 towards 2.0.0
        if (target.entityType && typeof target.entityType === 'string') {
            // console.log('Found previous simple entityType for', target.entityType);
            target.entityType = { key: target.entityType, label: target.entityType };
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