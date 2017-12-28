import { Action } from '@ngrx/store';
import { Car } from '../models/car';

export const GET_INFO_REQUEST =     '[Car] Info';
export const GET_INFO_SUCCESS =     '[Car] Info Success';
export const GET_INFO_FAILURE =     '[Car] Info Failure';

export const GET_MELDCODE_REQUEST = '[Car] Meldcode';
export const GET_MELDCODE_SUCCESS = '[Car] Meldcode Success';
export const GET_MELDCODE_FAILURE = '[Car] Meldcode Failure';

export const BUY_REQUEST =          '[Car] Buy';
export const BUY_SUCCESS =          '[Car] Buy Success';
export const BUY_FAILURE =          '[Car] Buy Failure';


export class GetInfo implements Action {
  readonly type = GET_INFO_REQUEST;

  constructor(public payload: string) { }
}

export class GetInfoComplete implements Action {
  readonly type = GET_INFO_SUCCESS ;

  constructor(public payload: Car) { }
}

export class GetInfoFailure implements Action {
  readonly type = GET_INFO_FAILURE;

  constructor(public payload: any) { }
}

export class GetMeldcode implements Action {
  readonly type = GET_MELDCODE_REQUEST;

  constructor(public payload: string) { }
}

export class GetMeldcodeComplete implements Action {
  readonly type = GET_MELDCODE_SUCCESS ;

  constructor(public payload: Car) { }
}

export class GetMeldcodeFailure implements Action {
  readonly type = GET_MELDCODE_FAILURE;

  constructor(public payload: any) { }
}

export class Buy implements Action {
  readonly type = BUY_REQUEST;

  constructor(public payload: any) { }
}

export class BuyComplete implements Action {
  readonly type = BUY_SUCCESS;

  constructor(public payload: any) { }
}

export class BuyFailure implements Action {
  readonly type = BUY_FAILURE;

  constructor(public payload: any) { }
}

export type All
  = GetInfo
  | GetInfoComplete
  | GetInfoFailure
  | GetMeldcode
  | GetMeldcodeComplete
  | GetMeldcodeFailure
  | Buy
  | BuyComplete
  | BuyFailure;
