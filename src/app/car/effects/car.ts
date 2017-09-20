
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { CarService } from '../services/car.service';
import { Car, CarCoverageRecommendation } from '../models';
import * as car from '../actions/car';

@Injectable()
export class CarEffects {

  @Effect()
  loadCarInfo$: Observable<Action> = this.actions$
    .ofType(car.GET_INFO_REQUEST)
    .map((action: car.GetInfoAction) => action.payload)
    .switchMap((license) =>
      this.carService.getByLicense(license)
        .map((res: Car) => new car.GetInfoCompleteAction(res))
        .catch(error => Observable.of(new car.GetInfoFailAction(error))));


  @Effect()
  buyCarInsurance$: Observable<Action> = this.actions$
    .ofType(car.BUY_REQUEST)
    .map((action: car.BuyAction) => action.payload)
    .switchMap((payload) =>
      this.carService.buyStatic(payload)
        .map((res: Response) => new car.BuyCompleteAction(res))
        .catch(error => Observable.of(new car.BuyFailAction(error))));

  constructor(private actions$: Actions, private carService: CarService) { }
}
