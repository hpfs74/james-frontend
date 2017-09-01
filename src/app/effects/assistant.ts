import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as fromRoot from '../reducers';
import * as assistant from '../actions/assistant';
import { AssistantService } from '../services/assistant.service';
import { AssistantConfig, CannedMessageType } from './../models';

@Injectable()
export class AssistantEffects {
  @Effect()
  cannedMessage$ = this.actions$
    .ofType(assistant.ADD_CANNED_MESSAGE)
    .map((action: assistant.AddCannedMessage) => action.payload)
    .withLatestFrom(this.store$, (action, state) => {
      return {
        payload: action,
        config: state.assistant.config
      };
    })
    .switchMap((combined: any) => {
      let key = combined.payload.key;
      let value = combined.payload.value;

      let message;
      let prop = key.split('.').reduce((o, i) => o[i], combined.config);
      if (typeof prop === 'function') {
        let fnCall = value ? prop(value) : prop();
        message = fnCall;
      } else {
        message = prop;
      }
      return combined.payload.clear ?
        Observable.of(
          { type: assistant.CLEAR_MESSAGES, payload: message },
          { type: assistant.ADD_MESSAGE, payload: message })
        : Observable.of({ type: assistant.ADD_MESSAGE, payload: message });
    });

    @Effect({ dispatch: false })
    init$: Observable<any> = defer(() => {
      let config = this.assistantService.config;
      if (config) {
        this.store$.dispatch(new assistant.LoadConfigAction(config));
      }
    });

  constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private assistantService: AssistantService) { }
}
