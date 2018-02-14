import { Action } from '@ngrx/store';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';

export const START = '[HouseHold] Start';
export const GET_INFO = '[HouseHold] Info';
export const UPDATE_INFO = '[HouseHold] Update';
export const UPDATE_ADVICE = '[HouseHold] Update Advice';

export class Get implements Action {
  readonly type = GET_INFO;
}

export class Update implements Action {
  readonly type = UPDATE_INFO;

  constructor(public payload: any) {
  }
}

export class UpdateAdvice implements Action {
  readonly type = UPDATE_ADVICE;

  constructor(public payload: CalculatedPremium) {
  }
}

export class Start implements Action {
  readonly type = START;
}

export type All
  = Get
  | Update
  | UpdateAdvice
  | Start;
