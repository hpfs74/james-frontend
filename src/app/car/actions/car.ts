import { Action } from '@ngrx/store';
import { Car } from '../models/car';

export const GET_INFO_REQUEST =     '[Car] Info';
export const GET_INFO_SUCCESS =     '[Car] Info Success';
export const GET_INFO_FAILURE =     '[Car] Info Failure';

export const BUY_REQUEST =          '[Car] Buy';
export const BUY_SUCCESS =          '[Car] Buy Success';
export const BUY_FAILURE =          '[Car] Buy Failure';
export const RESET_CAR_STATE =      '[Car] Reset State';

export class GetInfoAction implements Action {
  readonly type = GET_INFO_REQUEST;

  constructor(public payload: string) { }
}

export class GetInfoCompleteAction implements Action {
  readonly type = GET_INFO_SUCCESS ;

  constructor(public payload: Car) { }
}

export class GetInfoFailureAction implements Action {
  readonly type = GET_INFO_FAILURE;

  constructor(public payload: any) { }
}

export class BuyAction implements Action {
  readonly type = BUY_REQUEST;

  constructor(public payload: any) { }
}

export class BuyCompleteAction implements Action {
  readonly type = BUY_SUCCESS;

  constructor(public payload: any) { }
}

export class BuyFailureAction implements Action {
  readonly type = BUY_FAILURE;

  constructor(public payload: any) { }
}

export class CarResetStateAction implements Action {
  readonly type = RESET_CAR_STATE;
}


export type All
  = GetInfoAction
  | GetInfoCompleteAction
  | GetInfoFailureAction
  | BuyAction
  | BuyCompleteAction
  | BuyFailureAction
  | CarResetStateAction;
