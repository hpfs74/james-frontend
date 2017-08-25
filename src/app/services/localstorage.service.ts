import { Injectable } from '@angular/core';

import { AuthKey, AuthToken } from '../models/auth';
import * as AuthUtils from '../utils/auth.utils';

export const TOKEN_NAME = 'access_token';
export const TOKEN_OBJECT_NAME = 'token';

@Injectable()
export class LocalStorageService {

  constructor() { }

  setToken(token: AuthToken) {
    let convertToken = AuthUtils.setTokenExpirationDate(token);
    localStorage.setItem(TOKEN_NAME, token.access_token);
    localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(convertToken));
  }

  getToken(): AuthToken {
    let token = localStorage.getItem(TOKEN_OBJECT_NAME);
    return JSON.parse(token) || null;
  }

  getAccessToken(): string {
    return localStorage.getItem(TOKEN_NAME) || null;
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('nicci_key');
    localStorage.removeItem('nicci_id');
  }
}
