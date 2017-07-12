import { SaveSuccessAction } from './../actions/profile';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { ProfileService } from '../services/profile.service';
import { Profile, Settings } from '../models';
import * as fromRoot from '../reducers';
import * as settings from '../actions/settings';

@Injectable()
export class SettingsEffects {

  @Effect()
  updateSettings$ = this.action$
    .ofType(settings.UPDATE_SETTINGS_REQUEST)
    .withLatestFrom(this.store$, (action, state) => {
      return {
        payload: action.payload,
        profile: state.profile.profile
      };
    })
    .switchMap((stateAndAction: any) => {
      return this.profileService.updateSettings(stateAndAction.profile._id, stateAndAction.payload)
        .map((p: Settings) => new settings.UpdateSettingsSuccessAction(p))
        .catch(error => Observable.of(new settings.UpdateSettingsFailAction(error)));
    });

  constructor(private action$: Actions, private store$: Store<fromRoot.State>, private profileService: ProfileService) { }
}
