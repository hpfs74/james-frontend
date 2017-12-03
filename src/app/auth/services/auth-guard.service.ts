import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import * as fromRoot from '../reducers';
import * as auth from '../actions/auth';
import * as router from '../../core/actions/router';
import { AuthService } from '../services/auth.service';

// TODO: refactor to more maintainable solution
const anonymousAvailableLinks = [
  '/register',
  '/login',
  '/car',
  '/car/detail',
  '/car/detail',
  '/car/extras',
  '/car/review'
];

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private store$: Store<fromRoot.State>, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route) {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.isPublicRoute(url)) {
      this.store$.select(fromRoot.selectAuthState).take(1).subscribe(authenticated => {
        if (!authenticated.status.loggedIn || !this.authService.isLoggedIn()) {
          this.store$.dispatch(new auth.LoginRedirect());
        }
      });
    }
    return true;
  }

  private isPublicRoute(url: string) {
    return anonymousAvailableLinks.indexOf(url) !== -1;
  }
}
