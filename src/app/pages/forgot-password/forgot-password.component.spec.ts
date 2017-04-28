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

  //TODO: implement
  xit('should contain a proper message to explain how to use correctly', () => {
    let navElement = fixture.debugElement.query(By.css('ul.navbar-nav'));
    let el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });

  it('should disable submit button until user provide a correct email');
  it('should display success message if user provide existing email');
  it('should display error message if user provide not existing email');
  it('should display a captcha when is needed');
  it('should display error message on network error');

});
