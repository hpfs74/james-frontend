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
import { mockCarCoverages } from './../../models/car-coverage.mock';

@Injectable()
export class CarService {
  private baseUrl: string;
  private helperUrl: string;
  private compareUrl: string;
  private insurerUrl: string;

  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
    this.baseUrl = configService.config.api.james.car;
    this.helperUrl = configService.config.api.james.helper;
    this.compareUrl = configService.config.api.james.compare;
    this.insurerUrl = configService.config.api.james.insurer;
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

  public getInsurances(carRequest: CarCompareRequest): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.compareUrl + '/car', JSON.stringify(carRequest))
      .map((res: Response) => res.json());
  }

  public getInsurancesWithDetails(carRequest: CarCompareRequest): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.compareUrl + '/car', JSON.stringify(carRequest)).map(res => res.json())
      .flatMap((insurance) => {
        return Observable.forkJoin(
          Observable.of(insurance),
          this.authHttp.patch(this.insurerUrl + '/', { product_id: insurance.product_id })
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
