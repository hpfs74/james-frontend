import { Action } from '@ngrx/store';
import { Car } from '../models/car';

export const GET_INFO_REQUEST =     '[Car] Info';
export const GET_INFO_SUCCESS =     '[Car] Info Success';
export const GET_INFO_FAIL =        '[Car] Info Fail';

export class GetInfoAction implements Action {
  readonly type = GET_INFO_REQUEST;

  constructor(public payload: string) { }
}

export class GetInfoCompleteAction implements Action {
  readonly type = GET_INFO_SUCCESS ;

  constructor(public payload: Car) { }
}

export class GetInfoFailAction implements Action {
  readonly type = GET_INFO_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = GetInfoAction
  | GetInfoCompleteAction
  | GetInfoFailAction;
