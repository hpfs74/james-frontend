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

    this.backend = TestBed.get(MockBackend);
    this.service = TestBed.get(ConfigService);
  }));

  it('should intialize the service', () => {
    expect(this.backend).not.toBeNull;
    expect(this.service).not.toBeNull;
  });

  describe('james api', () => {
    it('should load a config from disk', () => {
      expect(this.service.config).toBeNull;
      this.service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api).not.toBeNull;
      });
    });

    it('should contain token url', () => {
      expect(this.service.config).toBeNull;
      this.service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api.james).not.toBeNull;
        expect(result.api.james.token).not.toBeNull;
      });
    });

    it('should contain key url', () => {
      expect(this.service.config).toBeNull;
      this.service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api.james).not.toBeNull;
        expect(result.api.james.key).not.toBeNull;
      });
    });

    it('should contain profile url', () => {
      expect(this.service.config).toBeNull;
      this.service.load('../../config/api/config.json').then((result: ConfigInterface) => {
        expect(result.api.james).not.toBeNull;
        expect(result.api.james.profile).not.toBeNull;
      });
    });




  });

});
