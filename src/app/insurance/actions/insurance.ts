import { Action } from '@ngrx/store';
import { Insurance } from '../models/insurance';

export const ADD_INSURANCE =                        '[Insurances] Add Insurance';
export const ADD_INSURANCE_SUCCESS =                '[Insurances] Add Insurance Success';
export const ADD_INSURANCE_FAILURE =                 '[Insurances] Add Insurance Failure';

export const LOAD =                                 '[Insurances] Load';
export const LOAD_SUCCESS =                         '[Insurances] Load Success';
export const LOAD_FAILURE =                         '[Insurances] Load Failure';

export const GET_PURCHASED_CAR_INSURANCES =         '[Insurances] Get Insurances';
export const GET_PURCHASED_CAR_INSURANCES_SUCCESS = '[Insurances] Get Insurances Success';

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
  readonly type = ADD_INSURANCE_FAILURE;

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
  readonly type = LOAD_FAILURE;

  constructor(public payload: any) { }
}

export class GetPurchasedCarInsurancesAction implements Action {
  readonly type = GET_PURCHASED_CAR_INSURANCES;

  constructor(public payload: any) {}
}

export class GetPurchasedCarInsurancesSuccessAction implements Action {
  readonly type = GET_PURCHASED_CAR_INSURANCES_SUCCESS;

  constructor(public payload: any) {}
}

export type All
  = AddInsuranceAction
  | AddInsuranceSuccessAction
  | AddInsuranceFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | GetPurchasedCarInsurancesAction
  | GetPurchasedCarInsurancesSuccessAction;

