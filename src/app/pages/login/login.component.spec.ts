import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';


import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../config.service';

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

  it('should display error message on wrong email syntax');

  it('should disable submit button until form is valid');

  it('should display error message on invalid login');

  it('should notify success on correct login data');

  it('should display generic error', () => {
    let testData = {
      error: 'generic error',
      toString: () : string => {
        return 'Generic error';
      }
    };

    comp.handleError(testData);

    expect(comp).not.toBeNull;
    expect(comp.messageTitle).toBe('Login failed');
    expect(comp.message).toContain('Generic error');
  });

  it('should display error on too many attempets', () => {
    comp.handleError({ error: 'too_many_login_attempts', error_description: 'Too many attempts'});

    expect(comp).not.toBeNull;
    expect(comp.messageTitle).toBe('Login failed');
    expect(comp.message).toBe('Too many attempts');
  });

  it('should display error on invalid login data', () => {
    comp.handleError({ error: 'invalid_password'});

    expect(comp).not.toBeNull;
    expect(comp.messageTitle).toBe('Login failed');
    expect(comp.message).toBe('Invalid email or password');
  });


  it('should display error on not yet validate account that try to login', () => {
    comp.handleError({ error: 'inactive_profile'});

    expect(comp).not.toBeNull;
    expect(comp.messageTitle).toBe('Login failed');
    expect(comp.message).toBe('Sorry your profile is inactive');
  });
});
