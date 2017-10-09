import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '@cx/forms';
import { Observable } from 'rxjs/Rx';
import { setUpTestBed } from './../../../test.common.spec';

import { SharedModule } from '../../shared.module';
import { Address } from '..//models';
import { AddressForm } from '../components/address.form';
import { AddressComponent } from './address.component';

@Component({
  template: `<knx-address [addressFormGroup]="form.formGroup" [validationErrors]="validationErrors"></knx-address>`
})
export class TestHostComponent {
  @ViewChild(AddressComponent)
  targetComponent: AddressComponent;
  form = new AddressForm(new FormBuilder());
  validationErrors = {
    required: () => 'Dit veld is verplicht',
    address: () => 'Error',
    postalCode: () => `Vul een geldige postcode`,
    houseNumber: () => `Vul een huisnummer in`,
    stringTest: 'test'
  };
}

describe('Component: CarCheckComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserModule, ReactiveFormsModule, CXFormsModule],
    declarations: [AddressComponent, TestHostComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get error messages', () => {
    expect(comp.targetComponent.getErrorMessage('address')).toEqual('Error');
    expect(comp.targetComponent.getErrorMessage('stringTest')).toEqual('test');
  });

  it('should return error on empty form values', () => {
    comp.targetComponent.addressFormGroup.get('postalCode').setValue('');
    comp.targetComponent.addressFormGroup.get('houseNumber').setValue('');
    comp.targetComponent.addressFormGroup.updateValueAndValidity();

    fixture.detectChanges();
    expect(comp.targetComponent.addressFormGroup.valid).toBeFalsy();

    // fixture.whenStable().then(() => {
    //   fixture.detectChanges();
    //   expect(comp.targetComponent.addressFormGroup.hasError('address')).toBe(true);
    // });
  });

  // it('should return validation error on empty form', (done) => {
  //   let asyncValidator$ = Observable.create(obs => {
  //     obs.next(null);
  //     obs.complete();
  //   });

  //   const spy = spyOn(comp.targetComponent, 'validateAddress').and.returnValue(asyncValidator$);
  //   comp.targetComponent.asyncValidator = asyncValidator$;
  //   comp.targetComponent.ngAfterViewChecked();
  //   fixture.detectChanges();

  //   const testForm = new AddressForm(new FormBuilder());
  //   const result = comp.targetComponent.validateAddress(testForm.formGroup);

  //   expect(spy.calls.any()).toBeTruthy();
  //   spy.calls.mostRecent().returnValue.then((res) => {
  //     fixture.detectChanges();
  //     expect(res).toEqual({ address: true});
  //     done();
  //   });
  // });

  // describe('Async validator', () => {
  //   it('should return error object on empty form values', () => {
  //     inject([AddressLookupService], (addressServiceStub) => {
  //       const validatorResult = null;
  //       const validatorErrorResult = { address: true };

  //       let testObj = {
  //         validatorPromise: comp.validateAddress(comp.addressFormGroup, addressServiceStub)
  //       };
  //       let spy = spyOn(testObj, 'validatorPromise');

  //       testObj.validatorPromise.then(result => {
  //         expect(result).toEqual(validatorErrorResult);
  //       });
  //     });
  //   });

  //   it('should return null on valid form values', async(() => {
  //     inject([AddressLookupService], (addressServiceStub) => {
  //       const validatorResult = null;
  //       const validatorErrorResult = { address: true };

  //       comp.addressFormGroup.get('postalCode').setValue('2512CB');
  //       comp.addressFormGroup.get('houseNumber').setValue('22');

  //       let testObj = {
  //         validatorPromise: comp.validateAddress(comp.addressFormGroup, addressServiceStub)
  //       };
  //       let spy = spyOn(testObj, 'validatorPromise');

  //       testObj.validatorPromise.then(result => {
  //         expect(result).toEqual(validatorErrorResult);
  //       });
  //     });
  //   }));
  // });

});
