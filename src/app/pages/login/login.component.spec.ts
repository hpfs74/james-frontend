import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { FormBuilder } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginForm } from './login.form';
import { AuthService } from '../../services/auth.service';
import { loginError } from './login-error';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './login.component.html'
})

export class TestHostComponent {
  @ViewChild(LoginComponent)
  public targetComponent: LoginComponent;
  public formFromHost: LoginForm = new LoginForm(new FormBuilder());
}

describe('Component: Login', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let store: Store<any>;

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
      declarations: [LoginComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should initialize the form', () => {
    expect(comp.targetComponent.form.formConfig).toBeDefined();
    expect(Object.keys(comp.targetComponent.form.formConfig).length).toBe(2);
    expect(comp.targetComponent.form.formGroup.get('email')).toBeDefined();
    expect(comp.targetComponent.form.formGroup.get('password')).toBeDefined();
  });

  xit('email invalid when empty', () => {
    expect(comp.targetComponent.form.formGroup.get('email').valid).toBeFalsy();
  });

  xit('password invalid when empty', () => {
    expect(comp.targetComponent.form.formGroup.get('password').valid).toBeFalsy();
  });

  xit('should display error message on wrong email syntax', () => {
    const email = comp.targetComponent.form.formGroup.get('email');
    email.setValue('not-an-email');
    const errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  xit('should have submit button enabled by default', () => {
    const submit = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submit.nativeElement.disabled).toBeFalsy();
  });

  xit('should display generic error', () => {
    const testData = {
      error: 'generic error',
      toString: (): string => {
        return 'Generic error';
      }
    };

    comp.targetComponent.handleError(testData);
    expect(comp.targetComponent).not.toBeNull();
    // expect(comp.messageTitle).toBe('Login failed');
    expect(comp.targetComponent.message).toEqual(loginError.default);
  });

  xit('should display error on too many attempts', () => {
    comp.targetComponent.handleError({ error: 'too_many_login_attempts', error_description: 'Too many attempts'});

    expect(comp).not.toBeNull();
    expect(comp.targetComponent.message).toEqual(loginError.too_many_login_attempts);
  });

  xit('should display error on invalid login data', () => {
    comp.targetComponent.handleError({ error: 'invalid_password'});

    expect(comp).not.toBeNull();
    expect(comp.targetComponent.message).toEqual(loginError.invalid_password);
  });


  xit('should display error on not yet validate account that try to login', () => {
    comp.targetComponent.handleError({ error: 'inactive_profile'});

    expect(comp).not.toBeNull();
    expect(comp.targetComponent.message).toEqual(loginError.inactive_profile);
  });
});
