
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { CarService } from '../pages/car/car.service';
import * as coverage from '../actions/coverage';

@Injectable()
export class CoverageEffects {

  @Effect()
  carCoverage$: Observable<Action> = this.action$
    .ofType(coverage.CAR_COVERAGE_REQUEST)
    .map((action: coverage.CarCoverageAction) => action.payload)
    .switchMap((payload) =>
      this.carService.getCoverageRecommendation(payload.license, payload.loan)
        .map((res: any) => new coverage.CarCoverageCompleteAction(res))
        .catch(error => Observable.of(new coverage.CarCoverageFailAction(error))));


  constructor(private action$: Actions, private carService: CarService) { }
}
