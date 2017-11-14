
import { Action } from '@ngrx/store';
import { AuthToken, Authenticate, RegistrationPayload } from '../models/auth';

export const REGISTER = '[Register] Create';
export const REGISTER_SUCCESS = '[Register] Register Success';
export const REGISTER_FAILURE = '[Register] Register Failure';
export const REDIRECT = '[Register] Redirect';
export const RESET_STATE = '[Register] Reset State';
export const RESEND_ACTIVATION_EMAIL = '[Register] Resend Activation Email';
export const RESEND_ACTIVATION_EMAIL_SUCCESS = '[Register] Resend Activation Email Success';
export const RESEND_ACTIVATION_EMAIL_FAILURE = '[Register] Resend Activation Email Failure';
export const RESEND_RESET_STATE = '[Register] Resend Reset State';

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

export class Redirect implements Action {
  readonly type = REDIRECT;
}

export class ResetState implements Action {
  readonly type = RESET_STATE;
}

export class ResendActivationEmail implements Action {
  readonly type = RESEND_ACTIVATION_EMAIL;

  constructor(public email: string) {}
}

export class ResendActivationEmailSuccess implements Action {
  readonly type = RESEND_ACTIVATION_EMAIL_SUCCESS;
}

export class ResendActivationEmailFailure implements Action {
  readonly type = RESEND_ACTIVATION_EMAIL_FAILURE;
  constructor(public payload: any) {}
}

export class ResendResetState implements Action {
  readonly type = RESEND_RESET_STATE;
}

export type Actions =
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Redirect
  | ResetState
  | ResendActivationEmail
  | ResendActivationEmailSuccess
  | ResendActivationEmailFailure
  | ResendResetState;
