import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
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
import { AssistantConfig, CannedMessageType } from './../models/assistant';

@Injectable()
export class AssistantEffects {
  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => {
    let config = this.assistantService.config;
    if (config) {
      this.store$.dispatch(new assistant.LoadConfigAction(config));
    }
  });

  @Effect({ dispatch: false })
  cannedMessage$ = this.actions$
    .ofType(assistant.ADD_CANNED_MESSAGE)
    .map((action: assistant.AddCannedMessage) => action.payload)
    .withLatestFrom(this.store$, (action, state) => {
      return {
        payload: action.payload,
        config: state.assistant.config
      };
    })
    .do((combined: any) => {
      let key = combined.payload.key;
      let value = combined.payload.value;
      let message = combined.config[key](value);
      this.store$.dispatch(new assistant.AddMessageAction(message));
    });

  constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private assistantService: AssistantService) { }
}
