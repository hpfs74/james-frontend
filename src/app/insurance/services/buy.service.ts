
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from '../../auth/services/auth-http.service';
import { environment } from '@env/environment';
import { Proposal } from '../models/proposal';

@Injectable()
export class BuyService {
  constructor(private authHttp: AuthHttp) {}

  public buyInsuranceAnonymous(payload: Proposal): Observable<any> {
    return this.authHttp.post(environment.james.sdBuy, JSON.stringify(payload))
    .map((res: Response) => res.json());
  }
}
