import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { AuthHttp } from '../../auth/services';
import { Address } from '../models/address';

@Injectable()
export class AddressService {
  private baseUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.baseUrl = environment.james.address;
  }

  public lookupAddress(postalCode: string, houseNumber: string, houseNumberExtension?: string): Observable<Address> {
    const body = {
      zipcode: postalCode,
      number: + houseNumber + (houseNumberExtension ? '-' + houseNumberExtension : ''),
      address: `${postalCode}${+houseNumber + (houseNumberExtension ? '-' + houseNumberExtension : '')}`
    };
    return this.authHttp.post(this.baseUrl, body)
      .map((res) => res.json());
  }
}
