import { buildInstanaOptions, buildTimeFilter } from '../util/test_util';
import TimeFilter from '../types/time_filter';
import { DataSourceApplication } from './DataSource_Application';
import * as RequestHandler from '../util/request_handler';
import _ from 'lodash';

const options = buildInstanaOptions();
const axios = require('axios');

describe('Given an application datasource', function() {
  const dataSourceApplication: DataSourceApplication = new DataSourceApplication(options);
  const timeFilter: TimeFilter = buildTimeFilter();

  it('should return applications as SelectableValues', function() {
    let applications: any = axios.get(options.url + '/api/application-monitoring/applications?windowSize'
      + timeFilter.windowSize
      + '&to=' + timeFilter.to, {
      headers: {
        Authorization: 'apiToken ' + options.apiToken
      }
    });

    const spy = jest.spyOn(dataSourceApplication, 'paginateApplications');
    spy.mockResolvedValue(applications);

    return dataSourceApplication.getApplications(timeFilter).then(apps => {
      _.map(apps, app => {
        expect(app).toHaveProperty('key');
        expect(app).toHaveProperty('label');
      });
    });
  });

  it('should return application tag in the correct format', function() {
    let tags: any = axios.get(options.url + '/api/application-monitoring/catalog/tags', {
      headers: {
        Authorization: 'apiToken ' + options.apiToken
      }
    });

    const spy = jest.spyOn(RequestHandler, 'getRequest');
    spy.mockResolvedValue(tags);

    return dataSourceApplication.getApplicationTags().then((appTags: any) => {
      _.map(appTags, tag => {
        expect(tag).toHaveProperty('key');
        expect(tag).toHaveProperty('label');
        expect(tag).toHaveProperty('type');
        expect(tag).toHaveProperty('canApplyToSource');
        expect(tag).toHaveProperty('canApplyToDestination');
      });
    });
  });
});
