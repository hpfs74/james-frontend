import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '../config.service';
import { User } from '../models';


describe('Service: AuthService', () => {
  let configServiceStub = {
    config: {
      api: {
        james: {
          key: 'api/key',
          profile: 'api/profile',
          address: 'api/address'
        }
      }
    }
  };
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: ConfigService, useValue: configServiceStub},

        BaseRequestOptions,
        MockBackend,
        AuthService,
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
  });

  describe('getUserProfile()', () => {

    it('should return an Observable<User>',
      inject([AuthService, XHRBackend], (authService, mockBackend) => {

        const mockResponse = {
          data: {
            emailaddress: 'matteo.s@hcl.com'
          }
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        authService.getUserProfile().subscribe((user) => {
          expect(user).not.toBeNull;
        });
      }));
  });
});
