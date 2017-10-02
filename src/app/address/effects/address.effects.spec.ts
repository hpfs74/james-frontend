import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { hot, cold } from 'jasmine-marbles';

import { AddressEffects } from './address.effects';
import { AddressService } from '../services/address.service';
import { Address } from '../models';

import * as address from '../actions/address';

describe('AddressEffects', () => {
  let effects: AddressEffects;
  let actions: Observable<any>;
  let addressService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressEffects,
        provideMockActions(() => actions),
        {
          provide: AddressService,
          useValue: jasmine.createSpyObj('AddressService', ['lookupAddress']),
        },
      ],
    });

    addressService = TestBed.get(AddressService);
    effects = TestBed.get(AddressEffects);
  });

  describe('loadAddressInfo$', () => {
    it('should return address success action', () => {
      const response = {
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
      } as Address;

      const action = new address.GetAddress({
        postalCode: '2212CB',
        houseNumber: '21'
      });
      const completion = new address.GetAddressSuccess(response);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      addressService.lookupAddress.and.returnValue(Observable.of(response));
      expect(effects.loadAddressInfo$).toBeObservable(expected);
    });

    it('should return address failure action', () => {
      const action = new address.GetAddress({
        postalCode: '2212CB',
        houseNumber: '21'
      });
      const completion = new address.GetAddressFailure('Error');

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      addressService.lookupAddress.and.returnValue(Observable.throw('Error'));
      expect(effects.loadAddressInfo$).toBeObservable(expected);
    });
  });
});
