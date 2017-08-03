import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';


import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../config.service';
import { loginError } from './login-error';

describe('Component: Login', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const configServiceStub = {
    config: {
      api: {
        james: {
          address: 'api/reset/password'
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        AuthService,
        { provide: ConfigService, useValue: configServiceStub },
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
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  it('should have submit button enabled by default', () => {
    const submit = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submit.nativeElement.disabled).toBeFalsy();
  });

  it('should display generic error', () => {
    const testData = {
      error: 'generic error',
      toString: (): string => {
        return 'Generic error';
      }
    };

    comp.handleError(testData);
    expect(comp).not.toBeNull();
    // expect(comp.messageTitle).toBe('Login failed');
    expect(comp.message).toEqual(loginError.default);
  });

  it('should display error on too many attempts', () => {
    comp.handleError({ error: 'too_many_login_attempts', error_description: 'Too many attempts'});

    expect(comp).not.toBeNull();
    expect(comp.message).toEqual(loginError.too_many_login_attempts);
  });

  it('should display error on invalid login data', () => {
    comp.handleError({ error: 'invalid_password'});

    expect(comp).not.toBeNull();
    expect(comp.message).toEqual(loginError.invalid_password);
  });


  it('should display error on not yet validate account that try to login', () => {
    comp.handleError({ error: 'inactive_profile'});

    expect(comp).not.toBeNull();
    expect(comp.message).toEqual(loginError.inactive_profile);
  });
});
