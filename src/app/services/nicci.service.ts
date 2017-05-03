import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const crypto = require('crypto-js');

import { User } from '../models/user';
import { AuthKey, AuthToken } from '../models/auth';
import { ConfigService } from '../config.service';

@Injectable()
export class NicciService {
  // store the URL so we can redirect after logging in
  private baseUrl: string;

  constructor(private http: Http, @Inject(ConfigService) private configService: ConfigService) {
    this.baseUrl = configService.config.api.james.auth;
  }

  public getUserProfile() {


    return this.http.get(this.baseUrl+'/profile', { headers: this.getHeaderWithBearer() })
      .map( (x) => x.json())
      .map( (x) => <User>x);
  }



  public signIn(email, password) {
    return this.getNicciKey()
      .flatMap( (nicci) => {
        let encPass = this.encryptPassword(password, nicci.key);
        let headers = this.getBasicHeaderWithKey(nicci);

        let tokenRequest = {
          grant_type: 'password',
          username: email,
          password: encPass,
          scope: 'profile/basic'
        };

        return this.http.post(this.configService.config.api.james.auth + '/token', tokenRequest, {headers})
          .map( (res) => res.json())
          .map( (token) => <AuthToken>token);
      });
  }



  /**
   *
   * @param profile
   */
  public isActivated(email : string) {

    this.getNicciKey()
      .flatMap( (nicci: AuthKey) => {
      let headers = this.getBasicHeaderWithKey(nicci);

      return this.http.post(this.configService.config.api.james.auth, { email }, { headers })
        .map((res: Response) => res.json());
    });
  }


  /**
   *
   * @param email
   */
  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  public forgotPassword() : string {

    return 'https://profile-james-a.nicci.io/password?' +
      'client_id=56a6ab20bb00893f071faddc' +
      '&locale=nl_NL&redirect_uri=com.mobgen.knab://' +
      '&response_type=code' +
      '&scope=basic+emailaddress+social';

    // let baseUrl = '';
    // let clientId = '';
    // let currentLocale = 'nl';
    // let redirectUrl = 'http';
    // let responseType = 'code';
    // let scope = 'basic+emailaddress+social';
    //
    // return `${baseUrl}/password?client_id=${clientId}`
    //                 + `&locale=${currentLocale}`
    //                 + `&redirect_uri=${redirectUrl}`
    //                 + `&response_type=${responseType}`
    //                 + `&scope=${scope}`;
  }

  /**
   *
   * @param source
   * @return {any}
   */
  private base64url(source) {
    // Encode in classical base64
    let encodedSource = crypto.enc.Base64.stringify(source);

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
    let stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = this.base64url(stringifiedHeader);
    let stringifiedData = crypto.enc.Utf8.parse(JSON.stringify(data));
    let encodedData = this.base64url(stringifiedData);
    let signature = encodedHeader + '.' + encodedData;

    signature = crypto.HmacSHA256(signature, secret);
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
      .post(this.baseUrl + '/key', '', {headers})
      .map((res: Response) => {

        if (res.status === 201) {
          let data = res.json();

          return <AuthKey> {
            id: data._id,
            key: data.key
          };
        }

        throw new Error(res.statusText);
      });
  }

  private getBasicHeader() : Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');

    return headers;
  }

  private getBasicHeaderWithKey(data : AuthKey) : Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');
    headers.append('NICCI-Key', data.id);

    return headers;
  }

  private getHeaderWithBearer() : Headers {
    let headers = new Headers();

    headers.set('Postman-Token', localStorage.getItem('nicci_key'));
    headers.set('Authorization', 'Bearer '+ localStorage.getItem('access_token'));
    headers.set('Cache-Control', 'no-cache');

    return headers;
  }
}
