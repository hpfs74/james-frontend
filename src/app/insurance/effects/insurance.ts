import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as advice from '../actions/advice';
import { InsuranceService } from '../services/insurance.service';
import * as insurance from '../actions/insurance';
import { AuthService } from '../../auth/services/auth.service';
import * as fromInsurance from '../../insurance/reducers';

@Injectable()
export class InsuranceEffects {
  @Effect()
  getSavedCarInsurances$: Observable<Action> = this.actions$
    .ofType(insurance.GET_INSURANCES)
    .map((action: insurance.GetInsurances) => action)
    .switchMap(() => {
      if (this.authService.isAnonymous()) {
        return Observable.of(new insurance.GetInsurancesSuccess({}));
      }
      return this.insuranceService.getProfileInsurances()
        .map((res: Response) => new insurance.GetInsurancesSuccess(res))
        .catch(error => Observable.of(new insurance.GetInsurancesFailure(error)));
    });

  @Effect()
  saveInsurance$: Observable<Action> = this.actions$
    .ofType(insurance.SAVE_LATEST)
    .withLatestFrom(this.store$, (payload, state: any) => {
      const advice = state.insurance.advice;

      if (advice.selectedId) {
        let selectedInsurance = advice.advice[advice.selectedId];
        selectedInsurance.advice_item_id = state.insurance.advice.selectedInsurance.advice_item_id;
        return selectedInsurance;
      }
    })
    .switchMap((adviceData) => {
      return this.insuranceService.saveInsurance(adviceData)
        .map((res: Response) => {
          this.store$.dispatch(new advice.SaveLatest(res));

          return new insurance.SaveLatestSuccess(res);
        })
        .catch(error => Observable.of(new insurance.SaveLatestFailure(error)));
    });

  constructor(private actions$: Actions,
              private insuranceService: InsuranceService,
              private authService: AuthService,
              private store$: Store<fromInsurance.InsuranceState>) {}
}
