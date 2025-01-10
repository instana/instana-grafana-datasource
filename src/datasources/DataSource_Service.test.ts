import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import { DataSourceService } from './DataSource_Service';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';

const options = buildInstanaOptions();
const dataSourceService: DataSourceService = new DataSourceService(options);
const timeFilter: TimeFilter = buildTimeFilter();

jest.mock('axios');
const axios = require('axios');

beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

describe('Given an application datasource', () => {
  it('should return services', () => {
    // Mock the response for the services API call
    const mockServicesResponse = {
      data: {
        items: [
          { id: 'service1', label: 'Service 1' },
          { id: 'service2', label: 'Service 2' },
        ],
      },
    };

    axios.get.mockResolvedValueOnce(mockServicesResponse);

    return mockAnswerAndVerifyFormat(mockServicesResponse.data.items);
  });

  it('should return services of an application', () => {
    // Mock the response for the applications API call
    const mockApplicationsResponse = {
      data: {
        items: [{ id: 'application1' }],
      },
    };

    // Mock the response for the services API call
    const mockServicesResponse = {
      data: {
        items: [
          { id: 'service1', label: 'Service 1' },
          { id: 'service2', label: 'Service 2' },
        ],
      },
    };

    axios.get.mockResolvedValueOnce(mockApplicationsResponse); // Mock applications response
    axios.get.mockResolvedValueOnce(mockServicesResponse); // Mock services response

    return axios
      .get(
        options.url +
          '/api/application-monitoring/applications?windowSize=' +
          timeFilter.windowSize +
          '&to=' +
          timeFilter.to,
        {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        }
      )
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
              '/services?windowSize=' +
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
            return mockAnswerAndVerifyFormat(services.data.items);
          });
      });
  });

  function mockAnswerAndVerifyFormat(services: any) {
    const spy = jest.spyOn(dataSourceService, 'paginateServices');
    spy.mockResolvedValue(services);

    return dataSourceService.getServicesOfApplication(buildTestTarget(), timeFilter).then((result) => {
      _.map(result, (service) => {
        expect(service).toHaveProperty('key');
        expect(service).toHaveProperty('label');
      });
    });
  }
});
