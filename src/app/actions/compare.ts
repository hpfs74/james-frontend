import { Action } from '@ngrx/store';

export const LOAD_COMPARE =            '[Compare] Load';
export const LOAD_COMPARE_SUCCESS =    '[Compare] Load Success';
export const LOAD_COMPARE_FAIL =       '[Compare] Load Fail';

/**
 * Add Compare Insurance Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD_COMPARE;

  constructor(public payload: any) { }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_COMPARE_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_COMPARE_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;

