import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../config.service';
import { CarService } from './car.service';
import { AuthHttp } from '../../services';
import { Car } from '../../models/car';

describe('Service: Car', () => {
  let configServiceStub = {
    config: {
      api: {
        james: {
          car: 'api/car',
          helper: 'api/helper/car'
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
        CarService,
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

    this.backend = TestBed.get(MockBackend);
    this.service = TestBed.get(CarService);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
    });
  };

  it('should return coverages', () => {
    let coverages = this.service.getCoverages();
    expect(coverages).toBeDefined;
    expect(coverages.length).toBe(3);
    expect(coverages[0].id).toBe('CL');
    expect(coverages[1].id).toBe('CLC');
    expect(coverages[2].id).toBe('CAR');
  });

});
