import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import * as fromRoot from '@app/auth/reducers';
import * as auth from '@app/auth/actions/auth';
import * as router from '@app/core/actions/router';
import * as AuthUtils from '@app/utils/auth.utils';
import { AuthService } from '@app/auth/services/auth.service';

// TODO: refactor to more maintainable solution
const anonymousAvailableLinks = [
  '/register',
  '/login',
  '/car',
  '/car/insurance',
  '/car/insurance/contact-detail',
  '/car/insurance/reporting',
  '/car/insurance/check',
  '/car/insurance/payment',
  '/car/insurance/summary',
  '/car/detail',
  '/car/detail',
  '/car/extras',
  '/car/review',
  '/car/thank-you'
];

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private store$: Store<fromRoot.State>, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    // this entire auth guard should be refactored
    if (Object.keys(route.queryParams).length) {
      url = url.split('?')[0];
    }
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
    // remove router parameters to match with allowed routes
    const baseUrl = url.split(';')[0];
    if (!this.isPublicRoute(baseUrl)) {
      this.store$.select(fromRoot.selectAuthState).take(1).subscribe(authenticated => {
        if (!authenticated.status.loggedIn || !AuthUtils.tokenIsValid()) {
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
