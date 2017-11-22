import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromCore from '../../core/reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';
import * as advice from '../../insurance/actions/advice';
import * as insurance from '../../insurance/actions/insurance';

import { setUpTestBed } from './../../../test.common.spec';
import { RegistrationComponent } from '../components/registration.component';
import { RegistrationForm } from '../components/registration.form';
import { registrationError } from '../models/registration-error';

describe('Component: Registration', () => {
  let comp: RegistrationComponent ;
  let fixture: ComponentFixture<RegistrationComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let store: Store<fromInsurance.State>;

  let moduleDef: TestModuleMetadata = {
    imports: [StoreModule.forRoot({
      'auth': combineReducers(fromAuth.reducers),
      'core': combineReducers(fromCore.reducers),
      'insurance': combineReducers(fromInsurance.reducers),
      'profile': combineReducers(fromProfile.reducers)
    })],
    declarations: [RegistrationComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should initialize the form', () => {
    expect(comp.form.formConfig).toBeDefined();
    expect(Object.keys(comp.form.formConfig).length).toBe(3);
    expect(comp.form.formGroup.get('email')).toBeDefined();
    expect(comp.form.formGroup.get('password')).toBeDefined();
  });

  it('email invalid when empty', () => {
    expect(comp.form.formGroup.get('email').valid).toBeFalsy();
  });

  it('password invalid when empty', () => {
    expect(comp.form.formGroup.get('password').valid).toBeFalsy();
  });

  it('should display error message on wrong email syntax', () => {
    const email = comp.form.formGroup.get('email');
    email.setValue('not-an-email');
    const errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should have submit button enabled by default', () => {
    const submit = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submit.nativeElement.disabled).toBeFalsy();
  });

  it('should emit onRegister on submit', () => {
    spyOn(comp.onRegister, 'emit');

    const email = comp.form.formGroup.get('email');
    const password = comp.form.formGroup.get('password');
    const confirm = comp.form.formGroup.get('confirm');

    const emailValue = 'test@mail.com';
    const passwordValue = 'Qwerty1234@';

    email.setValue(emailValue);
    password.setValue(passwordValue);
    confirm.setValue(true);

    fixture.detectChanges();
    expect(comp.form.formGroup.valid).toBeTruthy();

    comp.register(new Event('click'));
    fixture.detectChanges();

    expect(comp.onRegister.emit).toHaveBeenCalledWith({
      username: emailValue,
      password: passwordValue
    });
  });
});
