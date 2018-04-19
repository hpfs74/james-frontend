import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import * as packagePremiumActions from '../actions/package-premium';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { PackagePremiumResponse } from '@app/house/models/package-premium';


@Injectable()
export class PackagePremiumEffects {
  @Effect()
  newBuy: Observable<Action> = this.actions$
    .ofType(packagePremiumActions.NEW_BUY)
    .map((action: packagePremiumActions.NewBuy) => action.payload)
    .switchMap((req) =>
      this.houseHoldService.requestPrivatePackage(req)
        .map((res: PackagePremiumResponse) => new packagePremiumActions.NewBuyComplete(res))
        .catch(error => Observable.of(new packagePremiumActions.NewBuyFailure(error))));

  constructor(private actions$: Actions,
              private houseHoldService: HouseHoldService) {
  }
}
