
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { CarService } from '../services/car.service';
import { BuyService } from '../../insurance/services/buy.service';
import { Car, CarCoverageRecommendation } from '../models';

import * as fromAuth from '../../auth/reducers';
import * as fromAdvice from '../../insurance/reducers';

import * as auth from '../../auth/actions/auth';
import * as car from '../actions/car';

@Injectable()
export class CarEffects {

  @Effect()
  loadCarInfo$: Observable<Action> = this.actions$
    .ofType(car.GET_INFO_REQUEST)
    .map((action: car.GetInfo) => action.payload)
    .switchMap((license) =>
      this.carService.getByLicense(license)
        .map((res: Car) => new car.GetInfoComplete(res))
        .catch(error => Observable.of(new car.GetInfoFailure(error))));

  @Effect()
  loadCarMeldcode$: Observable<Action> = this.actions$
    .ofType(car.GET_MELDCODE_REQUEST)
    .map((action: car.GetMeldcode) => action.payload)
    .switchMap((license) =>
      this.carService.getMeldcodeByLicense(license)
        .map((res: Car) => new car.GetMeldcodeComplete(res))
        .catch(error => Observable.of(new car.GetMeldcodeFailure(error))));

  @Effect()
  buyCarInsurance$ = this.actions$
    .ofType(car.BUY_REQUEST)
    .map((action: car.Buy) => action.payload)
    .withLatestFrom(this.store$.select(fromAuth.getLoggedIn), this.store$.select(fromAdvice.getSelectedAdvice))
    .switchMap(([payload, isLoggedIn, advice]) => {
      if (isLoggedIn) {
        return this.carService.buyStatic(payload)
        .map((res: Response) => new car.BuyComplete(res))
        .catch(error => Observable.of(new car.BuyFailure(error)));
      } else {
        // Manual processing of buy request without an account
        return this.buyService.buyInsuranceAnonymous(payload, advice)
        .map((res: Response) => new car.BuyComplete(res))
        .catch(error => Observable.of(new car.BuyFailure(error)));
      }
    });

  constructor(
    private actions$: Actions,
    private store$: Store<fromAuth.State>,
    private carService: CarService,
    private buyService: BuyService) { }
}
