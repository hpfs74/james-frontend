import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { AuthHttp } from '../../services';
import { Address } from '../../models/address';

@Injectable()
export class AddressLookupService {
  private baseUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.baseUrl = environment.james.address;
  }

  /**
   * Get street, city and geolocation from postalcode
   * @param {string} postalCode
   * @param {string} houseNumber
   * @returns {Observable<Address>}
   *
   * @memberOf AddressLookupService
   */
  public lookupAddress(postalCode: string, houseNumber: string, houseNumberExtension?: string) {
    const body = { address: postalCode + houseNumber + (houseNumberExtension || '') };
    return this.authHttp.post(this.baseUrl, body);
  }
}
