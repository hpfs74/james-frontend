import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModuleMetadata, async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { KNXFormsModule } from '@knx/forms';
import { KNXLocale } from '@knx/locale';

import * as fromRoot from '../../../../reducers';
import * as fromCore from '../../../../../core/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromProfile from '../../../../../profile/reducers';

import { setUpTestBed } from './../../../../../../test.common.spec';
import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from '../../../../../shared/forms/contact-detail.form';
import { nameInitialMask } from '../../../../../utils/base-form.utils';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `<div><knx-car-contact-form [form]="formFromHost" [profile]="profileFromHost"></knx-car-contact-form></div>`
})
export class TestHostComponent {
  @ViewChild(CarContactComponent)
  public carContactComponent: CarContactComponent;
  public formFromHost: ContactDetailForm = new ContactDetailForm(new FormBuilder());
  public profileFromHost: any;
}

describe('Component: CarContactComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;
  let store: Store<fromRoot.State>;

  let moduleDef: TestModuleMetadata = {
    imports: [
      NoopAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      KNXFormsModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      })],
    declarations: [CarContactComponent, TestHostComponent],
    providers: [KNXLocale],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.carContactComponent).toBeDefined();
    expect(comp.carContactComponent.form).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.carContactComponent.form.formGroup.valid).toBeFalsy();
  });

  it('should transform the initials without dots', () => {
    expect(nameInitialMask.decode('A.B.')).toBe('AB');
  });

  it('should validate the mobile number', () => {
    const ctrl = comp.carContactComponent.form.formGroup.get('mobileNumber');

    ctrl.setValue('061234');
    expect(comp.carContactComponent.form.formGroup.valid).toBeFalsy();
    expect(ctrl.valid).toBeFalsy();

    ctrl.setValue('0612345678');
    expect(ctrl.valid).toBeTruthy();
  });

  it('should validate the phone number', () => {
    const ctrl = comp.carContactComponent.form.formGroup.get('phoneNumber');
    ctrl.setValue('061234');
    expect(comp.carContactComponent.form.formGroup.valid).toBeFalsy();
    expect(ctrl.valid).toBeFalsy();

    // 09-06-2017 currently no distinction between mobile and landline number
    ctrl.setValue('0612345678');
    expect(ctrl.valid).toBeTruthy();

    ctrl.setValue('0203031600');
    expect(ctrl.valid).toBeTruthy();
  });
});
