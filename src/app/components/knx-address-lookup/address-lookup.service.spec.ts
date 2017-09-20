import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AddressLookupService } from './address-lookup.service';
import { AuthHttp } from '../../auth/services';
import { LocalStorageService } from '../../services';
import { Address } from '../../models/address';


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

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      // if (connection.request.url.startsWith('api/address')) {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);

      connection.mockRespond(response);
      // }
    });
  }

  it('should lookup an address', (done) => {
    setupConnections(backend, {
      body:
      {
        'Output': 'streetname, city',
        'Payload': {
          'ID': '4641BB271',
          'Address': '067218bee73ca8adf50447cd',
          'Country':  'NL',
          'Province': 'Zuid-Holland',
          'County': 's-Gravenhage',
          'Main': {
             'City': 's-Gravenhage',
             'Street': 'Streetname',
             'Postcode': {
                'P4': '4641BB',
                'P6':  '4641BB'
             },
             'Number': '71',
             'NumberOnly': 71,
             'NumberLetter':  '',
             'NumberAddition' : ''
          },
          'Built': 1879,
          'Size': 137,
          'Function': 'residence',
          'Forsale': false,
          'Sold': false,
          'Location': {
             'lat': 52.07228648874988,
             'lon': 4.300587351428723
          }
     }

      },
      status: 200
    });

service.lookupAddress('4641BB', '71').subscribe((data) => {
  expect(data).not.toBeNull();
  expect(data.street).toBe('Streetname');
  expect(data.city).toBe('s-Gravenhage');
  done();
});
  });

});
