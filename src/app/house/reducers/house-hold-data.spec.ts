import * as fromHouseHoldData from './house-hold-data';
import { Address } from '@app/address/models';
import { Update, Start, Get } from '@app/house/actions/house-hold-data';

describe('House Hold Data reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromHouseHoldData.reducer(undefined, action);
      expect(result).toEqual(fromHouseHoldData.initialState);
    });
  });

  describe('GET_INFO', () => {
    it('should set loading to true', () => {
      const action = new Get();
      const expectedResult = {
        id: null,
        info: null,
        advice: null,
        store: null,
        storeReference: null,
        storeError: false,
        storeErrorMessage: null,
        newFlowAdvice: null
      };
      const result = fromHouseHoldData.reducer(fromHouseHoldData.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_INFO', () => {
    it('should set info and loaded', () => {
      const payload = {
        OwnedBuilding: 'J',
        RoomCount: 2
      };
      const action = new Update(payload);
      const expectedResult = {
        info: payload,
        id: null,
        advice: null,
        store: null,
        storeReference: null,
        storeError: false,
        storeErrorMessage: null,
        newFlowAdvice: null
      };
      const result = fromHouseHoldData.reducer(fromHouseHoldData.initialState, action);
      expect(result.info.RoomCount).toEqual(payload.RoomCount);
      expect(result.info.OwnedBuilding).toEqual(payload.OwnedBuilding);
    });
  });

  describe('START', () => {
    it('should reset info and set error', () => {
      const action = new Start();
      const result = fromHouseHoldData.reducer(fromHouseHoldData.initialState, action);
      expect(result.id).not.toBeNull();
    });
  });
});
