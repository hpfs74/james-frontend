import * as fromHouseHoldData from './house-hold-data';
import { Address } from '@app/address/models';
import { Update, Start, Get } from '@app/house/actions/house-hold-data';
import { HouseHoldData } from '@app/house/models/house-hold-data';

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
        info: null,
        id: null
      };
      const result = fromHouseHoldData.reducer(fromHouseHoldData.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_INFO', () => {
    it('should set info and loaded', () => {
      const payload = {
        OwnedBuilding: true,
        RoomCount: '2'
      } as HouseHoldData;
      const action = new Update(payload);
      const expectedResult = {
        info: payload,
        id: null
      };
      const result = fromHouseHoldData.reducer(fromHouseHoldData.initialState, action);
      expect(result).toEqual(expectedResult);
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
