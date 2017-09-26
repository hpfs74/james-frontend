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
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);

      connection.mockRespond(response);
    });
  }

  // TODO: implement tests

});
