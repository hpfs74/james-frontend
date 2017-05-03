import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

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
    let url = this.baseUrl + `/${licensePlate}`;
    return this.authHttp.get(url)
      .map(res => {
        if (res.status === 200) {
          return res.json().data as Car;
        } else {
          //"error": "license_not_found"
          return [];
        }
      })
      .catch(this.handleError);
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean): Observable<CarCoverageRecommendation> {
    let url = this.helperUrl + 'car/coverage';

    return this.authHttp.post(url, { license: licensePlate })
      .map(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .catch(this.handleError);
  }

  public getCoverages(): Array<Price> {
    return [
      {
        id: 'WA',
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
        id: 'AR',
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

  /**
   * Error handler
   * @param error
   * @returns {ErrorObservable}
   */
  private handleError(error: Response) {
    return Observable.throw((error && error.json && error.json().error) || 'AIP:CarService:Server error');
  }
}
