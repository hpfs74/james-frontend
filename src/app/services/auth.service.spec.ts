import { TestBed, async, inject } from '@angular/core/testing';
import { Http, Response, ResponseOptions, XHRBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '../config.service';

describe('Service: AuthService', () => {
  let configServiceStub = {
    config: {
      api: {
        james: {
          key: 'api/key',
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
        AuthService,
        { provide: XHRBackend, useClass: MockBackend },
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
    this.service = TestBed.get(AuthService);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {

      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);

      connection.mockRespond(response);
    });
  }

  // describe('getUserProfile()', () => {

  //   it('should return an Observable<User>', (done) => {
  //     inject([AuthService, XHRBackend], (authService, mockBackend) => {
  //       const mockResponse = {
  //         data: {
  //           emailaddress: 'matteo.s@hcl.com'
  //         }
  //       };
  //       setupConnections(this.backend, mockResponse);

  //       authService.getUserProfile().subscribe((user) => {
  //         expect(user).not.toBeNull;
  //         done();
  //       });
  //     })();
  //   });
  // });
});
