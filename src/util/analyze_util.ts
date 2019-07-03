import TagFilter from "../types/tag_filter";

export function createTagFilter(filter: TagFilter) {
  const tagFilter = {
    name: filter.tag.key,
    operator: filter.operator.key,
    value: filter.stringValue
  };

  if ('NUMBER' === filter.tag.type) {
    if (filter.numberValue !== null) {
      tagFilter.value = filter.numberValue.toString();
    }
  } else if ('BOOLEAN' === filter.tag.type) {
    tagFilter.value = filter.booleanValue.toString();
  }

  return tagFilter;
}
