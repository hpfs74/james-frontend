import { Component, Input, Output, OnInit, AfterViewChecked, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromAddress from '../reducers';
import * as address from '../actions/address';
import * as suggestion from '../actions/suggestion';

import { AddressComponent } from '../components/address.component';
import { AddressForm } from '../components/address.form';
import { AddressLookup, Address, AddressSuggestionParams } from '../models';
import { FormControlOptions } from '@cx/form';

export interface HouseExtensionItem {
  label: string;
  value: string;
}
export interface HouseNumberExtensionOptions extends FormControlOptions {
  items: HouseExtensionItem[];
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

export const DEFAULT_OPTIONS: HouseNumberExtensionOptions = {
  items: [],
  placeholder: 'Toevoeging',
  label: 'Toevoeging',
  disabled: true
};
@Component({
  selector: 'knx-address-lookup',
  template: `
    <knx-address
      [addressFormGroup]="addressForm.formGroup"
      [addressFormConfig]="addressForm.formConfig"
      [validationErrors]="addressForm.validationErrors"
      [asyncValidator]="getAddress$"
      [addressPreview]="addressPreview$ | async"
      (runSuggestion)="getAddressSuggestions($event)"
      [loading]="loading$ | async"
      [loaded]="loaded$ | async"
      (runValidation)="runValidation($event)">
    </knx-address>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressLookupComponent implements OnInit {
  @Input() addressForm: AddressForm;
  @Output() addressFound: EventEmitter<Address> = new EventEmitter();
  @ViewChild(AddressComponent) addressComponent: AddressComponent;

  addressPreview$: Observable<string>;
  getAddress$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store$: Store<fromAddress.State>) {}

  ngOnInit() {
    this.suggestionSubscriptions();
    this.addressPreview$ = this.store$.select(fromAddress.getAddressFullname);
    this.loaded$ = this.store$.select(fromAddress.getAddressLoaded);

    const addressLoading$ = this.store$.select(fromAddress.getAddressLoading);
    const suggestionLoading$ = this.store$.select(fromAddress.getSuggestionLoading);

    this.loading$ = Observable.combineLatest(addressLoading$, suggestionLoading$)
      .map((combined) => combined[0] || combined[1]);

    this.getAddress$ = this.store$.select(fromAddress.getAddress)
    .map((address) => {
      if (address) {
        this.addressFound.emit(address);
      }
      return address ? null : { address: true };
    });
  }

  suggestionSubscriptions() {
    this.store$.select(fromAddress.getSuggestion).subscribe(state => {
      this.addressForm.formConfig.houseNumberExtension.inputOptions.items = [];
      this.addressForm.formConfig.houseNumberExtension.inputOptions.disabled = true;
      if (!state.error && state.suggestion) {
        state.suggestion.additions.forEach(addition => {
          this.addressForm.formConfig.houseNumberExtension.inputOptions.items.push(<HouseExtensionItem>{
            label: addition,
            value: addition
          });
        });
        if (this.addressForm.formConfig.houseNumberExtension.inputOptions.items.length > 0) {
          this.addressForm.formConfig.houseNumberExtension.inputOptions.disabled = false;
        }
        if (state.suggestion.additions[0] === '') {
          this.runValidationWithFormValues();
        }
      } else if (!state.loading && state.error && !state.suggestion) {
        this.runValidationWithFormValues();
      }
    });
  }

  getAddressSuggestions(value: AddressSuggestionParams) {
    this.store$.dispatch(new suggestion.GetAddressSuggestion({
      zipcode: value.zipcode,
      house_number: value.house_number
    }));
  }

  runValidationWithFormValues() {
    if (this.addressForm.formGroup) {
      let address: AddressLookup = {
        houseNumber: this.addressForm.formGroup.get('houseNumber').value,
        postalCode: this.addressForm.formGroup.get('postalCode').value,
        houseNumberExtension: this.addressForm.formGroup.get('houseNumberExtension').value
      };
      this.runValidation(address);
    }
  }

  runValidation(value: AddressLookup) {
    this.store$.dispatch(new address.GetAddress(value));
  }
}
