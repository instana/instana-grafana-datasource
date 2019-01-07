// can be removed once mixpanel shows no old plugins around
export default function(target) {

  // 1.3.1 towards 2.0.0
  if (target.entityType && typeof target.entityType === 'string') {
    target.entityType = { key: target.entityType, label: target.entityType };
  }
}
