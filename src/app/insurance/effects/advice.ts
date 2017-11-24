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

import { AdviceService } from '../services/advice.service';
import * as insurance from '../actions/insurance';
import * as advice from '../actions/advice';

@Injectable()
export class AdviceEffects {
  @Effect()

  @Effect()
  getAdvice$: Observable<Action> = this.actions$
    .ofType(advice.GET_ADVICE)
    .map((action: advice.Get) => action.payload)
    .switchMap((adviceId) => {
      return this.adviceService.getAdvice(adviceId)
        .map((res: Response) => new insurance.GetPurchasedCarInsurancesSuccess(res))
        .catch(error => Observable.of(new insurance.GetPurchasedCarInsurancesFailure(error)));
    });

  constructor(private actions$: Actions, private adviceService: AdviceService) {
  }
}
