import { Action } from '@ngrx/store';
import { Address, AddressLookup } from '../models';

export const GET_ADDRESS_REQUEST = '[Address] Address Lookup';
export const GET_ADDRESS_SUCCESS = '[Address] Address Lookup Success';
export const GET_ADDRESS_FAILURE = '[Address] Address Lookup Failure';
export const CLEAR_ADDRESS = '[Address] Clear Address';

export class GetAddress implements Action {
  readonly type = GET_ADDRESS_REQUEST;

  constructor(public payload: AddressLookup) {}
}

export class GetAddressSuccess implements Action {
  readonly type = GET_ADDRESS_SUCCESS;

  constructor(public payload: Address) {}
}

export class GetAddressFailure implements Action {
  readonly type = GET_ADDRESS_FAILURE;

  constructor(public payload: any) {}
}

export class ClearAddress implements Action {
  readonly type = CLEAR_ADDRESS;
}


export type All
= GetAddress
| GetAddressSuccess
| ClearAddress
| GetAddressFailure;
