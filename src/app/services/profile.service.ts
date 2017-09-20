import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth/services/auth-http.service';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';
import { Insurance } from '../models/insurance';
import { Settings } from '../models/settings';

@Injectable()
export class ProfileService {
  private baseUrl: string;
  private insurancesUrl: string;

  constructor(private http: AuthHttp) {
    this.baseUrl = environment.james.profile;
    this.insurancesUrl = this.baseUrl + '/insurances';
  }

  /**
   * get the current user profile based on the current token
   *
   * @return {Observable<R>}
   */
  public getUserProfile(): Observable<Profile> {
    return this.http.get(this.baseUrl)
      .map((p) => p.json())
      .map((p) => <Profile>p);
  }

  /**
   * update the current user profile
   * @param profile
   * @return {Observable<R>}
   */
  public updateUserProfile(profile: any): Observable<Profile> {
    return this.http.patch(this.baseUrl, JSON.stringify(profile))
      .map((p) => p.json())
      .map((p) => <Profile>p);
  }

  public updateAddress(postcode: string, houseNumber: string, houseNumberAddition: string): Observable<Profile> {
    return this.http.patch(this.baseUrl, {
      address: `${postcode}${houseNumber}${houseNumberAddition}`.toUpperCase().replace(/[ .]/gim, '')
    })
      .map((p) => p.json())
      .map((p) => <Profile>p);
  }

  public updateSettings(profileId: string, settings: Settings): Observable<Settings> {
    return this.http.patch(`${this.baseUrl}/settings/${profileId}`, settings)
      .map((res) => <Settings>res.json());
  }

  /**
   * add a new insurance to the user profile
   */
  public addInsurance(insurance: Insurance): Observable<Insurance> {
    return this.http.post(this.insurancesUrl, JSON.stringify(insurance))
      .map((res) => res.json());
  }

  /**
   * update an existing insurance
   */
  public updateInsurance(insurance: Insurance): Observable<Insurance> {
    return this.http.post(`this.insurancesUrl/${insurance._id}`, JSON.stringify(insurance))
      .map((res) => res.json());
  }
}
