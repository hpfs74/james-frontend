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

import { AuthToken, PasswordChangeResponse } from '@app/auth/models/auth';
import { AuthService } from '@app/auth/services/auth.service';
import { LocalStorageService } from '@app/core/services/localstorage.service';
import { UserDialogService } from '@app/components/knx-modal/user-dialog.service';

import * as fromRoot from '@app/auth/reducers';
import * as authActions from '@app/auth/actions/auth';
import * as carActions from '@app/car/actions/car';
import * as profileActions from '@app/profile/actions/profile';
import * as insuranceActions from '@app/insurance/actions/insurance';
import * as layoutActions from '@app/core/actions/layout';
import * as routerActions from '@app/core/actions/router';
import * as AuthUtils from '@app/utils/auth.utils';
import * as assistantActions from '@app/core/actions/assistant';

import { translatePasswordMessages } from '@app/utils/auth.utils';
import { AssistantService } from '@app/core/services';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .ofType(authActions.LOGIN)
    .map((action: authActions.Login) => action.payload)
    .exhaustMap(isAuthenticated =>
      this.authService
        .login(isAuthenticated)
        .mergeMap((token: AuthToken) => {
          if (token) {
            this.localStorageService.setToken(token);
          }
          return [
            new authActions.LoginSuccess({ token: token }),
            new authActions.ScheduleTokenRefresh(token),
            new profileActions.LoadAction(),
            new insuranceActions.GetInsurances()
          ];
        })
        .catch((error) => {
          const errorText = JSON.parse(error.text() || '{}') || error;
          return Observable.of(new authActions.LoginFailure(errorText.error || errorText));
        })
    );

  @Effect()
  loginAnonymous$ = this.actions$
    .ofType(authActions.LOGIN_ANONYMOUS)
    .map((action: authActions.LoginAnonymous) => action)
    .exhaustMap(isAuthenticated =>
      this.authService
        .loginAnonymous()
        .mergeMap((token: AuthToken) => {
          if (token) {
            this.localStorageService.setToken(token);
          }
          return [
            new authActions.ScheduleTokenRefresh(token)
          ];
        })
        .catch((error) => {
          const errorText = JSON.parse(error.text() || '{}') || error;
          return Observable.of(new authActions.LoginFailure(errorText.error || errorText));
        })
    );

  @Effect()
  newPassword = this.actions$
    .ofType(authActions.NEW_PASSWORD)
    .map((action: authActions.NewPassword) => action)
    .exhaustMap(response =>
      this.authService
        .changePassword(response.payload)
        .mergeMap((response: PasswordChangeResponse) => {
          return [new authActions.NewPasswordSuccess(response)];
        })
        .catch((error) => {
          const errorText = JSON.parse(error.text() || '{}') || error;
          return Observable.of(new authActions.NewPasswordError( translatePasswordMessages(errorText.error)
           || translatePasswordMessages(errorText)));
        })
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(authActions.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(authActions.LOGIN_REDIRECT, authActions.LOGOUT)
    .do(() => this.router.navigate(['/login']));

  @Effect()
  logout$ = this.actions$
    .ofType(authActions.LOGOUT)
    .exhaustMap(auth =>
      this.authService.logout()
    )
    .switchMap(() => [
      new authActions.ResetStates(),
      new assistantActions.LoadConfigAction(this.assistantService.config),
      new authActions.StartAnonymous(),
      new authActions.LoginAnonymous(),
    ]);

  @Effect()
  scheduleRefresh$ = this.actions$
    .ofType<authActions.ScheduleTokenRefresh | authActions.RefreshToken>(
      authActions.SCHEDULE_TOKEN_REFRESH,
      authActions.REFRESH_SUCCESS
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
          return Observable.of(new authActions.RefreshToken(token.refresh_token)).delay(delay);
        })
        .catch(err => {
          // assume token is null, and request a new one, and login anonymous
          return [
            new authActions.Logout()
          ];
        })
    );

  @Effect()
  requestCredentials$ = this.actions$
    .ofType<authActions.RequestCredentials>(authActions.REQUEST_CREDENTIALS)
    .switchMap(() => Observable.of(new layoutActions.OpenModal('loginModal')));

  // TODO: catch any failed http requests
  @Effect()
  refreshToken$ = this.actions$
    .ofType(authActions.REFRESH_TOKEN)
    .map((action: authActions.RefreshToken) => action.payload)
    // .throttleTime(3000)
    .switchMap((refreshToken) => {

      if (AuthUtils.tokenIsAnonymous()) {
        this.store$.dispatch(new authActions.StartAnonymous());
        this.store$.dispatch(new authActions.LoginAnonymous());
        const token = this.localStorageService.getToken();
        return Observable.of(new authActions.RefreshTokenSuccess(token));
      }

      return this.authService.refreshToken(refreshToken)
        .map((token) => {
          if (token && token.access_token) {
            this.localStorageService.setToken(token);
            return new authActions.RefreshTokenSuccess(token);
          }

          return new authActions.RefreshTokenFailure(token);
        });
    })
    .catch(error => {
      this.localStorageService.clearToken();
      this.store$.dispatch(new authActions.StartAnonymous());
      this.store$.dispatch(new authActions.LoginAnonymous());

      return Observable.of(new authActions.RefreshTokenFailure(error));
    });

  // NOTE: the order of the init effect needs to be preserved as last
  // see: https://github.com/ngrx/platform/issues/246
  @Effect()
  init$: Observable<Action> = defer(() => {

    // 1. get token
    const token: AuthToken = this.localStorageService.getToken();
    // 2. check if token is anonymous
    if (AuthUtils.tokenIsAnonymous()) {
      // anonymous scenario
      this.store$.dispatch(new authActions.StartAnonymous());
      this.store$.dispatch(new authActions.LoginAnonymous());
    } else {
      // logged in user scenario
      // 3. check if token is valid

      if (AuthUtils.tokenIsValid()) {
        // valid token scenario

        if (token.access_token) {
          this.store$.dispatch(new authActions.LoginSuccess({ token: token }));
          this.store$.dispatch(new authActions.ScheduleTokenRefresh(token));
        }
        this.store$.dispatch(new insuranceActions.GetInsurances());
      } else {

        // invalid token scenario
        this.store$.dispatch(new authActions.RefreshToken(token.refresh_token));
      }
    }
  });

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private store$: Store<fromRoot.State>,
              private dialogService: UserDialogService,
              private assistantService: AssistantService) {}
}
