import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';
import { Price } from '../../models/price';

interface CarRecommendation {
  wa: boolean;
  casco: boolean;
  allRisk: boolean;
};

@Injectable()
export class CarService {
  private baseUrl: string;



  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.baseUrl = configService.config.api.james.car;
  }

  getByLicense(licensePlate: string): Observable<Car> {
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

  getCoverages(car: Car, formData: any): Array<Price> {
    let recommendation: CarRecommendation = this.getCarCoverageRecommendation(car, formData);

    return [
      {
        header: 'WA',
        badge: 'ons advies',
        features: [
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 18.50,
        highlight: recommendation.wa || false
      },
      {
        header: 'WA + Casco',
        badge: 'ons advies',
        features: [
          'Brand en storm',
          'Ruitschade',
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 21.59,
        highlight: recommendation.casco
      },
      {
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
        highlight: recommendation.allRisk || false
      }
    ];
  }

  private getCarCoverageRecommendation(car: Car, formData: any): CarRecommendation {
    //#JAM-26
    // IF car age is less than ≤5, then all risk  , 6-9 limited casco, > 9 liability.
    // If active loan, then all risk.
    // Premium should never be more than 0.1*todays_value_of_the_car,
    // (unless WA is already more expensive than 0.1* today’’s_value_of_the_car)..

    let currentDate = new Date();
    let carDate = new Date(car.year, 12, 18);
    let diff = new Date(carDate.getTime() - currentDate.getTime());

    let yearDiff = Math.abs(diff.getUTCFullYear() - 1970); // Gives difference as year

    return {
      wa: yearDiff > 9,
      casco: yearDiff > 5 && yearDiff < 9,
      allRisk: yearDiff <= 5 || formData.loan
    };
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
