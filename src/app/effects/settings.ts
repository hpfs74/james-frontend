import { SaveSuccessAction } from './../actions/profile';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { ProfileService } from '../services/profile.service';
import { Settings } from '../models/settings';
import * as settings from '../actions/settings';

@Injectable()
export class SettingsEffects {

  @Effect()
  updateSettings$: Observable<Action> = this.action$
    .ofType(settings.UPDATE_SETTINGS_REQUEST)
    .map((action: settings.UpdateSettingsAction) => action.payload)
    .switchMap((payload: Settings) => {
      return this.profileService.updateSettings(payload)
        .map((p: Settings) => new settings.UpdateSettingsSuccessAction(p))
        .catch(error => Observable.of(new settings.UpdateSettingsFailAction(error)));
    });

  constructor(private action$: Actions, private profileService: ProfileService) { }
}
