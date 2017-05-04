import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from '../../services/auth-http.service';
import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';
import { Price } from '../../models/price';
import { CarCoverageRecommendation } from './../../models/coverage';

@Injectable()
export class CarService {
  private baseUrl: string;
  private helperUrl: string;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.baseUrl = configService.config.api.james.car;
    this.helperUrl = configService.config.api.james.helper;
  }

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(this.baseUrl + `/${licensePlate}`)
      .map(res=><Car>res.json());
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean): Observable<CarCoverageRecommendation> {
    let url = this.helperUrl + 'car/coverage';
    return this.authHttp.post(url, { license: licensePlate })
      .map(res=><CarCoverageRecommendation>res.json());
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
        price: 18.50,
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
        price: 21.59,
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
        price: 30.19,
        highlight: false
      }
    ];
  }
}
