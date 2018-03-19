import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';
import { HouseDataResponse, HouseDataRequest } from '@app/house/models/house-data';
import {
  CalculatedPremium, HouseHoldPremiumRequest,
  HouseHoldPremiumResponse
} from '@app/house/models/house-hold-premium';
import {
  HouseHoldStoredAdviceRequest,
  HouseHoldStoredAdviceResponse
} from '@app/house/models/house-hold-stored-advice';

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
    let params = new HttpParams();

    params = params.append('Zipcode', req.Zipcode);
    params = params.append('houseNumber', req.HouseNumber.toString());

    if (!req.HouseNumberAddition && req.HouseNumberAddition.length > 0) {
      params = params.append('houseNumberAddition', req.HouseNumberAddition);
    }

    return this.http.get<HouseDataResponse>(environment.riskInsurance.getHouseData,
      Object.assign(httpOptions, {params: params}));
  }

  /**
   * get the amount of supported insurance
   * @param {HouseHoldAmountRequest} req
   * @returns {Observable<HouseHoldAmountResponse>}
   */
  public calculateHouseHoldAmount(req: HouseHoldAmountRequest): Observable<HouseHoldAmountResponse> {

    return this.http.post<HouseHoldAmountResponse>(
      environment.riskInsurance.HouseHoldAmount,
      req,
      {
        headers: httpOptions.headers
      })
    // TODO: remove as soon as risk solve the problem
      .map(res => Object.assign(res, {InsuredAmount: res.InsuredAmount}));
  }

  /**
   * get all insurance
   * @param {HouseHoldPremiumRequest} req
   * @returns {Observable<HouseHoldPremiumResponse>}
   */
  public calculatePremiums(req: HouseHoldPremiumRequest): Observable<HouseHoldPremiumResponse> {

    return this.http.post<HouseHoldPremiumResponse>(
      environment.riskInsurance.HouseHoldPremium,
      req,
      {
        headers: httpOptions.headers
      })
      .map(res => {
        res.CalculatedPremiums.forEach(el => this.filterImageUrl(el));
        res.CalculatedPremiums.sort((a, b) => a.Premium - b.Premium);

        return res;
      });
  }

  /**
   * store the current advice and search criteria to the backend
   * for later purpose
   *
   * @param {HouseHoldStoredAdviceRequest} req - contians all information about the flow
   * @returns {Observable<HouseHoldStoredAdviceResponse>} - and id of the stored advice
   */
  public storeAdvice(req: HouseHoldStoredAdviceRequest): Observable<HouseHoldStoredAdviceResponse> {

    return null;
  }


  private filterImageUrl(res) {

    // TODO: This has to be moved in the middle layer, it should not be here, but in the meanwhile it is needed
    res.CompanyLogoUrl = res.CompanyLogoUrl
      .replace('https://webmodulet.risk-verzekeringen.nl/Webmodule/IMG/Maatschappijen/',
        'https://knab-dev.apigee.net/insurance/risk/v1/content/images/Maatschappijen/')
      .replace('https://webmodulea.risk-verzekeringen.nl/Webmodule/IMG/Maatschappijen/',
        'https://knab-acc.apigee.net/insurance/risk/v1/content/images/Maatschappijen/');
  }
}
