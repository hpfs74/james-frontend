import { Action } from '@ngrx/store';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';

export const GET_INFO_REQUEST =     '[HouseHoldInsuredAmount] Info';
export const GET_INFO_SUCCESS =     '[HouseHoldInsuredAmount] Info Success';
export const GET_INFO_FAILURE =     '[HouseHoldInsuredAmount] Info Failure';


export class GetInfo implements Action {
  readonly type = GET_INFO_REQUEST;

  constructor(public payload: HouseHoldAmountRequest) { }
}

export class GetInfoComplete implements Action {
  readonly type = GET_INFO_SUCCESS ;

  constructor(public payload: HouseHoldAmountResponse) { }
}

export class GetInfoFailure implements Action {
  readonly type = GET_INFO_FAILURE;

  constructor(public payload: any) { }
}

export type All
  = GetInfo
  | GetInfoComplete
  | GetInfoFailure;
