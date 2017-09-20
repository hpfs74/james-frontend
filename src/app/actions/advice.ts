import { Action } from '@ngrx/store';
import { InsuranceAdvice } from '../models/insurance-advice';
import { CarInsurance } from '../car/models/car-insurance';

export const ADD_ADVICE =             '[Advice] Add';
export const UPDATE_ADVICE =          '[Advice] Update';
export const REMOVE_ADVICE =          '[Advice] Remove';
export const SELECT_ADVICE =          '[Advice] Select';

export const SET_INSURANCE = '[Advice] Set Insurance';
export const REMOVE_INSURANCE = '[Advice] Remove Insurance';


/**
 * Advice Actions
 */
export class AddAction implements Action {
  readonly type = ADD_ADVICE;

  constructor(public payload: any) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE_ADVICE;

  constructor(public payload: any) {}
}

export class RemoveAction implements Action {
  readonly type = REMOVE_ADVICE;

  constructor(public payload: any) {}
}

export class SelectAction implements Action {
  readonly type = SELECT_ADVICE;

  constructor(public payload: any) {}
}

export class SetInsuranceAction implements Action {
  readonly type = SET_INSURANCE;

  constructor(public payload: InsuranceAdvice | CarInsurance) {}
}

export class RemoveInsuranceAction implements Action {
  readonly type = REMOVE_INSURANCE;
}

export type All
  = AddAction
  | UpdateAction
  | RemoveAction
  | SelectAction
  | SetInsuranceAction
  | RemoveInsuranceAction;

