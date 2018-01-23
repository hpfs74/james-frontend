import { Action } from '@ngrx/store';
import { HouseHoldPremiumRequest, HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';

export const GET_INFO_REQUEST =     '[HouseHoldPremium] Info';
export const GET_INFO_SUCCESS =     '[HouseHoldPremium] Info Success';
export const GET_INFO_FAILURE =     '[HouseHoldPremium] Info Failure';


export class GetInfo implements Action {
  readonly type = GET_INFO_REQUEST;

  constructor(public payload: HouseHoldPremiumRequest) { }
}

export class GetInfoComplete implements Action {
  readonly type = GET_INFO_SUCCESS ;

  constructor(public payload: HouseHoldPremiumResponse) { }
}

export class GetInfoFailure implements Action {
  readonly type = GET_INFO_FAILURE;

  constructor(public payload: any) { }
}

export type All
  = GetInfo
  | GetInfoComplete
  | GetInfoFailure;
