import { Component, Input, Output, OnInit, AfterViewChecked, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromAddress from '../reducers';
import * as address from '../actions/address';

import { AddressComponent } from '../components/address.component';
import { AddressForm } from '../components/address.form';
import { AddressLookup, Address } from '../models';

@Component({
  selector: 'knx-address-lookup',
  template: `
    <knx-address
      [addressFormGroup]="addressForm.formGroup"
      [validationErrors]="addressForm.validationErrors"
      [asyncValidator]="getAddress$"
      [addressPreview]="addressPreview$ | async"
      [isLoading]="loading$ | async"
      (runValidation)="validateAddress($event)">
    </knx-address>
  `
})
export class AddressLookupComponent implements OnInit {
  @Input() addressForm: AddressForm;
  @Output() addressFound: EventEmitter<Address> = new EventEmitter();

  addressPreview$: Observable<string>;
  getAddress$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store$: Store<fromAddress.State>) {}

  ngOnInit() {
    this.addressPreview$ = this.store$.select(fromAddress.getAddressFullname);
    this.loading$ = this.store$.select(fromAddress.getAddressLoading);

    this.getAddress$ = this.store$.select(fromAddress.getAddress)
    .map((address) => {
      if (address) {
        this.addressFound.emit(address);
      }
      return address ? null : { address: true };
    });
  }

  validateAddress(value: AddressLookup) {
    this.store$.dispatch(new address.GetAddress({
      postalCode: value.postalCode,
      houseNumber: value.houseNumber
    }));
  }
}
