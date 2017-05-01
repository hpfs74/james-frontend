import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';

@Injectable()
export class CarService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private http: Http) {
    this.baseUrl = configService.config.api.nicciProxy.address;
  }

  getByLicense(licensePlate: string): Observable<Car> {
    let url = this.baseUrl + `/cars/${licensePlate}`;
    return this.http.get(url)
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
