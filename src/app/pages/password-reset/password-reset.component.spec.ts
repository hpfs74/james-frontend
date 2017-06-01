import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';


import { PasswordResetComponent } from './password-reset.component';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../config.service';

describe('Component: Password Reset', () => {
  let comp: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
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
  const authServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [RouterTestingModule],
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
      declarations: [PasswordResetComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain a proper message to explain how to use correctly', () => {
    let navElement = fixture.debugElement.query(By.css('div.knx-password-reset__welcome > p'));
    expect(navElement).not.toBeNull();
  });

  xit('should disable submit button until user provide a correct email', () => {
    let buttonEl = fixture.debugElement.query(By.css('button.knx-button'));

    expect(buttonEl).toBeDefined();
    //expect(buttonEl.attr('disabled')).toBe(true);
  });

  xit('should display success message if user provide existing email');
  xit('should display error message if user provide not existing email');
  xit('should display a captcha when is needed');
  xit('should display error message on network error');
});
