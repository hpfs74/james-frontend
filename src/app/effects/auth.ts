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

import { AuthService } from '../services/auth.service';
import * as fromRoot from '../reducers';
import * as Auth from '../actions/auth';
import * as Profile from '../actions/profile';
import { AuthToken, TOKEN_NAME, TOKEN_OBJECT_NAME } from '../models/auth';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => {
    if (this.authService.isLoggedIn()) {
      let token = JSON.parse(localStorage.getItem(TOKEN_OBJECT_NAME) || null);
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
            localStorage.setItem(TOKEN_NAME, token.access_token);
            localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(token));
          }
          return [
            new Auth.LoginSuccess({ token }),
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
    private store$: Store<fromRoot.State>
  ) {}
}
