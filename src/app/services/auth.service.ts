import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AuthKey, AuthToken } from '../models/auth';
import * as AuthUtils from '../utils/auth.utils';
import 'rxjs/add/operator/mergeMap';
import { Profile } from '../models/profile';

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private loggedIn = false;
  private keyUrl: string;
  private profileUrl: string;
  private tokenUrl: string;

  constructor(private http: Http) {
    this.loggedIn = false; // !!localStorage.getItem('a uth_token');
    this.keyUrl = environment.james.key;
    this.profileUrl = environment.james.profile;
    this.tokenUrl = environment.james.token;
  }

  /**
   * do a hard token reset on the backend, and removes all the local storage vars
   *
   * @return {Observable<R>}
   */
  public logout(): Observable<AuthToken> {
    return this.http.delete(this.tokenUrl, { headers: this.getHeaderWithBearer()})
      .map(x => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token');
        localStorage.removeItem('nicci_key');
        localStorage.removeItem('nicci_id');

        return x.json();
      });
  }

  /**
   * do a sing in
   *
   * @param email
   * @param password
   * @return {Observable<R>}
   */
  public login(email, password): Observable<AuthToken> {
    return this.getNicciKey()
      .flatMap((nicci) => {
        const encPass = AuthUtils.encryptPassword(password, nicci.key);

        // let encPass = this.encryptPassword(password, nicci.key);
        const headers = this.getBasicHeaderWithKey(nicci);

        const tokenRequest = {
          grant_type: 'password',
          username: email,
          password: encPass,
          scope: 'profile/basic'
        };

        return this.http.post(this.tokenUrl, tokenRequest, {headers})
          .map((res) => res.json())
          .map((token) => <AuthToken>token);
      });
  }

  /**
   *
   * @param refreshToken
   * @return {Observable<R>}
   */
  public refreshToken(refreshToken: string): Observable<AuthToken> {

    return this.getNicciKey()
      .flatMap((nicci) => {
        const headers = this.getBasicHeaderWithKey(nicci);
        const refreshTokenBody = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        };

        return this.http.post(this.tokenUrl, refreshTokenBody, { headers })
          .map(data => data.json());
      });
  }


  /**
   *
   * @param profile
   */
  public isActive(email: string) {
    this.getNicciKey()
      .flatMap((nicci: AuthKey) => {
        const headers = this.getBasicHeaderWithKey(nicci);

        return this.http.post(this.keyUrl, {email}, {headers})
          .map((res: Response) => res.json());
      });
  }

  public isLoggedIn() {
    return AuthUtils.tokenNotExpired('token');
    // return localStorage.getItem('access_token') !== null;
  }

  /**
   *
   * @param email
   */
  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  public forgotPassword(redirectUrl: string): string {
    return environment.james.forgetPassword + `&redirect_uri=${encodeURI(redirectUrl)}`;
  }


  public setTokenExpirationDate(token: string): Object {
    return AuthUtils.setTokenExpirationDate(token);
  }
  /**
   *
   * @return {Observable<R>}
   */
  private getNicciKey(): Observable<AuthKey> {

    const headers = this.getBasicHeader();

    return this.http
      .post(this.keyUrl, '', {headers})
      .map(data => data.json())
      .map(data => {
        return <AuthKey> {
          id: data.id,
          key: data.key
        };
      });
  }

  private getBasicHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Basic ${environment.james.nicciKey}`);

    return headers;
  }

  private getBasicHeaderWithKey(data: AuthKey): Headers {
    const headers = this.getBasicHeader();
    headers.append('NICCI-Key', data.id);
    return headers;
  }

  private getHeaderWithBearer(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    headers.set('Cache-Control', 'no-cache');

    return headers;
  }
}
