import { Inject } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectInsuranceState } from '@app/insurance/reducers';

import * as fromRoot from '../reducers';
import * as fromAuth from '../auth/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import 'rxjs/add/operator/filter';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  data: any;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let loggedIn = false;
    let product_id = null;
    let product_name = null;
    let external = null;
    this.store$.select(fromAuth.getLoggedIn).subscribe((isLoggedIn) => {
      loggedIn = isLoggedIn;
    });

    this.store$.select(fromInsurance.getSelectedInsurance)
    .filter(insurance => !!insurance)
    .subscribe((selectedInsurance) => {
      product_id = selectedInsurance.id;
      product_name = selectedInsurance.insurance_name;
      external = selectedInsurance.supported ? 'no' : 'yes';
    });

    this.store$.select(fromAuth.getLoggedIn).subscribe((isLoggedIn) => {
      loggedIn = isLoggedIn;
    });

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    let data = {
      isLoggedIn: loggedIn,
      product_id: product_id,
      product_name: product_name,
      external: external
    };
    return { url, queryParams, data: data };
  }

  constructor(@Inject(Store) private store$: Store<fromRoot.State>) {}
}
