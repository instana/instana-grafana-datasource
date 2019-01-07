import Selectable from '../types/selectable';
export interface TagFilter {
    tag: Selectable;
    operator: Selectable;
    stringValue: string;
    numberValue: number;
    booleanValue: boolean;
    isValid: boolean;
}
export default TagFilter;
