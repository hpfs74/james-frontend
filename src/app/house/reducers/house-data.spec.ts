import {
  GetInfo,
  GetInfoComplete,
  GetInfoFailure,

} from '../actions/house-data';
import * as fromHouseData from './house-data';
import { HouseDataRequest, HouseDataResponse } from '../models/house-data';

describe('House Data reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromHouseData.reducer(undefined, action);
      expect(result).toEqual(fromHouseData.initialState);
    });
  });

  describe('GET_INFO_REQUEST', () => {
    it('should set loading to true', () => {
      const houseDataPayload = {
        Zipcode: '2273DE',
        HouseNumber: 220
      };
      const action = new GetInfo(houseDataPayload);
      const expectedResult = {
        loading: true,
        loaded: false,
        error: false,
        info: null,
        address: null
      };
      const result = fromHouseData.reducer(fromHouseData.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_INFO_SUCCESS', () => {
    it('should set info and loaded', () => {
      const houseData = {
        'Zipcode': '2273DE',
        'HouseNumber': 220,
        'Volume': 123
      } as HouseDataResponse;

      const action = new GetInfoComplete(houseData);
      const expectedResult = {
        loading: false,
        loaded: true,
        error: false,
        info: houseData,
        address: null
      };
      const result = fromHouseData.reducer(fromHouseData.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_INFO_FAILURE', () => {
    it('should reset info and set error', () => {
      const action = new GetInfoFailure('value');
      const expectedResult = {
        loading: false,
        loaded: false,
        error: true,
        info: null,
        address: null
      };
      const result = fromHouseData.reducer(fromHouseData.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });
});
