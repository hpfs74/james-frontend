import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('Component: Navbar', () => {
  let comp: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ForgotPasswordComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain a proper message to explain how to use correctly', () => {
    let navElement = fixture.debugElement.query(By.css('ul.navbar-nav'));
    let el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });
});
