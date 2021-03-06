import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as advice from '@app/insurance/actions/advice';
import { InsuranceService } from '@app/insurance/services/insurance.service';
import * as insurance from '@app/insurance/actions/insurance';
import * as AuthUtils from '@app/utils/auth.utils';
import * as fromInsurance from '@app/insurance/reducers';

@Injectable()
export class InsuranceEffects {
  @Effect()
  getSavedCarInsurances$: Observable<Action> = this.actions$
    .ofType(insurance.GET_INSURANCES)
    .map((action: insurance.GetInsurances) => action)
    .switchMap(() => {
      if (AuthUtils.tokenIsAnonymous()) {
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
      const savedInsurances = state.insurance.insurance.savedInsurances;
      const existedAdvices = savedInsurances ? savedInsurances.car.insurance_advice.filter(savedAdvice =>
        savedAdvice._id === advice.advice[advice.selectedId]._id) : null;

      if (advice.selectedId && !(existedAdvices && existedAdvices.length)) {
        let selectedInsurance = advice.advice[advice.selectedId];
        selectedInsurance.advice_item_id = state.insurance.advice.selectedInsurance.advice_item_id;
        return selectedInsurance;
      }
    })
    .switchMap((adviceData) => {
      if (adviceData && !AuthUtils.tokenIsAnonymous()) {
        return this.insuranceService.saveInsurance(adviceData)
          .map((res: Response) => {
            this.store$.dispatch(new advice.SaveLatest(res));

            return new insurance.SaveLatestSuccess(res);
          })
          .catch(error => Observable.of(new insurance.SaveLatestFailure(error)));
      } else {
        return Observable.of({ type: 'NO_ACTION' });
      }
    });

  constructor(private actions$: Actions,
              private insuranceService: InsuranceService,
              private store$: Store<fromInsurance.InsuranceState>) {}
}
