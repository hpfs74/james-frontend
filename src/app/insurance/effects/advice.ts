import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { AdviceService } from '../services/advice.service';
import * as insurance from '../actions/insurance';
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

  constructor(private actions$: Actions, private adviceService: AdviceService) {
  }
}
