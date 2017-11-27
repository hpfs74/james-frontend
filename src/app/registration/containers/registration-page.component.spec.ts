import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromAuth from '../../auth/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as register from '../../auth/actions/registration';

import { setUpTestBed } from './../../../test.common.spec';
import { RegistrationPageComponent } from '../containers/registration-page.component';
import { AuthService } from '../../auth/services/auth.service';
import { ContentConfig } from '../../content.config';
import { ContentConfigMock } from '../../content.mock.spec';

describe('Component: RegistrationPageComponent', () => {
  let store: Store<fromAuth.State>;
  let comp: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    providers: [
      BaseRequestOptions,
      MockBackend,
      AuthService,
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      },
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
    ],
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({
        auth: combineReducers(fromAuth.reducers),
        insurance: combineReducers(fromInsurance.reducers)
})
    ],
    declarations: [RegistrationPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeAll(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch a register action', () => {
    const value = {
      username: 'test@mail.com',
      password: 'Qwerty1234@'
    };
    const action = new register.Register({
      emailaddress: value.username,
      password: value.password
    });
    comp.register(value);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a resend activation action', () => {
    const payload = 'test@mail.com';
    const action = new register.ResendActivationEmail(payload);
    comp.sendActivationEmail(payload);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
