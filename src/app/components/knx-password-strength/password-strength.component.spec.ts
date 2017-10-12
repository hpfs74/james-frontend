import { NO_ERRORS_SCHEMA, DebugElement, Input, Component } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { PasswordStrengthComponent } from './password-strength.component';

describe('Component: CarContactComponent', () => {
  let fixture: ComponentFixture<PasswordStrengthComponent>;
  let comp: PasswordStrengthComponent;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserModule ],
    declarations: [PasswordStrengthComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show error if password length shorter than 8 chars', () => {
    comp.password = '1234';
    fixture.detectChanges();

    expect(comp.passwordLength()).toBeFalsy();
  });

  it('should be ok if password length is greater or equal than 8 chars', () => {
    comp.password = 'Password1!';
    fixture.detectChanges();

    expect(comp.passwordLength()).toBeTruthy();
  });
});
