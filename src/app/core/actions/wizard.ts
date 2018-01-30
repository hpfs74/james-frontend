import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Wizard] Go';
export const BACK = '[Wizard] Back';
export const FORWARD = '[Wizard] Forward';
export const ERROR = '[Wizard] Error';
export const RESET_ERROR = '[Wizard] Reset';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: { stepIndex: number; }) { }
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class ResetError implements Action {
  readonly type = RESET_ERROR;
}

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: any) {}
}

export type All
  = Go
  | Back
  | Forward
  | ResetError
  | Error;
