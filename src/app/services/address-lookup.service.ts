import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { KnabBaseService } from './base.service';
import { ConfigService } from '../config.service';
import { Address } from '../models/address';
import { AuthHttp } from './auth-http.service';

@Injectable()
export class AddressLookupService extends KnabBaseService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private http: AuthHttp) {
    super();
    this.serviceName = 'AddressLookupService';
    this.baseUrl = configService.config.api.james.address;
  }

  /**
   * Get street, city and geolocation from postalcode
   * @param {string} postalCode
   * @param {string} houseNumber
   * @returns {Observable<Address>}
   *
   * @memberOf AddressLookupService
   */
  // public lookupAddress(postalCode: string, houseNumber: string): Observable<Address> {
  //   let url = this.baseUrl + '/' + postalCode.trim() + houseNumber.trim(); // POSTCODENUMBER
  //   return this.http.get(url)
  //     .map((res: Response) => {
  //       if (res.status === 200) {
  //         return res.json().data as Address;
  //       } else {
  //         //  "errors": [    "address_not_found"  ]
  //         return [];
  //       }
  //     })
  //     .catch(this.handleError);
  // }

  /**
   * Get street, city and geolocation from postalcode
   * @param {string} postalCode
   * @param {string} houseNumber
   * @returns {Observable<Address>}
   *
   * @memberOf AddressLookupService
   */
  public lookupAddress(postalCode: string , houseNumber: string) : Observable<Address> {
    let body = { address: postalCode + houseNumber };

    return this.http.post(this.baseUrl, body)
      .map(res=><Address>res.json());
  }
}
