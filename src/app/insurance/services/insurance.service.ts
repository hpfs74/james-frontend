import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../../auth/services/auth-http.service';
import { environment } from '../../../environments/environment';
import { Insurer } from '../models';

@Injectable()
export class InsuranceService {
  private baseUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.baseUrl = environment.james.insurer;
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

  public getPurchasedCarInsurances(): Observable<any> {
    return this.authHttp.get('https://middleware.test.knabverzekeren.nl/api/v1/proxy/userCarInsurance')
      .map(res => res.json());
  }
}
