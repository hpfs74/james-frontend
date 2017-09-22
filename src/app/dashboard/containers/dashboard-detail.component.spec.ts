import { getAssistantMessageState } from '../../core/reducers/index';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { StoreModule, Store, State, ActionReducer, combineReducers } from '@ngrx/store';

import { DashboardDetailComponent } from './dashboard-detail.component';
import { AssistantService, LocalStorageService } from '../../core/services/';
import { ProfileService } from '../../profile/services/profile.service';
import { AuthHttp, AuthService } from '../../auth/services';

import { Observable } from 'rxjs/Observable';

import * as fromCore from '../../core/reducers';
import * as fromProfile from '../../profile/reducers';

import * as router from '../../core/actions/router';
import * as layout from '../../core/actions/layout';
import * as assistant from '../../core/actions/assistant';

describe('Component: DashboardDetail', () => {
  let comp: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;
  let store: Store<fromCore.State>;
  let activatedRouteStub: any;

  describe('with routing to car', () => {
    beforeEach(async(() => {
      activatedRouteStub = {
        queryParams: Observable.of( { type: 'car' } ),
        params: Observable.of( { type: 'car' } )
      };

      TestBed.configureTestingModule({
        providers: [
          BaseRequestOptions,
          MockBackend,
          AuthService,
          LocalStorageService,
          AssistantService,
          ProfileService,
          { provide: ActivatedRoute, useValue: activatedRouteStub},
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
          StoreModule.forRoot({
            'core': combineReducers(fromCore.reducers)
          })
        ],
        declarations: [DashboardDetailComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardDetailComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show an assistant message', () => {
      const action = new assistant.AddCannedMessage({
        key: 'dashboard.detail',
        value: 'auto',
        clear: true
      });
      comp.ngOnInit();
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should contain insurance type parameter', () => {
      expect(comp.insuranceType).toBe('car');
    });

    it('should go to new advice if click on button', () => {
      const action = new router.Go({
        path: ['car']
      });
      comp.goToAdvice();
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should go to compare if click on compare button', () => {
      const action = new router.Go({
        path: ['/']
      });
      comp.goToInsurance();
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

  });
});
