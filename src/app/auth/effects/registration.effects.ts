
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/delay';

import { RegistrationResult } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../core/services/localstorage.service';

import * as fromRoot from '../reducers';
import * as registration from '../actions/registration';
import * as profile from '../../profile/actions/profile';
import * as layout from '../../core/actions/layout';

@Injectable()
export class RegistrationEffects {

  @Effect()
  register$ = this.actions$
    .ofType(registration.REGISTER)
    .map((action: registration.Register) => ({emailAddress: action.emailAddress, password: action.password}))
    .exhaustMap((username, password) =>
      this.authService
        .register(username, password)
        .mergeMap((result: RegistrationResult) => {
          return [new registration.RegisterSuccess({})];
        })
        .catch((error) => {
          let errorText = JSON.parse(error.text()) || error;
          return Observable.of(new registration.RegisterFailure(errorText.error || errorText));
        })
  );

  @Effect({ dispatch: false })
  registrationSuccess$ = this.actions$
    .ofType(registration.REGISTER_SUCCESS)
    .do(() => this.router.navigate(['/']));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store$: Store<fromRoot.State>,
  ) {}
}
