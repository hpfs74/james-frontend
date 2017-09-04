
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/delay';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';
import { UserDialogService } from './../components/knx-modal/user-dialog.service';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';
import * as profile from '../actions/profile';
import * as layout from '../actions/layout';
import { AuthToken } from '../models/auth';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .ofType(auth.LOGIN)
    .map((action: auth.Login) => action.payload)
    .exhaustMap(isAuthenticated =>
      this.authService
        .login(isAuthenticated)
        .mergeMap((token: AuthToken) => {
          if (token) {
            this.localStorageService.setToken(token);
          }
          return [
            new auth.LoginSuccess({ token: token }),
            new auth.ScheduleTokenRefresh(token),
            new profile.LoadAction()
          ];
        })
        .catch(error => Observable.of(new auth.LoginFailure(error)))
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(auth.LOGIN_REDIRECT, auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/login']);
    });

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType(auth.LOGOUT)
    .exhaustMap(auth =>
      this.authService.logout()
  );

  @Effect()
  scheduleRefresh$ = this.actions$
    .ofType<auth.ScheduleTokenRefresh | auth.RefreshToken>(
      auth.SCHEDULE_TOKEN_REFRESH,
      auth.REFRESH_SUCCESS
    )
    .map(action => action.payload)
    .switchMap((token) =>
      // If the user is authenticated, use the token stream and flatMap the token
      this.authService.tokenStream.flatMap(
        token => {
          // The delay to generate in this case is the difference
          // between the expiry time and the issued at time
          let tokenIat = token.iat;
          let tokenExp = token.expiration_time;
          let iat = new Date(0);
          let exp = new Date(0);

          // for testing / 100000 to get seconds
          let delay = (exp.setUTCSeconds(tokenExp) - iat.setUTCSeconds(tokenIat)) / 1000;
          return Observable.of(new auth.RefreshToken(token.refresh_token)).delay(delay);
        })
  );

  // TODO: replace with actual dialog call
  @Effect()
  requestCredentials$ = this.actions$
    .ofType<auth.RequestCredentials>(auth.REQUEST_CREDENTIALS)
    .switchMap(() => Observable.of(new layout.OpenModal('loginModal')));

  // TODO: catch any failed http requests
  @Effect()
  refreshToken$ = this.actions$
    .ofType(auth.REFRESH_TOKEN)
    .map((action: auth.RefreshToken) => action.payload)
    // .throttleTime(3000)
    .switchMap((refreshToken) => this.authService.refreshToken(refreshToken)
      .map((token) => {
        if (token && token.access_token) {
          this.localStorageService.setToken(token);
          return new auth.RefreshTokenSuccess(token);
        } else {
          // TODO: show login user dialog
          return new auth.RefreshTokenFailure(token);
        }
      }))
    .catch(error => Observable.of(new auth.RefreshTokenFailure(error)));

    // NOTE: the order of the init effect needs to be preserved as last
    // see: https://github.com/ngrx/platform/issues/246
    @Effect()
    init$: Observable<Action> = defer(() => {
      if (this.authService.isLoggedIn()) {
        // Token is not expired
        let token: AuthToken = this.localStorageService.getToken();
        if (token !== null && token.access_token) {
          this.store$.dispatch(new auth.LoginSuccess({ token: token }));
          this.store$.dispatch(new auth.ScheduleTokenRefresh(token));
        } else {
          this.store$.dispatch(new auth.LoginRedirect());
        }
      } else {
        // Token is expired
        this.localStorageService.clearToken();
        this.store$.dispatch(new auth.LoginRedirect());
      }
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store$: Store<fromRoot.State>,
    private dialogService: UserDialogService
  ) {}
}
