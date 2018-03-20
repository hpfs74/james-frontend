import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { combineReducers, StoreModule } from '@ngrx/store';

import { KNXFormsModule } from '@knx/forms';
import { KNXLocale } from '@knx/locale';

import { setUpTestBed, TranslateLoaderMock } from './../../../../../../test.common.spec';
import { CarPaymentComponent } from './car-payment.component';
import { IbanForm } from '@app/shared/forms/iban.form';
import * as fromAuth from '@auth/reducers';
import * as fromCore from '@core/reducers';
import * as fromInsurance from '@insurance/reducers';
import * as fromRoot from '@app/reducers';
import * as fromCar from '@car/reducers';

import * as fromProfile from '@app/profile/reducers';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@Component({
  template: `
    <div>
      <knx-car-payment-form [form]="formFromHost"></knx-car-payment-form>
    </div>`
})
export class TestHostComponent {
  @ViewChild(CarPaymentComponent)
  public carPaymentComponent: CarPaymentComponent;
  public formFromHost: IbanForm = new IbanForm(new FormBuilder());
}

describe('Component: CarPaymentComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;

  let moduleDef: TestModuleMetadata = {
    imports: [
      CommonModule,
      ReactiveFormsModule,
      KNXFormsModule,
      TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
      }),
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      })],
    declarations: [CarPaymentComponent, TestHostComponent],
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
    expect(comp.carPaymentComponent).toBeDefined();
    expect(comp.carPaymentComponent.form).toBeDefined();
    expect(comp.carPaymentComponent.form.formGroup.get('startDate')).toBeDefined();
    expect(comp.carPaymentComponent.form.formGroup.get('iban')).toBeDefined();
    expect(comp.carPaymentComponent.form.formGroup.get('acceptConditions')).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.carPaymentComponent.form.formGroup.valid).toBeFalsy();
  });

});
