import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from '../../services/auth-http.service';
import { User } from '../../models/user';
import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';
import { CarInsurance } from '../../models/car-insurance';
import { Price } from '../../models/price';
import { Address } from '../../models/address';
import { CarCoverageRecommendation } from './../../models/coverage';
import { ICarInsuranceOptions, ICarUser, CarUser } from '../../models/car-prefs';

@Injectable()
export class CarService {
  private baseUrl: string;
  private helperUrl: string;
  private profileUrl: string;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.baseUrl = configService.config.api.james.car;
    this.helperUrl = configService.config.api.james.helper;
    this.profileUrl = configService.config.api.james.profile;
  }

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(this.baseUrl + `/${licensePlate}`)
      .map(res => <Car>res.json());
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean): Observable<CarCoverageRecommendation> {
    let url = this.helperUrl + '/car/coverage';
    return this.authHttp.post(url, { license: licensePlate })
      .map(res => <CarCoverageRecommendation>res.json());
  }

  public getInsurances(profile: User, car: Car, address: Address, options: ICarInsuranceOptions): Observable<CarInsurance> {
    if (!profile || !car || !options) {
      return;
    }

    // let url = this.profileUrl + '/insurances/compare/car/';
    // let carUser = new CarUser(profile, car, address, options);

    // return this.authHttp.post(url, JSON.stringify(carUser))
    //   .map(res => <CarInsurance>res.json());
  }

  public getCoverages(): Array<Price> {
    // CL (coverage_recommandation_liability_text),
    // CLC(coverage_recommandation_limited_casco_text)
    // CAR(coverage_recommandation_all_risk_text)

    return [
      {
        id: 'CL',
        header: 'WA',
        badge: 'ons advies',
        features: [
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        highlight: false
      },
      {
        id: 'CLC',
        header: 'WA + Casco',
        badge: 'ons advies',
        features: [
          'Brand en storm',
          'Ruitschade',
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        highlight: false
      },
      {
        id: 'CAR',
        header: 'All risk',
        badge: 'ons advies',
        features: [
          'Schade door anderen',
          'Diefstal',
          'Inbraak',
          'Brand en storm',
          'Ruitschade',
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        highlight: false
      }
    ];
  }
}
