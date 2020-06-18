import { buildInstanaOptions } from '../util/test_util';
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import * as RequestHandler from '../util/request_handler';
import _ from 'lodash';

const options = buildInstanaOptions();
const axios = require('axios');

describe('Given an infrastructure datasource', () => {
  const dataSourceInfrastructure: DataSourceInfrastructure = new DataSourceInfrastructure(options);

  describe('with free text metrics', () => {
    let freeText: string = '';

    it('should return metric in a string array', () => {
      freeText = 'metric1,metric2,metric3,metric4'
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      expect(result.length).toEqual(4);
      expect(result[0]).toEqual({key: 'metric1'});
      expect(result[1]).toEqual({key: 'metric2'});
      expect(result[2]).toEqual({key: 'metric3'});
      expect(result[3]).toEqual({key: 'metric4'});
    });

    it('should ignore white spaces and return result as a string array', () => {
      freeText = 'metric16,      metric09,        metric1997';
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual({key: 'metric16'});
      expect(result[1]).toEqual({key: 'metric09'});
      expect(result[2]).toEqual({key: 'metric1997'});
    });

    it('should return a maximum of four metrics', () => {
      freeText = 'metric01,metric02,  metric03,      metric04,metric05,metric06';
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      console.log(result);
      expect(result.length).toEqual(4);
      expect(result[0]).toEqual({key: 'metric01'});
      expect(result[1]).toEqual({key: 'metric02'});
      expect(result[2]).toEqual({key: 'metric03'});
      expect(result[3]).toEqual({key: 'metric04'});
    })
  });

  describe('when fetching entity types', () => {
    let pluginsSpy: any;

    afterEach(() => {
      pluginsSpy.mockReset();
    });

    it('should return entity types in correct format', () => {
      return axios.get(options.url + '/api/infrastructure-monitoring/catalog/plugins', {
        headers: {
          Authorization: 'apiToken ' + options.apiToken
        }
      }).then((types: any) => {
        pluginsSpy = jest.spyOn(RequestHandler, 'getRequest');
        pluginsSpy.mockResolvedValue(types);

        let result = dataSourceInfrastructure.getEntityTypes();
        _.map(result, et => {
          expect(et).toHaveProperty('key');
          expect(et).toHaveProperty('label');
        })
      });
    });

    it('should cache entityTypes', () => {
      return axios.get(options.url + '/api/infrastructure-monitoring/catalog/plugins', {
        headers: {
          Authorization: 'apiToken ' + options.apiToken
        }
      }).then((types: any) => {
        pluginsSpy = jest.spyOn(RequestHandler, 'getRequest');
        pluginsSpy.mockResolvedValue(types);

        dataSourceInfrastructure.getEntityTypes();
        dataSourceInfrastructure.getEntityTypes();
        expect(pluginsSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

});
