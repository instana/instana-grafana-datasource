import { createTagFilter, readItemMetrics } from './analyze_util';
import { InstanaQuery } from '../types/instana_query';
import { buildTestTarget } from './test_util';
import TagFilter from '../types/tag_filter';

describe('Given a TagFilter object', function () {
  describe('with no tag type', function () {
    it('should return a TagFilter object with the provided stringValue', function () {
      let tagFilter: TagFilter = {
        tag: { key: 'test', type: 'useless type' },
        operator: { key: 'operator' },
        stringValue: 'string',
        numberValue: 0,
        booleanValue: true,
        isValid: false,
        entity: { key: 'entity' },
      };

      const expected = {
        name: 'test',
        operator: 'operator',
        value: 'string',
      };

      expect(createTagFilter(tagFilter)).toEqual(expected);
    });
  });

  describe('with NUMBER tag type', function () {
    it('should return a TagFilter object with the provided numberValue as the string value', function () {
      let tagFilter: TagFilter = {
        tag: { key: 'some key', type: 'NUMBER' },
        operator: { key: 'operator' },
        stringValue: 'string',
        numberValue: 0,
        booleanValue: true,
        isValid: false,
        entity: { key: 'entity' },
      };

      const expected = {
        name: 'some key',
        operator: 'operator',
        value: '0',
      };

      expect(createTagFilter(tagFilter)).toEqual(expected);
    });
  });

  describe('with BOOLEAN tag type', function () {
    it('should return a TagFilter object with the provided booleanValue as the string value', function () {
      let tagFilter: TagFilter = {
        tag: { key: 'tagKey', type: 'BOOLEAN' },
        operator: { key: 'operator' },
        stringValue: 'string',
        numberValue: 0,
        booleanValue: true,
        isValid: false,
        entity: { key: 'entity' },
      };

      const expected = {
        name: 'tagKey',
        operator: 'operator',
        value: 'true',
      };

      expect(createTagFilter(tagFilter)).toEqual(expected);
    });
  });
});

describe('Given a response object', function () {
  describe('with data elements', function () {
    it('should return an object containing correct target, datapoints, refId, and key objects', function () {
      let target: InstanaQuery = buildTestTarget();
      target.refId = 'A';
      target.stableHash = 'some random hash';

      let response = {
        data: {
          items: [
            {
              metrics: [
                [
                  [123, 123123123],
                  [1234, 123412341234],
                  [25, 1609],
                  [1609, 1997],
                ],
              ],
            },
          ],
        },
      };

      const expected = [
        {
          target: 'some label',
          datapoints: [
            [123123123, 123],
            [123412341234, 1234],
            [1609, 25],
            [1997, 1609],
          ],
          refId: 'A',
          key: 'some random hash',
        },
      ];

      expect(readItemMetrics(target, response, getLabel)).toEqual(expected);
    });
  });
});

function getLabel(target: InstanaQuery, item: any, key: number, index: number) {
  return 'some label';
}
