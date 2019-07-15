System.register([], function(exports_1) {
    return {
        setters:[],
        execute: function() {
            exports_1("default",[
                {
                    availableFor: 1000 * 60 * 60 * 24,
                    rollup: 1000,
                    label: '1s'
                },
                {
                    availableFor: 1000 * 60 * 60 * 24,
                    rollup: 1000 * 5,
                    label: '5s'
                },
                {
                    availableFor: 1000 * 60 * 60 * 24 * 31,
                    rollup: 1000 * 60,
                    label: '1min'
                },
                {
                    availableFor: 1000 * 60 * 60 * 24 * 31 * 3,
                    rollup: 1000 * 60 * 5,
                    label: '5min'
                },
                {
                    availableFor: Number.MAX_VALUE,
                    rollup: 1000 * 60 * 60,
                    label: '1h'
                }
            ]);
        }
    }
});
//# sourceMappingURL=rollups.js.map