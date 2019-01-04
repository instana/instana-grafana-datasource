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

export default class InstanaWebsiteDataSource extends AbstractDatasource {
  websitesCache: Cache;
  websiteTagsCache: TagsCache;
  websiteCatalogCache: MetricsCatalogCache;

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

    this.websitesCache = new Cache();
  }

  getWebsites(timeFilter) {
    const key = this.getTimeKey(timeFilter);

    let websites = this.websitesCache.get(key);
    if (websites) {
      return websites;
    }

    const windowSize = this.getWindowSize(timeFilter);
    const data = {
      group: {
        groupbyTag: 'beacon.website.name'
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      tagFilters: [{
        name: 'beacon.type',
        operator: 'EQUALS',
        value: 'pageLoad'
      }],
      order: {
        by: 'pageLoads',
        direction: "desc"
      },
      metrics: [{
        metric: 'pageLoads',
        aggregation: 'SUM'
      }]
    };
    websites = this.postRequest('/api/website-monitoring/analyze/beacon-groups', data).then(websitesResponse =>
      websitesResponse.data.items.map(entry => ({
        'key' : entry.name,
        'label' : entry.name
      }))
    );
    this.websitesCache.put(key, websites);

    return websites;
  }

  getWebsiteTags() {
    const now = this.currentTime();
    if (!this.websiteTagsCache || now - this.websiteTagsCache.age > this.CACHE_MAX_AGE) {
      this.websiteTagsCache = {
        age: now,
        tags: this.doRequest('/api/website-monitoring/catalog/tags').then(tagsResponse =>
          tagsResponse.data.map(entry => ({
            'key' : entry.name,
            'type' : entry.type
          }))
        ),
      };
    }
    return this.websiteTagsCache.tags;
  }

  getWebsiteMetricsCatalog() {
    const now = this.currentTime();
    if (!this.websiteCatalogCache || now - this.websiteCatalogCache.age > this.CACHE_MAX_AGE) {
      this.websiteCatalogCache = {
        age: now,
        metrics: this.doRequest('/api/website-monitoring/catalog/metrics').then(catalogResponse =>
          catalogResponse.data.map(entry => ({
            'key' : entry.metricId,
            'label' : entry.label,
            'aggregations' : entry.aggregations ? entry.aggregations.sort() : []
          }))
        )
      };
    }
    return this.websiteCatalogCache.metrics;
  }

  fetchMetricsForEntity(target, timeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return this.$q.resolve({ data: { items: [] } });
    }

    // our is limited to maximumNumberOfUsefulDataPoints results, to stay comparable
    const windowSize = this.getWindowSize(timeFilter);
    const granularity = this.getChartGranularity(windowSize);

    const tagFilters = [{
      name: 'beacon.website.name',
      operator: 'EQUALS',
      value: target.entity.key
    },{
      name: 'beacon.type',
      operator: 'EQUALS',
      value: target.entityType.key
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
    return this.postRequest('/api/website-monitoring/analyze/beacon-groups', data);
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
