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
import 'rxjs/add/operator/withLatestFrom';

import * as fromCore from '../reducers';
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
      let prev = state.core.assistant.messages[state.core.assistant.messages.length - 1];
      let previousMessage = prev ? prev.data : null;

      return {
        payload: action,
        config: state.core.assistant.config,
        prev: previousMessage
      };
    })
    .switchMap((combined: any) => {
      let key = combined.payload.key;
      let value = combined.payload.value;

      let message: any;
      let prop = key.split('.').reduce((o, i) => o[i], combined.config);
      if (typeof prop === 'function') {
        message = value ? prop(value) : prop();
      } else {
        message = prop;
      }
      if (message !== combined.prev) {
        // Only emit add message action if it's different than previous
        return combined.payload.clear ?
        Observable.of(
          { payload: null, type: assistant.CLEAR_MESSAGES },
          { payload: message, type: assistant.ADD_MESSAGE })
        : Observable.of({ payload: message, type: assistant.ADD_MESSAGE });
      }
      return Observable.of({ type: 'NO_ACTION' });
    });

    @Effect({ dispatch: false })
    init$: Observable<any> = defer(() => {
      let config = this.assistantService.config;
      if (config) {
        this.store$.dispatch(new assistant.LoadConfigAction(config));
      }
    });

  constructor(private actions$: Actions, private store$: Store<fromCore.State>, private assistantService: AssistantService) { }
}
