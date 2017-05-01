import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';

import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';

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
        console.log(res);
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
}
