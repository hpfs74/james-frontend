import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../config.service';
import { AuthKey, AuthToken } from '../models/auth';
import * as AuthUtils from '../utils/auth.utils';
import 'rxjs/add/operator/mergeMap';
import { User } from '../models/user';
const CryptoJS = require('crypto-js');

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private loggedIn = false;
  private baseUrl: string;
  private authUrl: string;
  private keyUrl: string;

  constructor(private http: Http,
              private configService: ConfigService) {

    this.loggedIn = false; // !!localStorage.getItem('auth_token');
    this.baseUrl = configService.config.api.james.base;
    this.keyUrl = configService.config.api.james.key;
  }

  public getUserProfile(): Observable<User> {
    return this.http.get(this.baseUrl + '/profile', {headers: this.getHeaderWithBearer()})
      .map((x) => x.json())
      .map((x) => <User>x);
  }

  public signOff() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('nicci_key');
    localStorage.removeItem('nicci_id');
  }

  public signIn(email, password): Observable<AuthToken> {
    return this.getNicciKey()
      .flatMap((nicci) => {
        let encPass = this.encryptPassword(password, nicci.key);
        let headers = this.getBasicHeaderWithKey(nicci);

        let tokenRequest = {
          grant_type: 'password',
          username: email,
          password: encPass,
          scope: 'profile/basic'
        };

        return this.http.post(this.configService.config.api.james.token , tokenRequest, {headers})
          .map((res) => res.json())
          .map((token) => <AuthToken>token);
      });
  }

  /**
   *
   * @param profile
   */
  public isActive(email: string) {
    this.getNicciKey()
      .flatMap((nicci: AuthKey) => {
        let headers = this.getBasicHeaderWithKey(nicci);

        return this.http.post(this.keyUrl, {email}, {headers})
          .map((res: Response) => res.json());
      });
  }

  public isLoggedIn() {
    //return AuthUtils.tokenNotExpired('token');
    return localStorage.getItem('access_token') !== null;
  }

  /**
   *
   * @param email
   */
  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  public forgotPassword(): string {
    return 'https://profile-james-a.nicci.io/password?' +
      'client_id=56a6ab20bb00893f071faddc' +
      '&locale=nl_NL&redirect_uri=com.mobgen.knab://' +
      '&response_type=code' +
      '&scope=basic+emailaddress+social';
  }

  /**
   *
   * @param source
   * @return {any}
   */
  private base64url(source) {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  /**
   *
   * @param password
   * @param secret
   * @return {string}
   */
  private encryptPassword(password, secret) {

    let header = {'alg': 'HS256', 'typ': 'JWT'};
    let data = password;
    let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = this.base64url(stringifiedHeader);
    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let encodedData = this.base64url(stringifiedData);
    let signature = encodedHeader + '.' + encodedData;

    signature = CryptoJS.HmacSHA256(signature, secret);
    signature = this.base64url(signature);

    return encodedHeader + '.' + encodedData + '.' + signature;
  }

  /**
   *
   * @return {Observable<R>}
   */
  private getNicciKey(): Observable<AuthKey> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');

    return this.http
      .post(this.keyUrl, '', {headers})
      .map(data => data.json())
      .map(data => {
        return <AuthKey> {
          id: data._id,
          key: data.key
        };
      });
  }

  private getBasicHeader(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');

    return headers;
  }

  private getBasicHeaderWithKey(data: AuthKey): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');
    headers.append('NICCI-Key', data.id);

    return headers;
  }

  private getHeaderWithBearer(): Headers {
    let headers = new Headers();

    headers.set('Postman-Token', localStorage.getItem('nicci_key'));
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    headers.set('Cache-Control', 'no-cache');

    return headers;
  }
}
