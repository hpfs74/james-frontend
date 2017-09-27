import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AddressLookupService } from './address-lookup.service';
import { AuthHttp } from '../../auth/services';
import { LocalStorageService } from '../../core/services';
import { Address } from '../../profile/models/address';


describe('Service: AddressLookup', () => {
  let backend, service;

  const configServiceStub = {
    config: {
      api: {
        james: {
          address: 'api/address'
        }
      }
    }
  };

  const testAddressObj = {
    '_id': '2512CB',
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        BaseRequestOptions,
        MockBackend,
        AddressLookupService,
        LocalStorageService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: AuthHttp,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    backend = TestBed.get(MockBackend);
    service = TestBed.get(AddressLookupService);
  }));

  it('should return an address', () => {
    backend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(testAddressObj)
      })));
    });

    inject([AddressLookupService], (service) => {
      service.lookupAddress('2512CB', '2')
        .subscribe((res: Address) => {
          expect(res).toBeDefined();
          expect(res.postcode).toEqual('2512CB');
          expect(res.number).toEqual('2');
        });
    });
  });

});
