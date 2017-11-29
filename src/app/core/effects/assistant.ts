import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as fromApp from '../reducers';
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
      let prev = state.app.assistant.messages[state.app.assistant.messages.length - 1];
      let previousMessage = prev ? prev.data : null;

      return {
        payload: action,
        config: state.app.assistant.config,
        prev: previousMessage
      };
    })
    .switchMap((combined: any) => {
      let key = combined.payload.key;
      let value = combined.payload.value;

      let message: any;
      let prop = key.split('.').reduce((o, i) => o[i], combined.config);
      if (typeof prop === 'function') {
        let fnCall = value ? prop(value) : prop();
        message = fnCall;
      } else {
        message = prop;
      }
      if (message !== combined.prev) {
        // Only emit add message action if it's different than previous
        const messagePayload = { message: message, lookupKey: key };

        return combined.payload.clear ?
        Observable.of(
          { payload: null, type: assistant.CLEAR_MESSAGES },
          { payload: messagePayload, type: assistant.ADD_MESSAGE })
        : Observable.of({ payload: messagePayload, type: assistant.ADD_MESSAGE });
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

  constructor(private actions$: Actions, private store$: Store<fromApp.State>, private assistantService: AssistantService) { }
}
