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
import { Profile } from '../models/profile';

@Injectable()
export class ProfileEffects {

  @Effect()
  loadProfile$: Observable<Action> = this.action$
    .ofType(profile.LOAD_PROFILE_REQUEST)
    .startWith(new profile.LoadAction)
    .switchMap(() =>
      this.profileService.getUserProfile()
        .map((p: Profile) => new profile.LoadSuccessAction(p))
        .catch(error => Observable.of(new profile.LoadFailAction(error))));

  constructor(private action$: Actions, private profileService: ProfileService) { }
}
