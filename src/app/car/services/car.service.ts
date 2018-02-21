import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from '../../auth/services/auth-http.service';
import { Profile } from '../../profile/models';
import { environment } from '@env/environment';
import { Proposal } from '@insurance/models/proposal';
import { Car, CarInsurance, CarCoverageRecommendation, CarCompare } from '../models';
import { Store } from '@ngrx/store';
import { AnalyticsEvent } from '@app/core/models/analytics';
import { Router } from '@angular/router';

import * as fromRoot from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as AuthUtils from '@app/utils//auth.utils';
import * as analytics from '@app/core/actions/analytics';
import * as router from '@app/core/actions/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

@Injectable()
export class CarService {
  constructor(private authHttp: AuthHttp,
              private store$: Store<fromRoot.State>,
              private router: Router) {}

  public getByLicense(licensePlate: string): Observable<Car> {
    return this.authHttp.get(`${environment.james.cars}/${licensePlate}`)
      .map(res => <Car>res.json());
  }

  public getMeldcodeByLicense(licensePlate: string): Observable<Car> {
    const headers = new Headers();
    headers.append('version', 'v2');
    return this.authHttp.get(`${environment.james.meldcode}/${licensePlate}`, { headers })
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
    let buyData = JSON.parse(JSON.stringify(payload));

    delete buyData.proposal._embedded;
    return this.authHttp.post(environment.james.carBuy, JSON.stringify(buyData))
      .map((res: Response) => res.json());
  }

  public startBuyFlow() {
    this.store$.select(fromInsurance.getSelectedInsurance)
      .filter(selectedInsurance => !!selectedInsurance)
      .take(1)
      .subscribe(selectedInsurance => {
        const isLoggedIn = !AuthUtils.tokenIsAnonymous();
        if (!selectedInsurance.supported) {
          const analyticsEvent: AnalyticsEvent = {
            event: 'clickout',
            page: this.router.url,
            event_label: 'car insurance application',
            loggedIn_Verzekeren: isLoggedIn ? 'y' : 'n',
            product_id: selectedInsurance.id,
            product_name: selectedInsurance['product_name']
          };
          this.store$.dispatch(new analytics.EventAction(analyticsEvent));
          window.open(selectedInsurance._embedded.insurance.url, '_blank');
        } else {
          if (isLoggedIn) {
            this.store$.select(fromInsurance.getSelectedAdviceId)
            .filter(selectedAdviceId => !!selectedAdviceId)
            .take(1)
            .subscribe(
              id => {
                this.store$.dispatch(new router.Go({
                  path: ['/car/insurance/contact-detail'],
                }));
              });
          } else {
            // INS-600 Anonymous Flow Stage 1: integrate modal to redirect user
            // this.store$.dispatch(new layout.OpenModal('authRedirectModal'));
            this.store$.select(fromInsurance.getSelectedAdvice)
              .filter(selectedAdvice => !!selectedAdvice)
              .take(1)
              .subscribe(
                advice => {
                  if (advice && advice.id) {
                    this.store$.dispatch(new router.Go({
                      path: ['/car/insurance', {adviceId: advice.id}],
                    }));
                  }
              });
          }
        }
      });
  }
}
