import { Action } from '@ngrx/store';
import { AuthToken, Authenticate, RegistrationPayload } from '../models/auth';

export const REGISTER =             '[Register] Create';
export const REGISTER_SUCCESS =     '[Register] Register Success';
export const REGISTER_FAILURE =     '[Register] Register Failure';
export const REGISTER_REDIRECT =    '[Register] Register Redirect';
export const REGISTER_RESET_STATE = '[Register] Register Reset State';

export const REGISTER_RESEND_ACTIVATION_EMAIL =         '[Register] Register Resend Activation Email';
export const REGISTER_RESEND_ACTIVATION_EMAIL_SUCCESS = '[Register] Register Resend Activation Email Success';
export const REGISTER_RESEND_ACTIVATION_EMAIL_FAILURE = '[Register] Register Resend Activation Email Failure';
export const REGISTER_RESEND_RESET_STATE =              '[Register] Register Resend Reset State';

export const REGISTER_WITH_ADVICE =         '[Register] Register With Advice';
export const REGISTER_WITH_ADVICE_SUCCESS = '[Register] Register With Advice Success';
export const REGISTER_WITH_ADVICE_FAILURE = '[Register] Register With Advice Failure';

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

export class RegisterResetState implements Action {
  readonly type = REGISTER_RESET_STATE;
}

export class RegisterResendActivationEmail implements Action {
  readonly type = REGISTER_RESEND_ACTIVATION_EMAIL;

  constructor(public email: string) {}
}

export class RegisterResendActivationEmailSuccess implements Action {
  readonly type = REGISTER_RESEND_ACTIVATION_EMAIL_SUCCESS;
}

export class RegisterResendActivationEmailFailure implements Action {
  readonly type = REGISTER_RESEND_ACTIVATION_EMAIL_FAILURE;
  constructor(public payload: any) {}
}

export class RegisterResendResetState implements Action {
  readonly type = REGISTER_RESEND_RESET_STATE;
}

export class RegisterWithAdvice implements Action {
  readonly type = REGISTER_WITH_ADVICE;

  constructor(public registration: RegistrationPayload) {}
}

export class RegisterWithAdviceSuccess implements Action {
  readonly type = REGISTER_WITH_ADVICE_SUCCESS;

  constructor(public payload: any) {}
}

export class RegisterWithAdviceFailure implements Action {
  readonly type = REGISTER_WITH_ADVICE_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =
  | Register
  | RegisterSuccess
  | RegisterFailure
  | RegisterRedirect
  | RegisterResetState
  | RegisterResendActivationEmail
  | RegisterResendActivationEmailSuccess
  | RegisterResendActivationEmailFailure
  | RegisterResendResetState
  | RegisterWithAdvice
  | RegisterWithAdviceSuccess
  | RegisterWithAdviceFailure;
