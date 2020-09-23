import { SelectableValue } from '@grafana/data';

export interface TagFilter {
  tag: SelectableValue;
  operator: SelectableValue;
  stringValue: string;
  numberValue: number;
  booleanValue: boolean;
  isValid: boolean;
  entity: string;
}

export default TagFilter;
