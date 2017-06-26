import { SaveSuccessAction } from './../actions/profile';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

// import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { ProfileService } from '../services/profile.service';
import * as profile from '../actions/profile';
import * as insurances from '../actions/insurances';
import { Profile } from '../models/profile';

@Injectable()
export class ProfileEffects {

  @Effect()
  loadProfile$: Observable<Action> = this.action$
    .ofType(profile.LOAD_PROFILE_REQUEST)
    .startWith(new profile.LoadAction)
    .switchMap(() =>
      this.profileService.getUserProfile()
        .mergeMap((p: Profile) => {
          return [
            new profile.LoadSuccessAction(p),
            new insurances.LoadSuccessAction(p._embedded.insurance.documents)
          ];
        })
        .catch(error => Observable.of(new profile.LoadFailAction(error))));

  @Effect()
  saveProfile$: Observable<Action> = this.action$
    .ofType(profile.SAVE_PROFILE_REQUEST)
    .map((action: profile.SaveAction) => action.payload)
    .switchMap((payload: Profile) => {
      let flatProfile = payload;
      let address = payload.address;
      delete flatProfile.address;
      flatProfile = Object.assign(flatProfile, address);

      console.log(flatProfile);

      return this.profileService.updateUserProfile(flatProfile)
        .map((p: Profile) => new profile.SaveSuccessAction(p))
        .catch(error => Observable.of(new profile.SaveFailAction(error)));
    });

  constructor(private action$: Actions, private profileService: ProfileService) { }
}
