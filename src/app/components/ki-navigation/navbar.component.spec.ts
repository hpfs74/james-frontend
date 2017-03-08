import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
// import { Nav } from '../../models/nav';
import { UserDetailComponent } from './../ki-user-detail/user-detail.component';

describe('Component: Navbar', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    comp.menuItems = [
      { id: 'about', title: 'About', routePath: '/about' }
    ];
    fixture.detectChanges();
  });

  it('should display the title', () => {
    let navElement = fixture.debugElement.query(By.css('ul.navbar-nav'));
    let el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });
});
