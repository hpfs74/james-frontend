import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../../config.service';
import { Address } from '../../models/address';

@Injectable()
export class AddressLookupService {
  private baseUrl: string;
  private serviceError: boolean = false;

  constructor(private configService: ConfigService, private http: Http) {
    this.baseUrl = configService.config.api.james.address;
  }

  /**
   * Get street, city and geolocation from postalcode
   * @param {string} postalCode
   * @param {string} addressNumber
   * @returns {Observable<Address>}
   *
   * @memberOf AddressLookupService
   */
  public lookupAddress(postalCode: string, addressNumber: string): Observable<Address> {
    let url = this.baseUrl + postalCode.trim() + '/' + addressNumber;
    return this.http.get(url)
      .map(res => {
        if (res.json) {
          return res.json().data as Address;
        } else {
          return [];
        }
      })
      .catch(this.handleError);
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
    return Observable.throw((error && error.json && error.json().error) || 'AIP:AddressLookupService:Server error');
  }
}
