import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from '../config.service';
import { crypto } from 'crypto-js';
import { Observable } from 'rxjs/Observable';

import { NicciKey } from '../models/nicci-key';
import { NicciProfile } from '../models/nicci-profile';

const config = require('../../../config/api/config.json');

@Injectable()
export class NicciService {
  // store the URL so we can redirect after logging in
  private baseUrl: string;

  constructor(private http: Http, @Inject(ConfigService) private configService: ConfigService) {
    console.log('NICCI Constructor');
    console.log(configService);

    this.baseUrl = config.api.nicciProxy.auth;
  }

  /**
   *
   * @param email
   * @param password
   */
  public signIn(email, password): Observable<NicciProfile> {

    this
      .getNicciKey()
      .map( (data: NicciKey) => {
        let encPass = this.encryptPassword(password, data.key);
        let headers = this.getBasicHeader(data);

        let tokenRequest = {
          grant_type: 'password',
          username: email,
          password: encPass,
          scope: 'profile/basic'
        };

        this.http.post(this.configService.config.api.nicciProxy.auth, tokenRequest, {headers})
          .map((res: Response) => {

            if (res.status === 200) {
              // success login

              return res.json();
            }
            throw new Error(res.statusText);
          });
      });

    return null;
  }

  /**
   *
   * @param profile
   */
  public isActivated(email : string) {

    this.getNicciKey().map( (data: NicciKey) =>  {
      let headers = this.getBasicHeader(data);

      this.http.post(this.configService.config.api.nicciProxy.auth, { email }, { headers })
        .map((res: Response) => {

          if (res.status === 200) {
            // success login

            let check = res.json();

            if (check.status === true) {
              // it is activated
            }
          }
          throw new Error(res.statusText);
        });
    });

    throw new Error('Not implemented yet');
  }


  /**
   *
   * @param email
   */
  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  public forgotPassword() : string {
    let baseUrl = '';
    let clientId = '';
    let currentLocale = 'nl';
    let redirectUrl = 'http';
    let responseType = 'code';
    let scope = 'basic+emailaddress+social';

    return `${baseUrl}/password?client_id=${clientId}`
                    + `&locale=${currentLocale}`
                    + `&redirect_uri=${redirectUrl}`
                    + `&response_type=${responseType}`
                    + `&scope=${scope}`;
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
  private getNicciKey(): Observable<NicciKey> {

    console.log(' NICCI KEY ');

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');

    return this.http
      .post(this.baseUrl + '/key', '', {headers})
      .map((res: Response) => {
        console.log('/key response', res);

        if (res.status === 201) {
          let data = res.json();
          console.log('key success! ', data._id, data.key);

          let ret = new NicciKey();
          ret.id = data._id;
          ret.key = data.key;

          return ret;
        }

        throw new Error(res.statusText);
      });
  }

  private getBasicHeader(data : NicciKey) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');
    headers.append('NICCI-Key', data.key);

    return headers;
  }
}
