import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthHttp } from '../../services/auth-http.service';
import { Profile } from '../../models/profile';
import { ConfigService } from '../../config.service';
import { Car, CarInsurance, CarCoverageRecommendation, CarCompare, Proposal } from './../../models';

@Injectable()
export class CarService {
  constructor(private configService: ConfigService, private authHttp: AuthHttp) {
  }

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(`${this.configService.config.api.james.cars}/${licensePlate}`)
      .map(res => <Car>res.json());
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean): Observable<CarCoverageRecommendation> {
    return this.authHttp.post(this.configService.config.api.james.carCoverage, { license: licensePlate })
      .map(res => <CarCoverageRecommendation>res.json());
  }

  public getInsurances(carRequest: CarCompare): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.configService.config.api.james.carCompare, JSON.stringify(carRequest))
      .map((res: Response) => res.json());
  }

  public getInsurancesWithDetails(carRequest: CarCompare): Observable<Array<CarInsurance>> {
    return this.authHttp.post(this.configService.config.api.james.carCompare, JSON.stringify(carRequest)).map(res => res.json())
      .flatMap((insurance) => {
        return Observable.forkJoin(
          Observable.of(insurance),
          this.authHttp.patch(this.configService.config.api.james.insurer, { product_id: insurance.product_id })
        );
      }).map((insuranceDetails) => {
        var insurance = insuranceDetails[0];
        var insurer = insuranceDetails[1];

        insurance._embedded.insurance.insurer = insurer;
        return insurance;
      });
  }

  public buyStatic(payload: Proposal): Observable<any> {
    return this.authHttp.post(this.configService.config.api.james.carBuy, JSON.stringify(payload))
      .map((res: Response) => res.json());
  }
}
