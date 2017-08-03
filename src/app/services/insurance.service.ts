import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from './auth-http.service';
import { ConfigService } from './../config.service';
import { Insurer } from '../models';

@Injectable()
export class InsuranceService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.baseUrl = configService.config.api.james.insurer;
  }

  public getInsurers(): Observable<Array<Insurer>> {
    return this.authHttp.get(this.baseUrl)
      .map(res => res.json());
  }

  public getInsurerById(id: string, productType: string): Observable<Insurer> {
    return this.authHttp.patch(this.baseUrl + `/${id}`, {
      productype: productType
    })
    .map(res => <Insurer>res.json());
  }

  public getInsurer(brand: string, productType: string, product: string, policyType: string): Observable<Array<Insurer>> {
    return this.authHttp.patch(this.baseUrl, {
      brand: brand,
      productype: productType,
      product: product,
      policy_type: policyType
    })
    .map(res => res.json());
  }
}
