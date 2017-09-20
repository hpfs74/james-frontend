import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { AuthHttp } from '../../auth/services';
import { Address } from '../../profile/models/address';

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
    // Deprecated request to NICCI Api
    // const body = { address: postalCode + houseNumber + (houseNumberExtension || '') };
    // return this.authHttp.post(this.baseUrl, body);
    const address = `${this.baseUrl}/${postalCode}${houseNumber}${houseNumberExtension || ''}`;
    return this.authHttp.get(address)
      .map((response) => {
        const dataObject = response.json();

        if (!dataObject.Payload) {
          throw Error('no payload object found for the address');
        }

        return <Address>{
          '_id': dataObject.Payload.ID,
          'postcode': dataObject.Payload.Main.Postcode.P6,
          'number': dataObject.Payload.Main.Number,
          'street': dataObject.Payload.Main.Street,
          'city': dataObject.Payload.Main.City,
          'county': dataObject.Payload.County,
          'province': dataObject.Payload.Province,
          'fullname': dataObject.Output,
          'location': {
            'lat': dataObject.Payload.Location.lat,
            'lng': dataObject.Payload.Location.lon
          }
        };
      });
  }
}
