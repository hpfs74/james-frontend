import { Action } from '@ngrx/store';

export const LOAD_CAR_COMPARE =            '[Compare Car] Load';
export const LOAD_CAR_COMPARE_SUCCESS =    '[Compare Car] Load Success';
export const LOAD_CAR_COMPARE_FAILURE =    '[Compare Car] Load Failure';
export const RESET_STATE =                 '[Compare Car] Reset State';

/**
 * Add Compare Insurance Actions
 */
export class LoadCarAction implements Action {
  readonly type = LOAD_CAR_COMPARE;

  constructor(public payload: any) { }
}

export class LoadCarSuccessAction implements Action {
  readonly type = LOAD_CAR_COMPARE_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadCarFailAction implements Action {
  readonly type = LOAD_CAR_COMPARE_FAILURE;

  constructor(public payload: any) { }
}

export class CarCompareResetStateAction implements Action {
  readonly type = RESET_STATE;
}

export type All
  = LoadCarAction
  | LoadCarSuccessAction
  | LoadCarFailAction
  | CarCompareResetStateAction;

