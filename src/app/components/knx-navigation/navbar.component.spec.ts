import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';

import { Nav, NavItemType } from '../../models';
import { NavbarComponent } from './navbar.component';
import { NavUserComponent } from './../knx-nav-user/nav-user.component';

describe('Component: Navbar', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [NavbarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    comp.menuItems = [
      { id: 'menu-overview', title: 'Overzicht', routePath: 'overview', menuType: NavItemType.RIGHT },
      { id: 'menu-account', title: 'Mijn account', routePath: 'profile', menuType: NavItemType.RIGHT },
      { id: 'menu-faq', title: 'FAQ', routePath: 'faq', menuType: NavItemType.RIGHT },
      { id: 'menu-about', title: 'Over ons', routePath: 'about', menuType: NavItemType.RIGHT },
      { id: 'menu-phone', icon: 'knx-icon-phone', title: '020-303 1680', routePath: '', menuType: NavItemType.RIGHT, url: 'tel:0203031680' }
    ];
    fixture.detectChanges();
  });

  it('should display the title', () => {
    const navElement = fixture.debugElement.query(By.css('ul.navbar-nav'));
    const el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });
});
