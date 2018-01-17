import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house-hold/models/house-hold-amount';
import { HouseData } from '@app/house-hold/models/house-data';
import { HouseHoldPremiumRequest } from '@app/house-hold/models/house-hold-premium';

@Injectable()
export class HouseHoldService {
  constructor(private http: Http) {}

  public getHouseData(postcode: string, houseNumber: number, addition = '') {
    return this.http.get(`${environment.riskInsurance.getHouseData}?`
      + `Zipcode=${postcode}&houseNumber=${houseNumber}&houseNumberAddition=${addition}`)
      .map(res => <HouseData>res.json());
  }

  public calculateHouseHoldAmount(req: HouseHoldAmountRequest) {
    return this.http.post(environment.riskInsurance.HouseHoldAmount, req)
      .map(res => res.json());
  }

  public calculatePremiums(req: HouseHoldPremiumRequest) {
    return this.http.post(environment.riskInsurance.HouseHoldPremium, req)
      .map(res => res.json());
  }
}
