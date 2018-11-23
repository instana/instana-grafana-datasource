import { describe, beforeEach, it, sinon, expect } from "./lib/common";
import TemplateSrvStub from "./lib/template_srv_stub";
import { InstanaQueryCtrl } from "../src/query_ctrl";
import { PanelCtrl } from "app/plugins/sdk";
import moment from "moment";
import Q from "q";

describe("InstanaQueryCtrl", function() {
  let ctx: any = {
    backendSrv: {},
    templateSrv: new TemplateSrvStub()
  };

  let queryCtrl;

  beforeEach(function() {
    ctx.$q = Q;

    queryCtrl = new InstanaQueryCtrl(
      {},
      {},
      new TemplateSrvStub(),
      ctx.backendSrv
    );
    queryCtrl.datasource = {
      $q: Q,
      registerCacheSnapshotDataCallback: function(cb) {}
    };
    queryCtrl.panelCtrl = {
      refresh: function() {}
    };
  });

  describe("when entering a dynamic focus query", function() {
    describe("that returns some snapshots", function() {
      it("should populate the entity types dropdown with unique entity types", function() {
        queryCtrl.datasource.fetchTypesForTarget = function(options) {
          return ctx.$q.resolve({
            data: ["docker", "host", "weblogicapplicationcontainer"]
          });
        };
        queryCtrl.datasource.getEntityTypes = function(options) {
          return ctx.$q.resolve(
            [{
              key: "docker",
              label: "Docker"
            },{
              key: "host",
              label: "Host"
            },{
              key: "weblogicapplicationcontainer",
              label: "Web Logic Application"
            },{
              key: "endpoint",
              label: "Endpoint"
            }]
          );
        };

        queryCtrl.target.entityQuery = "*eu";

        return queryCtrl.onFilterChange().then(() => {
          expect(queryCtrl.uniqueEntityTypes).to.eql([
            "docker",
            "host",
            "weblogicapplicationcontainer"
          ]);
          expect(queryCtrl.target.queryIsValid).to.equal(true);
        });
      });
    });

    describe("that returns zero snapshots", function() {
      it("should show no entity types found in the entity type drowdown", function() {
        queryCtrl.datasource.fetchTypesForTarget = function(options) {
          return ctx.$q.resolve({
            data: []
          });
        };
        queryCtrl.datasource.getEntityTypes = function(options) {
          return ctx.$q.resolve(
            [{
              key: "docker",
              label: "Docker"
            },{
              key: "host",
              label: "Host"
            },{
              key: "weblogicapplicationcontainer",
              label: "Web Logic Application"
            },{
              key: "endpoint",
              label: "Endpoint"
            }]
          );
        };

        return queryCtrl.onFilterChange().then(() => {
          expect(queryCtrl.uniqueEntityTypes).to.eql([]);
          expect(queryCtrl.target.entityType).to.equal(null);
          expect(queryCtrl.target.queryIsValid).to.equal(true);
        });
      });
    });

    describe("that returns a query parsing error", function() {
      it("should set the query state to invalid", function() {
        queryCtrl.datasource.fetchTypesForTarget = function(options) {
          return ctx.$q.reject({
            status: 400
          });
        };

        queryCtrl.target.entityQuery = "*eu";

        return queryCtrl.onFilterChange().then(() => {
          expect(queryCtrl.target.queryIsValid).to.equal(false);
        });
      });
    });
  });

  describe("when selecting entity type", function() {
    it("should populate metric dropdown with built-in metrics", function() {
      queryCtrl.target.entityType = "hadoopyarnnode";
      queryCtrl.target.metricCategory = InstanaQueryCtrl.BUILT_IN_METRICS;
      queryCtrl.datasource.getMetricsCatalog = function(options) {
        return ctx.$q.resolve({
          data: [{
            metricId: "allocatedMem",
            label: "Allocated Memory",
            pluginId: "hadoopyarnnode"
          },{
            metricId: "allocatedVCores",
            label: "Allocated Virtual Cores",
            pluginId: "hadoopyarnnode"
          },{
            metricId: "availableMem",
            label: "Available Memory",
            pluginId: "hadoopyarnnode"
          },{
            metricId: "availableVCores",
            label: "Available Virtual Cores",
            pluginId: "hadoopyarnnode"
          }]
        });
      };

      queryCtrl.onEntityTypeSelect();

      expect(queryCtrl.availableMetrics).to.eql([
        { key: "allocatedMem", label: "Allocated Memory" },
        { key: "allocatedVCores", label: "Allocated Virtual Cores" },
        { key: "availableMem", label: "Available Memory" },
        { key: "availableVCores", label: "Available Virtual Cores" }
      ]);
    });

    it("should populate metric dropdown with custom metrics", function() {
      queryCtrl.target.entityType = "dropwizardapplication";
      queryCtrl.target.metricCategory = InstanaQueryCtrl.CUSTOM_METRICS;
      queryCtrl.datasource.getMetricsCatalog = function(options) {
        return ctx.$q.resolve({
          data: [{
            metricId: "dropwizardTimer",
            description: "Dropwizrad Timer",
            pluginId: "dropwizardapplication"
          },{
            metricId: "dropwizardSomething",
            description: "Something Custom From Dropwizard",
            pluginId: "dropwizardapplication"
          }]
        });
      };

      queryCtrl.onEntityTypeSelect();

      expect(queryCtrl.availableMetrics).to.eql([
        { key: "dropwizardTimer", label: "Dropwizrad Timer" },
        { key: "dropwizardSomething", label: "Something Custom From Dropwizard" }
      ]);
    });
  });

});
