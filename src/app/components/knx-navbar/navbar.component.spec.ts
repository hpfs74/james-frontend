import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { LocalStorageService } from '@app/core/services';

import { ContentConfig, Content } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { setUpTestBed } from './../../../test.common.spec';
import { Nav, NavItemType } from '@app/core/models';
import { NavbarComponent } from './navbar.component';
import { NavUserComponent } from '@app/components/knx-nav-user/nav-user.component';
import * as fromAuth from '@app/auth/reducers';
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromCar from '@app/reducers';
import * as insuranceReducers from '@app/insurance/reducers';
import * as insuranceReducer from '@app/insurance/reducers/insurance';
import * as insuranceActions from '@app/insurance/actions/insurance';
import * as fromProfile from '@app/profile/reducers';

describe('Component: Navbar', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let store: Store<fromAuth.State>;
  let localStorageService: LocalStorageService;

  let moduleDef: TestModuleMetadata = {
    imports: [
      RouterTestingModule,
      BrowserAnimationsModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(insuranceReducers.reducers),
        'profile': combineReducers(fromProfile.reducers)
      })
    ],
    declarations: [NavbarComponent],
    providers: [
      LocalStorageService,
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    localStorageService = TestBed.get(LocalStorageService);
    store = TestBed.get(Store);
    comp = fixture.componentInstance;
    comp.menuItems = [
      { id: 'menu-overview', title: 'Overzicht', routePath: 'overview', menuType: NavItemType.RIGHT },
      { id: 'menu-account', title: 'Mijn account', routePath: 'profile', menuType: NavItemType.RIGHT },
      { id: 'menu-faq', title: 'FAQ', routePath: 'faq', menuType: NavItemType.RIGHT },
      { id: 'menu-about', title: 'Over ons', routePath: 'about', menuType: NavItemType.RIGHT },
      { id: 'menu-phone', icon: 'knx-icon-phone', title: '020-3031600', routePath: '', menuType: NavItemType.RIGHT, url: 'tel:0203031600' }
    ];
    fixture.detectChanges();
  });

  it('should display the title', () => {
    const navElement = fixture.debugElement.query(By.css('ul.navbar-nav'));
    const el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });
});
