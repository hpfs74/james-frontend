import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from '../../services/auth-http.service';
import { Profile } from '../../models/profile';
import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';
import { CarInsurance, } from '../../models/car-insurance';
import { Price } from '../../models/price';
import { Address } from '../../models/address';
import { CarCoverageRecommendation } from './../../models/coverage';
import { CarInsuranceOptions, CarUser } from '../../models/car-prefs';

// TODO: remove mock data
import { mockInsurances } from '../../models/car-insurance.mock';
import { mockCarCoverages } from './../../models/car-coverage.mock';

@Injectable()
export class CarService {
  private baseUrl: string;
  private helperUrl: string;
  private compareUrl: string;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.baseUrl = configService.config.api.james.car;
    this.helperUrl = configService.config.api.james.helper;
    this.compareUrl = configService.config.api.james.compare;
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

  public getInsurances(carRequest: CarUser): Observable<Array<CarInsurance>> {
    // TODO: for testing
    //return Observable.of(mockInsurances).delay(2000);
    return this.authHttp.post(this.compareUrl + '/car', JSON.stringify(carRequest))
      .map((res:Response) => res.json());
  }

  public getCoverages(): Array<Price> {
    return mockCarCoverages;
  }
}
