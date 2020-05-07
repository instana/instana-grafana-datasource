import defaults from 'lodash/defaults';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, defaultQuery } from '../types';
import { InstanaOptions } from '../types/instana_options';
import { getRequest } from '../util/request_handler';

export class DataSource extends DataSourceApi<MyQuery, InstanaOptions> {
  options: InstanaOptions;

  constructor(instanceSettings: DataSourceInstanceSettings<InstanaOptions>) {
    super(instanceSettings);
    this.options = instanceSettings.jsonData;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    console.log(options);
    const { range } = options;
    const from = range!.from.valueOf();
    const to = range!.to.valueOf();

    const data = options.targets.map(target => {
      const query = defaults(target, defaultQuery);
      return new MutableDataFrame({
        refId: query.refId,
        fields: [
          { name: 'Time', values: [from, to], type: FieldType.time },
          { name: 'Value', values: [query.constant, query.constant], type: FieldType.number },
        ],
      });
    });

    return { data };
  }

  testDatasource(): Promise<any> {
    return getRequest(this.options, '/api/monitoringState').then(
      result => {
        return {
          status: 'success',
          message: 'Successfully connected to the Instana API.',
          title: 'Success',
        };
      },
      error => {
        if (error.status === 401) {
          return {
            status: 'error',
            message: 'Unauthorized. Please verify the API Token.',
            title: 'Error',
          };
        } else {
          console.log(error);
          return {
            status: 'error',
            message: 'Error (' + error.status + ') connecting to the Instana API: ' + error.statusText,
            title: 'Error',
          };
        }
      }
    );
  }
}
