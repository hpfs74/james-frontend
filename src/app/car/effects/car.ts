
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { CarService } from '../services/car.service';
import { Car, CarCoverageRecommendation } from '../models';

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
  buyCarInsurance$: Observable<Action> = this.actions$
    .ofType(car.BUY_REQUEST)
    .map((action: car.Buy) => action.payload)
    .switchMap((payload) =>
      this.carService.buyStatic(payload)
        .map((res: Response) => new car.BuyComplete(res))
        .catch(error => Observable.of(new car.BuyFailure(error))));

  constructor(private actions$: Actions, private carService: CarService) { }
}
