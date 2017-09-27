import { Component, Input, Output, OnInit, AfterViewChecked, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromAddress from '../reducers';
import * as address from '../actions/address';

import { AddressComponent } from '../components/address.component';
import { postalCodeMask } from '../../utils/base-form.utils';
import { AddressLookup, Address } from '../models';

@Component({
  selector: 'knx-address-lookup',
  template: `
    <knx-address
      [addressFormGroup]="addressFormGroup"
      [validationErrors]="validationErrors"
      [asyncValidator]="getAddress$"
      [addressPreview]="addressPreview$ | async"
      (runValidation)="validateAddress($event)">
    </knx-address>
  `
})
export class AddressLookupComponent implements OnInit {
  @Input() addressFormGroup: FormGroup;
  @Input() validationErrors: any;

  @Output() addressFound: EventEmitter<Address> = new EventEmitter();

  addressPreview$: Observable<string>;
  getAddress$: Observable<any>;

  mask = postalCodeMask;

  constructor(private store$: Store<fromAddress.State>) { }

  ngOnInit() {
    this.addressPreview$ = this.store$.select(fromAddress.getAddressFullname);
    this.getAddress$ = this.store$.select(fromAddress.getAddress)
    .map((address) => {
      if (address) {
        this.addressFound.emit(address);
      }
      return address ? null : { address: true };
    });
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

  validateAddress(value: AddressLookup) {
    this.store$.dispatch(new address.GetAddress({
      postalCode: value.postalCode,
      houseNumber: value.houseNumber
    }));
  }
}
