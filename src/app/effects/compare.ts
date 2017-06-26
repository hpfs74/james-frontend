import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { LoadSuccessAction } from './../actions/compare';
import * as compare from '../actions/compare';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

//TODO: support multiple insurance type comparisons
import { CarService } from '../pages/car/car.service';

@Injectable()
export class CompareEffects {

  @Effect()
  loadCarCompare$: Observable<Action> = this.action$
    .ofType(compare.LOAD_COMPARE)
    .map((action: compare.LoadAction) => action.payload)
    .switchMap((payload) =>
      this.carService.getInsurances(payload)
        .map((res) => new compare.LoadSuccessAction(res))
        .catch(error => Observable.of(new compare.LoadFailAction(error))));

  constructor(private action$: Actions, private carService: CarService) { }
}
