import _ from 'lodash';

export function generateStableHash(obj) {
  if (obj === undefined) {
    return 'undefined';
  } else if (obj == null) {
    return 'null';
  } else if (obj instanceof Array) {
    return '[' + obj.map(v => (v === undefined ? 'null' : generateStableHash(v))).join(',') + ']';
  } else if (typeof obj === 'object') {
    const values = Object.keys(obj)
      .sort()
      .filter(k => obj[k] !== undefined)
      .map(k => `"${k}":${generateStableHash(obj[k])}`)
      .join(',');

    return `{${values}}`;
  }
  return JSON.stringify(obj);
}

/*
  Check if two time filters are overlapping.

  Return true when:

  from |-------------------| to (t2)
              from |--------------------| to (t1)

  Returns false when:

     from |-------------------| to (t2)
from |----------------------------------------| to (t1)

  from |-------------------| to (t2)
                        from |-------------------| to (t1)
*/
export function isOverlapping(t1, t2) {
  return t1.windowSize === t2.windowSize
        && t1.from < t2.to
        && t1.from > t2.from;
}
