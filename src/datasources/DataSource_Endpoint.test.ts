import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import { DataSourceEndpoint } from './DataSource_Endpoint';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import axios from 'axios';

const options = buildInstanaOptions();
const dataSourceEndpoint: DataSourceEndpoint = new DataSourceEndpoint(options);
const timeFilter: TimeFilter = buildTimeFilter();

beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('endpoints')) {
      return Promise.resolve(mockData.endpoints);
    }
    if (url.includes('services')) {
      return Promise.resolve(mockData.services);
    }
    if (url.includes('applications')) {
      return Promise.resolve(mockData.applications);
    }
    return Promise.resolve({});
  }),
  defaults: { adapter: null },
}));

const mockData = {
  applications: { data: { items: [{ id: 'application-1' }] } },
  services: { data: { items: [{ id: 'service-1' }] } },
  endpoints: {
    data: {
      items: [
        {
          id: 'endpoint-1',
          label: 'Endpoint 1',
          datasourceRequest: { key: 'value' },
        },
        {
          id: 'endpoint-2',
          label: 'Endpoint 2',
          datasourceRequest: { key: 'value' },
        },
      ],
      totalHits: 2,
    },
  },
};

describe('Given an endpoint datasource', () => {
  it('should return endpoints', () => {
    return getEndpointsAndVerify();
  });

  it('should return endpoints of a service', () => {
    return axios
      .get(
        options.url +
          '/api/application-monitoring/applications;id=' +
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
          // Instead of returning true, return undefined or Promise.resolve()
          return Promise.resolve();
        }

        return getEndpointsAndVerify('', serviceId);
      });
  });

  it('should return endpoints of a service', () => {
    return axios
      .get(
        options.url +
          '/api/application-monitoring/applications;id=' +
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
          // Return Promise.resolve() to avoid returning a boolean
          return Promise.resolve();
        }

        return getEndpointsAndVerify('', serviceId);
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
