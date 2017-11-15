import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { ContentConfig, Content } from '../../content.config';
import { ContentConfigMock } from '../../content.mock.spec';
import { setUpTestBed } from './../../../test.common.spec';
import { Nav, NavItemType } from '../../core/models';
import { NavbarComponent } from './navbar.component';
import { NavUserComponent } from './../knx-nav-user/nav-user.component';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as fromCore from '../../core/reducers';
import * as fromCar from '../../reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';

describe('Component: Navbar', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let store: Store<fromAuth.State>;

  let moduleDef: TestModuleMetadata = {
    imports: [
      RouterTestingModule,
      BrowserAnimationsModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      })
    ],
    declarations: [NavbarComponent],
    providers: [
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
