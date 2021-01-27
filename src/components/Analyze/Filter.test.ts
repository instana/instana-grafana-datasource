import { InstanaQuery } from '../../types/instana_query';
import TagFilter from '../../types/tag_filter';
import { Filters } from './Filter';

describe('Given a filter', () => {
  let props = {
    query: null,
    datasource: null,
    groups: null,
    onRunQuery: () => {},
    onChange: (value: InstanaQuery) => {},
  };
  let filters = new Filters(props);

  describe('for canShowStringInput', () => {
    describe('with STRING type', () => {
      let typeUnderTest = 'STRING';

      it('should show input for EQUALS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_EQUAL operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EQUAL', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for CONTAINS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'CONTAINS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_CONTAIN operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_CONTAIN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should not show input for NOT_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });

      it('should not show input for IS_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });
    });

    describe('with NUMBER type', () => {
      let typeUnderTest = 'NUMBER';

      it('should not show input for EQUALS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });

      it('should not show input for NOT_EQUAL operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EQUAL', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });

      it('should not show input for LESS_THAN operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'LESS_THAN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });

      it('should not show input for GREATER_THAN operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'GREATER_THAN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });

      it('should not show input for IS_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });
    });

    describe('with BOOLEAN type', () => {
      let typeUnderTest = 'BOOLEAN';

      it('should not show input for EQUALS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });
    });

    describe('with KEY_VALUE_PAIR type', () => {
      let typeUnderTest = 'KEY_VALUE_PAIR';

      it('should show input for EQUALS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_EQUAL operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EQUAL', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for CONTAINS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'CONTAINS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_CONTAIN operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_CONTAIN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for IS_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });
    });

    describe('with STRING_SET type', () => {
      let typeUnderTest = 'STRING_SET';

      it('should show input for EQUALS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_EQUAL operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EQUAL', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for CONTAINS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'CONTAINS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should show input for NOT_CONTAIN operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_CONTAIN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(true);
      });

      it('should not show input for NOT_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });

      it('should not show input for IS_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };

        const show = filters.canShowStringInput(filter);

        expect(show).toEqual(false);
      });
    });
  });
});
