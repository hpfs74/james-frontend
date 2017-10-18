import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component, EventEmitter } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '@cx/forms';

import { setUpTestBed } from './../../../../test.common.spec';
import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from '../../../shared/forms/contact-detail.form';
import { nameInitialMask } from '../../../utils/base-form.utils';

@Component({
  template: `<div><knx-car-contact-form [form]="formFromHost" [profile]="profileFromHost"></knx-car-contact-form></div>`
})
export class TestHostComponent {
  @ViewChild(CarContactComponent)
  public carContactComponent: CarContactComponent;
  public formFromHost: ContactDetailForm = new ContactDetailForm(new FormBuilder());
  public profileFromHost: any;
  public onReset: EventEmitter<any> = new EventEmitter<any>();
}

describe('Component: CarContactComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule],
    declarations: [CarContactComponent, TestHostComponent]
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

    ctrl.setValue('0203031680');
    expect(ctrl.valid).toBeTruthy();
  });

  it('should emit on click', (done) => {
    comp.onReset.subscribe(event => {
      expect(event).toEqual('resetAdvice');
      done();
    });
    comp.onReset.emit('resetAdvice');
  });
});
