import { Action } from '@ngrx/store';
import { AssistantConfig, CannedMessageType } from './../models/assistant';

export const ADD_MESSAGE = '[Assistant] Add Message';
export const ADD_CANNED_MESSAGE = '[Assistant] Add Canned Message';
export const CLEAR_MESSAGES = '[Assistant] Clear';

export const LOAD_CONFIG = '[Assistant] Load Config';
export const UPDATE_CONFIG = '[Assistant] Update Config';

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: any) { }
}

export class AddCannedMessage implements Action {
  readonly type = ADD_CANNED_MESSAGE;

  constructor(public payload: any) { }
}

export class ClearAction implements Action {
  readonly type = CLEAR_MESSAGES;
}

export class LoadConfigAction implements Action {
  readonly type = LOAD_CONFIG;

  constructor(public payload: AssistantConfig) {}
}

export class UpdateConfigAction implements Action {
  readonly type = UPDATE_CONFIG;

  constructor(public payload: any) {}
}

export type All
  = AddMessageAction
  | AddCannedMessage
  | ClearAction
  | LoadConfigAction
  | UpdateConfigAction;
