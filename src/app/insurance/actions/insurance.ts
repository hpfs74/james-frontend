import { Action } from '@ngrx/store';
import { Insurance } from '../models/insurance';

export const ADD_INSURANCE =                        '[Insurances] Add Insurance';
export const ADD_INSURANCE_SUCCESS =                '[Insurances] Add Insurance Success';
export const ADD_INSURANCE_FAILURE =                 '[Insurances] Add Insurance Failure';

export const LOAD =                                 '[Insurances] Load';
export const LOAD_SUCCESS =                         '[Insurances] Load Success';
export const LOAD_FAILURE =                         '[Insurances] Load Failure';

export const GET_SAVED_CAR_INSURANCES =         '[Insurances] Get Insurances';
export const GET_SAVED_CAR_INSURANCES_SUCCESS = '[Insurances] Get Insurances Success';
export const GET_SAVED_CAR_INSURANCES_FAILURE = '[Insurances] Get Insurances Failure';
export const GET_SAVED_CAR_INSURANCES_ANONYMOUS = '[Insurances] Get Insurances Anonymous';


export class AddInsuranceAction implements Action {
  readonly type = ADD_INSURANCE;

  constructor(public payload: Insurance) { }
}

export class AddInsuranceSuccess implements Action {
  readonly type = ADD_INSURANCE_SUCCESS;

  constructor(public payload: Insurance) { }
}

export class AddInsuranceFail implements Action {
  readonly type = ADD_INSURANCE_FAILURE;

  constructor(public payload: Insurance) { }
}

export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Insurance[]) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAILURE;

  constructor(public payload: any) { }
}

export class GetSavedCarInsurances implements Action {
  readonly type = GET_SAVED_CAR_INSURANCES;
}

export class GetSavedCarInsurancesSuccess implements Action {
  readonly type = GET_SAVED_CAR_INSURANCES_SUCCESS;

  constructor(public payload: any) {}
}

export class GetSavedCarInsurancesFailure implements Action {
  readonly type = GET_SAVED_CAR_INSURANCES_FAILURE;

  constructor(public payload: any) {}
}

export type All
  = AddInsuranceAction
  | AddInsuranceSuccess
  | AddInsuranceFail
  | Load
  | LoadSuccess
  | LoadFail
  | GetSavedCarInsurances
  | GetSavedCarInsurancesSuccess
  | GetSavedCarInsurancesFailure;

