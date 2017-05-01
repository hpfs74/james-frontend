import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from '../config.service';
import * as AuthUtils from '../utils/auth.utils';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { AuthKey, AuthToken } from '../models/auth';

@Injectable()
export class NicciService {
  // store the URL so we can redirect after logging in
  private baseUrl: string;

  constructor(private http: Http, private configService: ConfigService) {
    this.baseUrl = configService.config.api.james.auth;
    console.log(this.baseUrl);
  }

  /**
   *
   * @param email
   * @param password
   */
  public login(email, password): Observable<Response> {
    this
      .getNicciKey()
      .map( (data: AuthKey) => {
        let encPass = AuthUtils.encryptPassword(password, data.key);
        let headers = this.getBasicHeader(data);

        let tokenRequest = {
          grant_type: 'password',
          username: email,
          password: encPass,
          scope: 'profile/basic'
        };
        return this.http.post(this.baseUrl, tokenRequest, { headers });
      });

    return null;
  }

  /**
   *
   * @param profile
   */
  public isActivated(email : string) {

    this.getNicciKey().map( (data: AuthKey) =>  {
      let headers = this.getBasicHeader(data);

      this.http.post(this.baseUrl, { email }, { headers })
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
   * @return {Observable<R>}
   */
  private getNicciKey(): Observable<AuthKey> {

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

          let ret = new AuthKey();
          ret.id = data._id;
          ret.key = data.key;

          return ret;
        }

        throw new Error(res.statusText);
      });
  }

  private getBasicHeader(data : AuthKey) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic NTZhNmFiMjBiYjAwODkzZjA3MWZhZGRjOmlja0dhTmhNa0thS0s3bEU=');
    headers.append('NICCI-Key', data.key);

    return headers;
  }
}
