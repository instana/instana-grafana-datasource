System.register(['lodash'], function(exports_1) {
    var lodash_1;
    // check grafana version (5.3+)
    function default_1() {
        var version = lodash_1.default.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');
        var versions = lodash_1.default.split(version, '.', 2);
        return (version[0] >= 6 || (versions[0] >= 5 && versions[1] >= 3));
    }
    exports_1("default", default_1);
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=proxy_check.js.map