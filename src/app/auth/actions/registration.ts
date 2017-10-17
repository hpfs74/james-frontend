
import { Action } from '@ngrx/store';
import { AuthToken, Authenticate, RegistrationPayload } from '../models/auth';

export const REGISTER = '[Register] Create';
export const REGISTER_SUCCESS = '[Register] Register Success';
export const REGISTER_FAILURE = '[Register] Register Failure';
export const REGISTER_REDIRECT = '[Register] Register Redirect';


export class Register implements Action {
  readonly type = REGISTER;

  constructor(public registration: RegistrationPayload) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: any) {}
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;

  constructor(public payload: any) {}
}

export class RegisterRedirect implements Action {
  readonly type = REGISTER_REDIRECT;
}

export type Actions =
  | Register
  | RegisterSuccess
  | RegisterFailure
  | RegisterRedirect;
