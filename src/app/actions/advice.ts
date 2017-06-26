import { Action } from '@ngrx/store';

export const ADD_ADVICE =     '[Advice] Add';
export const UPDATE_ADVICE =  '[Advice] Update';
export const REMOVE_ADVICE =  '[Advice] Remove';
export const SELECT_ADVICE =  '[Advice] Select';

/**
 * Advice Actions
 */
export class AddAction implements Action {
  readonly type = ADD_ADVICE;

  constructor(public payload: any) { }
}

export class UpdateAction implements Action {
  readonly type = UPDATE_ADVICE;

  constructor(public payload: any) { }
}

export class RemoveAction implements Action {
  readonly type = REMOVE_ADVICE;

  constructor(public payload: any) { }
}

export class SelectAction implements Action {
  readonly type = SELECT_ADVICE;

  constructor(public payload: any) { }
}

export type Actions
  = AddAction
  | UpdateAction
  | RemoveAction
  | SelectAction;

