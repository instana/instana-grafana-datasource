import {describe, beforeEach, it, sinon, expect, angularMocks} from './lib/common';
import InstanaDatasource from '../src/datasource';
import TemplateSrvStub from './lib/template_srv_stub';
import Q from 'q';
import moment from 'moment';
import { Object } from 'es6-shim';

describe('Given an InstanaDatasource', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };
  let timeFilter: any = {
    to: 1516472658604,
    from: 1516451043603,
    windowSize: 21615001
  };
  window.grafanaBootData =  { settings: { buildInfo: { version : "5.3.0" } } };

  beforeEach(function() {
    ctx.$q = Q;
    ctx.instanceSettings = {
      id: 1,
      name: 'instana-local-test',
      url: '/api/datasources/proxy/1',
      jsonData: {
        url: 'http://localhost:8010',
        apiToken: 'valid-api-token',
        useProxy: true
      }
    };

    ctx.ds = new InstanaDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
    ctx.ds.timeFilter = timeFilter;
    ctx.ds.resultCache.put('version', 172, 3600000);
  });

  describe('When performing testDatasource', function() {
    describe('and 401 (Unauthorized) is returned', function() {
      const error = {
        data: {},
        status: 401,
        statusText: 'Unauthorized'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.reject(error);
        };
      });

      it('should return an error and a detailed messsage.', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('error');
          expect(results.message).to.equal('Unauthorized. Please verify the API Token.');
        });
      });
    });

    describe('and 404 (Not Found) is returned', function() {
      const error = {
        data: {},
        status: 404,
        statusText: 'Not Found'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.reject(error);
        };
      });

      it('should return success status', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('error');
          expect(results.message).to.equal('Error (404) connecting to the Instana API: Not Found');
        });
      });
    });

    describe('and 200 (OK) is returned', function() {
      const response = {
        data: {"hostCount": 27},
        status: 200,
        statusText: 'OK'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.resolve(response);
        };
      });

      it('should return success status', function() {
        return ctx.ds.testDatasource().then(function(results) {
          expect(results.status).to.equal('success');
          expect(results.message).to.equal('Successfully connected to the Instana API.');
        });
      });
    });
  });

  describe('When retrieving SLO information', function() {
    const definedSli = [
      {
        "id": "1",
        "sloName": "Slo 1",
        "initialEvaluationTimestamp": 1585046123732,
        "metricName": "latency",
        "metricAggregation": "P95",
        "threshold": 150,
        "applicationId": "PYmAf835TSKdhR6Nm4gFMQ",
        "serviceId": null,
        "endpointId": null,
        "lastUpdated": 1585066443732
      },
      {
        "id": "2",
        "sloName": "Slo 2",
        "initialEvaluationTimestamp": 1585046123732,
        "metricName": "latency",
        "metricAggregation": "P95",
        "threshold": 150,
        "applicationId": "PYmAf835TSKdhR6Nm4gFMR",
        "serviceId": null,
        "endpointId": null,
        "lastUpdated": 1585066443732
      },
      {
        "id": "3",
        "sloName": "Slo 3",
        "initialEvaluationTimestamp": 1585046123732,
        "metricName": "latency",
        "metricAggregation": "P95",
        "threshold": 150,
        "applicationId": "PYmAf835TSKdhR6Nm4gFMS",
        "serviceId": null,
        "endpointId": null,
        "lastUpdated": 1585066443732
      } 
    ];

    const sliReportResponse = {
      "data": { 
        "sli":1.0,
        "slo":0.8,
        "errorBudgetRemaining":72,
        "fromTimestamp":1587029766000,
        "toTimestamp":1587051366000,
        "violationDistribution": {"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":1,"33":1,"34":1,"35":1,"36":1,"37":1,"38":1,"39":1,"40":1,"41":1,"42":1,"43":1,"44":1,"45":1,"46":1,"47":1,"48":1,"49":1,"50":1,"51":1,"52":1,"53":1,"54":1,"55":1,"56":1,"57":1,"58":1,"59":1,"60":1,"61":1,"62":1,"63":1,"64":1,"65":1,"66":1,"67":1,"68":1,"69":1,"70":1,"71":1,"72":1,"73":1,"74":1,"75":1,"76":1,"77":0,"78":0,"79":-1,"80":-1,"81":-1,"82":-1,"83":-1,"84":-1,"85":-1,"86":-1,"87":-1,"88":-1,"89":-1,"90":-1,"91":-1,"92":-1,"93":-1,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0}
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/settings/sli":
            return ctx.$q.resolve(definedSli);
          case "/api/datasources/proxy/1/instana/api/sli/report/2?from=1516451043603&to=1516472658604&slo=0.8":
            return ctx.$q.resolve(sliReportResponse);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it('should return only one value for sli', function() {
      return ctx.ds.slo.fetchSLOReport({
        "sloReport": {
          "key": "2",
          "label": "Some Random SloReport"
        },
        "sloSpecific": {
          "key": "SLI",
          "label": "SLI"
        },
        "sloValue": "0.8"
      }, timeFilter)
      .then(function(results) {
        expect(results.length).to.equal(1);
        expect(results[0].target).to.equal("SLI");
        expect(results[0].datapoints.length).to.equal(1);
        expect(results[0].datapoints[0][0]).to.equal(1.0);
      });
    });

    it('should return only one value for remaining error budget', function() {
      return ctx.ds.slo.fetchSLOReport({
        "sloReport": {
          "key": "2",
          "label": "Some Random SloReport"
        },
        "sloSpecific": {
          "key": "Remaining Error Budget",
          "label": "Remaining Error Budget"
        },
        "sloValue": "0.8"
      }, timeFilter)
      .then(function(results) {
        expect(results.length).to.equal(1);
        expect(results[0].target).to.equal("Remaining Error Budget");
        expect(results[0].datapoints.length).to.equal(1);
        expect(results[0].datapoints[0][0]).to.equal(72);
      });
    });

    it('should return three result targets with only datapoint values of 1', function() {
      return ctx.ds.slo.fetchSLOReport({
        "sloReport": {
          "key": "2",
          "label": "Some Random SloReport"
        },
        "sloSpecific": {
          "key": "Timeseries",
          "label": "Timeseries"
        },
        "sloValue": "0.8"
      }, timeFilter)
      .then(function(results) {
        expect(results[0].length).to.equal(3);
        expect(results[0][0].target).to.equal("No violation");
        expect(results[0][1].target).to.equal("Violation");
        expect(results[0][2].target).to.equal("No data");

        for (let j = 0; j < results[0][0].datapoints.length; j++) {
          expect(results[0][0].datapoints[j][0]).to.equal(1);
        }

        for (let j = 0; j < results[0][1].datapoints.length; j++) {
          expect(results[0][1].datapoints[j][0]).to.equal(1);
        }

        for (let j = 0; j < results[0][2].datapoints.length; j++) {
          expect(results[0][2].datapoints[j][0]).to.equal(1);
        }
      });
    });

  });

  describe('When retrieving snapshots for a target', function() {

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        },
        {
          "snapshotId": "B",
          "host": ""
        }
      ]
    }

    const contextsAfterTenSeconds = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        },
        {
          "snapshotId": "B",
          "host": ""
        },
        {
          "snapshotId": "C",
          "host": ""
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const snapshotB = {
      status: 200,
      data: {
        label: 'label for B'
      }
    };

    const snapshotC = {
      status: 200,
      data: {
        label: 'label for C'
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1516451043603&to=1516472658604&time=1516472658604&size=100":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&size=100":
            return ctx.$q.resolve(contextsAfterTenSeconds);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?time=1516472658604":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/snapshots/B?time=1516472658604":
            return ctx.$q.resolve(snapshotB);
          case "/api/datasources/proxy/1/instana/api/snapshots/C?time=1516472658604":
            return ctx.$q.resolve(snapshotC);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it('should return snapshots with response', function() {
      return ctx.ds.infrastructure.fetchSnapshotsForTarget({
        "entityQuery": "filler",
        "entityType": {
          "key": "process",
          "label": "Process"
        },
        "metric": {
          "key": "mem.virtual",
          "label": "Virtual"
        },
        "snapshotCache": {},
        "refId": "A",
      }, timeFilter)
      .then(function(results) {
        expect(results.length).to.equal(2);
        expect(results[0]).to.eql({ snapshotId: 'A', host: 'Stans-Macbook-Pro', response: { status: 200, data: { label: 'label for A' }}});
        expect(results[1]).to.eql({ snapshotId: 'B', host: '', response: { status: 200, data: { label: 'label for B' }}});
      });
    });

    it('should cache snapshot data for a minute', function() {
      ctx.ds.infrastructure.currentTime = () => { return 1516472658604; };

      return ctx.ds.infrastructure.fetchSnapshotsForTarget({
        "entityQuery": "filler",
        "entityType": {
          "key": "process",
          "label": "Process"
        },
        "metric": {
          "key": "mem.virtual",
          "label": "Virtual",
        },
        "snapshotCache": {
          'filler%20AND%20entity.pluginId%3Aprocess': {
            'time': '1516472658600',
            'snapshots': [
              {
                'snapshotId': 'A',
                'label': 'label for A (on host "Stans-Macbook-Pro")'
              },
              {
                'snapshotId': 'B',
                'label': 'label for B'
              }
            ]
          }
        },
        "refId": "A",
      }, timeFilter)
      .then(function(results) {
        expect(results.length).to.equal(2);
        expect(results[0]).to.eql({ snapshotId: 'A', host: 'Stans-Macbook-Pro', response: { status: 200, data: { label: 'label for A (on host "Stans-Macbook-Pro")' }}});
        expect(results[1]).to.eql({ snapshotId: 'B', host: '', response: { status: 200, data: { label: 'label for B' }}});
      });
    })
  });

  describe('When performing a query for multiple targets that both return two snapshots', function() {
    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-01-20T12:24:03.603Z",
        "to": "2018-01-20T18:24:18.604Z",
        "raw": {
          "from": "now-6h",
          "to": "now"
        }
      },
      "rangeRaw": {
        "from": "now-6h",
        "to": "now"
      },
      "interval": "20s",
      "intervalMs": 20000,
      "targets": [
        {
          "refId": "A",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual",
          },
          "snapshotCache": {},
          "hide": false
        },
        {
          "refId": "B",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual",
          },
          "snapshotCache": {},
          "hide": false
        }
      ],
      "format": "json",
      "maxDataPoints": 1063,
      "scopedVars": {
        "__interval": {
          "text": "20s",
          "value": "20s"
        },
        "__interval_ms": {
          "text": 20000,
          "value": 20000
        }
      }
    };

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        },
        {
          "snapshotId": "B",
          "host": ""
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const snapshotB = {
      status: 200,
      data: {
        label: 'label for B'
      }
    };

    const metricsForA = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":1.3292612266666E9},
          {"timestamp":1516451103603,"value":1.3306768042666E9},
          {"timestamp":1516451163603,"value":1.3321622869333E9}
        ]
      }
    };
    const metricsForB = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":1.3290864644444E9},
          {"timestamp":1516451103603,"value":1.3301699925333E9},
          {"timestamp":1516451163603,"value":1.3317253802666E9}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1516451043000&to=1516472658000&time=1516472658000&size=100":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?time=1516472658000":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/snapshots/B?time=1516472658000":
            return ctx.$q.resolve(snapshotB);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1516451043000&to=1516472658000&rollup=3600000&fillTimeSeries=true&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1516451043000&to=1516472658000&rollup=3600000&fillTimeSeries=true&snapshotId=B":
            return ctx.$q.resolve(metricsForB);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it("should return four targets with respective datapoints and cache the snapshot data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.equal(4);

        expect(results.data[0].datapoints).to.eql([
          [1.3292612266666E9,1516451043603],
          [1.3306768042666E9,1516451103603],
          [1.3321622869333E9,1516451163603]
        ]);
        expect(results.data[1].datapoints).to.eql([
          [1.3290864644444E9,1516451043603],
          [1.3301699925333E9,1516451103603],
          [1.3317253802666E9,1516451163603]
        ]);
        expect(results.data[2].datapoints).to.eql([
          [1.3292612266666E9,1516451043603],
          [1.3306768042666E9,1516451103603],
          [1.3321622869333E9,1516451163603]
        ]);
        expect(results.data[3].datapoints).to.eql([
          [1.3290864644444E9,1516451043603],
          [1.3301699925333E9,1516451103603],
          [1.3317253802666E9,1516451163603]
        ]);
      });
    });

    it("should cache the snapshot data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        const query = 'filler%20AND%20entity.pluginId%3Aprocess';
        const timeFilter = ctx.ds.readTime(options);
        const key = ctx.ds.infrastructure.buildSnapshotCacheKey(query, timeFilter);

        expect(key).to.equal(query + '|25274184|25274544'); // query time is contained inside key

        const snapshots = ctx.ds.infrastructure.snapshotCache.get(key).valueOf();
        expect(snapshots.length).to.equal(2);
        expect(snapshots[0].snapshotId).to.eql('A');
        expect(snapshots[0].host).to.eql('Stans-Macbook-Pro');
        expect(snapshots[0].response).to.eql(snapshotA);
        expect(snapshots[1].snapshotId).to.eql('B');
        expect(snapshots[1].host).to.eql('');
        expect(snapshots[1].response).to.eql(snapshotB);
      });
    });
  });

  describe('When retrieving MEAN metrics for a singlestat panel', function() {
    // query data that is older than three months should result in one hour rollups being fetched
    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-04-20T18:24:00.603Z",
        "to": "2018-04-22T18:24:00.603Z",
        "raw": {
          "from": "now-6h",
          "to": "now"
        }
      },
      "rangeRaw": {
        "from": "now-2d",
        "to": "now"
      },
      "interval": "20s",
      "intervalMs": 20000,
      "targets": [
        {
          "refId": "A",
          "pluginId": "singlestat",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual"
          },
          "aggregation" : "MEAN",
          "snapshotCache": {}
        }
      ],
      "format": "json",
      "maxDataPoints": 1063,
      "scopedVars": {
        "__interval": {
          "text": "20s",
          "value": "20s"
        },
        "__interval_ms": {
          "text": 20000,
          "value": 20000
        }
      }
    };

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const metricsForA = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":2},
          {"timestamp":1516451103603,"value":3},
          {"timestamp":1516451163603,"value":1}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640000&to=1524421440000&time=1524421440000&size=100":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?time=1524421440000":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640000&to=1524421440000&rollup=3600000&fillTimeSeries=true&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it("should return one target without extrapolate the data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.equal(1);
        const datapoints = results.data[0].datapoints;
        expect(datapoints.length).to.equal(3);
        expect(datapoints).to.deep.include.members([[ 1, 1516451163603 ]]);
        expect(datapoints).to.deep.include.members([[ 2, 1516451043603 ]]);
        expect(datapoints).to.deep.include.members([[ 3, 1516451103603 ]]);
      });
    });
  });

  describe('When retrieving MEAN metrics for a table', function() {
    // query data that is older than three months should result in one hour rollups being fetched
    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-04-20T18:24:00.603Z",
        "to": "2018-04-22T18:24:00.603Z",
        "raw": {
          "from": "now-6h",
          "to": "now"
        }
      },
      "rangeRaw": {
        "from": "now-2d",
        "to": "now"
      },
      "interval": "20s",
      "intervalMs": 20000,
      "targets": [
        {
          "refId": "A",
          "pluginId": "table",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual"
          },
          "aggregation": "MEAN",
          "snapshotCache": {}
        }
      ],
      "format": "json",
      "maxDataPoints": 1063,
      "scopedVars": {
        "__interval": {
          "text": "20s",
          "value": "20s"
        },
        "__interval_ms": {
          "text": 20000,
          "value": 20000
        }
      }
    };

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const metricsForA = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":2},
          {"timestamp":1516451103603,"value":3},
          {"timestamp":1516451163603,"value":1}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640000&to=1524421440000&time=1524421440000&size=100":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?time=1524421440000":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640000&to=1524421440000&rollup=3600000&fillTimeSeries=true&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it("should return one target without extrapolate the data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.equal(1);
        const datapoints = results.data[0].datapoints;
        expect(datapoints.length).to.equal(3);
        expect(datapoints).to.deep.include.members([[ 1, 1516451163603 ]]);
        expect(datapoints).to.deep.include.members([[ 2, 1516451043603 ]]);
        expect(datapoints).to.deep.include.members([[ 3, 1516451103603 ]]);
      });
    });
  });

  describe('When retrieving SUM metrics for a singlestat panel', function() {
    // query data that is older than three months should result in one hour rollups being fetched
    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-04-20T18:24:00.603Z",
        "to": "2018-04-22T18:24:00.603Z",
        "raw": {
          "from": "now-6h",
          "to": "now"
        }
      },
      "rangeRaw": {
        "from": "now-2d",
        "to": "now"
      },
      "interval": "20s",
      "intervalMs": 20000,
      "targets": [
        {
          "refId": "A",
          "pluginId": "singlestat",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual"
          },
          "aggregation": "SUM",
          "snapshotCache": {}
        }
      ],
      "format": "json",
      "maxDataPoints": 1063,
      "scopedVars": {
        "__interval": {
          "text": "20s",
          "value": "20s"
        },
        "__interval_ms": {
          "text": 20000,
          "value": 20000
        }
      }
    };

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const metricsForA = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":2},
          {"timestamp":1516451103603,"value":3},
          {"timestamp":1516451163603,"value":1}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640000&to=1524421440000&time=1524421440000&size=100":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?time=1524421440000":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640000&to=1524421440000&rollup=3600000&fillTimeSeries=true&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it("should return one target and extrapolate the data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.equal(1);
        const datapoints = results.data[0].datapoints;
        expect(datapoints.length).to.equal(3);
        expect(datapoints).to.deep.include.members([[ 3600, 1516451163603 ]]);
        expect(datapoints).to.deep.include.members([[ 7200, 1516451043603 ]]);
        expect(datapoints).to.deep.include.members([[ 10800, 1516451103603 ]]);
      });
    });
  });

  describe('When retrieving SUM metrics for a table', function() {
    // query data that is older than three months should result in one hour rollups being fetched
    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-04-20T18:24:00.603Z",
        "to": "2018-04-22T18:24:00.603Z",
        "raw": {
          "from": "now-6h",
          "to": "now"
        }
      },
      "rangeRaw": {
        "from": "now-2d",
        "to": "now"
      },
      "interval": "20s",
      "intervalMs": 20000,
      "targets": [
        {
          "refId": "A",
          "pluginId": "table",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual"
          },
          "aggregation": "SUM",
          "snapshotCache": {}
        }
      ],
      "format": "json",
      "maxDataPoints": 1063,
      "scopedVars": {
        "__interval": {
          "text": "20s",
          "value": "20s"
        },
        "__interval_ms": {
          "text": 20000,
          "value": 20000
        }
      }
    };

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const metricsForA = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":2},
          {"timestamp":1516451103603,"value":3},
          {"timestamp":1516451163603,"value":1}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640000&to=1524421440000&time=1524421440000&size=100":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?time=1524421440000":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640000&to=1524421440000&rollup=3600000&fillTimeSeries=true&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it("should return one target and extrapolate the data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.equal(1);
        const datapoints = results.data[0].datapoints;
        expect(datapoints.length).to.equal(3);
        expect(datapoints).to.deep.include.members([[ 3600, 1516451163603 ]]);
        expect(datapoints).to.deep.include.members([[ 7200, 1516451043603 ]]);
        expect(datapoints).to.deep.include.members([[ 10800, 1516451103603 ]]);
      });
    });
  });

});

describe('Given an InstanaDatasource without proxy', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

  beforeEach(function() {
    ctx.$q = Q;
    ctx.instanceSettings = {
      id: 1,
      name: 'instana-local-test',
      url: '/api/datasources/proxy/1',
      jsonData: {
        url: 'http://localhost:8010',
        apiToken: 'valid-api-token'
      }
    };

    window.grafanaBootData =  { settings: { buildInfo: { version : "5.2.9" } } };
    ctx.ds = new InstanaDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
    window.grafanaBootData =  { settings: { buildInfo: { version : "5.3.0" } } };
  });

  describe('When performing any request', function() {

    beforeEach(function() {
      const response = {
        data: {"hostCount": 27},
        status: 200,
        statusText: 'OK'
      };
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "http://localhost:8010/api/monitoringState":
            return ctx.$q.resolve(response);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it('should use a direkt call', function() {
      return ctx.ds.testDatasource().then(function(results) {
        expect(results.status).to.equal('success');
        expect(results.message).to.equal('Successfully connected to the Instana API.');
      });
    });

  });
});

describe('Given an InstanaDatasource with offline snapshots', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

  beforeEach(function() {
    ctx.$q = Q;
    ctx.instanceSettings = {
      id: 1,
      name: 'instana-local-test',
      url: '/api/datasources/proxy/1',
      jsonData: {
        url: 'http://localhost:8010',
        apiToken: 'valid-api-token',
        useProxy: true,
        showOffline: true
      }
    };

    ctx.ds = new InstanaDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
    ctx.ds.resultCache.put('version', 172, 3600000);
  });

  describe('When retrieving metrics for offline snapshots', function() {

    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-04-20T18:24:00.603Z",
        "to": "2018-04-22T18:24:00.603Z",
        "raw": {
          "from": "now-6h",
          "to": "now"
        }
      },
      "rangeRaw": {
        "from": "now-2d",
        "to": "now"
      },
      "interval": "20s",
      "intervalMs": 20000,
      "targets": [
        {
          "refId": "A",
          "metricCategory": '0',
          "entityQuery": "filler",
          "entityType": {
            "key": "process",
            "label": "Process"
          },
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual",
          }
        }
      ],
      "format": "json",
      "maxDataPoints": 1063,
      "scopedVars": {
        "__interval": {
          "text": "20s",
          "value": "20s"
        },
        "__interval_ms": {
          "text": 20000,
          "value": 20000
        }
      }
    };

    const contexts = {
      status: 200,
      data: [
        {
          "snapshotId": "A",
          "host": "Stans-Macbook-Pro"
        }
      ]
    }

    const snapshotA = {
      status: 200,
      data: {
        label: 'label for A'
      }
    };

    const metricsForA = {
      status: 200,
      data: {
        "values": [
          {"timestamp":1516451043603,"value":42},
          {"timestamp":1516451103603,"value":69},
          {"timestamp":1516451163603,"value":13}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640000&to=1524421440000":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A?from=1524248640000&to=1524421440000":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640000&to=1524421440000&rollup=3600000&fillTimeSeries=true&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          default:
            throw new Error('Unexpected call URL: ' + options.url);
        }
      };
    });

    it('should display offline metrics', function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.equal(1);
        expect(results.data[0].datapoints).to.eql([
          [42,1516451043603],
          [69,1516451103603],
          [13,1516451163603]
        ]);
      });
    });

  });

  describe('When performing getVersion', function() {
    const version = {
      status: 200,
      data: {
        "imageTag":"2.172.9-0"
      }
    };
    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        return ctx.$q.resolve(version);
      };
    });

    it('should return a correct version.', function() {
      return ctx.ds.getVersion().then(function(results) {
        expect(results).to.equal(172);
      });
    });
  });
});
