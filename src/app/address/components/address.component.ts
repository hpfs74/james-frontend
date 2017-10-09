import { Component, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromAddress from '../reducers';
import * as address from '../actions/address';

import { postalCodeMask } from '../../utils/base-form.utils';
import { AddressLookup, Address } from '../models';

@Component({
  selector: 'knx-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements AfterViewChecked {
  @Input() addressFormGroup: FormGroup;
  @Input() validationErrors: any;
  @Input() asyncValidator: Observable<any>;
  @Input() addressPreview: string;
  @Input() isLoading: boolean;

  @Output() addressFound: EventEmitter<Address> = new EventEmitter();
  @Output() runValidation: EventEmitter<AddressLookup> = new EventEmitter();

  mask = postalCodeMask;

  ngAfterViewChecked(): void {
    this.addressFormGroup.setAsyncValidators((formControl) => this.validateAddress(formControl));
  }

  getErrors(): Array<string> {
    return this.addressFormGroup.errors ?
      Object.keys(this.addressFormGroup.errors).map(error => this.getErrorMessage(error))
      : null;
  }

  getErrorMessage(errorCode: string): string {
    if (this.validationErrors && this.validationErrors[errorCode]) {
      const errorMessage = this.validationErrors[errorCode];

      return (typeof errorMessage === 'string') ?
        errorMessage : errorMessage(errorMessage);
    }
  }

  validateAddress(formGroup: AbstractControl): Observable<any> {
    const postalCodeControl = formGroup.get('postalCode');
    const houseNumberControl = formGroup.get('houseNumber');

    if (!postalCodeControl.valid || !houseNumberControl.valid) {
      return Observable.of({ address: true });
    }

    this.runValidation.emit({
      postalCode: postalCodeControl.value,
      houseNumber: houseNumberControl.value
    });

    return this.asyncValidator;
  }
}
