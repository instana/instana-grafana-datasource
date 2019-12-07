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
    console.log("old service entity:");
    console.log(target.entity);
    target.service = target.entity;
    if (target.selectedApplication) {
      console.log("old selected application:");
      console.log(target.selectedApplication);
      if (target.selectedApplication.key) {
        target.entity = target.selectedApplication;
      } else {
        target.entity.key = null;
      }
    }

    console.log("new service:");
    console.log(target.service);
    console.log("old application entity");
    console.log(target.entity);
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
