import { Action } from '@ngrx/store';

export const OPEN_MODAL = '[Overlay Modal] Open';
export const CLOSE_MODAL = '[Overlay Modal] Close';
export const SET_DATA = '[Overlay Modal] Set Data';

export class Open implements Action {
  readonly type = OPEN_MODAL;
}

export class SetData implements Action {
  readonly type = SET_DATA;

  constructor(public payload: string) {}
}

export class Close implements Action {
  readonly type = CLOSE_MODAL;
}

export type All
  = Open
  | Close
  | SetData;
