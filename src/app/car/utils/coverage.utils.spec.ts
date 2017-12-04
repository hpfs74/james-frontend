import { createCarCoverages } from './coverage.utils';
import { Tag } from '../../core/models/tag';
import { Price } from '../../shared/models/price';

describe('Utils: Car Coverage', () => {
  const testTags = [
    {
      _id: '1234',
      tag: 'CL',
      blocked: false,
      alert: false,
      order: 1,
      translation_text: 'WA'
    },
    {
      _id: '1235',
      tag: 'CAR',
      blocked: false,
      alert: false,
      order: 3,
      translation_text: 'All Risk'
    },
    {
      _id: '1236',
      tag: 'CLC',
      blocked: false,
      alert: false,
      order: 2,
      translation_text: 'Beperkt casco'
    },
    {
      _id: '1237',
      tag: 'Test',
      blocked: true,
      alert: false,
      order: 1,
      translation_text: 'I should be excluded before sorting'
    }
  ] as Array<Tag>;

  it('should exclude blocked tags', () => {
    expect(createCarCoverages(testTags).length).toBe(3);
  });

  it('should return sorted tags', () => {
    expect(createCarCoverages(testTags).map(t => t.id)).toEqual(['CL', 'CLC', 'CAR']);
  });

  it('should return price items', () => {
    createCarCoverages(testTags).forEach(price => {
      expect(price.id).toBeDefined();
      expect(price.highlight).toBeFalsy();
      expect(price.badge).toEqual('Wij bevelen dit aan:');
      expect(price.features instanceof Array).toBeTruthy();
    });
  });
});
