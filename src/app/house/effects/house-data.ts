import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';


import * as houseData from '../actions/house-data';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { HouseDataResponse } from '@app/house/models/house-data';

@Injectable()
export class HouseDataEffects {

  @Effect()
  loadHouseData$: Observable<Action> = this.actions$
    .ofType(houseData.GET_INFO_REQUEST)
    .map((action: houseData.GetInfo) => action.payload)
    .switchMap((address) =>
      this.houseHoldService.getHouseData(address)
        .map((res: HouseDataResponse) => new houseData.GetInfoComplete(res))
        .catch(error => Observable.of(new houseData.GetInfoFailure(error))));

  constructor(private actions$: Actions,
              private houseHoldService: HouseHoldService) {
  }
}
