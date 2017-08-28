import { RefreshToken } from './../actions/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/throttleTime';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';
import * as fromRoot from '../reducers';
import * as Auth from '../actions/auth';
import * as Profile from '../actions/profile';
import { AuthToken } from '../models/auth';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => {
    if (this.authService.isLoggedIn()) {
      let token: AuthToken = this.localStorageService.getToken();
      if (token !== null && token.access_token) {
        this.store$.dispatch(new Auth.LoginSuccess({ token: token }));
        this.router.navigate(['/']);
      } else {
        this.store$.dispatch(new Auth.LoginRedirect());
      }
    }
  });

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
            this.authService.scheduleRefresh();
          }
          return [
            new Auth.LoginSuccess({ token }),
            new Profile.LoadAction()
          ];
        })
        .catch(error => of(new Auth.LoginFailure(error)))
  );

  // TODO: this is currently not used; find way to integrate
  // with auth(http) service
  @Effect()
  refreshToken$ = this.actions$
    .ofType(Auth.REFRESH_TOKEN)
    .map((action: Auth.RefreshToken) => action.payload)
    .throttleTime(3000)
    .switchMap((refreshToken) => this.authService.refreshToken(refreshToken)
      .map((token) => {
        if (token && token.access_token) {
          this.localStorageService.setToken(token);
        } else {
          return new Auth.RefreshTokenFailure(token);
        }
      }))
    .catch(error => of(new Auth.RefreshTokenFailure(error)));

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

  @Effect()
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .exhaustMap(auth =>
      this.authService.logout()
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store$: Store<fromRoot.State>
  ) {}
}
