import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';
import { HouseDataResponse, HouseDataRequest } from '@app/house/models/house-data';
import { HouseHoldPremiumRequest, HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HouseHoldService {
  constructor(private http: Http) {}

  public getHouseData(req: HouseDataRequest) {
    return this.http.get(`${environment.riskInsurance.getHouseData}?`
      + `Zipcode=${req.Zipcode}&houseNumber=${req.HouseNumber}&houseNumberAddition=${req.HouseNumberAddition || ''}`)
      .map(res => <HouseDataResponse>res.json());
  }

  public calculateHouseHoldAmount(req: HouseHoldAmountRequest): Observable<HouseHoldAmountResponse> {
    return this.http.post(environment.riskInsurance.HouseHoldAmount, req)
      .map(res => <HouseHoldAmountResponse>res.json());
  }

  public calculatePremiums(req: HouseHoldPremiumRequest): Observable<HouseHoldPremiumResponse> {
    return this.http.post(environment.riskInsurance.HouseHoldPremium, req)
      .map(res => <HouseHoldPremiumResponse>res.json());
  }
}
