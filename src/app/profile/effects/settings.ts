import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { ProfileService } from '../services/profile.service';
import { Settings } from '../models';

import * as fromProfile from '../reducers';
import * as settings from '../actions/settings';

@Injectable()
export class SettingsEffects {

  @Effect()
  updateSettings$ = this.actions$
    .ofType(settings.UPDATE_SETTINGS_REQUEST)
    .map((action: settings.UpdateSettingsAction) => action.payload)
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

  constructor(private actions$: Actions, private store$: Store<fromProfile.State>, private profileService: ProfileService) { }
}
