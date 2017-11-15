import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as RouterActions from '../../core/actions/router';
import * as fromRoot from '../reducers';

import * as fromInsurance from '../../insurance/reducers';

@Injectable()
export class CanActivateBuyFlowGuard implements CanActivate {

  constructor(private router: Router, private store$: Store<fromRoot.State>) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // only allow buy flow when an advice is in the store

    // thomas [9-aug-2017]: there's a bug with guard and ngrx router store creating an infinite loop
    // @see https://github.com/ngrx/platform/issues/201

    let adviceExists = false;

    if (route.params) {
      const requestedAdvice = route.params.adviceId;

      this.store$.select(fromInsurance.getAdvice).subscribe(advice => {
        adviceExists = Object.keys(advice).filter(id => id === requestedAdvice).length > 0;
      });
    }

    // go to previous route if no active advice found
    if (!adviceExists) {
      this.store$.dispatch(new RouterActions.Back());
    }
    return adviceExists;
  }
}
