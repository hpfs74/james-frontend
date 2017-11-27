import { Component, Input, Output, OnInit, AfterViewChecked, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormControlOptions } from '@knx/form-control';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as fromAddress from '../reducers';
import * as address from '../actions/address';
import * as suggestion from '../actions/suggestion';

import { AddressComponent } from '../components/address.component';
import { AddressForm } from '../components/address.form';
import { AddressLookup, Address, AddressSuggestionParams } from '../models';

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
      [addressPreview]="addressPreview$ | async"
      [loading]="loading$ | async"
      [loaded]="loaded$ | async"
      (onAddressChange)="addressChange($event)"
      (onHouseNumberExtensionChange)="getAddress($event)">
    </knx-address>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressLookupComponent implements OnInit, AfterViewChecked {
  @Input() addressForm: AddressForm;
  @Output() addressFound: EventEmitter<Address> = new EventEmitter();

  addressPreview$: Observable<string>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store$: Store<fromAddress.State>) {}

  ngAfterViewChecked() {
    // Validator is bound here instead of inside AddressComponent due to an issue with asyncValidator
    // getting stuck in pending state.
    // @see https://github.com/angular/angular/issues/13200
    this.addressForm.formGroup.setAsyncValidators((formControl) => this.validateAddressAsync(formControl));
  }

  ngOnInit() {
    this.suggestionSubscriptions();
    this.addressPreview$ = this.store$.select(fromAddress.getAddressFullname);
    this.loaded$ = this.store$.select(fromAddress.getAddressLoaded);

    const addressLoading$ = this.store$.select(fromAddress.getAddressLoading);
    const suggestionLoading$ = this.store$.select(fromAddress.getSuggestionLoading);

    this.loading$ = Observable.combineLatest(addressLoading$, suggestionLoading$)
      .map((combined) => combined[0] || combined[1]);
  }

  addressChange(value: AddressLookup) {
    this.store$.dispatch(new suggestion.GetAddressSuggestion({
      zipcode: value.postalCode,
      house_number: value.houseNumber
    }));
  }

  getAddress(value: AddressLookup) {
    if (value.postalCode && value.houseNumber) {
      this.store$.dispatch(new address.GetAddress({
        postalCode: value.postalCode,
        houseNumber: value.houseNumber,
        houseNumberExtension: value.houseNumberExtension
      }));
    }
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
          this.getAddress({
            postalCode: this.addressForm.formGroup.get('postalCode').value,
            houseNumber: this.addressForm.formGroup.get('houseNumber').value,
            houseNumberExtension: ''
          });
        }
      } else if (!state.loading && state.error && !state.suggestion) {
        this.getAddress({
          postalCode: this.addressForm.formGroup.get('postalCode').value,
          houseNumber: this.addressForm.formGroup.get('houseNumber').value
        });
      }
    });
  }

  validateAddressAsync(formGroup: AbstractControl): Observable<any> {
    const debounceTime = 500;

    return Observable.timer(debounceTime).switchMap(() => {
      const postalCodeControl = formGroup.get('postalCode');
      const houseNumberControl = formGroup.get('houseNumber');
      const houseNumberExtensionControl = formGroup.get('houseNumberExtension');
      const error = { address: true };

      if (!postalCodeControl.valid || !houseNumberControl.valid || houseNumberExtensionControl.disabled) {
        return new Observable(obs => obs.next(error));
      }

      const address$ = this.store$.select(fromAddress.getAddress);
      const suggestion$ = this.store$.select(fromAddress.getSuggestion);

      return Observable.combineLatest(address$, suggestion$)
        .map((combined) => {
          const address = combined[0];
          const suggestions = combined[1];

          if (address) {
            this.addressFound.emit(address);
            return null;
          } else if ( !address && !suggestions.suggestion) {
            return error;
          }
        }, err => error);
    });
  }
}
