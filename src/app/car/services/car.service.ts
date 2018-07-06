import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from '../../auth/services/auth-http.service';
import { Profile } from '../../profile/models';
import { environment } from '@env/environment';
import { Proposal } from '@insurance/models/proposal';
import { Car, CarInsurance, CarCoverageRecommendation, CarCompare } from '../models';
import { Store } from '@ngrx/store';
import { ClickoutAnalyticsEvent } from '@app/core/models/analytics';
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
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class CarService {
  public affiliateUrls: Map<string, string> = new Map();
  constructor(private authHttp: AuthHttp,
              private store$: Store<fromRoot.State>,
              private router: Router) {
    this.setAffiliateUrls();
    window['carService'] = this;
  }
  /* tslint:disable */
  setAffiliateUrls(): void {
    this.affiliateUrls.set('www.anwb.nl/verzekeringen', 'https://ad.doubleclick.net/ddm/clk/422794744;224596201;j?http://www.awin1.com/awclick.php?gid=316560&mid=9795&awinaffid=508143&linkid=1015040&clickref_autoverzekering');
    this.affiliateUrls.set('autoweekautoverzekering.intramediair.nl', 'https://ad.doubleclick.net/ddm/clk/422695632;224596228;o?http://www.awin1.com/awclick.php?gid=320841&mid=8581&awinaffid=508143&linkid=2027328&clickref_autoverzekering');
    this.affiliateUrls.set('www.ditzo.nl', 'https://ad.doubleclick.net/ddm/clk/422695647;224596024;o?http://www.awin1.com/awclick.php?gid=316404&mid=8279&awinaffid=508143&linkid=1013292&clickref_autoverzekering');
    this.affiliateUrls.set('www.unive.nl', 'https://ad.doubleclick.net/ddm/clk/422694828;224534957;v?http://www.awin1.com/awclick.php?gid=316650&mid=8519&awinaffid=508143&linkid=1015638&clickref_autoverzekering');
    this.affiliateUrls.set('www.verzekeruzelf.nl', 'https://ad.doubleclick.net/ddm/clk/422693256;224534951;j?http://www.awin1.com/awclick.php?gid=319006&mid=8542&awinaffid=508143&linkid=2015088&clickref_autoverzekering');
  }
  /* tslint:enable */
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
          const analyticsEvent: ClickoutAnalyticsEvent = {
            event: 'clickout',
            page: this.router.url,
            event_label: 'car insurance application',
            loggedIn_Verzekeren: isLoggedIn ? 'y' : 'n',
            product_id: selectedInsurance.id,
            product_name: selectedInsurance['product_name']
          };
          this.store$.dispatch(new analytics.ClickOutEventAction(analyticsEvent));
          window.open(this.getAffiliateUrl(selectedInsurance._embedded.insurance.url), '_blank');
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
                      // path: ['/car/insurance', {adviceId: advice.id}],
                      path: ['/car/insurance']
                    }));
                  }
              });
          }
        }
      });
  }

  private getAffiliateUrl(url: string): string {
    // remove https or http from beginning and remove / from the end, just in case the exact urls are coming differently from backend
    const safeUrl = url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '');
    return this.affiliateUrls.get(safeUrl) || url;
  }
}
