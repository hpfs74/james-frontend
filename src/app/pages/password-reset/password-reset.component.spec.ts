import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';


import { PasswordResetComponent } from './password-reset.component';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

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
    const navElement = fixture.debugElement.query(By.css('div.knx-password-reset__welcome > p'));
    expect(navElement).not.toBeNull();
  });
});
