import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from './auth-http.service';
import { ConfigService } from '../config.service';
import { Profile, ProfileViewModel } from '../models/profile';

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
  public getUserProfile(): Observable<Profile> {
    return this.http.get(this.baseUrl)
      .map((x) => x.json())
      .map((x) => <Profile>x);
  }

  /**
   * get a view model of the profile
   *
   * @param profile
   * @return {{car: boolean, carLogoUrl: string}}
   */
  public getProfileViewModel(profile): ProfileViewModel {

    // TODO: parse profile to return a simpler version of the current profile
    return {
      car: true,
      carLogoUrl:'http://www.verzekeringadviseur.com/wp-content/uploads/2011/09/FBTO-logo.png'
    };
  }

}
