// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MockBackend } from '@angular/http/testing';
// import { Observable } from 'rxjs/Observable';
// import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
// import { StoreModule, Store, State, ActionReducer } from '@ngrx/store';

// import { setUpTestBed } from './../../../test.common.spec';
// import { DashboardComponent } from './dashboard.component';
// import { AssistantService, LocalStorageService } from '../../core/services';
// import { ProfileService } from '../../profile/services/profile.service';
// import { AuthHttp, AuthService } from '../../auth/services';

// describe('Component: Dashboard', () => {
//   let comp: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let store: Store<any>;

//   const configServiceStub = {
//     config: {
//       api: {
//         james: {
//           address: 'api/reset/password'
//         }
//       }
//     }
//   };

//   let routerStub = {
//     navigate: jasmine.createSpy('navigate'),
//     routerState: {}
//   };

//   let moduleDef: TestModuleMetadata = {
//     providers: [
//       BaseRequestOptions,
//       MockBackend,
//       AuthService,
//       AssistantService,
//       ProfileService,
//       LocalStorageService,
//       {provide: Router, useValue: routerStub},
//       {
//         deps: [
//           MockBackend,
//           BaseRequestOptions
//         ],
//         provide: AuthHttp,
//         useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions);
//         }
//       }
//     ],
//     imports: [
//       RouterTestingModule,
//       StoreModule.forRoot({})
//     ],
//     declarations: [DashboardComponent],
//     schemas: [NO_ERRORS_SCHEMA]
//   };
//   setUpTestBed(moduleDef);

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DashboardComponent);
//     comp = fixture.componentInstance;
//     store = fixture.debugElement.injector.get(Store);
//     fixture.detectChanges();
//   });
// });

