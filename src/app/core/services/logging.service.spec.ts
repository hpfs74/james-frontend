import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { LoggingService } from './logging.service';

describe('Service: LoggingService', function () {
  let httpMock: HttpTestingController;
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LoggingService
      ]
    });
  });

  beforeEach(
    inject([LoggingService, HttpClientTestingModule], (_service, _httpMock) => {
      service = _service;
      httpMock = _httpMock;
  }));

  it('all method should be defined', function () {
    expect(service).toBeDefined();
    expect(service.log).toBeDefined();
  });

  describe('log', function () {
    xit('should do a log request', function () {
      service.log({ test: 'log message '});
    });
  });
});
