import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as router from '../actions/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private store: Store<fromRoot.State>) {
  }

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
    this.store.select(fromRoot.getAuthState).subscribe(auth => {
      if (!auth.loggedIn) {
        this.router.navigate(['/login']);
      }
    });
    return true;
  }
}
