import { Action } from '@ngrx/store';

export const ADD_MESSAGE =      '[Assistant] Add Message';
export const CLEAR_MESSAGES =   '[Assistant] Clear';

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: string) { }
}

export class ClearAction implements Action {
  readonly type = CLEAR_MESSAGES;
}

export type All
  = AddMessageAction
  | ClearAction;
