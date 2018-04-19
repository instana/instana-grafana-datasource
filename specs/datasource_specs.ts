import {describe, beforeEach, it, sinon, expect, angularMocks} from './lib/common';
import InstanaDatasource from '../src/datasource';
import TemplateSrvStub from './lib/template_srv_stub';
import Q from 'q';
import moment from 'moment';
import { Object } from 'es6-shim';

describe('InstanaDatasource', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

  beforeEach(function() {
    ctx.$q = Q;
    ctx.instanceSettings = {
			jsonData: {
				url: 'http://localhost:8010'
			}
		};
    
    ctx.ds = new InstanaDatasource(ctx.instanceSettings, ctx.backendSrv, ctx.templateSrv, ctx.$q);
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
    const snapshots = {
      status: 200,
      data: [ "A", "B" ]
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
    
    const snapshotsAfterTenSeconds = {
      status: 200,
      data: [ "A", "B", "C" ]
    };

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
          case "http://localhost:8010/api/snapshots?from=1516451043603&to=1516472658604&q=filler%20AND%20entity.pluginId%3Aprocess":
            return ctx.$q.resolve(snapshots);          
          case "http://localhost:8010/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&time=1516472658604":
            return ctx.$q.resolve(contexts);
          case "http://localhost:8010/api/snapshots?from=1516451043603&to=1516472658614&q=filler%20AND%20entity.pluginId%3Aprocess":
            return ctx.$q.resolve(snapshotsAfterTenSeconds);          
          case "http://localhost:8010/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&time=1516472658614":
            return ctx.$q.resolve(contextsAfterTenSeconds);            
          case "http://localhost:8010/api/snapshots/A?time=1516472658604":
            return ctx.$q.resolve(snapshotA);          
          case "http://localhost:8010/api/snapshots/B?time=1516472658604":
            return ctx.$q.resolve(snapshotB);
          case "http://localhost:8010/api/snapshots/A?time=1516472658614":
            return ctx.$q.resolve(snapshotA);          
          case "http://localhost:8010/api/snapshots/B?time=1516472658614":
            return ctx.$q.resolve(snapshotB);
          case "http://localhost:8010/api/snapshots/C?time=1516472658614":
            return ctx.$q.resolve(snapshotC);       
        }
      };
    });

    it('should return snapshots with labels', function() {
      return ctx.ds.fetchSnapshotsForTarget({
        "$$hashKey": "object:84",
        "entityQuery": "filler",
        "entityTpe": "process",
        "metric": {
          "key": "mem.virtual",
          "label": "Virtual",
          "$$hashKey": "object:121"
        },
        "snapshotCache": {},
        "refId": "A",
        "entityType": "process"
      }, '1516451043603', '1516472658604')
      .then(function(results) {
        expect(results.length).to.be(2);
        expect(results[0]).to.eql({ snapshotId: 'A', label: 'label for A (on host "Stans-Macbook-Pro")' });
        expect(results[1]).to.eql({ snapshotId: 'B', label: 'label for B' });
      });
    });

    xit('should cache snapshot data for a minute', function() {
      ctx.ds.currentTime = () => { return 1516472658614; };

      return ctx.ds.fetchSnapshotsForTarget({
        "$$hashKey": "object:84",
        "entityQuery": "filler",
        "entityTpe": "process",
        "metric": {
          "key": "mem.virtual",
          "label": "Virtual",
          "$$hashKey": "object:121"
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
        "entityType": "process"
      }, '1516451043603', '1516472658614')
      .then(function(results) {
        expect(results.length).to.be(2);
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
          "$$hashKey": "object:84",
          "entityQuery": "filler",
          "entityType": "process",
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual",
            "$$hashKey": "object:121"
          },
          "snapshotCache": {},
          "refId": "A"
        },
        {
          "refId": "B",
          "$$hashKey": "object:126",
          "entityQuery": "filler",
          "entityType": "process",
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual",
            "$$hashKey": "object:142"
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

    const snapshots = {
      status: 200,
      data: [ "A", "B" ]
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
          case "http://localhost:8010/api/snapshots?from=1516451043603&to=1516472658604&q=filler%20AND%20entity.pluginId%3Aprocess":
            return ctx.$q.resolve(snapshots);
          case "http://localhost:8010/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&time=1516472658604":
            return ctx.$q.resolve(contexts);
          case "http://localhost:8010/api/snapshots/A?time=1516472658604":
            return ctx.$q.resolve(snapshotA);          
          case "http://localhost:8010/api/snapshots/B?time=1516472658604":
            return ctx.$q.resolve(snapshotB);
          case "http://localhost:8010/api/metrics?metric=mem.virtual&from=1516451043603&to=1516472658604&rollup=300000&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
          case "http://localhost:8010/api/metrics?metric=mem.virtual&from=1516451043603&to=1516472658604&rollup=300000&snapshotId=B":
            return ctx.$q.resolve(metricsForB);
        }
      };
    });

    it("should return four targets with respective datapoints and cache the snapshot data", function() {
      const time = 1516472658604;
        
      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.be(4);
      
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
        expect(ctx.ds.snapshotCache['A']['filler%20AND%20entity.pluginId%3Aprocess'].time).to.be(time);
        expect(ctx.ds.snapshotCache['A']['filler%20AND%20entity.pluginId%3Aprocess'].snapshots.length).to.be(2);
        expect(ctx.ds.snapshotCache['A']['filler%20AND%20entity.pluginId%3Aprocess'].snapshots[0].snapshotId).to.eql('A');
        expect(ctx.ds.snapshotCache['A']['filler%20AND%20entity.pluginId%3Aprocess'].snapshots[0].label).to.eql('label for A (on host "Stans-Macbook-Pro")');
        expect(ctx.ds.snapshotCache['A']['filler%20AND%20entity.pluginId%3Aprocess'].snapshots[1].snapshotId).to.eql('B');
        expect(ctx.ds.snapshotCache['A']['filler%20AND%20entity.pluginId%3Aprocess'].snapshots[1].label).to.eql('label for B');
      });
    });
  });

  describe('When retrieving metrics for a singlestat panel', function() {
    // query a timerange of 2 days which should result in 5-minute rollups being fetched
    const options = {
      "timezone": "browser",
      "panelId": 1,
      "range": {
        "from": "2018-01-20T18:24:00.603Z",
        "to": "2018-01-22T18:24:00.603Z",
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
          "$$hashKey": "object:84",
          "pluginId": "singlestat",
          "entityQuery": "filler",
          "entityType": "process",
          "metric": {
            "key": "mem.virtual",
            "label": "Virtual",
            "$$hashKey": "object:121"
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

    const snapshots = {
      status: 200,
      data: [ "A" ]
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
          case "http://localhost:8010/api/snapshots?from=1516472640603&to=1516645440603&q=filler%20AND%20entity.pluginId%3Aprocess":
            return ctx.$q.resolve(snapshots);
          case "http://localhost:8010/api/snapshots/context?q=filler%20AND%20entity.pluginId%3Aprocess&time=1516645440603":
            return ctx.$q.resolve(contexts);
          case "http://localhost:8010/api/snapshots/A?time=1516645440603":
            return ctx.$q.resolve(snapshotA);          
          case "http://localhost:8010/api/metrics?metric=mem.virtual&from=1516472640603&to=1516645440603&rollup=300000&snapshotId=A":
            return ctx.$q.resolve(metricsForA);
        }
      };
    });

    it("should return one targets and extrapolate the data", function() {
      const time = 1516472658604;
        
      ctx.ds.currentTime = () => { return time; };

      return ctx.ds.query(options).then(function(results) {
        expect(results.data.length).to.be(1);
      
        expect(results.data[0].datapoints).to.eql([
          [600,1516451043603],
          [900,1516451103603],
          [300,1516451163603]
        ]);
      });
    });
  });
});