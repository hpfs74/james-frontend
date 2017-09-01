import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
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
import * as fromRoot from '../reducers';
import * as Auth from '../actions/auth';
import * as Profile from '../actions/profile';
import { AuthToken } from '../models/auth';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .mergeMap((token: AuthToken) => {
          if (token) {
            this.localStorageService.setToken(token);
          }
          return [
            new Auth.LoginSuccess({ token }),
            new Auth.ScheduleTokenRefresh(token),
            new Profile.LoadAction()
          ];
        })
        .catch(error => of(new Auth.LoginFailure(error)))
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/login']);
    });

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .exhaustMap(auth =>
      this.authService.logout()
  );

  @Effect()
  scheduleRefresh$ = this.actions$
    .ofType(
      Auth.SCHEDULE_TOKEN_REFRESH,
      Auth.REFRESH_SUCCESS
    )
    .map(toPayload)
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
          return of(new Auth.RefreshToken(token.refresh_token)).delay(delay);
        })
  );

  // TODO: catch any failed http requests
  @Effect()
  refreshToken$ = this.actions$
    .ofType(Auth.REFRESH_TOKEN)
    .map((action: Auth.RefreshToken) => action.payload)
    // .throttleTime(3000)
    .switchMap((refreshToken) => this.authService.refreshToken(refreshToken)
      .map((token) => {
        if (token && token.access_token) {
          this.localStorageService.setToken(token);
          return new Auth.RefreshTokenSuccess(token);
        } else {
          // TODO: show login user dialog
          return new Auth.RefreshTokenFailure(token);
        }
      }))
    .catch(error => of(new Auth.RefreshTokenFailure(error)));

    // NOTE: the order of the init effect needs to be preserved as last
    // see: https://github.com/ngrx/platform/issues/246
    @Effect()
    init$: Observable<Action> = defer(() => {
      if (this.authService.isLoggedIn()) {
        // Token is not expired
        let token: AuthToken = this.localStorageService.getToken();
        if (token !== null && token.access_token) {
          this.store$.dispatch(new Auth.LoginSuccess({ token: token }));
          this.store$.dispatch(new Auth.ScheduleTokenRefresh(token));
        } else {
          this.store$.dispatch(new Auth.LoginRedirect());
        }
      } else {
        // Token is expired
        this.localStorageService.clearToken();
        this.store$.dispatch(new Auth.LoginRedirect());
      }
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store$: Store<fromRoot.State>
  ) {}
}
