import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './../config.service';
import { NicciService } from './nicci.service';


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


  login(email, password) {
    return this.nicciService.signIn2(email, password)
      .map( (token) => {
          localStorage.setItem('access_token', token.access_token);
          localStorage.setItem('token', JSON.stringify(token));

          return token;
        });
  }

  getCurrentProfile() {
      return this.nicciService.getUserProfile();
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
    // return tokenNotExpired();
    return localStorage.getItem('access_token') !== null;
  }
}
