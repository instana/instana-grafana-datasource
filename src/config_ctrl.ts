import proxy_check from './proxy_check';

export class InstanaConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  /** @ngInject */
  constructor($scope) {
    // check possibility every time
    this.current.jsonData.canUseProxy = proxy_check();

    // just execute if the datasource was never saved with proxy info
    if (this.current.jsonData.useProxy === undefined) {
      this.current.jsonData.useProxy = proxy_check();
    }
  }
}
