import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';

import { AddressService } from '../services/address.service';
import { Address, AddressLookup } from '../models';
import * as address from '../actions/address';

@Injectable()
export class AddressEffects {

  addressDebounce = 500;

  @Effect()
  loadAddressInfo$: Observable<Action> = this.actions$
    .ofType(address.GET_ADDRESS_REQUEST)
    .map((action: address.GetAddress) => action.payload)
    .debounceTime(this.addressDebounce) // prevent lookup on each address input keyup event
    .switchMap((payload: AddressLookup) =>
      this.addressService.lookupAddress(payload.postalCode, payload.houseNumber, payload.houseNumberExtension)
        .map((res: Address) => new address.GetAddressSuccess(res))
        .catch(error => Observable.of(new address.GetAddressFailure(error))));

  constructor(private actions$: Actions, private addressService: AddressService) {}
}
