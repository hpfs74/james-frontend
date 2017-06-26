import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { ConfigInterface } from './config.interface';

describe('Service: ConfigService', () => {
  let backend, service;

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

    backend = TestBed.get(MockBackend);
    service = TestBed.get(ConfigService);
  }));

  it('should intialize the service', () => {
    expect(backend).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('james api', () => {
    it('should load a config from disk', () => {
      service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api).toBeDefined();
      });
    });

    it('should contain token url', () => {
      service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api.james).toBeDefined();
        expect(result.api.james.token).toBeDefined();
      });
    });

    it('should contain key url', () => {
      service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api.james).toBeDefined();
        expect(result.api.james.key).toBeDefined();
      });
    });

    it('should contain profile url', () => {
      service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api.james).toBeDefined();
        expect(result.api.james.profile).toBeDefined();
      });
    });
  });
});
