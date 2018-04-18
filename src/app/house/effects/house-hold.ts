import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import * as houseHoldAmount from '../actions/house-hold-insurance-amount';
import * as houseHoldPremium from '../actions/house-hold-premium';
import * as houseHoldData from '../actions/house-hold-data';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';
import { HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';
import { HouseHoldStoredAdviceResponse } from '@app/house/models/house-hold-stored-advice';

@Injectable()
export class HouseHoldEffects {

  @Effect()
  getInsuredAmount$: Observable<Action> = this.actions$
    .ofType(houseHoldAmount.GET_INFO_REQUEST)
    .map((action: houseHoldAmount.GetInfo) => action.payload)
    .switchMap((req) =>
      this.houseHoldService.calculateHouseHoldAmount(req)
        .map((res: HouseHoldAmountResponse) => new houseHoldAmount.GetInfoComplete(res))
        .catch(error => Observable.of(new houseHoldAmount.GetInfoFailure(error))));

  @Effect()
  getPremiums: Observable<Action> = this.actions$
    .ofType(houseHoldPremium.GET_INFO_REQUEST)
    .map((action: houseHoldPremium.GetInfo) => action.payload)
    .switchMap((req) =>
      this.houseHoldService.calculatePremiums(req)
        .map((res: HouseHoldPremiumResponse) => new houseHoldPremium.GetInfoComplete(res))
        .catch(error => Observable.of(new houseHoldPremium.GetInfoFailure(error))));

  @Effect()
  storeAdvice: Observable<Action> = this.actions$
    .ofType(houseHoldData.STORE_ADVICE)
    .map((action: houseHoldData.StoreAdvice) => action.payload)
    .switchMap((req) =>
      this.houseHoldService.storeAdvice(req)
        .map((res: HouseHoldStoredAdviceResponse) => new houseHoldData.StoreAdviceComplete(res))
        .catch(error => Observable.of(new houseHoldData.StoreAdviceFailure(error))));

  @Effect()
  newBuy: Observable<Action> = this.actions$
    .ofType(houseHoldData.NEW_BUY)
    .map((action: houseHoldData.NewBuy) => action.payload)
    .switchMap((req) =>
      this.houseHoldService.requestPrivatePackage(req)
        .map(() => new houseHoldData.NewBuyComplete())
        .catch(error => Observable.of(new houseHoldData.NewBuyFailure(error))));


  constructor(private actions$: Actions,
              private houseHoldService: HouseHoldService) {
  }
}
