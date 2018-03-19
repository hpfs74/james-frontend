import { Action } from '@ngrx/store';
import { HouseDataRequest, HouseDataResponse } from '@app/house/models/house-data';
import { Address } from '@app/address/models';

export const GET_INFO_REQUEST =     '[HouseData] Info Request';
export const GET_INFO_SUCCESS =     '[HouseData] Info Success';
export const GET_INFO_FAILURE =     '[HouseData] Info Failure';
export const UPDATE_ADDRESS   =     '[HouseData] Update address';


export class GetInfo implements Action {
  readonly type = GET_INFO_REQUEST;

  constructor(public payload: HouseDataRequest) { }
}

export class GetInfoComplete implements Action {
  readonly type = GET_INFO_SUCCESS ;

  constructor(public payload: HouseDataResponse) { }
}

export class GetInfoFailure implements Action {
  readonly type = GET_INFO_FAILURE;

  constructor(public payload: any) { }
}

export class UpdateAddress implements Action {
  readonly type = UPDATE_ADDRESS;

  constructor(public payload: Address) { }
}

export type All
  = GetInfo
  | GetInfoComplete
  | GetInfoFailure
  | UpdateAddress;
