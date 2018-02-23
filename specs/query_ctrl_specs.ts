import {describe, beforeEach, it, sinon, expect} from './lib/common';
import {InstanaQueryCtrl} from '../src/query_ctrl';
import TemplateSrvStub from './lib/template_srv_stub';
import Q from 'q';
import moment from 'moment';
import { PanelCtrl } from 'app/plugins/sdk';

describe('InstanaQueryCtrl', function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

  beforeEach(function() {

  });
  let queryCtrl;

  beforeEach(function() {
    ctx.$q = Q;
    
    queryCtrl = new InstanaQueryCtrl({}, {}, new TemplateSrvStub(), ctx.backendSrv);
    queryCtrl.datasource = {
      $q: Q, 
      registerCacheSnapshotDataCallback: function(cb) { }
    };
    queryCtrl.panelCtrl = {
      refresh: function() {}
    };
  });

  describe('when entering a filter', function() {

    describe('that returns some snapshots', function() {	
			it('should populate the entity types dropdown with unique entity types', function() {
        queryCtrl.datasource.request = function(options) {
          return ctx.$q.resolve(
            {               
              data: [
                'docker',
                'host',
                'weblogicapplicationcontainer'
              ]          
            });
        };

        queryCtrl.target.filter = '*eu';
        
        return queryCtrl.onFilterChange().then(() => {
          expect(queryCtrl.uniqueEntityTypes).to.eql(['docker', 'host', 'weblogicapplicationcontainer']);
          expect(queryCtrl.target.queryIsValid).to.be(true);
        }
			 );
    });

		describe('that returns zero snapshots', function() {	
			it('should show no entity types found in the entity type drowdown', function() {
        queryCtrl.datasource.request = function(options) {
          return ctx.$q.resolve(
            {
              data: []
            });
        };

        return queryCtrl.onFilterChange().then(() => {
          expect(queryCtrl.uniqueEntityTypes).to.eql([]);
          expect(queryCtrl.target.entityType).to.be(null);
          expect(queryCtrl.target.queryIsValid).to.be(true);
        });
			});
    });
  });

  describe('that returns a query parsing error', function() {	
    it('should set the query state to invalid', function() {
      queryCtrl.datasource.request = function(options) {
        return ctx.$q.reject(
          {               
            status: 400
          });
      };

      queryCtrl.target.filter = '*eu';
      
      return queryCtrl.onFilterChange().then(() => {
        expect(queryCtrl.target.queryIsValid).to.be(false);
      });
    });
  });

  describe('when selecting entity type', function() {
    
    it('should populate metric dropdown', function() {
      queryCtrl.target.entityType = "hadoopyarnnode";
      queryCtrl.onEntityTypeSelect();
      
      expect(queryCtrl.availableMetrics).to.eql([
        { key:"allocatedVCores", label: "Allocated Virtual Cores" },
        { key:"availableVCores", label: "Available Virtual Cores" },
        { key:"allocatedMem", label: "Allocated Memory" },
        { key:"availableMem", label: "Available Memory" }]);
    })
  })
})
});
