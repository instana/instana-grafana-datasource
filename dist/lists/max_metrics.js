System.register([], function(exports_1) {
    return {
        setters:[],
        execute: function() {
            exports_1("default",[
                {
                    'key': 'cpu.used',
                    'value': 'cpu.count',
                    'label': 'cpu.max' // label that shall be shown as target in graph
                },
                {
                    'key': 'memory.used',
                    'value': 'memory.total',
                    'label': 'memory.max'
                },
                {
                    'key': 'openFiles.used',
                    'value': 'openFiles.max',
                    'label': 'openFiles.max'
                }
            ]);
        }
    }
});
//# sourceMappingURL=max_metrics.js.map