import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';

import { environment } from '../../environments/environment';
import { AuthKey, AuthToken } from '../models/auth';
import * as AuthUtils from '../utils/auth.utils';
import { Profile, Authenticate } from '../models';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class AuthService {
  redirectUrl: string;
  private loggedIn = false;
  private keyUrl: string;
  private profileUrl: string;
  private tokenUrl: string;

  private tokenStream: Observable<AuthToken>;
  private refreshSubscription: any;

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.keyUrl = environment.james.key;
    this.profileUrl = environment.james.profile;
    this.tokenUrl = environment.james.token;
    this.redirectUrl = window.location.origin;

    this.tokenStream = new Observable<AuthToken>((obs: any) => {
      obs.next(this.localStorageService.getToken());
    });
  }

  /**
   * do a hard token reset on the backend, and removes all the local storage vars
   *
   * @return {Observable<R>}
   */
  public logout(): Observable<AuthToken> {
    return this.http.delete(this.tokenUrl, { headers: this.getHeaderWithBearer()})
      .map(x => {
        this.localStorageService.clearToken();
        this.unscheduleRefresh();
        return x.json();
      });
  }

  public login(auth: Authenticate): Observable<AuthToken> {
    return this.getNicciKey()
      .flatMap((nicci) => {
        const encPass = AuthUtils.encryptPassword(auth.password, nicci.key);
        const headers = this.getBasicHeaderWithKey(nicci);

        const tokenRequest = {
          grant_type: auth.grant_type || 'password',
          username: auth.username,
          password: encPass,
          scope: 'profile/basic'
        };

        return this.http.post(this.tokenUrl, tokenRequest, {headers})
          .map((res) => res.json())
          .map((token) => <AuthToken>token)
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      });
  }

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
  }

  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream and flatMap the token
    let source = this.tokenStream.flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let tokenIat = token.iat;
        let tokenExp = token.expiration_time;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(tokenExp) - iat.setUTCSeconds(tokenIat));

        return Observable.interval(delay);
      });

    this.refreshSubscription = source.subscribe(() => {
      let refreshToken = this.localStorageService.getRefreshToken();
      this.refreshToken(refreshToken);
    });
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
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
