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
        apiToken: 'valid-api-token'
      }
    };

    ctx.ds = new InstanaDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
    ctx.ds.timeFilter = timeFilter;
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
      const response = {
        data: {},
        status: 404,
        statusText: 'Not Found'
      };

      beforeEach(function() {
        ctx.backendSrv.datasourceRequest = function(options) {
          return ctx.$q.reject(response);
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
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1516451043603&to=1516472658604&size=100&newApplicationModelEnabled=true":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&size=100&newApplicationModelEnabled=true":
            return ctx.$q.resolve(contextsAfterTenSeconds);
          case "/api/datasources/proxy/1/instana/api/snapshots/A":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/snapshots/B":
            return ctx.$q.resolve(snapshotB);
          case "/api/datasources/proxy/1/instana/api/snapshots/C":
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

    xit('should cache snapshot data for a minute', function() {
      ctx.ds.infrastructure.currentTime = () => { return 1516472658614; };

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
            'time': '1516472658604',
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
        expect(results[0]).to.eql({ snapshotId: 'A', label: 'label for A (on host "Stans-Macbook-Pro")' });
        expect(results[1]).to.eql({ snapshotId: 'B', label: 'label for B' });
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
          "refId": "A"
        },
        {
          "refId": "B",
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
          {"timestamp":1516451043603,"value":1.329086464E9},
          {"timestamp":1516451103603,"value":1.3301699925333E9},
          {"timestamp":1516451163603,"value":1.3317253802666E9}
        ]
      }
    };

    beforeEach(function() {
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1516451043603&to=1516472658604&size=100&newApplicationModelEnabled=true":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/snapshots/B":
            return ctx.$q.resolve(snapshotB);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1516451043603&to=1516472658604&rollup=3600000&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1516451043603&to=1516472658604&rollup=3600000&snapshotId=B":
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
          [1.329086464E9,1516451043603],
          [1.3301699925333E9,1516451103603],
          [1.3317253802666E9,1516451163603]
        ]);
        expect(results.data[2].datapoints).to.eql([
          [1.3292612266666E9,1516451043603],
          [1.3306768042666E9,1516451103603],
          [1.3321622869333E9,1516451163603]
        ]);
        expect(results.data[3].datapoints).to.eql([
          [1.329086464E9,1516451043603],
          [1.3301699925333E9,1516451103603],
          [1.3317253802666E9,1516451163603]
        ]);
      });
    });

    it("should cache the snapshot data", function() {
      const time = 1516472658604;

      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        const timeFilter = ctx.ds.readTime(options);
        const key = ctx.ds.infrastructure.buildSnapshotCacheKey('filler%20AND%20entity.pluginId%3Aprocess', timeFilter);

        expect(ctx.ds.infrastructure.snapshotCache.get(key).length).to.equal(2);
        expect(ctx.ds.infrastructure.snapshotCache.get(key)[0].snapshotId).to.eql('A');
        expect(ctx.ds.infrastructure.snapshotCache.get(key)[0].host).to.eql('Stans-Macbook-Pro');
        expect(ctx.ds.infrastructure.snapshotCache.get(key)[0].response).to.eql(snapshotA);
        expect(ctx.ds.infrastructure.snapshotCache.get(key)[1].snapshotId).to.eql('B');
        expect(ctx.ds.infrastructure.snapshotCache.get(key)[1].host).to.eql('');
        expect(ctx.ds.infrastructure.snapshotCache.get(key)[1].response).to.eql(snapshotB);
      });
    });
  });

  describe('When retrieving metrics for a singlestat panel', function() {
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
          "pluginId": "singlestat",
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
          "refId": "A"
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
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640603&to=1524421440603&size=100&newApplicationModelEnabled=true":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640603&to=1524421440603&rollup=3600000&snapshotId=A":
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

  describe('When retrieving metrics for a table', function() {
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
          "pluginId": "table",
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
          "refId": "A"
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
          case "/api/datasources/proxy/1/instana/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&from=1524248640603&to=1524421440603&size=100&newApplicationModelEnabled=true":
            return ctx.$q.resolve(contexts);
          case "/api/datasources/proxy/1/instana/api/snapshots/A":
            return ctx.$q.resolve(snapshotA);
          case "/api/datasources/proxy/1/instana/api/metrics?metric=mem.virtual&from=1524248640603&to=1524421440603&rollup=3600000&snapshotId=A":
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
        data: {},
        status: 404,
        statusText: 'Not Found'
      };
      ctx.backendSrv.datasourceRequest = function(options) {
        switch (options.url) {
          case "http://localhost:8010/api/snapshots/non-existing-snapshot-id?time=0":
            return ctx.$q.reject(response);
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
