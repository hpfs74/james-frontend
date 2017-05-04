import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { KnabBaseService } from '../../services/base.service';
import { ConfigService } from '../../config.service';
import { Address } from '../../models/address';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class AddressLookupService extends KnabBaseService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private http: Http) {
    super(http);
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
  public lookupAddress(postalCode: string, houseNumber: string): Observable<Address> {
    let url = this.baseUrl + '/' + postalCode.trim() + houseNumber.trim(); // POSTCODENUMBER
    return this.http.get(url)
      .map((res: Response) => {
        if (res.status === 200) {
          return res.json().data as Address;
        } else {
          //  "errors": [    "address_not_found"  ]
          return [];
        }
      })
      .catch(this.handleError);
  }

  /**
   * Get street, city and geolocation from postalcode
   * @param {string} postalCode
   * @param {string} houseNumber
   * @returns {Observable<Address>}
   *
   * @memberOf AddressLookupService
   */
  public lookup(postalCode: string , houseNumber: string) : Observable<Address> {
    let body = { address: postalCode + houseNumber };

    return this.post(this.baseUrl, body)
      .map(res=><Address>res);
  }
}
