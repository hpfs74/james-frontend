import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from './../config.service';
import { NicciService } from './nicci.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private loggedIn = false;
  private baseUrl: string;

  constructor(private http: Http,
              @Inject(ConfigService) private configService: ConfigService, private nicciService : NicciService) {
    this.loggedIn = false; // !!localStorage.getItem('auth_token');
    this.baseUrl = configService.config.api.james.auth;
  }




  /**
   * Request an auth token with email and password
   * @param email
   * @param password
   */
  login(email, password)  {

    return this.nicciService.signIn(email, password)
      .map( (data) => {

          return data !== null;
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
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  forgotPassword(email) {
    return 'https://profile-james-a.nicci.io/password?' +
              'client_id=56a6ab20bb00893f071faddc' +
              '&locale=nl_NL&redirect_uri=com.mobgen.knab://' +
              '&response_type=code' +
              '&scope=basic+emailaddress+social';
  }

  /**
   * Return whether the current user is logged in
   * @returns {Boolean}
   */
  isLoggedIn() {
    return this.loggedIn;
  }
}
