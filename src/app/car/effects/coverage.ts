
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { Car, CarCoverageRecommendation } from '../models';
import { CarService } from '../services/car.service';
import * as fromCar from '../reducers';

import * as coverage from '../actions/coverage';
import * as car from '../actions/car';

@Injectable()
export class CoverageEffects {

  @Effect()
  carCoverage$: Observable<Action> = this.action$
    .ofType(coverage.CAR_COVERAGE_REQUEST)
    .map((action: coverage.CarCoverageAction) => action.payload)
    .switchMap((payload) =>
      this.carService.getCoverageRecommendation(payload.license, payload.activeLoan)
        .map((res: any) => new coverage.CarCoverageCompleteAction(res))
        .catch(error => Observable.of(new coverage.CarCoverageFailureAction(error))));

  @Effect()
  carCoverageFromInfo$ = this.action$
    .ofType(car.GET_INFO_SUCCESS)
    .map((action: car.GetInfoCompleteAction) => action.payload)
    .withLatestFrom(this.store$.select(fromCar.GetCoverageActiveLoan))
    .filter(([payload, activeLoan]) => activeLoan !== null)
    .switchMap(([payload, activeLoan]) => {
      return Observable.of({
        type: coverage.CAR_COVERAGE_REQUEST,
        payload: {
          license: payload.license,
          activeLoan: activeLoan
        }
      });
    });

    @Effect()
    carCoverageFromLoan$ = this.action$
      .ofType(coverage.CAR_COVERAGE_SET_ACTIVE_LOAN)
      .map((action: coverage.CarCoverageSetActiveLoan) => action.payload)
      .withLatestFrom(this.store$.select(fromCar.getCarLicense))
      .filter(([payload, license]) => license !== null)
      .switchMap(([payload, license]) => {
        return Observable.of({
          type: coverage.CAR_COVERAGE_REQUEST,
          payload: {
            license: license,
            activeLoan: payload
          }
        });
      });

  constructor(private store$: Store<fromCar.State>, private action$: Actions, private carService: CarService) { }
}
