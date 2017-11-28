import { Action } from '@ngrx/store';
import { InsuranceAdvice } from '../models/insurance-advice';
import { CarInsurance } from '../../car/models/car-insurance';

export const ADD_ADVICE =       '[Advice] Add';

export const GET_ADVICE =       '[Advice] Get';
export const GET_SUCCESS =      '[Advice] Get Success';
export const GET_FAILURE =      '[Advice] Get Failure';

export const UPDATE_ADVICE =    '[Advice] Update';
export const REMOVE_ADVICE =    '[Advice] Remove';
export const SELECT_ADVICE =    '[Advice] Select';
export const RESET_ADVICE =     '[Advice] Reset';

export const SET_INSURANCE =    '[Advice] Set Insurance';
export const REMOVE_INSURANCE = '[Advice] Remove Insurance';


/**
 * Advice Actions
 */
export class Add implements Action {
  readonly type = ADD_ADVICE;

  constructor(public payload: any) {}
}

export class Get implements Action {
  readonly type = GET_ADVICE;

  constructor(public payload: any) {}
}

export class GetSuccess implements Action {
  readonly type = GET_SUCCESS;

  constructor(public payload: any) {}
}

export class GetFailure implements Action {
  readonly type = GET_FAILURE;

  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = UPDATE_ADVICE;

  constructor(public payload: any) {}
}

export class Remove implements Action {
  readonly type = REMOVE_ADVICE;

  constructor(public payload: any) {}
}

export class Select implements Action {
  readonly type = SELECT_ADVICE;

  constructor(public payload: any) {}
}

export class Reset implements Action {
  readonly type = RESET_ADVICE;
}

export class SetInsurance implements Action {
  readonly type = SET_INSURANCE;

  constructor(public payload: InsuranceAdvice | CarInsurance) {}
}

export class RemoveInsurance implements Action {
  readonly type = REMOVE_INSURANCE;
}

export type All
  = Add
  | Get
  | GetSuccess
  | GetFailure
  | Update
  | Remove
  | Select
  | SetInsurance
  | RemoveInsurance
  | Reset;

