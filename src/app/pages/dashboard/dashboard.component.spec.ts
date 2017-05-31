import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';

import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { DashboardComponent } from './dashboard.component';
import { AuthService, ProfileService, AuthHttp, AssistantService } from '../../services/';
import { ConfigService } from '../../config.service';
import { loginError } from './login-error';

describe('Component: Dashboard', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerStub: any;

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
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
      routerState: {}
    };

    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        AuthService,
        AssistantService,
        ProfileService,
        ChatStreamService,
        {provide: Router, useValue: routerStub},
        {provide: ConfigService, useValue: configServiceStub},
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
      imports: [RouterTestingModule],
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should go to proper action', () => {
    comp.goToActions('car');
    expect(routerStub.navigate).toHaveBeenCalledWith(['/next-action', 'car']);
  });
});

