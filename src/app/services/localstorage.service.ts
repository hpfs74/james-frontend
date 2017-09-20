import { Injectable } from '@angular/core';

import { AuthKey, AuthToken } from '../auth/models/auth';
import * as AuthUtils from '../utils/auth.utils';

export const TOKEN_NAME = 'access_token';
export const TOKEN_OBJECT_NAME = 'token';
export const NICCI_KEY = 'nicci_key';
export const NICCI_ID = 'nicci_id';

@Injectable()
export class LocalStorageService {

  setToken(token: AuthToken) {
    let convertToken = JSON.parse(AuthUtils.setTokenExpirationDate(JSON.stringify(token)));
    localStorage.setItem(TOKEN_NAME, convertToken.access_token);
    localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(convertToken));
  }

  getToken(): AuthToken {
    let token = localStorage.getItem(TOKEN_OBJECT_NAME);
    return JSON.parse(token) || null;
  }

  getRefreshToken(): string {
    let token = this.getToken();
    return token ? token.refresh_token : null;
  }

  getAccessToken(): string {
    return localStorage.getItem(TOKEN_NAME) || null;
  }

  clearToken() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TOKEN_OBJECT_NAME);
    localStorage.removeItem(NICCI_KEY);
    localStorage.removeItem(NICCI_ID);
  }
}
