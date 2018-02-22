import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from '@app/auth/services';
import { environment } from '@env/environment';
import { Profile } from '../models/profile';
import { Insurance } from '@app/insurance/models';
import { Settings } from '../models/settings';
import { LocalStorageService } from '@app/core/services';

@Injectable()
export class ProfileService {
  private baseUrl: string;
  private insurancesUrl: string;
  private headers: Headers;
  private clientId = environment.james.payloadEncryption.client.id;

  constructor(private http: AuthHttp, private localStorageService: LocalStorageService) {
    this.baseUrl = environment.james.profile;
    this.insurancesUrl = this.baseUrl + '/insurances';
    this.headers = new Headers();

    this.headers.append('version', 'v2');
  }

  /**
   * get the current user profile based on the current token
   *
   * @return {Observable<R>}
   */
  public getUserProfile(): Observable<Profile> {
    const headers = this.headers;

    return this.http.get(this.baseUrl, { headers })
      .map((p) => p.json())
      .map((p) => <Profile>p);
  }

  /**
   * update the current user profile
   * @param profile
   * @return {Observable<R>}
   */
  public updateUserProfile(profile: any): Observable<Profile> {
    const headers = this.headers;

    return this.http.patch(this.baseUrl, JSON.stringify(profile), { headers })
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

  public deleteProfile(): Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.localStorageService.getAccessToken());
    headers.append('version', 'v2');
    const body = {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      scope: 'basic'
    };
    return this.http.delete(environment.james.profile, {headers: headers}).map(res => res.json());
  }
}
