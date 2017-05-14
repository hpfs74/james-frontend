import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from './auth-http.service';
import { ConfigService } from '../config.service';
import { User } from '../models/user';

@Injectable()
export class ProfileService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private http: AuthHttp) {
    this.baseUrl = configService.config.api.james.profile;
  }

  /**
   * get the current user profile based on the current token
   *
   * @return {Observable<R>}
   */
  public getUserProfile(): Observable<User> {
    return this.http.get(this.baseUrl)
      .map((x) => x.json())
      .map((x) => <User>x);
  }
}
