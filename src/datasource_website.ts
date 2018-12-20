import AbstractDatasource from './datasource_abstract';
import _ from 'lodash';

export interface WebsitesCache {
  time: number;
  age: number;
  websites: Array<Object>;
}

export interface MetricsCatalogCache {
  age: number;
  metrics: Array<Object>;
}

export interface TagsCache {
  age: number;
  tags: Array<Object>;
}

export default class InstanaWebsiteDataSource extends AbstractDatasource {
  websitesCache: WebsitesCache;
  websiteTagsCache: TagsCache;
  websiteCatalogCache: MetricsCatalogCache;

  MAX_NUMBER_OF_RESULTS = 600;

  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
  }

  getWebsites(timeFilter) {
    const now = this.currentTime();
    const windowSize = this.getWindowSize(timeFilter);

    if (this.noCacheCopyAvailable(timeFilter, now)) {
    const data = {
      group: {
        groupbyTag: 'beacon.website.name'
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      order: {
        by: 'pageLoads',
        direction: "desc"
      },
      metrics: [{
        metric: 'pageLoads',
        aggregation: 'sum'
      }]
    };
      this.websitesCache = {
        time: timeFilter.to,
        age: now,
        websites: this.postRequest('/api/website-monitoring/analyze/beacon-groups', data).then(websitesResponse =>
          websitesResponse.data.items.map(entry => ({
            'key' : entry.name.replace(/"/g, ''), // TODO FIXME in API
            'label' : entry.name.replace(/"/g, '') // TODO FIXME in API
          }))
        )
      };
    }
    return this.websitesCache.websites;
  }

  noCacheCopyAvailable(timeFilter, now) {
    return !this.websitesCache ||
      timeFilter.to - this.websitesCache.time > this.CACHE_MAX_AGE ||
      now - this.websitesCache.age > this.CACHE_MAX_AGE;
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
            'entityType' : 'website'
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

    // new api is limited to MAX_NUMBER_OF_RESULTS results
    const windowSize = this.getWindowSize(timeFilter);
    const bestGuess = _.toInteger(windowSize / 1000 / this.MAX_NUMBER_OF_RESULTS);
    const granularity = bestGuess < 1 ? 1 : bestGuess; // must be at least a second

    const tagFilters = [{
      name: 'beacon.website.name',
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
        aggregation: 'sum', // TODO insert matching aggregation for metric
        granularity: granularity
      }]
    };
    return this.postRequest('/api/website-monitoring/analyze/beacon-groups', data);
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
