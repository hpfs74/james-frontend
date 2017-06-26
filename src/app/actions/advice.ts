import { Action } from '@ngrx/store';

export const ADD_ADVICE =     '[Advice] Add';
export const REMOVE_ADVICE =  '[Advice] Remove';

/**
 * Advice Actions
 */
export class AddAction implements Action {
  readonly type = ADD_ADVICE;

  constructor(public payload: any) { }
}

export class RemoveAction implements Action {
  readonly type = REMOVE_ADVICE;

  constructor(public payload: any) { }
}

export type Actions
  = AddAction
  | RemoveAction;

