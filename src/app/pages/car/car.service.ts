import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../../services/auth-http.service';
import { Profile } from '../../models/profile';
import { environment } from '../../../environments/environment';
import { Car, CarInsurance, CarCoverageRecommendation, CarCompare, Proposal } from './../../models';

@Injectable()
export class CarService {
  constructor(private authHttp: AuthHttp) {
  }

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(`${environment.james.cars}/${licensePlate}`)
      .map(res => <Car>res.json());
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean): Observable<CarCoverageRecommendation> {
    return this.authHttp.post(environment.james.carCoverage, { license: licensePlate })
      .map(res => <CarCoverageRecommendation>res.json());
  }

  public getInsurances(carRequest: CarCompare): Observable<Array<CarInsurance>> {
    return this.authHttp.post(environment.james.carCompare, JSON.stringify(carRequest))
      .map((res: Response) => res.json());
  }

  public getInsurancesWithDetails(carRequest: CarCompare): Observable<Array<CarInsurance>> {
    return this.authHttp.post(environment.james.carCompare, JSON.stringify(carRequest)).map(res => res.json())
      .flatMap((insurance) => {
        return Observable.forkJoin(
          Observable.of(insurance),
          this.authHttp.patch(environment.james.insurer, { product_id: insurance.product_id })
        );
      }).map((insuranceDetails) => {
        const insurance = insuranceDetails[0];
        const insurer = insuranceDetails[1];

        insurance._embedded.insurance.insurer = insurer;
        return insurance;
      });
  }

  public buyStatic(payload: Proposal): Observable<any> {
    return this.authHttp.post(environment.james.carBuy, JSON.stringify(payload))
      .map((res: Response) => res.json());
  }
}
