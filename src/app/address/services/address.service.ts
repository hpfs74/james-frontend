import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import { AuthHttp } from '../../auth/services';
import { Address } from '../models';

@Injectable()
export class AddressService {
  private baseUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.baseUrl = environment.james.address;
  }

  public lookupAddress(postalCode: string, houseNumber: string, houseNumberExtension?: string): Observable<Address> {
    const body = {
      zipcode: postalCode,
      number: + houseNumber + (houseNumberExtension || ''),
      address: `${postalCode}${+houseNumber + (houseNumberExtension || '')}`
    };
    return this.authHttp.post(this.baseUrl, body)
      .map((res) => res.json());
  }
}
