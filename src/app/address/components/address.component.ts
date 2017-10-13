import { Component, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromAddress from '../reducers';
import * as address from '../actions/address';

import { postalCodeMask } from '../../utils/base-form.utils';
import { AddressLookup, Address, AddressSuggestionParams } from '../models';

@Component({
  selector: 'knx-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements AfterViewChecked {
  @Input() addressFormGroup: FormGroup;
  @Input() addressFormConfig: any;
  @Input() validationErrors: any;
  @Input() asyncValidator: Observable<any>;
  @Input() addressPreview: string;
  @Input() loading: boolean;
  @Input() loaded: boolean;

  @Output() addressFound: EventEmitter<Address> = new EventEmitter();
  @Output() runSuggestion: EventEmitter<AddressSuggestionParams> = new EventEmitter();
  @Output() runValidation: EventEmitter<AddressLookup> = new EventEmitter();

  mask = postalCodeMask;

  ngAfterViewChecked(): void {
    this.addressFormGroup.setAsyncValidators((formControl) => this.getSuggestion(formControl));
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

  getSuggestion(formGroup: AbstractControl): Observable<any> {
    const postalCodeControl = formGroup.get('postalCode');
    const houseNumberControl = formGroup.get('houseNumber');
    if (!postalCodeControl.valid || !houseNumberControl.valid) {
      return Observable.of({ address: true });
    }
    this.runSuggestion.emit({
      zipcode: postalCodeControl.value,
      house_number: houseNumberControl.value
    });

    return this.asyncValidator;
  }

  validateAddress(address: AddressLookup) {
    this.runValidation.emit({
      postalCode: address.postalCode,
      houseNumber: address.houseNumber,
      houseNumberExtension: address.houseNumberExtension
    });
  }

  onHouseNumberExtensionChange() {
    const postalCodeControl = this.addressFormGroup.get('postalCode');
    const houseNumberControl = this.addressFormGroup.get('houseNumber');
    const houseNumberExtension = this.addressFormGroup.get('houseNumberExtension');
    this.runValidation.emit({
      postalCode: postalCodeControl.value,
      houseNumber: houseNumberControl.value,
      houseNumberExtension: houseNumberExtension.value
    });
  }
}
