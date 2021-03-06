import { Action } from '@ngrx/store';
import { AuthToken, Authenticate, PasswordPayload, PasswordChangeResponse, PasswordChangeError } from '../models/auth';

export const LOGIN                  = '[Auth] Login';
export const LOGIN_ANONYMOUS        = '[Auth] Login Anonymous';
export const LOGOUT                 = '[Auth] Logout';
export const LOGIN_SUCCESS          = '[Auth] Login Success';
export const LOGIN_FAILURE          = '[Auth] Login Failure';
export const LOGIN_REDIRECT         = '[Auth] Login Redirect';
export const LOGIN_EXPIRED          = '[Auth] Login Expired';
export const LOGIN_RESET_STATE      = '[Auth] Login Reset State';
export const ANONYMOUS_START        = '[Auth] Anonymous Start';
export const NEW_PASSWORD           = '[Auth] New Password';
export const NEW_PASSWORD_ERROR     = '[Auth] New Password Error';
export const NEW_PASSWORD_SUCCESS   = '[Auth] New Password Success';

export const REFRESH_TOKEN          = '[Auth] Refresh Token';
export const REFRESH_SUCCESS        = '[Auth] Refresh Token Success';
export const REFRESH_FAILURE        = '[Auth] Refresh Token Failure';
export const RESET_STATES           = '[Auth] Reset States';

export const SCHEDULE_TOKEN_REFRESH = '[Auth] Schedule Token Refresh';

// TODO: implement popup requesting to login again
export const REQUEST_CREDENTIALS = '[Auth] Request Credentials';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class LoginAnonymous implements Action {
  readonly type = LOGIN_ANONYMOUS;
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { token: AuthToken }) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class LoginExpired implements Action {
  readonly type = LOGIN_EXPIRED;
}

export class LoginResetState implements Action {
  readonly type = LOGIN_RESET_STATE;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class RefreshToken implements Action {
  readonly type = REFRESH_TOKEN;

  constructor(public payload: string) { }
}

export class NewPassword implements Action {
  readonly type = NEW_PASSWORD;

  constructor(public payload: PasswordPayload) { }
}

export class NewPasswordError implements Action {
  readonly type = NEW_PASSWORD_ERROR;

  constructor(public payload: string) { }
}

export class NewPasswordSuccess implements Action {
  readonly type = NEW_PASSWORD_SUCCESS;

  constructor(public payload: PasswordChangeResponse) { }
}

export class RefreshTokenFailure implements Action {
  readonly type = REFRESH_FAILURE;

  constructor(public payload: any) { }
}

export class RefreshTokenSuccess implements Action {
  readonly type = REFRESH_SUCCESS;

  constructor(public payload: any) { }
}

export class ScheduleTokenRefresh implements Action {
  readonly type = SCHEDULE_TOKEN_REFRESH;

  constructor(public payload: any) { }
}

export class RequestCredentials implements Action {
  readonly type = REQUEST_CREDENTIALS;
}

export class StartAnonymous implements Action {
  readonly type = ANONYMOUS_START;
}

export class ResetStates implements Action {
  readonly type = RESET_STATES;
}

export type Actions =
  | Login
  | LoginAnonymous
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | LoginResetState
  | Logout
  | RefreshToken
  | NewPassword
  | NewPasswordError
  | NewPasswordSuccess
  | RefreshTokenFailure
  | RefreshTokenSuccess
  | ScheduleTokenRefresh
  | LoginExpired
  | RequestCredentials
  | StartAnonymous
  | ResetStates;
