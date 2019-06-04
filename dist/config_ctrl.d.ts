export declare class InstanaConfigCtrl {
    static templateUrl: string;
    datasourceSrv: any;
    current: any;
    /** @ngInject */
    constructor($scope: any, datasourceSrv: any);
    detectFeatures(): void;
    onAccessChange(): void;
}
