import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

// import { Database } from '@ngrx/db';
// import { Observable } from 'rxjs/Observable';
// import { defer } from 'rxjs/observable/defer';
// import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import * as profile from '../actions/profile';
import { Profile } from '../models/profile';

@Injectable()
export class ProfileEffects {

  constructor(private action$: Actions, private profileService: ProfileService) { }

  /* tslint:disable */
  @Effect()
  loadProfile$: Observable<Action> = this.action$
    .ofType(profile.LOAD_PROFILE_REQUEST)
    .startWith(new profile.LoadAction)
    .switchMap(() =>
      this.profileService.getUserProfile()
        .map((p: Profile) => new profile.LoadSuccessAction(p))
        .catch(error => Observable.of(new profile.LoadFailAction(error))));
  /* tslint:enable */

  // @Effect()
  // loadProfile$: Observable<Action> = this.actions$
  //   .ofType(profile.LOAD_PROFILE_REQUEST)
  //   .startWith(new collection.LoadAction())
  //   .switchMap(() =>
  //     this.db.query('books')
  //       .toArray()
  //       .map((books: Book[]) => new collection.LoadSuccessAction(books))
  //       .catch(error => of(new collection.LoadFailAction(error)))

  // @Effect()
  // loadProfile$: Observable<Action> = this.action$
  //   .ofType(profile.LOAD_PROFILE_REQUEST)
  //     .startWith(new profile.LoadAction)
  //     .switchMap(payload => {
  //       console.log('the payload was: ' + payload.message);
  //       return Observable.of({type: "PAYLOAD_EFFECT_RESPONDS", payload: {message: "The effect says hi!"}})
  //   });

}
