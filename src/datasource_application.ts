import AbstractDatasource from './datasource_abstract';
import Cache from './cache';
import _ from 'lodash';

export interface MetricsCatalogCache {
  age: number;
  metrics: Array<Object>;
}

export interface TagsCache {
  age: number;
  tags: Array<Object>;
}

export default class InstanaApplicationDataSource extends AbstractDatasource {
  applicationsCache: Cache;
  applicationTagsCache: TagsCache;
  applicationCatalogCache: MetricsCatalogCache;

  maximumNumberOfUsefulDataPoints = 80;
  sensibleGranularities = [
    1, // second
    5,
    10,
    60, // minute
    5 * 60,
    10 * 60,
    60 * 60, // hour
    5 * 60 * 60,
    10 * 60 * 60,
    24 * 60 * 60, // day
    5 * 24 * 60 * 60,
    10 * 24 * 60 * 60
  ];

  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.applicationsCache = new Cache();
  }

  getApplications(timeFilter) {
    const key = this.getTimeKey(timeFilter);

    let applications = this.applicationsCache.get(key);
    if (applications) {
      return applications;
    }

    const windowSize = this.getWindowSize(timeFilter);
    const data = {
      group: {
        groupbyTag: 'application.name'
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      order: {
        by: 'something', // TODO??
        direction: "desc"
      },
      metrics: [{
        metric: 'calls',
        aggregation: 'SUM'
      }]
    };
    applications = this.postRequest('/api/application-monitoring/analyze/call-groups', data).then(applicationsResponse =>
      applicationsResponse.data.items.map(entry => ({
        'key' : entry.name,
        'label' : entry.name
      }))
    );
    this.applicationsCache.put(key, applications);

    return applications;
  }

  getApplicastionTags() {
    const now = this.currentTime();
    if (!this.applicationTagsCache || now - this.applicationTagsCache.age > this.CACHE_MAX_AGE) {
      this.applicationTagsCache = {
        age: now,
        tags: this.doRequest('/api/application-monitoring/catalog/tags').then(tagsResponse =>
          tagsResponse.data.map(entry => ({
            'key' : entry.name,
            'type' : entry.type
          }))
        ),
      };
    }
    return this.applicationTagsCache.tags;
  }

  getApplicationMetricsCatalog() {
    const now = this.currentTime();
    if (!this.applicationCatalogCache || now - this.applicationCatalogCache.age > this.CACHE_MAX_AGE) {
      this.applicationCatalogCache = {
        age: now,
        metrics: this.doRequest('/api/application-monitoring/catalog/metrics').then(catalogResponse =>
          catalogResponse.data.map(entry => ({
            'key' : entry.metricId,
            'label' : entry.label,
            'aggregations' : entry.aggregations ? entry.aggregations.sort() : []
          }))
        )
      };
    }
    return this.applicationCatalogCache.metrics;
  }

  fetchMetricsForApplication(target, timeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return this.$q.resolve({ data: { items: [] } });
    }

    // our is limited to maximumNumberOfUsefulDataPoints results, to stay comparable
    const windowSize = this.getWindowSize(timeFilter);
    const granularity = this.getChartGranularity(windowSize);

    const tagFilters = [{
      name: 'application.name',
      operator: 'EQUALS',
      value: target.entity.key
    }];
    _.forEach(target.filters, filter => {
      if (filter.isValid) {
        tagFilters.push(this.createTagFilter(filter));
      }
    });

    const data = {
      group: {
        groupbyTag: target.group.key
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      tagFilters: tagFilters,
      metrics: [{
        metric: target.metric.key,
        aggregation: target.aggregation ? target.aggregation : 'SUM',
        granularity: granularity
      }]
    };
    return this.postRequest('/api/application-monitoring/analyze/call-groups', data);
  }

  getChartGranularity(windowSize) {
    const granularity = this.sensibleGranularities.find(
      granularity => windowSize / 1000 / granularity <= this.maximumNumberOfUsefulDataPoints
    );
    return granularity || this.sensibleGranularities[this.sensibleGranularities.length - 1];
  }

  createTagFilter(filter) {
    const tagFilter = {
      name: filter.tag.key,
      operator: filter.operator.key,
      value: filter.stringValue
    };

    if (this.OPERATOR_NUMBER === filter.tag.type) {
      tagFilter.value = filter.numberValue;
    } else if (this.OPERATOR_BOOLEAN === filter.tag.type) {
      tagFilter.value = filter.booleanValue;
    }

    return tagFilter;
  }
}
