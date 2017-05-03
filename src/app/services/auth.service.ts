import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from './../config.service';
import { NicciService } from './nicci.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { tokenNotExpired } from 'angular2-jwt';
;


@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private loggedIn = false;
  private baseUrl: string;

  constructor(private http: Http,
              private configService: ConfigService,
              private nicciService : NicciService) {
    this.loggedIn = false; // !!localStorage.getItem('auth_token');
    this.baseUrl = configService.config.api.james.auth;
  }

  login2(email, password) {
    return this.nicciService.signIn2(email, password)
      .map(
        (token) => {
          localStorage.setItem('access_token', token.access_token);
          localStorage.setItem('token', JSON.stringify(token));
        },
        () => {
          // handle error
        });
  }

  /**
   * Request an auth token with email and password
   * @param email
   * @param password
   */
  login(email, password, cb)  {
    return this.nicciService.signIn(email, password, (err, token) => {
      if (err) {
        return cb(err, token);
      }

      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('token', JSON.stringify(token));

      cb(null, token);
    });



    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    //
    // //TODO: handle success based on status codes
    // return this.http
    //   .post(this.baseUrl + '/login', JSON.stringify({username: email, password: password}), {headers})
    //   .map((res: Response) => {
    //     console.log('/login response', res);
    //
    //     if (res.status === 200) {
    //       let data = res.json();
    //       console.log('login succes!e');
    //       localStorage.setItem('auth_token', data.auth_token);
    //       this.loggedIn = true;
    //     }
    //   });
  }

  /**
   * Remove authentication token
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  forgotPassword(email) {
    return this.nicciService.forgotPassword();
  }

  /**
   * Return whether the current user is logged in
   * @returns {Boolean}
   */
  isLoggedIn() : boolean {
    return tokenNotExpired();
  }
}
