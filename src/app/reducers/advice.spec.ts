import { AddAction, UpdateAction, RemoveAction, SelectAction } from '../actions/advice';
import * as fromAdvice from './advice';

describe('Advice reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromAdvice.reducer(undefined, action);
      expect(result).toEqual(fromAdvice.initialState);
    });
  });

  describe('ADD_ADVICE', () => {
    it('should add an advice', () => {
      const advice = { id: '20304', test: 'value' };
      const addAction = new AddAction(advice);

      const expectedResult = {
        selectedId: '20304',
        ids: ['20304'],
        advice: {
          '20304': {
            id: '20304', test: 'value'
          }
        },
        selectedInsurance: null
      };

      const result = fromAdvice.reducer(fromAdvice.initialState, addAction);
      expect(result).toEqual(expectedResult);
    });
  });

});
