import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared.module';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { setUpTestBed } from './../../../test.common.spec';
import { ContentConfig } from '../../content.config';
import { ContentConfigMock } from '../../content.mock.spec';
import { AppComponent } from './app.component';
import { NavbarComponent } from './../../components/knx-navbar/navbar.component';
import { NavigationService } from '../services/navigation.service';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromCore from '../../core/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';

import * as auth from '../../auth/actions/auth';
import * as layout from '../../core/actions/layout';

@Component({
  template: `<knx-app></knx-app>`
})
export class TestHostComponent {
  @ViewChild(AppComponent)
  public targetComponent: AppComponent;
  public topMenu = [];
}

describe('Component: AppComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let store: Store<fromRoot.State>;
  let userDialogService: any;

  let moduleDef: TestModuleMetadata = {
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpModule,
      RouterTestingModule,
      SharedModule,
      StoreModule.forRoot({
      ...fromRoot.reducers,
      'auth': combineReducers(fromAuth.reducers),
      'core': combineReducers(fromCore.reducers),
      'insurance': combineReducers(fromInsurance.reducers),
      'profile': combineReducers(fromProfile.reducers)
    })],
    declarations: [AppComponent, TestHostComponent, NavbarComponent],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      NavigationService,
      {
        provide: UserDialogService,
        useValue: jasmine.createSpyObj('UserDialogService', ['openModal'])
      },
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeAll(() => {
    store = TestBed.get(Store);
    userDialogService = TestBed.get(UserDialogService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    comp.targetComponent.topMenu = [];
    fixture.detectChanges();
  }));

  describe('Initialization', () => {
    it('should set the loggedIn observable', () => {
      expect(comp.targetComponent.loggedIn$).toBeDefined();
    });

    it('should init menu items', () => {
      comp.targetComponent.ngOnInit();
      expect(comp.targetComponent.topMenu).toBeDefined();
      expect(comp.targetComponent.topMenu.length).toBeGreaterThan(0);
    });
  });

  describe('Modals', () => {
    it('should define the login modal name', () => {
      expect(comp.targetComponent).toBeDefined();
      expect(comp.targetComponent.modalNames.loginModal).toEqual('loginModal');
      expect(comp.targetComponent.modalNames.authRedirect).toEqual('authRedirectModal');
    });

    it('should open the login modal', () => {
      comp.targetComponent.ngOnInit();
      fixture.detectChanges();
      const modalName = comp.targetComponent.modalNames.loginModal;
      const action = new layout.OpenModal(modalName);
      store.dispatch(action);
      expect(userDialogService.openModal).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should open the auth redirect modal', () => {
      comp.targetComponent.ngOnInit();
      fixture.detectChanges();
      const modalName = comp.targetComponent.modalNames.authRedirect;
      const action = new layout.OpenModal(modalName);
      store.dispatch(action);
      expect(userDialogService.openModal).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('Navbar', () => {
    it('should logout the user', () => {
      const action = new auth.Logout;
      comp.targetComponent.logOut();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
