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

  public address : string = null;
  public postalCodeMask = postalCodeMask;

  private lookupTimeout;

  constructor(
    private addressService: AddressLookupService,
    private geolocationService: GeolocationService) {
  }

  ngAfterViewChecked(): void {
    // TODO: add
    this.addressFormGroup.setAsyncValidators( (formControl) => this.validateAddress(formControl, this.addressService));
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

  validateAddress(formGroup: AbstractControl, addressService: AddressLookupService): { [key: string]: any } {
    clearTimeout(this.lookupTimeout);
    return new Promise((resolve, reject) => {
      this.lookupTimeout = setTimeout(() => {
        let postalCode = formGroup.get('postalCode').value;
        let houseNumber = formGroup.get('houseNumber').value;
        let houseNumberExtension = formGroup.get('houseNumberExtension').value;

        if (!postalCode && !houseNumber) {
          resolve(null);
        }

        if (formGroup.get('postalCode').valid && formGroup.get('houseNumber').valid) {
          let isValid: boolean = false;

          addressService.lookupAddress(postalCode, houseNumber, houseNumberExtension)
            .subscribe((data) => {
              let res = <Address>data.json();

              isValid = !!(res.street && res.city);
              this.addressFound.emit(res);

              resolve(isValid ? null : { address: true });

            }, err => {
              isValid = false; // cannot validate: server error?
              resolve({ address: true });
            });
        }
      }, 600);
    });
  }

  //TODO:
  // Implement Google Maps API/preview
  getLocationAddress() {
    this.geolocationService.getCurrentPosition().subscribe(position => {
      throw Error('Not implemented');
    });
  }
}
