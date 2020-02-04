import _ from 'lodash';

export function generateStableHash(obj) {
  //var bla = JSON.stringify(obj);
  //console.log(bla);
  return "test";
  //return bla;
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
