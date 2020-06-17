import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import { DataSourceService } from './DataSource_Service';

const options = buildInstanaOptions();
const axios = require('axios');

const dataSourceService: DataSourceService = new DataSourceService(options);
const timeFilter: TimeFilter = buildTimeFilter();

describe('Given an application datasource', function() {

  it('should return services', function() {
    // get any application id
    return axios.get(options.url + '/api/application-monitoring/applications;id='
      + '/services?'
      + 'windowSize=' + timeFilter.windowSize
      + '&to=' + timeFilter.to, {
      headers: {
        Authorization: 'apiToken ' + options.apiToken
      }
    }).then((services: any) => {
      return mockAnswerAndVerifyFormat(services);
    });
  });

  it('should return services of an application', function() {
    // get any application id
    return axios.get(options.url + '/api/application-monitoring/applications?windowSize'
      + timeFilter.windowSize
      + '&to=' + timeFilter.to, {
      headers: {
        Authorization: 'apiToken ' + options.apiToken
      }
    }).then((applications: any) => {
      let applicationId: string = '';
      try {
        applicationId = applications.data.items[0].id;
      } catch {
        console.log('No application found. Terminating test.');
        return true;
      }

      return axios.get(options.url + '/api/application-monitoring/applications;id='
        + applicationId
        + '/services?'
        + 'windowSize=' + timeFilter.windowSize
        + '&to=' + timeFilter.to, {
        headers: {
          Authorization: 'apiToken ' + options.apiToken
        }
      }).then((services: any) => {
        return mockAnswerAndVerifyFormat(services);
      });
    });
  });

  function mockAnswerAndVerifyFormat(services: any) {
    const spy = jest.spyOn(dataSourceService, 'paginateServices');
    spy.mockResolvedValue(services);

    return dataSourceService.getServicesOfApplication(buildTestTarget(), timeFilter).then(result => {
      _.map(result, service => {
        expect(service).toHaveProperty('key');
        expect(service).toHaveProperty('label');
      });
    });
  }
});
