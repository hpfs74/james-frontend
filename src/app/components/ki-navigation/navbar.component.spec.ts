import { DebugElement } from '@angular/core';
import { AppRoutingModule } from '../../app.routes';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { Nav } from '../../models/nav';

describe('Component: Navbar', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    comp.menuItems = [
      {id: 'about', title: 'About'}
    ];
    fixture.detectChanges();
  });

  it('should display the title', () => {
    let navElement = fixture.debugElement.query(By.css('ul.navbar-nav'));
    let el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });
});
