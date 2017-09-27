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

  @Output() addressFound: EventEmitter<Address> = new EventEmitter();
  @Output() runValidation: EventEmitter<AddressLookup> = new EventEmitter();

  mask = postalCodeMask;

  ngAfterViewChecked(): void {
    this.addressFormGroup.setAsyncValidators((formControl) => this.validateAddress(formControl));
  }

  public getErrors(): Array<string> {
    if (this.addressFormGroup.errors) {
      return Object
        .keys(this.addressFormGroup.errors)
        .map(error => this.getErrorMessage(error));
    }
    return null;
  }

  public getErrorMessage(errorCode: string): string {
    if (this.validationErrors && this.validationErrors[errorCode]) {
      const errorMessage = this.validationErrors[errorCode];

      if (typeof errorMessage === 'string') {
        return errorMessage;
      } else {
        return errorMessage(this.validationErrors[errorCode]);
      }
    }
  }

  validateAddress(formGroup: AbstractControl): Observable<any> {
    const postalCode = formGroup.get('postalCode').value;
    const houseNumber = formGroup.get('houseNumber').value;
    const houseNumberExtension = formGroup.get('houseNumberExtension').value;

    if (!formGroup.get('postalCode').valid || !formGroup.get('houseNumber').valid) {
      return Observable.of({ address: true });
    }

    this.runValidation.emit({
      postalCode: postalCode,
      houseNumber: houseNumber
    });
    // this.store$.dispatch(new address.GetAddress({
    //   postalCode: postalCode,
    //   houseNumber: houseNumber
    // }));

    return this.asyncValidator;
    // return this.store$.select(fromAddress.getAddress)
    //   .map((address) => {
    //     if (address) {
    //       this.addressFound.emit(address);
    //     }
    //     return address ? null : { address: true };
    //   });
  }
}
