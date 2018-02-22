import {
  GetInfo,
  GetInfoComplete,
  GetInfoFailure,
  Buy,
  BuyComplete,
  BuyFailure
} from '../actions/car';
import * as fromCar from './car';
import { Car } from '../models';

describe('Car reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromCar.reducer(undefined, action);
      expect(result).toEqual(fromCar.initialState);
    });
  });

  describe('BUY_REQUEST', () => {
    it('should set loading to true', () => {
      const action = new Buy({ a: 'value' });
      const expectedResult = {
        loading: true,
        loaded: false,
        error: false,
        license: null,
        info: null,
        buyComplete: false,
        buyError: false,
        buyErrorCode: null,
      };
      const result = fromCar.reducer(fromCar.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_INFO_REQUEST', () => {
    it('should set loading to true', () => {
      const action = new GetInfo('value');
      const expectedResult = {
        loading: true,
        loaded: false,
        error: false,
        license: null,
        info: null,
        buyComplete: false,
        buyError: false,
        buyErrorCode: null,
      };
      const result = fromCar.reducer(fromCar.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_INFO_SUCCESS', () => {
    it('should set info and loaded', () => {
      const car = {
        '_id': 'GK906T',
        'license': 'GK906T',
        'vin': null,
        'reporting_code': null,
        'year': '2012',
        'fuel': 'Benzine',
        'fuel_code': 'B',
        'secondary_fuel': null,
        'color': 'zwart',
        'color_code': null,
        'secondary_color': null,
        'secondary_color_code': null,
        'weight_empty_vehicle': 1125,
        'price_consumer_excl_vat': 29136,
        'price_consumer_incl_vat': 34003,
        'make': 'AUDI',
        'model': 'A1',
        'technical_type': '1.4 TFSI PRO LINE S',
        'wheels': 4,
        'top_speed': 203,
        'engine_capacity': 1390,
        'power_kw': 90,
        'edition': '1.4 TFSI PRO LINE S',
        'doors': 5,
        'current_value': 16326,
        'nicci_cartransmission_automatic_transmission': 'Automaat'
      } as Car;

      const action = new GetInfoComplete(car);
      const expectedResult = {
        loading: false,
        loaded: true,
        error: false,
        license: 'GK906T',
        info: car,
        buyComplete: false,
        buyError: false,
        buyErrorCode: null,
      };
      const result = fromCar.reducer(fromCar.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_INFO_FAILURE', () => {
    it('should reset info and set error', () => {
      const action = new GetInfoFailure('value');
      const expectedResult = {
        loading: false,
        loaded: true,
        error: true,
        license: null,
        info: null,
        buyComplete: false,
        buyError: false,
        buyErrorCode: null,
      };
      const result = fromCar.reducer(fromCar.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('BUY_SUCCESS', () => {
    it('should set buyComplete to true', () => {
      const action = new BuyComplete('value');
      const expectedResult = {
        loading: false,
        loaded: false,
        error: false,
        license: null,
        info: null,
        buyComplete: true,
        buyError: false,
        buyErrorCode: null
      };
      const result = fromCar.reducer(fromCar.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('BUY_FAILURE', () => {
    it('should set buyError to true', () => {
      const action = new BuyFailure('value');
      const expectedResult = {
        loading: false,
        loaded: false,
        error: false,
        license: null,
        info: null,
        buyComplete: false,
        buyError: true,
        buyErrorCode: null
      };
      const result = fromCar.reducer(fromCar.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

});
