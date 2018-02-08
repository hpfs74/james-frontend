import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { StoreModule, Store, State, ActionReducer, combineReducers } from '@ngrx/store';

import * as fromAuth from '../../auth/reducers';
import * as auth from '../../auth/actions/auth';
import { FormBuilder } from '@angular/forms';

import { setUpTestBed } from './../../../test.common.spec';
import { LoginPageComponent } from '../containers/login-page.component';
import { LoginForm } from '../components/login.form';
import { AuthService } from '../../auth/services/auth.service';
import { loginError } from '../models/login-error';
import * as layout from '@core/actions/layout';
import * as router from '@app/core/actions/router';
import { UserDialogService } from '@app/components/knx-modal/user-dialog.service';
import * as registration from '@auth/actions/registration';


describe('Component: Login', () => {
  let store: Store<fromAuth.State>;
  let comp: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    providers: [
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
    ],
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({
        auth: combineReducers(fromAuth.reducers)
      })
    ],
    declarations: [LoginPageComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeAll(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form', () => {
    expect(comp.form.formConfig).toBeDefined();
    expect(Object.keys(comp.form.formConfig).length).toBe(2);
    expect(comp.form.formGroup.get('email')).toBeDefined();
    expect(comp.form.formGroup.get('password')).toBeDefined();
  });

  it('email invalid when empty', () => {
    expect(comp.form.formGroup.get('email').valid).toBeFalsy();
  });

  it('password invalid when empty', () => {
    expect(comp.form.formGroup.get('password').valid).toBeFalsy();
  });

  it('should display error message on wrong email syntax', () => {
    const email = comp.form.formGroup.get('email');
    email.setValue('not-an-email');
    const errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  // it('should have submit button enabled by default', () => {
  //   const submit = fixture.debugElement.query(By.css('button[type="submit"]'));
  //   expect(submit.nativeElement.disabled).toBeFalsy();
  // });

  // it('should display a login error', () => {
  //   const testError = 'De combinatie gebruikersnaam en wachtwoord klopt niet';
  //   comp.errorMessage = testError;
  //   comp.form.formGroup.patchValue({
  //     email: 'test@mail.com',
  //     password: 'test'
  //   });
  //   comp.form.formGroup.updateValueAndValidity();
  //   fixture.detectChanges();

  //   de = fixture.debugElement.query(By.css('.knx-login__error'));
  //   el = de.nativeElement;

  //   expect(comp).not.toBeNull();
  //   expect(el).toBeDefined();
  //   expect(el.textContent).toContain(testError);
  // });

  it('should return a password reset link', () => {
    const resetLink = comp.getPasswordResetLink();

    expect(resetLink).toBeDefined();
    expect(resetLink).toContain('redirect_uri=');
    expect(resetLink).toContain('response_type=');
    expect(resetLink).toContain('client_id=');
    expect(resetLink).toContain('locale=');
    expect(resetLink).toContain('scope=basic+emailaddress+social');
  });

  it('should redirect to registration', () => {
    expect(comp.goToRegister).toBeDefined();
    comp.goToRegister();
    const action = new router.Go({path: ['/register']});
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should resend activation email', () => {
    expect(comp.resendActivationMail).toBeDefined();

    const email = 'test@email.com';
    comp.resendActivationMail(email);

    const action = new registration.ResendActivationEmail(email);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should reset login state', () => {
    expect(comp.resetLoginState).toBeDefined();

    comp.resetLoginState();

    const action = new auth.LoginResetState();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should handle error message', () => {
    comp.handleLoginError('invalid_password');
    expect(comp.errorMessage.errorText).toBe(loginError.invalid_password);
  });

  it('should handle error message for inactive profile', () => {
    comp.handleLoginError('profile inactive');
    expect(comp.errorMessage.errorText).toBe(loginError.inactive_profile);
    expect(comp.errorMessage.hasLink).toBeTruthy();
  });

  it('should login user with valid form', () => {
    const mock = {
      email: 'test@email.com',
      password: 'password'
    };
    comp.form.formGroup.patchValue(mock);
    const event = {
      preventDefault: () => {
      }
    };
    comp.login(event);
    const action = new auth.Login({username: mock.email, password: mock.password});
    // store.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should login user with valid form', () => {
      const mock = {
        email: 'test@email.com',
        password: null
      };
      comp.form.formGroup.patchValue(mock);
      const event = {
        preventDefault: () => {
        }
      };
      fixture.detectChanges();
      comp.login(event);
      const action = new auth.Login({username: mock.email, password: mock.password});
      // store.dispatch(action);
      expect(store.dispatch).not.toHaveBeenCalledWith(action);
  });

});
