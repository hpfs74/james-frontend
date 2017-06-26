import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../config.service';
import { AddressLookupService } from './address-lookup.service';
import { AuthHttp } from '../../services';
import { Address } from '../../models/address';


describe('Service: AddressLookup', () => {
  let backend, service;

  let configServiceStub = {
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
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        BaseRequestOptions,
        MockBackend,
        AddressLookupService,
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
      if (connection.request.url === 'api/address') {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    });
  }

  it('should lookup an address', () => {
    setupConnections(backend, {
      body:
      {
        '_id': '4641BB71',
        'postcode': '4641BB',
        'number': '71',
        'street': 'Molenstraat',
        'city': 'Ossendrecht',
        'county': 'Woensdrecht',
        'province': 'Noord-Brabant',
        'fullname': 'Molenstraat 71, Ossendrecht',
        'location': {
          'lat': 51.392211711345,
          'lng': 4.3359184058694
        },
        'built': 1955,
        'house_size': 96,
        'house_value': 0,
        'house_info_roof_condition_text': 'Onbekend',
        'house_info_house_type_text': '',
        'house_info_house_use_text': 'residence',
        'number_extended': {
          'number_only': 71,
          'number_addition': ''
        },
        'rooms': 0,
        'build_type': '',
        'isolation_glass': false,
        'house_type': '',
        'house_subtype': null
      },
      status: 200
    });

    service.lookupAddress('4641BB', '71').subscribe((res) => {

      let data = res.json();

      expect(data).not.toBeNull;
      expect(data.street).toBe('Molenstraat');
      expect(data.city).toBe('Ossendrecht');
    });
  });

});
