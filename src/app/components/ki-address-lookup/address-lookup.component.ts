import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Options as InputOptions } from '../../../../node_modules/@cx/input/src/cx-input.options';
import * as InputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';
import { FormValidationErrors } from '../../../../node_modules/@cx/form';

import { Address } from '../../models/address';
import { AddressLookupService } from './address-lookup.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'ki-address-lookup',
  templateUrl: './address-lookup.component.html',
  providers: [AddressLookupService, GeolocationService]
})
export class AddressLookupComponent implements OnInit {
  @Input() address: Address;
  @Input() showAddress: boolean = true;
  @Input() addressFormGroup: FormGroup;

  public inputMasks = InputMasks;
  public validationErrors;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressLookupService,
    private geolocationService: GeolocationService) {
  }

  ngOnInit() {
    this.addressFormGroup.get('postalCode').disable();
    console.log(this.addressFormGroup.get('postalCode').disabled);
  }

  addressBlur(event) {
    let postalCode = this.addressFormGroup.get('postalCode').value;
    let number = this.addressFormGroup.get('addressNumber').value;

    console.log(postalCode);

    if (!postalCode && !number) {
      return;
    }

    if (this.addressFormGroup.get('postalCode').valid && this.addressFormGroup.get('addressNumber').valid) {
      this.addressService.lookupAddress(postalCode, number)
        .subscribe(res => {
          console.log('postal code lookup response', res);
          // Lookup OK
          this.addressFormGroup.get('addressStreet').disable();
          this.addressFormGroup.get('addressCity').disable();
          this.addressFormGroup.get('addressStreet').setValue(res.street);
          this.addressFormGroup.get('addressCity').setValue(res.city);

          this.showAddress = true;
        }, err => {
          console.log('postal code ERROR', err);
          this.addressFormGroup.get('addressStreet').enable();
          this.addressFormGroup.get('addressCity').enable();
          this.addressFormGroup.get('addressStreet').setValue('');
          this.addressFormGroup.get('addressCity').setValue('');
          this.showAddress = true;
        });
    } else {
      console.log('Invalid data for lookup');
    }
  }

  //TODO:
  // 1: get postalcode from GeolocationService
  // 2: get address from lookupService
  getLocationAddress() {
    this.geolocationService.getCurrentPosition().subscribe(position => {
      console.log(position);
    });
  }
}
