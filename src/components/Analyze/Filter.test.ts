import { InstanaQuery } from '../../types/instana_query';
import Operators from '../../lists/operators';
import TagFilter from '../../types/tag_filter';
import { Filters } from './Filter';

describe('Given a filter', () => {
  let props = {
    query: { filters: [] },
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

  describe('for canShowNumberInput', () => {
    let typeUnderTest = 'NUMBER';
    describe('with any type except NUMBER', () => {
      it('should not show input for any operator at all', () => {
        Operators.forEach((element: any) => {
          if (element.type !== typeUnderTest) {
            let filter: TagFilter = {
              tag: { key: 'any.key', type: element.type },
              operator: { key: element.key, type: element.type },
              stringValue: '',
              numberValue: 0,
              booleanValue: false,
              isValid: false,
              entity: '',
            };

            const show = filters.canShowNumberInput(filter);
            expect(show).toEqual(false);
          }
        });
      });
    });

    describe('with NUMBER type', () => {
      it('should show input for any EQUALS', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(true);
      });

      it('should show input for any NOT_EQUAL', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EQUAL', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(true);
      });

      it('should show input for any LESS_THAN', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'LESS_THAN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(true);
      });

      it('should show input for any GREATER_THAN', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'GREATER_THAN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(true);
      });

      it('should show input for any LESS_OR_EQUAL_THAN', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'LESS_OR_EQUAL_THAN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(true);
      });

      it('should show input for any GREATER_OR_EQUAL_THAN', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'GREATER_OR_EQUAL_THAN', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(true);
      });

      it('should show input for any NOT_EMPTY', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(false);
      });

      it('should show input for any IS_EMPTY', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        const show = filters.canShowNumberInput(filter);
        expect(show).toEqual(false);
      });
    });
  });

  describe('for validateChangeAndRun', () => {
    describe('with STRING type', () => {
      let typeUnderTest = 'STRING';

      it('should be valid for IS_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: 'value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('');
      });

      it('should be valid for NOT_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EMPTY', type: typeUnderTest },
          stringValue: 'value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('');
      });

      it('should be valid for EQUALS operator with any string value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: 'value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('value');
      });

      it('should be invalid for EQUALS operator without string value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(false);
        expect(filter.stringValue).toEqual('');
      });
    });

    describe('with STRING_SET type', () => {
      let typeUnderTest = 'STRING_SET';

      it('should be valid for IS_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: 'value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('');
      });

      it('should be valid for NOT_EMPTY operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'NOT_EMPTY', type: typeUnderTest },
          stringValue: 'value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('');
      });

      it('should be valid for EQUALS operator with any string value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: 'value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('value');
      });

      it('should be invalid for EQUALS operator without string value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(false);
        expect(filter.stringValue).toEqual('');
      });
    });

    describe('with KEY_VALUE_PAIR type', () => {
      let typeUnderTest = 'KEY_VALUE_PAIR';

      it('should be valid for EQUALS operator', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: 'key=value',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('key=value');
      });

      it('should not be valid for EQUALS operator without string value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(false);
        expect(filter.stringValue).toEqual('');
      });

      it('should not be valid for EQUALS operator with string key only', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: 'key',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(false);
        expect(filter.stringValue).toEqual('key');
      });

      it('should be valid for IS_EMPTY operator with string key only', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'IS_EMPTY', type: typeUnderTest },
          stringValue: 'key',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.stringValue).toEqual('key');
      });

      it('should not be valid for IS_EMPTY operator without string value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(false);
        expect(filter.stringValue).toEqual('');
      });
    });

    describe('with NUMBER type', () => {
      let typeUnderTest = 'NUMBER';

      it('should be valid for EQUALS operator with 0', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.numberValue).toEqual(0);
      });

      it('should be valid for EQUALS operator with number', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 42,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.numberValue).toEqual(42);
      });

      it('should not be valid for EQUALS operator with NaN value', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: NaN,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(false);
        expect(filter.numberValue).toEqual(NaN);
      });
    });

    describe('with BOOLEAN type', () => {
      let typeUnderTest = 'BOOLEAN';

      it('should be valid for EQUALS operator with true', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: true,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.booleanValue).toEqual(true);
      });

      it('should be valid for EQUALS operator with false', () => {
        let filter: TagFilter = {
          tag: { key: 'any.key', type: typeUnderTest },
          operator: { key: 'EQUALS', type: typeUnderTest },
          stringValue: '',
          numberValue: 0,
          booleanValue: false,
          isValid: false,
          entity: '',
        };
        filters.props.query.filters[0] = filter;

        filters.validateChangeAndRun(0);

        expect(filter.isValid).toEqual(true);
        expect(filter.booleanValue).toEqual(false);
      });
    });
  });
});
