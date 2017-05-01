import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import { ConfigService } from './../config.service';
import { NicciService } from './nicci.service';
import { AuthKey, AuthToken } from '../models/auth';

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private baseUrl: string;

  constructor(private http: Http, private configService: ConfigService, private nicciService : NicciService) {
    this.baseUrl = configService.config.api.james.auth;
  }

  /**
   * Request an auth token with email and password
   * @param email
   * @param password
   */
  login(email, password): Observable<boolean> {
    return this.nicciService.login(email, password)
      .map((res: Response) => {
        if (res.status === 200) {
          // success login
          let token = <AuthToken>res.json();
          if (token) {
            localStorage.setItem('auth_token', token.access_token);
            return true;
          }
          return false;
        }
        throw new Error(res.statusText);
      });
  }

  /**
   * Remove authentication token
   */
  logout() {
    localStorage.removeItem('auth_token');
  }

  forgotPassword(email) {
    return null;
  }

  /**
   * Return whether the current user is logged in
   * @returns {Boolean}
   */
  isLoggedIn() {
    return tokenNotExpired('auth_token');
  }
}
