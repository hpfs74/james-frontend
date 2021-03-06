import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';
import * as router from '../../core/actions/router';
import * as AuthUtils from '@app/utils/auth.utils';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private store$: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store$.select(fromRoot.selectAuthState).map(auth => {
      return !(auth.status.loggedIn && AuthUtils.tokenIsValid());
    });
  }
}
