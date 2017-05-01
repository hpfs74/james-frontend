import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';
import { Price } from '../../models/price';

@Injectable()
export class CarService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    //this.baseUrl = configService.config.api.james.car;
  }

  getByLicense(licensePlate: string): Observable<Car> {
    let url = this.baseUrl + `/cars/${licensePlate}`;
    return this.authHttp.get(url)
      .map(res => {
        if (res.json) {
          return res.json().data as Car;
        } else {
          return [];
        }
      });
      //"error": "license_not_found"
      //201, 400, 501
      //.catch(this.handleError);
  }

  getCoverages(): Array<Price> {
    return [
      {
        header: 'WA',
        badge: 'ons advies',
        features: [
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 18.50
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
        highlight: true
      },
      {
        header: 'WA limited',
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
        price: 30.19
      }
    ];
  }
}
