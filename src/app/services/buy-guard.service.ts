import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

import * as fromRoot from '../reducers';

@Injectable()
export class CanActivateBuyFlowGuard implements CanActivate {

  constructor(private router: Router, private store$: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // only allow buy flow when an advice is in the store
    let adviceExists = false;

    if (route.params) {
      let requestedAdvice = route.params.adviceId;

      this.store$.select(fromRoot.getAdvice).subscribe(advice => {
        adviceExists = Object.keys(advice).filter(id => id === requestedAdvice).length > 0;
      });
    }

    // go to previous route if no active advice found
    if (!adviceExists) {
      this.store$.dispatch(back());
    }
    return adviceExists;
  }
}
