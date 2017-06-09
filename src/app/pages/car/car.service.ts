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
import { CarInsuranceOptions, CarCompareRequest } from '../../models/car-compare-request';

// TODO: remove mock data once API is available
import { mockCarCoverages } from './../../models/_mocks/car-coverage.mock';

@Injectable()
export class CarService {
  private api: any;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.api = {
      base: configService.config.api.james.car,
      helper: configService.config.api.james.helper,
      compare: configService.config.api.james.compare + '/car',
      coverage: configService.config.api.james.helper + '/car/coverage',
      insurer: configService.config.api.james.insurer
    };
  }

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(`${this.api.base}/${licensePlate}`)
      .map(res => <Car>res.json());
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean): Observable<CarCoverageRecommendation> {
    return this.authHttp.post(this.api.coverage, { license: licensePlate })
      .map(res => <CarCoverageRecommendation>res.json());
  }

  public getInsurances(carRequest: CarCompareRequest): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.api.compare, JSON.stringify(carRequest))
      .map((res: Response) => res.json());
  }

  public getInsurancesWithDetails(carRequest: CarCompareRequest): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.api.compare, JSON.stringify(carRequest)).map(res => res.json())
      .flatMap((insurance) => {
        return Observable.forkJoin(
          Observable.of(insurance),
          this.authHttp.patch(this.api.insurer, { product_id: insurance.product_id })
        );
      }).map((insuranceDetails) => {
        var insurance = insuranceDetails[0];
        var insurer = insuranceDetails[1];

        insurance._embedded.insurance.insurer = insurer;
        return insurance;
      });
  }

  public getCoverages(): Array<Price> {
    return mockCarCoverages;
  }
}
