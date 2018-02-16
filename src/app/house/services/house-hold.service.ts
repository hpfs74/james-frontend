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

    return this.http.post<HouseHoldAmountResponse>(
      environment.riskInsurance.HouseHoldAmount,
      this.filterInsuredAmountDate(req),
      {
        headers: httpOptions.headers
      })
    // TODO: remove as soon as risk solve the problem
      .map(res => Object.assign(res, {InsuredAmount: res.InsuredAmount / 100}));
  }

  /**
   * get all insurance
   * @param {HouseHoldPremiumRequest} req
   * @returns {Observable<HouseHoldPremiumResponse>}
   */
  public calculatePremiums(req: HouseHoldPremiumRequest): Observable<HouseHoldPremiumResponse> {

    return this.http.post<HouseHoldPremiumResponse>(
      environment.riskInsurance.HouseHoldPremium,
      this.filterPremiumsDate(req),
      {
        headers: httpOptions.headers
      })
    // TODO: remove as soon as risk solve the problem with the money
      .map(res => {
        return {
          CalculatedPremiums: res.CalculatedPremiums.map(this.filterAmountError)
        } as HouseHoldPremiumResponse;
      });
  }

  /**
   * convert number by dividing by 100 for an issue with risk insurance
   *
   * @param {CalculatedPremium} data
   * @returns {CalculatedPremium}
   */
  private filterAmountError(data: CalculatedPremium): CalculatedPremium {
    return Object.assign(data, {
      NettoPremium: data.NettoPremium / 100,
      TotalCosts: data.TotalCosts / 100,
      Taxes: data.Taxes / 100,
      Premium: data.Premium / 100,
      Deductables: data.Deductables / 100,
      ValuablesInsuredAmount: data.ValuablesInsuredAmount / 100
    });
  }

  /**
   * convert a date to risk api format
   */
  private toRiskDate(date): number {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return +`${date.getFullYear()}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;
  }

  private filterInsuredAmountDate(data: HouseHoldAmountRequest): HouseHoldAmountRequest {

    return Object.assign(data, {
      BreadWinnerBirthdate: this.toRiskDate(data.BreadWinnerBirthdate)
    });
  }

  private filterPremiumsDate(data: HouseHoldPremiumRequest): HouseHoldPremiumRequest {
    return Object.assign(data, {
      CommencingDate: this.toRiskDate(data.CommencingDate),
      Birthdate: this.toRiskDate(data.Birthdate),
      BreadWinnerBirthdate: this.toRiskDate(data.BreadWinnerBirthdate)
    });
  }

}
