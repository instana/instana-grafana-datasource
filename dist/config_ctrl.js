System.register(['./proxy_check'], function(exports_1) {
    var proxy_check_1;
    var InstanaConfigCtrl;
    return {
        setters:[
            function (proxy_check_1_1) {
                proxy_check_1 = proxy_check_1_1;
            }],
        execute: function() {
            InstanaConfigCtrl = (function () {
                /** @ngInject */
                function InstanaConfigCtrl($scope) {
                    // check possibility every time
                    this.current.jsonData.canUseProxy = proxy_check_1.default();
                    // just execute if the datasource was never saved with proxy info
                    if (this.current.jsonData.useProxy === undefined) {
                        this.current.jsonData.useProxy = proxy_check_1.default();
                    }
                }
                InstanaConfigCtrl.templateUrl = 'partials/config.html';
                return InstanaConfigCtrl;
            })();
            exports_1("InstanaConfigCtrl", InstanaConfigCtrl);
        }
    }
});
//# sourceMappingURL=config_ctrl.js.map