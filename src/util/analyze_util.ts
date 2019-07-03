import TagFilter from "../types/tag_filter";

export function createTagFilter(filter: TagFilter) {
    const tagFilter = {
      name: filter.tag.key,
      operator: filter.operator.key,
      value: filter.stringValue
    };

    if (this.OPERATOR_NUMBER === filter.tag.type) {
      if (filter.numberValue !== null) {
        tagFilter.value = filter.numberValue.toString();
      }
    } else if (this.OPERATOR_BOOLEAN === filter.tag.type) {
      tagFilter.value = filter.booleanValue.toString();
    }

    return tagFilter;
}
