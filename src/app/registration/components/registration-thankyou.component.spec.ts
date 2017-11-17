import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

import { setUpTestBed } from './../../../test.common.spec';
import { RegistrationThankyouComponent } from '../components/registration-thankyou.component';

describe('Component: RegistrationThankyouComponent', () => {
  let comp: RegistrationThankyouComponent ;
  let fixture: ComponentFixture<RegistrationThankyouComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [RegistrationThankyouComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationThankyouComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit login', () => {
    spyOn(comp.onLogin, 'emit');
    comp.login();
    fixture.detectChanges();
    expect(comp.onLogin.emit).toHaveBeenCalled();
  });

  it('should emit resendActivationEmail', () => {
    spyOn(comp.onSendActivation, 'emit');
    comp.email = 'test@mail.com';
    comp.resendActivationEmail();
    fixture.detectChanges();
    expect(comp.onSendActivation.emit).toHaveBeenCalledWith('test@mail.com');
  });
});
