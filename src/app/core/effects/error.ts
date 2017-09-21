

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Response } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

import * as fromRoot from '../reducers';
import * as fromAuth from '../../auth/reducers';

import * as auth from '../../auth/actions/auth';
import * as car from '../../car/actions/car';
import * as compare from '../../car/actions/compare';
import * as coverage from '../../car/actions/coverage';
import * as insurances from '../../insurance/actions/insurances';
import * as profile from '../../profile/actions/profile';

@Injectable()
export class ErrorEffects {

  @Effect()
  forbiddenError$: Observable<Action> = this.actions$
    .ofType
    <auth.RefreshTokenFailure |
    profile.LoadFailAction |
    profile.SaveFailAction |
    car.GetInfoFailAction |
    car.BuyFailAction |
    compare.LoadCarFailAction |
    coverage.CarCoverageFailAction |
    insurances.AddInsuranceFailAction |
    insurances.LoadFailAction>(
    auth.REFRESH_FAILURE,
    profile.LOAD_PROFILE_FAILURE,
      profile.SAVE_PROFILE_FAILURE,
      car.GET_INFO_FAILURE,
      car.BUY_FAILURE,
      compare.LOAD_CAR_COMPARE_FAILURE,
      coverage.CAR_COVERAGE_FAILURE,
      insurances.ADD_INSURANCE_FAILURE,
      insurances.LOAD_FAILURE
    )
    .map(action => action.payload)
    .withLatestFrom(this.store$)
    .filter(([action, storeState]) => {
      // only continue if user is logged in to prevent credentials modal on login page
      return storeState.auth.status.loggedIn;
    })
    .map((actionAndStoreState) => actionAndStoreState[0])
    .filter(error => error instanceof Response && error.status === 401 || error.status === 403)
    .switchMap(error => Observable.of(new auth.RequestCredentials));

  constructor(private actions$: Actions, private store$: Store<fromAuth.State>) { }
}

