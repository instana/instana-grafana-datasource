import {getDefaultChartGranularity} from "./util/rollup_granularity_util";
import AbstractDatasource from "./datasource_abstract";
import TimeFilter from "./types/time_filter";
import Selectable from "./types/selectable";
import Cache from './cache';

import _ from "lodash";

export default class InstanaSLODataSource extends AbstractDatasource {
  sloCache: Cache<Promise<Array<Selectable>>>;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
    this.sloCache = new Cache<Promise<Array<Selectable>>>();
  }

  getConfiguredSLOs(target, timeFilter: TimeFilter) {
    let url = '/api/events/settings/slo';
    /*return this.doRequest(url).then(response => {
      return _.map(response, (r, index) => {
        return {
          //TODO this might change
          'key': r.id,
          'label': r.name
        };
      });
    });*/
    let bla = [
      {
      'key': 'nbu293jab20as',
      'label': 'Robotshop Latency SLO'
      },
      {
      'key': 'nbuasdas293jab20as',
      'label': 'All Services Latency SLO'
      }
    ];

    return Promise.resolve(bla);
  }

  fetchSLOReport(target, timeFilter) {
    //avoid involid calls
    if (!target || !target.sloReport || !target.sloSpecific) {
      return this.$q.resolve({data: {items: []}});
    }

    const windowSize = this.getWindowSize(timeFilter);

    //do the request

    //extract the data which is actually wanted (target.sloSpecific)

    //put the value into proper formatting
  }

  splitAndPopulate(series) {
    //if the timeseries is actually requested then you separate the "good"
    //points with the "bad" ones through separate arrays
    //put the good ones into the first array
    //add three empty targets
    //put the bad ones into the fifth array
    //return that shit

    series[0].push(this.createEmptyTarget());
    series[0].push(this.createEmptyTarget());
    series[0].push(this.createEmptyTarget());

    series[0].push(this.mock(series));
    series[0][4].datapoints = _.takeRight(series[0][0].datapoints, 6);
  }

  createEmptyTarget() {
    return {
      target: "",
      datapoints: [[]],
      refId: "FAKE"
    };
  }

  mock(series) {
    let datapoints = series[0][0].datapoints;
    console.log(series);
    datapoints = _.map(datapoints, d => {
      return [d[0] + d[0], d[1]];
    });

    return {
      target: "",
      datapoints: datapoints,
      refId: ""
    };
  }
}
