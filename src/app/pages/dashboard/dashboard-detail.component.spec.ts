import { getAssistantMessageState } from './../../reducers/index';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { StoreModule, Store, State, ActionReducer } from '@ngrx/store';

import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { DashboardDetailComponent } from './dashboard-detail.component';
import { AuthService, ProfileService, AuthHttp, AssistantService } from '../../services/';
import { ConfigService } from '../../config.service';
import { loginError } from './login-error';
import { Observable } from 'rxjs/Observable';

describe('Component: DashboardDetail', () => {
  let comp: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;
  let routerStub:any;
  let activatedRouteStub: any;

  const configServiceStub = {
    config: {
      api: {
        james: {
          address: 'api/reset/password'
        }
      }
    }
  };

  describe('with routing to car', () => {
    beforeEach(async(() => {
      routerStub = {
        navigate: jasmine.createSpy('navigate'),
        routerState: {}
      };

      activatedRouteStub = {
        queryParams: Observable.of( { type: 'car' } ),
        params: Observable.of( { type: 'car' } )
      };

      TestBed.configureTestingModule({
        providers: [
          BaseRequestOptions,
          MockBackend,
          AuthService,
          AssistantService,
          ProfileService,
          ChatStreamService,
          { provide: Router, useValue: routerStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub},
          { provide: ConfigService, useValue: configServiceStub },
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
        ],
        imports: [
          RouterTestingModule,
          StoreModule.provideStore({
            profile: {
              firstname: 'test'
            }
          })
        ],
        declarations: [DashboardDetailComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardDetailComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should contain insurance type parameter', () => {
      expect(comp.insuranceType).toBe('car');
    });

    it('should go to new advice if click on button', () => {
      comp.goToAdvice();
      expect(routerStub.navigate).toHaveBeenCalledWith([ comp.insuranceType]);
    });

    it('should go to compare if click on compare button', () => {
      comp.goToInsurance();
      expect(routerStub.navigate).toHaveBeenCalledWith([ '/' ]);
    });

  });
  describe('with routing to travel', () => {
    beforeEach(async(() => {
      routerStub = {
        navigate: jasmine.createSpy('navigate'),
        routerState: {}
      };

      activatedRouteStub = {
        queryParams: Observable.of( { type: 'travel' } ),
        params: Observable.of( { type: 'travel' } )
      };

      TestBed.configureTestingModule({
        providers: [
          BaseRequestOptions,
          MockBackend,
          AuthService,
          AssistantService,
          ProfileService,
          ChatStreamService,
          { provide: Router, useValue: routerStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub},
          { provide: ConfigService, useValue: configServiceStub },
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
        ],
        imports: [
          RouterTestingModule,
          StoreModule.provideStore({
            profile: {
              firstname: 'test'
            }
          })
        ],
        declarations: [DashboardDetailComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardDetailComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should contain insurance type parameter', () => {
      expect(comp.insuranceType).toBe('travel');
    });

    it('should go to new advice if click on button', () => {
      comp.goToAdvice();
      expect(routerStub.navigate).toHaveBeenCalledWith([ comp.insuranceType]);
    });

    it('should go to compare if click on compare button', () => {
      comp.goToInsurance();
      expect(routerStub.navigate).toHaveBeenCalledWith([ '/' ]);
    });

  });

});
