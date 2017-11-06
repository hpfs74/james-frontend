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

import { InsuranceService } from '../services/insurance.service';
import * as insurance from '../actions/insurance';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class InsuranceEffects {
  @Effect()
  getPurchasedCarInsurances$: Observable<Action> = this.actions$
    .ofType(insurance.GET_PURCHASED_CAR_INSURANCES)
    .map((action: insurance.GetPurchasedCarInsurances) => action)
    .switchMap(() => {
      if (this.authService.isAnonymous()) {
        return Observable.of(new insurance.GetPurchasedCarInsurancesSuccess({}));
      }
      return this.insuranceService.getProfileInsurances()
        .map((res: Response) => new insurance.GetPurchasedCarInsurancesSuccess(res))
        .catch(error => Observable.of(new insurance.GetPurchasedCarInsurancesFailure(error)));
    });

  constructor(private actions$: Actions, private insuranceService: InsuranceService, private authService: AuthService) {
  }
}
