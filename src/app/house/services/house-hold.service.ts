import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';
import { HouseDataResponse, HouseDataRequest } from '@app/house/models/house-data';
import { HouseHoldPremiumRequest, HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
/**
 * handle all the request to the house hold service
 */
export class HouseHoldService {
  constructor(private http: HttpClient) {
  }

  /**
   * get information about the house
   * @param {HouseDataRequest} req - address of the house
   * @returns {Observable<HouseDataResponse>}
   */
  public getHouseData(req: HouseDataRequest): Observable<HouseDataResponse> {
    const params = new HttpParams();

    params.append('Zipcode', req.Zipcode);
    params.append('houseNumber', req.HouseNumber.toString());
    params.append('houseNumberAddition', req.HouseNumberAddition || '');

    return this.http.get<HouseDataResponse>(environment.riskInsurance.getHouseData,
      Object.assign(httpOptions, {params: params}));
  }

  /**
   * get the amount of supported insurance
   * @param {HouseHoldAmountRequest} req
   * @returns {Observable<HouseHoldAmountResponse>}
   */
  public calculateHouseHoldAmount(req: HouseHoldAmountRequest): Observable<HouseHoldAmountResponse> {

    return this.http.post<HouseHoldAmountResponse>(environment.riskInsurance.HouseHoldAmount, req, {headers: httpOptions.headers})
      .map(res => Object.assign(res, {InsuredAmount: res.InsuredAmount / 100.0}));
  }

  /**
   * get all insurance
   * @param {HouseHoldPremiumRequest} req
   * @returns {Observable<HouseHoldPremiumResponse>}
   */
  public calculatePremiums(req: HouseHoldPremiumRequest): Observable<HouseHoldPremiumResponse> {

    return this.http.post<HouseHoldPremiumResponse>(environment.riskInsurance.HouseHoldPremium, req, {headers: httpOptions.headers})
      .map(res => <HouseHoldPremiumResponse>res);
  }
}
