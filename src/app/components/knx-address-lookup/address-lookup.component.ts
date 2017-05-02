import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

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
export class AddressLookupComponent {
  @Input() address: Address;
  @Input() showAddress: boolean = true;
  @Input() addressFormGroup: FormGroup;
  @Input() validationErrors: any;

  public postalCodeMask = postalCodeMask;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressLookupService,
    private geolocationService: GeolocationService) {
  }

  addressBlur(event) {
    let postalCode = this.addressFormGroup.get('postalCode').value;
    let number = this.addressFormGroup.get('houseNumber').value;

    if (!postalCode && !number) {
      return;
    }

    if (this.addressFormGroup.get('postalCode').valid && this.addressFormGroup.get('houseNumber').valid) {
      this.addressService.lookupAddress(postalCode, number)
        .subscribe(res => {
          // Lookup OK
          this.addressFormGroup.get('street').disable();
          this.addressFormGroup.get('city').disable();
          this.addressFormGroup.get('street').setValue(res.street);
          this.addressFormGroup.get('city').setValue(res.city);

          this.showAddress = true;
        }, err => {
          this.addressFormGroup.get('street').enable();
          this.addressFormGroup.get('city').enable();
          this.addressFormGroup.get('street').setValue('');
          this.addressFormGroup.get('city').setValue('');
          this.showAddress = true;
        });
    }
  }

  //TODO:
  // 1: get postalcode from GeolocationService
  // 2: get address from lookupService
  getLocationAddress() {
    this.geolocationService.getCurrentPosition().subscribe(position => {
        //
    });
  }
}
