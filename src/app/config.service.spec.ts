import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';

describe('Service: ConfigService', () => {
  let backend: MockBackend;
  let service: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ConfigService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    let backend = TestBed.get(MockBackend);
    let service = TestBed.get(ConfigService);
  }));

  it('should intialize the service', () => {
    expect(backend).not.toBeNull;
    expect(service).not.toBeNull;
  });

  xit('should load a config from disk', () => {
    expect(service.config).toBeNull;
    service.load('../../config/api/config.json').then((result) => {
      expect(service.config).not.toBeNull;
    });
  });
});
