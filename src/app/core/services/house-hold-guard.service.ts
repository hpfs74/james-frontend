import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as router from '../../core/actions/router';

import * as fromHouse from '@app/house/reducers';

@Injectable()
export class CanActivateHouseHoldFlowGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store$: Store<fromRoot.State>) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let adviceExists = false;

    this.store$.select(fromHouse.getHouseHoldDataAdvice).subscribe(advice => {
      adviceExists = !!advice;
    });

    // go to previous route if no active advice found
    if (!adviceExists) {
      this.store$.dispatch(new router.Go({path: ['/inboedel']}));
    }
    return adviceExists;
  }
}
