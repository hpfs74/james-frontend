import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConfigService } from './../config.service';
import { NicciService } from './nicci.service';
import { Observable } from 'rxjs/Observable';
import { NicciKey } from '../models/nicci-key';

@Injectable()
export class AuthService implements OnInit {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private loggedIn = false;
  private baseUrl: string;

  constructor(private http: Http, private configService: ConfigService, private nicciService : NicciService) {
    this.loggedIn = false; // !!localStorage.getItem('auth_token');
    this.baseUrl = '';
  }


  ngOnInit() {
    console.log('AUTH SERVICE INIT');

    this.baseUrl = this.configService.config.api.nicciProxy.auth;
    console.log(this.baseUrl);
  }

  /**
   * Request an auth token with email and password
   * @param email
   * @param password
   */
  login(email, password) : Observable<NicciKey> {
    console.log('AUTH SERVICE: login');

    return this.nicciService.signIn(email, password);


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
    console.log('logout!');
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  forgotPassword(email) {
    return null;
  }

  /**
   * Return whether the current user is logged in
   * @returns {Boolean}
   */
  isLoggedIn() {
    return this.loggedIn;
  }
}
