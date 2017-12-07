import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Wizard] Go';
export const BACK = '[Wizard] Back';
export const FORWARD = '[Wizard] Forward';
export const ERROR = '[Wizard] Error';

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

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: any) {}
}

export type All
  = Go
  | Back
  | Forward
  | Error;
