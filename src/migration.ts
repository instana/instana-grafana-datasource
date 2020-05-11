import call_to_entities from './lists/apply_call_to_entities';

import _ from 'lodash';

// can be removed once mixpanel shows no old plugins around
export default function (target) {
  // 1.3.1 towards 2.0.0
  if (target.entityType && typeof target.entityType === 'string') {
    target.entityType = {key: target.entityType, label: target.entityType};
  }

  // 2.3.1 towards 2.4.0
  if (target.filter && target.filter !== '') {
    if (!target.customFilters) {
      target.customFilters = [];
      target.customFilters.push({value: target.filter});
    }
  }

  // 2.4.2 towards 2.4.3
  if (target.timeInterval) {
    if (target.timeInterval.value) {
      target.timeInterval = {key: target.timeInterval.value, label: target.timeInterval.label};
    } else if (target.timeInterval.rollup) {
      target.timeInterval = {key: target.timeInterval.rollup, label: target.timeInterval.label};
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
      target.entity.label = "Test";
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
      target.entity.label = "Test";
    }
  }

  // 2.7.0 towards 2.7.1
  if (target.metricCategory === '2' && !target.applicationCallToEntity) {
    target.applicationCallToEntity = call_to_entities[0];
    target.callToEntity = call_to_entities[0];
    _.forEach(target.filters, filter => {
      filter.entity = call_to_entities[0];
    });
  }
}
