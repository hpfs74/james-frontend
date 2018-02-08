import { GetInfoComplete, GetInfoFailure, GetInfo } from '../actions/house-hold-insurance-amount';
import * as fromHouseHoldInsuredAmount from './house-hold-insured-amount';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '../models/house-hold-amount';

describe('House Hold Insured Amount reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromHouseHoldInsuredAmount.reducer(undefined, action);
      expect(result).toEqual(fromHouseHoldInsuredAmount.initialState);
    });
  });
});
