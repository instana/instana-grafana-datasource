// can be removed once mixpanel shows no old plugins around
export default function (target) {
  console.log(target);
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

  //2.4.3 towards 2.5.0
  if (target.metricCategory === '5') {
    //old service metric view
    target.metricCategory = '4';
    target.service.key = target.entity.key;
    target.service.label = target.entity.label;
    if (target.selectedApplication && target.selectedApplication.key) {
      target.entity.key = target.selectedApplication.key;
      target.entity.label = target.selectedApplication.label;
    } else {
      // this will be recognized by query control and later on be changed to the "All Services"
      // application that is always present with proper id.
      target.entity.key = "ALL_SERVICES";
    }
  }

  //2.4.3 towards 2.5.0
  if (target.metricCategory === '6') {
    //old endpoint metric view
    target.metricCategory = '4';
    target.endpoint = target.entity;
    if (target.selectedApplication) {
      target.entity = target.selectedApplication;
    }
  }
}
