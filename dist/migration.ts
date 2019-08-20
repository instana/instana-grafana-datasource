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
}
