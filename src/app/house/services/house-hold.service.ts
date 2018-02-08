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
  constructor(private http: Http) {
  }

  public getHouseData(req: HouseDataRequest) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `${environment.riskInsurance.getHouseData}?`
      + `Zipcode=${req.Zipcode}&houseNumber=${req.HouseNumber}&houseNumberAddition=${req.HouseNumberAddition || ''}`;
    return this.http.get(url, {headers: headers})
      .map(res => <HouseDataResponse>res.json());
  }

  public calculateHouseHoldAmount(req: HouseHoldAmountRequest): Observable<HouseHoldAmountResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(environment.riskInsurance.HouseHoldAmount, req, {headers: headers})
      .map(res => <HouseHoldAmountResponse>res.json())
      .map(res => Object.assign(res, {InsuredAmount: res.InsuredAmount / 100.0}));
  }

  public calculatePremiums(req: HouseHoldPremiumRequest): Observable<HouseHoldPremiumResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(environment.riskInsurance.HouseHoldPremium, req, {headers: headers})
      .map(res => <HouseHoldPremiumResponse>res.json());
  }
}
