import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from '../../services/auth-http.service';
import { Profile } from '../../models/profile';
import { ConfigService } from '../../config.service';
import { Car, CarInsurance, CarCoverageRecommendation, CarCompare } from './../../models';

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

  public getInsurances(carRequest: CarCompare): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.api.compare, JSON.stringify(carRequest))
      .map((res: Response) => res.json());
  }

  public getInsurancesWithDetails(carRequest: CarCompare): Observable<Array<CarInsurance>> {
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
}
