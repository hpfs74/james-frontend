import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { AuthHttp } from '../../auth/services/auth-http.service';
import { Profile } from '../../profile/models';
import { environment } from '../../../environments/environment';
import { Car, CarInsurance, CarCoverageRecommendation, CarCompare, Proposal } from '../models';

@Injectable()
export class CarService {
  constructor(private authHttp: AuthHttp) {}

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(`${environment.james.cars}/${licensePlate}`)
      .map(res => <Car>res.json());
  }

  public getCoverageRecommendation(licensePlate: string, loan: boolean = false): Observable<CarCoverageRecommendation> {
    const headers = new Headers();
    headers.append('version', 'v2');
    return this.authHttp.post(environment.james.carCoverage, { active_loan: !!loan, license: licensePlate }, { headers })
      .map(res => <CarCoverageRecommendation>res.json());
  }

  public getInsurances(carRequest: CarCompare): Observable<Array<CarInsurance>> {
    const headers = new Headers();
    headers.append('version', 'v2');
    return this.authHttp.post(environment.james.carCompare, JSON.stringify(carRequest), { headers })
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
