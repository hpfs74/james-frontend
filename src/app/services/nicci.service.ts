import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from '../config.service';
import { crypto } from 'crypto-js';
import { Observable } from 'rxjs/Observable';

import { NicciKey } from '../models/nicci-key';
import { NicciProfile } from '../models/nicci-profile';

@Injectable()
export class NicciService implements OnInit {
  // store the URL so we can redirect after logging in
  private baseUrl: string;

  constructor(private http: Http, private configService: ConfigService) {
    console.log('NICCI Constructor');
    this.baseUrl = 'https://profile-james-t.nicci.io';
  }

  ngOnInit() {
    this.baseUrl = this.configService.config.api.nicciProxy.auth;
  }

  /**
   *
   * @param email
   * @param password
   */
  public signIn(email, password) :Observable<NicciKey> {
    console.log(' SIGN IN ');
    return this.getNicciKey();
  }

  /**
   *
   * @param profile
   */
  public isActivated(profile) {
    throw new Error('Not implemented yet');
  }

  /**
   *
   * @param email
   */
  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  /**
   *
   * @param source
   * @return {any}
   */
  base64url(source) {
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
  encryptPassword(password, secret) {

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
  getNicciKey() : Observable<NicciKey> {

    console.log(' NICCI KEY ');

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');

    return this.http
      .post(this.baseUrl + '/key', '', {headers})
      .map((res: Response) => {
        console.log('/key response', res);

        if (res.status === 200) {
          let data = res.json();
          console.log('key success!');
          localStorage.setItem('nicci_id', data._id);
          localStorage.setItem('nicci_key', data.key);

          let ret;
          ret.id = data._id;
          ret.key = data.key;
          return ret;
        }

        throw new Error(res.statusText);
      });
  }

  isNicciProfileActive(profile) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');
  }
}
