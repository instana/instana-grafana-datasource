import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import { DataSourceEndpoint } from './DataSource_Endpoint';

const options = buildInstanaOptions();
const axios = require('axios');

const dataSourceEndpoint: DataSourceEndpoint = new DataSourceEndpoint(options);
const timeFilter: TimeFilter = buildTimeFilter();

describe('Given an endpoint datasource', () => {
  it('should return endpoints', () => {
    return getEndpointsAndVerify();
  });

  it('should return endpoints of a service', () => {
    // get any service id
    return axios
      .get(options.url + '/api/application-monitoring/applications;id=' + '/services?' + timeFilter.windowSize + '&to=' + timeFilter.to, {
        headers: {
          Authorization: 'apiToken ' + options.apiToken,
        },
      })
      .then((services: any) => {
        let serviceId = '';
        try {
          serviceId = services.data.items[0].id;
        } catch {
          console.log('No service found. Terminating test.');
          return true;
        }

        return getEndpointsAndVerify('', serviceId);
      });
  });

  it('should return endpoints of a service of an application', () => {
    // get any application id
    return axios
      .get(options.url + '/api/application-monitoring/applications?' + timeFilter.windowSize + '&to=' + timeFilter.to, {
        headers: {
          Authorization: 'apiToken ' + options.apiToken,
        },
      })
      .then((applications: any) => {
        let applicationId = '';
        try {
          applicationId = applications.data.items[0].id;
        } catch {
          console.log('No application found. Terminating test.');
          return true;
        }

        return axios
          .get(
            options.url +
              '/api/application-monitoring/applications;id=' +
              applicationId +
              '/services?' +
              timeFilter.windowSize +
              '&to=' +
              timeFilter.to,
            {
              headers: {
                Authorization: 'apiToken ' + options.apiToken,
              },
            }
          )
          .then((services: any) => {
            let serviceId = '';
            try {
              serviceId = services.data.items[0].id;
            } catch {
              console.log('No service found. Terminating test.');
              return true;
            }

            return getEndpointsAndVerify(applicationId, serviceId);
          });
      });
  });

  function getEndpointsAndVerify(applicationId = '', serviceId = '') {
    return axios
      .get(
        options.url +
          '/api/application-monitoring/applications;id=' +
          applicationId +
          '/services;id=' +
          serviceId +
          '/endpoints?' +
          'windowSize=' +
          timeFilter.windowSize +
          '&to=' +
          timeFilter.to,
        {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        }
      )
      .then((endpoints: any) => {
        return mockAnswerAndVerifyFormat(endpoints);
      });
  }

  function mockAnswerAndVerifyFormat(endpoints: any) {
    const spy = jest.spyOn(dataSourceEndpoint, 'paginateEndpoints');
    spy.mockResolvedValue(endpoints);

    return dataSourceEndpoint.getEndpointsOfService(buildTestTarget(), timeFilter).then((result) => {
      _.map(result, (service) => {
        expect(service).toHaveProperty('key');
        expect(service).toHaveProperty('label');
      });
    });
  }
});
