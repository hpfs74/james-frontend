import { Action } from '@ngrx/store';
import { HouseHoldData } from '@app/house/models/house-hold-data';

export const GET_INFO    =     '[HouseHold] Info';
export const UPDATE_INFO =     '[HouseHold] Update';


export class Get implements Action {
  readonly type = GET_INFO;
}

export class Update implements Action {
  readonly type = UPDATE_INFO;

  constructor(public payload: HouseHoldData) { }
}

export type All
  = Get
  | Update;
