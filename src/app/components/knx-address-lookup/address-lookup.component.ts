import { Component, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';

import { Options as InputOptions } from '../../../../node_modules/@cx/input/src/cx-input.options';
import { postalCodeMask } from '../../../../node_modules/@cx/input/src/cx-input.masks';
import { FormValidationErrors } from '../../../../node_modules/@cx/form';

import { Address } from '../../models/address';
import { AddressLookupService } from './address-lookup.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'knx-address-lookup',
  templateUrl: './address-lookup.component.html',
  providers: [AddressLookupService, GeolocationService]
})
export class AddressLookupComponent implements AfterViewChecked {
  @Input() address: Address;
  @Input() showAddress: boolean = true;
  @Input() addressFormGroup: FormGroup;
  @Input() validationErrors: any;

  public postalCodeMask = postalCodeMask;

  constructor(
    private addressService: AddressLookupService,
    private geolocationService: GeolocationService) {
  }

  ngAfterViewChecked(): void {
    this.addressFormGroup.setValidators(this.validateAddress);
  }

  validateAddress(formGroup: AbstractControl): { [key: string]: boolean } {
    let postalCode = formGroup.get('postalCode').value;
    let houseNumber = formGroup.get('houseNumber').value;

    if (!postalCode && !houseNumber) {
      return null;
    }

    if (formGroup.get('postalCode').valid && formGroup.get('houseNumber').valid) {
      // let isValid: boolean = false;
      // this.addressService.lookupAddress(postalCode, houseNumber)
      //   .subscribe(res => {
      //     isValid = !!(res.street && res.city);
      //   }, err => {
      //     isValid = false; // cannot validate: server error?
      //   });

      // test
      let isValid = false;

      return isValid ? null : { address: true };
    }
  }

  //TODO:
  // 1: get postalcode from GeolocationService
  // 2: get address from lookupService
  getLocationAddress() {
    this.geolocationService.getCurrentPosition().subscribe(position => {
      //console.log('Geolocation lookup not implemented');
    });
  }
}
