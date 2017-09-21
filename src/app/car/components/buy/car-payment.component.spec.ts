import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import { SharedModule } from '../../../shared.module';
import { CarPaymentComponent } from './car-payment.component';
import { IbanForm } from '../../../shared/forms/iban.form';

@Component({
  template: `<div><knx-car-payment-form [form]="formFromHost"></knx-car-payment-form></div>`
})
export class TestHostComponent {
  @ViewChild(CarPaymentComponent)
  public carPaymentComponent: CarPaymentComponent;
  public formFromHost: IbanForm = new IbanForm(new FormBuilder());
}

describe('Component: CarPaymentComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      declarations: [CarPaymentComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.carPaymentComponent).toBeDefined();
    expect(comp.carPaymentComponent.form).toBeDefined();
    expect(comp.carPaymentComponent.form.formGroup.get('startDate')).toBeDefined();
    expect(comp.carPaymentComponent.form.formGroup.get('iban')).toBeDefined();
    expect(comp.carPaymentComponent.form.formGroup.get('acceptConditions')).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.carPaymentComponent.form.formGroup.valid).toBeFalsy();
  });

  it('should provide info icon messages', () => {
    expect(comp.carPaymentComponent.form.infoMessages.startDate).toBeDefined();
    expect(comp.carPaymentComponent.form.infoMessages.iban).toBeDefined();
  });

});
