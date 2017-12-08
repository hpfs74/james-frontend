import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { InsuranceService } from '../services/insurance.service';
import * as insurance from '../actions/insurance';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class InsuranceEffects {
  @Effect()
  getSavedCarInsurances$: Observable<Action> = this.actions$
    .ofType(insurance.GET_SAVED_CAR_INSURANCES)
    .map((action: insurance.GetSavedCarInsurances) => action)
    .switchMap(() => {
      if (this.authService.isAnonymous()) {
        return Observable.of(new insurance.GetSavedCarInsurancesSuccess({}));
      }
      return this.insuranceService.getProfileInsurances()
        .map((res: Response) => new insurance.GetSavedCarInsurancesSuccess(res))
        .catch(error => Observable.of(new insurance.GetSavedCarInsurancesFailure(error)));
    });

  constructor(private actions$: Actions, private insuranceService: InsuranceService, private authService: AuthService) {}
}
