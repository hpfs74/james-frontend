import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Options as InputOptions } from '../../../../node_modules/@cx/input/src/cx-input.options';
import * as InputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';
import { FormValidationErrors } from '../../../../node_modules/@cx/form';

import { Address } from '../../models/address';

@Component({
  selector: 'ki-address-lookup',
  templateUrl: './address-lookup.component.html'
})
export class AddressLookupComponent implements OnInit {
  @Input() address: Address;
  @Input() showAddress: boolean = false;
  @Input() addressFormGroup: any;

  public inputMasks = InputMasks;
  public validationErrors;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    return;
  }
}
