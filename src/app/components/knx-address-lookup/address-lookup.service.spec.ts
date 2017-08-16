import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AddressLookupService } from './address-lookup.service';
import { AuthHttp } from '../../services';
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
      providers: [
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
      // if (connection.request.url.startsWith('api/address')) {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      // }
    });
  }

  xit('should lookup an address', (done) => {
    setupConnections(backend, {
      body:
      {
        'Output': 'streetname, city'
      },
      status: 200
    });

    service.lookupAddress('4641BB', '71').subscribe((res) => {
      const data = res.json();

      expect(data).not.toBeNull();
      // expect(data.street).toBe('Molenstraat');
      // expect(data.city).toBe('Ossendrecht');
      expect(data.Output).toBe('streetname, city');

      done();
    });
  });

});
