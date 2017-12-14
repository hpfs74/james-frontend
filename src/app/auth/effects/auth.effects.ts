import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { AuthToken } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../core/services/localstorage.service';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';
import * as profile from '../../profile/actions/profile';
import * as insurance from '../../insurance/actions/insurance';
import * as layout from '../../core/actions/layout';

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
            new profile.LoadAction(),
            new insurance.GetInsurances()
          ];
        })
        .catch((error) => {
          let errorText = JSON.parse(error.text()) || error;
          return Observable.of(new auth.LoginFailure(errorText.error || errorText));
        })
    );

  @Effect()
  loginAnonymous$ = this.actions$
    .ofType(auth.LOGIN_ANONYMOUS)
    .map((action: auth.LoginAnonymous) => action)
    .exhaustMap(isAuthenticated =>
      this.authService
        .loginAnonymous()
        .mergeMap((token: AuthToken) => {
          if (token) {
            this.localStorageService.setToken(token);
          }
          return [
            new auth.ScheduleTokenRefresh(token)
          ];
        })
        .catch((error) => {
          let errorText = JSON.parse(error.text()) || error;
          return Observable.of(new auth.LoginFailure(errorText.error || errorText));
        })
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(auth.LOGIN_REDIRECT, auth.LOGOUT)
    .do(() => this.router.navigate(['/login']));

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
    .switchMap((refreshToken) => {

      if (this.authService.isAnonymous()) {
        this.store$.dispatch(new auth.StartAnonymous());
        this.store$.dispatch(new auth.LoginAnonymous());
        const token = this.localStorageService.getToken();
        return Observable.of(new auth.RefreshTokenSuccess(token));
      }

      return this.authService.refreshToken(refreshToken)
        .map((token) => {
          if (token && token.access_token) {
            this.localStorageService.setToken(token);
            return new auth.RefreshTokenSuccess(token);
          }

          return new auth.RefreshTokenFailure(token);
        });
    })
    .catch(error => Observable.of(new auth.RefreshTokenFailure(error)));

  // NOTE: the order of the init effect needs to be preserved as last
  // see: https://github.com/ngrx/platform/issues/246
  @Effect()
  init$: Observable<Action> = defer(() => {
    let token: AuthToken = this.localStorageService.getToken();

    if (token && !token['anonymous']) {
      // not Anonymous
      if (this.authService.isLoggedIn()) {
        // Token is not expired
        if (token !== null && token.access_token) {
          this.store$.dispatch(new auth.LoginSuccess({ token: token }));
          this.store$.dispatch(new auth.ScheduleTokenRefresh(token));
        } else {
          this.store$.dispatch(new auth.LoginRedirect());
        }

        this.store$.dispatch(new insurance.GetInsurances());
      } else {
        // Token is expired
        this.localStorageService.clearToken();
        this.store$.dispatch(new auth.LoginRedirect());
      }
    } else {
      // Anonymous
      this.store$.dispatch(new auth.StartAnonymous());
      this.store$.dispatch(new auth.LoginAnonymous());
    }
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store$: Store<fromRoot.State>,
    private dialogService: UserDialogService) {}
}
