import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConfigService } from './../config.service';

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private loggedIn = false;
  private baseUrl: string;

  constructor(private http: Http, private configService: ConfigService) {
    this.loggedIn = false; // !!localStorage.getItem('auth_token');
    this.baseUrl = configService.config.api.nicciProxy.auth;
  }

  /**
   * Request an auth token with email and password
   * @param email
   * @param password
   */
  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.baseUrl + '/login', JSON.stringify({ username: email, password: password }), { headers })
      .map(res => res.json())
      .map((res) => {
        console.log('REQ HERE', res);

        if (res.success) {
          console.log('RES SUCCESS', res);

          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }
        return res.success;
      });
  }

  /**
   * Remove authentication token
   */
  logout() {
    console.log('logout!');
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  /**
   * Return whether the current user is logged in
   * @returns {Boolean}
   */
  isLoggedIn() {
    // return true;
    return this.loggedIn;
  }
}
