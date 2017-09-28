import { GetAddress, GetAddressSuccess, GetAddressFailure } from '../actions/address';
import * as fromAddress from './address';

describe('Address reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromAddress.reducer(undefined, action);
      expect(result).toEqual(fromAddress.initialState);
    });
  });

  describe('GET_ADDRESS_REQUEST', () => {
    it('should set loading to true', () => {
      const action = new GetAddress({
        postalCode: '2218AT',
        houseNumber: '22'
      });
      const expectedResult = {
        loading: true,
        loaded: false,
        error: false,
        address: null
      };
      const result = fromAddress.reducer(fromAddress.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_ADDRESS_SUCCESS', () => {
    it('should set the address', () => {
      const testObj = {
        'postcode': '2512CB',
        'number': '2',
        'street': 'Lutherse Burgwal',
        'city': 's-Gravenhage',
        'county': 's-Gravenhage',
        'province': 'Zuid-Holland',
        'fullname': 'Lutherse Burgwal 2 s-Gravenhage',
        'location': {
           'lat': 52.07535,
           'lng': 4.309771
        },
        'built': 1934,
        'house_size': 182,
        'house_value': 0,
        'house_info_roof_condition_text': 'Onbekend',
        'house_info_house_type_text': '',
        'house_info_house_use_text': 'residence',
        'number_extended': {
           'number_only': 2,
           'number_letter': '',
           'number_addition': '',
           'number_extension': ''
        },
        'rooms': 0,
        'build_type': '',
        'isolation_glass': false,
        'house_type': '',
        'house_subtype': null,
        'id': '2512CB2'
      };
      const action = new GetAddressSuccess(testObj);
      const expectedResult = {
        loading: false,
        loaded: true,
        error: false,
        address: testObj
      };
      const result = fromAddress.reducer(fromAddress.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_ADDRESS_FAILURE', () => {
    it('should set error to true', () => {
      const action = new GetAddressFailure('error');
      const expectedResult = {
        loading: false,
        loaded: false,
        error: true,
        address: null
      };
      const result = fromAddress.reducer(fromAddress.initialState, action);
      expect(result).toEqual(expectedResult);
    });
  });

});
