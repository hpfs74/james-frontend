import { Action } from '@ngrx/store';
import { Car } from '../models/car';

export const GET_INFO = '[Car] Info';
export const GET_INFO_COMPLETE = '[Car] Info Complete';


export class GetInfoAction implements Action {
  readonly type = GET_INFO;

  constructor(public payload: string) { }
}

export class GetInfoCompleteAction implements Action {
  readonly type = GET_INFO_COMPLETE;

  constructor(public payload: Car) { }
}


export type Actions
  = GetInfoAction
  | GetInfoCompleteAction;
