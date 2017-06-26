import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as compare from '../actions/compare';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { CarService } from '../pages/car/car.service';

@Injectable()
export class CompareEffects {

  @Effect()
  loadCarCompare$: Observable<Action> = this.action$
    .ofType(compare.LOAD_CAR_COMPARE)
    .map((action: compare.LoadCarAction) => action.payload)
    .switchMap((payload) =>
      this.carService.getInsurances(payload)
        .map((res) => new compare.LoadCarSuccessAction(res))
        .catch(error => Observable.of(new compare.LoadCarFailAction(error))));

  constructor(private action$: Actions, private carService: CarService) { }
}
