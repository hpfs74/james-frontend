
import { Action } from '@ngrx/store';
import { AuthToken, Profile, Authenticate } from '../models';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';

export const REFRESH_TOKEN = '[Auth] Refresh Token';
export const REFRESH_SUCCESS = '[Auth] Refresh Token Success';
export const REFRESH_FAILURE = '[Auth] Refresh Token Failure';

// TODO: implement popup requesting to login again
export const REQUEST_CREDENTIALS = '[Auth] Request Credentials';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
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

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class RefreshToken implements Action {
  readonly type = REFRESH_TOKEN;

  constructor(public payload: string) { }
}

export class RefreshTokenFailure implements Action {
  readonly type = REFRESH_FAILURE;

  constructor(public payload: any) { }
}

export class RefreshTokenSuccess implements Action {
  readonly type = REFRESH_SUCCESS;

  constructor(public payload: any) { }
}

export class RequestCredentials implements Action {
  readonly type = REQUEST_CREDENTIALS;
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | RequestCredentials;
