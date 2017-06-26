import { Component, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { FormControlOptions } from '@cx/form-control';
import { FormValidationErrors } from '@cx/form';

import { postalCodeMask } from '../../utils/base-form.utils';

import { Address } from '../../models/address';
import { AddressLookupService } from './address-lookup.service';
import { GeolocationService } from '../../services';

@Component({
  selector: 'knx-address-lookup',
  templateUrl: './address-lookup.component.html',
  providers: [AddressLookupService, GeolocationService]
})
export class AddressLookupComponent implements AfterViewChecked {
  @Input() addressFormGroup: FormGroup;
  @Input() validationErrors: any;

  @Output() addressFound: EventEmitter<Address> = new EventEmitter();

  public address: string = null;
  public mask = postalCodeMask;
  private lookupTimeout;

  constructor(
    private addressService: AddressLookupService,
    private geolocationService: GeolocationService) {
  }

  ngAfterViewChecked(): void {
    this.addressFormGroup.setAsyncValidators((formControl) => this.validateAddress(formControl, this.addressService));
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

  validateAddress(formGroup: AbstractControl, addressService: AddressLookupService): Promise<any> {
    const timeOut = 200;

    clearTimeout(this.lookupTimeout);

    return new Promise((resolve, reject) => {
      this.lookupTimeout = setTimeout(() => {
        let postalCode = formGroup.get('postalCode').value;
        let houseNumber = formGroup.get('houseNumber').value;
        let houseNumberExtension = formGroup.get('houseNumberExtension').value;

        if (!postalCode && !houseNumber) {
          return resolve(null);
        }

        if (formGroup.get('postalCode').valid && formGroup.get('houseNumber').valid) {
          let isValid: boolean = false;

          addressService.lookupAddress(postalCode, houseNumber, houseNumberExtension)
            .subscribe((data) => {
              let res = <Address>data.json();

              isValid = !!(res.street && res.city);

              this.addressFound.emit(res);
              this.address = `${res.street} in ${res.city}`;

              return resolve(isValid ? null : { address: true });
            }, err => {
              isValid = false; // cannot validate: server error?
              return resolve({ address: true });
            });
        }
      }, timeOut);
    });
  }
}
