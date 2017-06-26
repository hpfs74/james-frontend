
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
import { Car } from '../models/car';
import * as car from '../actions/car';

@Injectable()
export class CarEffects {

  @Effect()
  loadCarInfo$: Observable<Action> = this.action$
    .ofType(car.GET_INFO_REQUEST)
    .map((action: car.GetInfoAction) => action.payload)
    .switchMap((license) =>
      this.carService.getByLicense(license)
        .map((res: Car) => new car.GetInfoCompleteAction(res))
        .catch(error => Observable.of(new car.GetInfoFailAction(error))));

  constructor(private action$: Actions, private carService: CarService) { }
}
