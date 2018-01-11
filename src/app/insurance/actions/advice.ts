import { Action } from '@ngrx/store';
import { InsuranceAdvice } from '../models/insurance-advice';
import { CarInsurance } from '../../car/models/car-insurance';

export const ADD_ADVICE =               '[Advice] Add';
export const UPDATE_ADVICE =            '[Advice] Update';
export const SELECT_ADVICE =            '[Advice] Select';
export const RESET_ADVICE =             '[Advice] Reset';

export const GET_ADVICE =               '[Advice] Get';
export const GET_SUCCESS =              '[Advice] Get Success';
export const GET_FAILURE =              '[Advice] Get Failure';

export const SAVE_LATEST_ADVICE =       '[Advice] Save Latest';
export const SAVE_LATEST_SUCCESS =      '[Advice] Save Latest Success';
export const SAVE_LATEST_FAILURE =      '[Advice] Save Latest Failure';

export const REMOVE_LATEST_INSURANCE_ADVICE =           '[Advice] Remove Latest Advice';
export const REMOVE_LATEST_INSURANCE_ADVICE_SUCCESS =   '[Advice] Remove Latest Advice Success';
export const REMOVE_LATEST_INSURANCE_ADVICE_FAILURE =   '[Advice] Remove Latest Advice Failure';

export const REMOVE_ADVICE =    '[Advice] Remove';

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

export class SaveLatest implements Action {
  readonly type = SAVE_LATEST_ADVICE;

  constructor(public payload: any) {}
}

export class SaveLatestSuccess implements Action {
  readonly type = SAVE_LATEST_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveLatestFailure implements Action {
  readonly type = SAVE_LATEST_FAILURE;

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

/* Actions for insurance_advice */
export class RemoveLatestInsuranceAdvice implements Action {
  readonly type = REMOVE_LATEST_INSURANCE_ADVICE;
}

export class RemoveLatestInsuranceAdviceSuccess implements Action {
  readonly type = REMOVE_LATEST_INSURANCE_ADVICE_SUCCESS;

  constructor(public payload: any) {}
}

export class RemoveLatestInsuranceAdviceFailure implements Action {
  readonly type = REMOVE_LATEST_INSURANCE_ADVICE_FAILURE;

  constructor(public payload: any) {}
}

export type All
  = Add
  | Get
  | GetSuccess
  | GetFailure
  | SaveLatest
  | SaveLatestSuccess
  | SaveLatestFailure
  | Update
  | Remove
  | RemoveLatestInsuranceAdvice
  | RemoveLatestInsuranceAdviceSuccess
  | RemoveLatestInsuranceAdviceFailure
  | Select
  | SetInsurance
  | RemoveInsurance
  | Reset;

