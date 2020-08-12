// can be removed once mixpanel shows no old plugins around
import _ from 'lodash';
import metric_categories from './lists/metric_categories';

export default function (target: any) {
  // 1.3.1 towards 2.0.0
  if (target.entityType && typeof target.entityType === 'string') {
    target.entityType = { key: target.entityType, label: target.entityType };
  }

  // 2.3.1 towards 2.4.0
  if (target.filter && target.filter !== '') {
    if (!target.customFilters) {
      target.customFilters = [];
      target.customFilters.push({ value: target.filter });
    }
  }

  // 2.4.2 towards 2.4.3
  if (target.timeInterval) {
    if (target.timeInterval.value) {
      target.timeInterval = { key: target.timeInterval.value, label: target.timeInterval.label };
    } else if (target.timeInterval.rollup) {
      target.timeInterval = { key: target.timeInterval.rollup, label: target.timeInterval.label };
    }
  }

  //2.4.4 towards 2.5.0
  if (target.metricCategory === '5') {
    //old service metric view
    target.metricCategory = '4';
    target.service = {}; //because target.service does not exist yet.
    target.service.key = target.entity.key;
    target.service.label = target.entity.label;
    if (target.selectedApplication && target.selectedApplication.key) {
      target.entity.key = target.selectedApplication.key;
      target.entity.label = target.selectedApplication.label;
    } else {
      target.entity.key = null;
      target.entity.label = 'Test';
    }
  }

  //2.4.4 towards 2.5.0
  if (target.metricCategory === '6') {
    //old endpoint metric view
    target.metricCategory = '4';
    target.endpoint = {}; //because target.endpoint does not exist yet.
    target.endpoint.key = target.entity.key;
    if (target.selectedApplication && target.selectedApplication.key) {
      target.entity.key = target.selectedApplication.key;
      target.entity.label = target.selectedApplication.label;
    } else {
      target.entity.key = null;
      target.entity.label = 'Test';
    }
  }

  //2.7.3 towards 3.0 (Angular to React Migration)
  if (target.aggregation && typeof target.aggregation === 'string') {
    target.aggregation
      ? (target.aggregation = { key: target.aggregation, label: target.aggregation })
      : (target.aggregation = {});
    target.aggregationFunction
      ? (target.aggregationFunction = { key: target.aggregationFunction.label, label: target.aggregationFunction.label })
      : (target.aggregationFunction = {});
  }
  if (target.customFilters && target.customFilters.length > 0 && target.customFilters[0].value) {
    target.customFilters = _.map(target.customFilters, cf => cf.value);
  }
  if (target.filters && target.filters.length > 0 && !target.filters[0].tag.key && !target.filters[0].tag.label) {
    _.forEach(target.filters, (filter) => {
      filter.tag.label = filter.tag.key;
    });
    console.log("filters", target.filters);
  }
  if (target.group && target.group.key && !target.group.label) {
    target.group.label = target.group.key;
  }
  if (target.metricCategory && typeof target.metricCategory === 'string') {
    target.metricCategory = _.find(
      metric_categories,
      (category) => category.key === parseInt(target.metricCategory, 10)
    );
  }
}
