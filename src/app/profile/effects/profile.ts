import { SaveSuccessAction } from './../actions/profile';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

// import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import * as profile from '../actions/profile';
import * as insurances from '../../insurance/actions/insurance';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class ProfileEffects {

  @Effect()
  loadProfile$: Observable<Action> = this.action$
    .ofType(profile.LOAD_PROFILE_REQUEST)
    .switchMap(() => {
      if (this.authService.isAnonymous()) {
        return Observable.of(new profile.LoadSuccessAction(new Profile()));
      }
      return this.profileService.getUserProfile()
        .mergeMap((p: Profile) => {
          return [
            new profile.LoadSuccessAction(p),
            // TODO: change to insurances[] according to MW spec
            // new insurances.LoadSuccess(p._embedded.insurance.documents)
          ];
        })
        .catch(error => Observable.of(new profile.LoadFailAction(error)));
    });

  @Effect()
  saveProfile$: Observable<Action> = this.action$
    .ofType(profile.SAVE_PROFILE_REQUEST, profile.UPDATE_PROFILE)
    .map((action: profile.SaveAction) => action.payload)
    .switchMap((payload: Profile) => {
      return this.profileService.updateUserProfile(payload)
        .map((p: Profile) => new profile.SaveSuccessAction(p))
        .catch(error => Observable.of(new profile.SaveFailAction(error)));
    });

  @Effect()
  updateAddress$: Observable<Action> = this.action$
    .ofType(profile.UPDATE_ADDRESS_REQUEST)
    .map((action: profile.UpdateAddressAction) => action.payload)
    .switchMap((payload: Profile) => {
      return this.profileService.updateAddress(payload.postcode, payload.number, payload.number_extended.number_letter)
        .map((p: Profile) => new profile.UpdateAddressSuccessAction(p))
        .catch(error => Observable.of(new profile.UpdateAddressFailAction(error)));
    });

  @Effect()
  deleteProfile: Observable<any> = this.action$
    .ofType(profile.DELETE_PROFILE)
    .switchMap(() => {
      return this.profileService.deleteProfile()
      .map((payload) => new profile.DeleteSuccessAction(payload))
      .catch(error => {
        let errorText = JSON.parse(error.text()) || error;
        return Observable.of(new profile.DeleteFailAction(errorText));
      });
    });

  constructor(private action$: Actions, private profileService: ProfileService, private authService: AuthService) {
  }
}
