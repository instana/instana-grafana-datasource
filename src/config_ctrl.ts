import proxy_check from './proxy_check';

export class InstanaConfigCtrl {
  static templateUrl = 'partials/config.html';
  datasourceSrv: any;
  current: any;

  /** @ngInject */
  constructor($scope, datasourceSrv) {
    this.datasourceSrv = datasourceSrv;

    // check possibility every time
    this.current.jsonData.canUseProxy = proxy_check();

    if (this.current.jsonData.useProxy === undefined) {
      this.current.jsonData.useProxy = proxy_check();
    }

    this.detectFeatures();
  }

  detectFeatures() {
    if (!this.current.id) {
      return;
    }

    this.datasourceSrv.loadDatasource(this.current.name).then(datasource => {
      return datasource.getVersion();
    }).then(version => {
      this.current.jsonData.canQueryOfflineSnapshots = version >= 156;
    });
  }

  onAccessChange() {
    if (this.current.jsonData && this.current.jsonData.url && this.current.jsonData.apiToken) {
      this.detectFeatures();
    }
  }
}
