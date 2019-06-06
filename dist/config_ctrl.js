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
                function InstanaConfigCtrl($scope, datasourceSrv) {
                    this.datasourceSrv = datasourceSrv;
                    // check possibility every time
                    this.current.jsonData.canUseProxy = proxy_check_1.default();
                    this.current.jsonData.useProxy = this.current.jsonData.useProxy || proxy_check_1.default();
                    this.detectFeatures();
                }
                InstanaConfigCtrl.prototype.detectFeatures = function () {
                    var _this = this;
                    if (!this.current.id) {
                        return;
                    }
                    this.datasourceSrv.loadDatasource(this.current.name).then(function (datasource) {
                        return datasource.getVersion();
                    }).then(function (version) {
                        _this.current.jsonData.canQueryOfflineSnapshots = version >= 1.156;
                    });
                };
                InstanaConfigCtrl.prototype.onAccessChange = function () {
                    if (this.current.jsonData && this.current.jsonData.url && this.current.jsonData.apiToken) {
                        this.detectFeatures();
                    }
                };
                InstanaConfigCtrl.templateUrl = 'partials/config.html';
                return InstanaConfigCtrl;
            })();
            exports_1("InstanaConfigCtrl", InstanaConfigCtrl);
        }
    }
});
//# sourceMappingURL=config_ctrl.js.map