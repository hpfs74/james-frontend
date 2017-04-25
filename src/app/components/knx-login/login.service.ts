import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../../config.service';

// TODO: create a base class for all services
// from which derive all services so at least
// it as a common error handler
@Injectable()
export class LoginService {
  private baseUrl: string;
  private serviceError: boolean = false;

  constructor(private configService: ConfigService, private http: Http) {
    this.baseUrl = configService.config.api.nicciProxy.address;
  }

  /**
   * @desc
   * handle the signin process and store the profile retrieved from
   * the backend in the local store using @ngrx-store
   * @param userName
   * @param password
   * @return {Observable<Response>}
   */
  public signIn (userName:string, password: string) {
    let url = this.baseUrl;


    // step1. get the nicci key

    // step2. try to do logon and get the token

    // step3. take the profile and store in ngrx-store

    return this.http.get(url);
  }


  public signUp() {
    return null;
  }

  /**
   * @desc
   * send a password reset request to the backend
   */
  public forgotPassword() {
    return null;
  }

  /**
   * @desc
   * get the current user profile by check if the store
   * profile is update otherwise it will retrieve it
   * from backend
   */
  public getProfile() {
    return null;
  }

  /**
   * @desc
   * It will clear all information about the user in the store and
   * reset application state
   */
  public signOut() {
    return null;
  }

  /**
   * Error handler
   * @param error
   * @returns {ErrorObservable}
   */
  private handleError(error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    this.serviceError = true;
    console.error(error);
    return Observable.throw((error && error.json && error.json().error) || 'KNAB:LoginService error');
  }
}
