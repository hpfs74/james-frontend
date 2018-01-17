import { Action } from '@ngrx/store';
import { HouseDataRequest, HouseDataResponse } from '@app/house-hold/models/house-data';

export const GET_INFO_REQUEST =     '[HouseData] Info';
export const GET_INFO_SUCCESS =     '[HouseData] Info Success';
export const GET_INFO_FAILURE =     '[HouseData] Info Failure';


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

export type All
  = GetInfo
  | GetInfoComplete
  | GetInfoFailure;
