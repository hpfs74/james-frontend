import { Action } from '@ngrx/store';
import { Insurance } from '../models/insurance';

export const ADD_INSURANCE =              '[Insurances] Add Insurance';
export const ADD_INSURANCE_SUCCESS =      '[Insurances] Add Insurance Success';
export const ADD_INSURANCE_FAIL =         '[Insurances] Add Insurance Fail';

export const LOAD =                       '[Insurances] Load';
export const LOAD_SUCCESS =               '[Insurances] Load Success';
export const LOAD_FAIL =                  '[Insurances] Load Fail';


/**
 * Add Insurance Actions
 */
export class AddInsuranceAction implements Action {
  readonly type = ADD_INSURANCE;

  constructor(public payload: Insurance) { }
}

export class AddInsuranceSuccessAction implements Action {
  readonly type = ADD_INSURANCE_SUCCESS;

  constructor(public payload: Insurance) { }
}

export class AddInsuranceFailAction implements Action {
  readonly type = ADD_INSURANCE_FAIL;

  constructor(public payload: Insurance) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Insurance[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = AddInsuranceAction
  | AddInsuranceSuccessAction
  | AddInsuranceFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;

