import {
  AddInsuranceAction,
  AddInsuranceSuccessAction,
  AddInsuranceFailAction,
  LoadAction,
  LoadSuccessAction,
  LoadFailAction
} from '../actions/insurance';

import * as fromInsurance from './insurance';

describe('Insurance reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromInsurance.reducer(undefined, action);
      expect(result).toEqual(fromInsurance.initialState);
    });
  });

});
