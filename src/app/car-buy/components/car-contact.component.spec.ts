import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModuleMetadata, async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '@cx/forms';

import { setUpTestBed } from './../../../test.common.spec';
import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from '../../shared/forms/contact-detail.form';
import { nameInitialMask } from '../../utils/base-form.utils';

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

  let moduleDef: TestModuleMetadata = {
    imports: [CommonModule, ReactiveFormsModule, CXFormsModule],
    declarations: [CarContactComponent, TestHostComponent],
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

  it('should emit on click', fakeAsync(() => {
    spyOn(comp.carContactComponent.onReset, 'emit');
    comp.carContactComponent.resetAdvice();
    tick(1);
    expect(comp.carContactComponent.onReset.emit).toHaveBeenCalled();
    expect(comp.carContactComponent.onReset.emit).toHaveBeenCalledWith('resetAdvice');
  }));
});
