import { Component, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';

import { Options as InputOptions } from '../../../../node_modules/@cx/input/src/cx-input.options';
import { postalCodeMask } from '../../../../node_modules/@cx/input/src/cx-input.masks';
import { FormValidationErrors } from '../../../../node_modules/@cx/form';

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

  public postalCodeMask = postalCodeMask;

  constructor(
    private addressService: AddressLookupService,
    private geolocationService: GeolocationService) {
  }

  ngAfterViewChecked(): void {
    this.addressFormGroup.setValidators( (formControl) => this.validateAddress(formControl, this.addressService));
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

  validateAddress(formGroup: AbstractControl, addressService: AddressLookupService): { [key: string]: boolean } {

    let postalCode = formGroup.get('postalCode').value;
    let houseNumber = formGroup.get('houseNumber').value;

    if (!postalCode && !houseNumber) {
      return null;
    }

    if (formGroup.get('postalCode').valid && formGroup.get('houseNumber').valid) {
      let isValid: boolean = false;

      addressService.lookupAddress(postalCode, houseNumber)
        .subscribe(res => {
          isValid = !!(res.street && res.city);
          this.addressFound.emit(res);
        }, err => {
          isValid = false; // cannot validate: server error?
        });
      return isValid ? null : { address: true };
    }
  }

  //TODO:
  // Implement Google Maps API/preview
  getLocationAddress() {
    this.geolocationService.getCurrentPosition().subscribe(position => {
      throw Error('Not implemented');
    });
  }
}
