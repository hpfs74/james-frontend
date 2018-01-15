import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { AdviceService } from '../services/advice.service';

import * as fromInsurance from '../../insurance/reducers';
import * as advice from '../actions/advice';

@Injectable()
export class AdviceEffects {
  @Effect()
  getAdvice$: Observable<Action> = this.actions$
    .ofType(advice.GET_ADVICE)
    .map((action: advice.Get) => action.payload)
    .switchMap((adviceId) => {
      return this.adviceService.getAdvice(adviceId)
        .map((res: Response) => new advice.GetSuccess(res))
        .catch(error => Observable.of(new advice.GetFailure(error)));
    });

  @Effect()
  saveAdvice$: Observable<Action> = this.actions$
    .ofType(advice.SAVE_LATEST_ADVICE)
    .map((action: advice.SaveLatest) => action.payload)
    .withLatestFrom(this.store$, (payload, state: any) => {
      const advice = state.insurance.advice;

      if (advice.selectedId) {
        let adviceToSave = advice.advice[advice.selectedId];
        adviceToSave.insurance = payload._id;
        adviceToSave.insurance_id = payload._id;
        adviceToSave.location_info = adviceToSave.address;
        return adviceToSave;
      }
    })
    .switchMap((adviceData) => {
      return this.adviceService.saveAdvice(adviceData)
        .map((res: Response) => new advice.SaveLatestSuccess(res))
        .catch(error => Observable.of(new advice.SaveLatestFailure(error)));
    });

  @Effect()
  removeAdvice$: Observable<Action> = this.actions$
    .ofType(advice.REMOVE_LATEST_INSURANCE_ADVICE)
    .withLatestFrom(this.store$, (payload, state: any) => {

      if (state.insurance.insurance.savedInsurances) {
        let savedAdvices = state.insurance.insurance.savedInsurances.car.insurance_advice;

        if (savedAdvices.length) {
          return savedAdvices[0];
        }
      }
    })
    .switchMap((latestAdvice) => {
      if (latestAdvice) {
        return this.adviceService.removeAdvice(latestAdvice._id)
          .map((res: Response) => new advice.RemoveLatestInsuranceAdviceSuccess(latestAdvice))
          .catch(error => Observable.of(new advice.RemoveLatestInsuranceAdviceFailure(error)));
      } else {
        return Observable.of({ type: 'NO_ACTION' });
      }
    });

  constructor(private actions$: Actions, private adviceService: AdviceService, private store$: Store<fromInsurance.InsuranceState>) {
  }
}
