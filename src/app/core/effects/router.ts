import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import * as RouterActions from '../actions/router';
import * as fromAuth from '../../auth/reducers';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .map((action: RouterActions.Go) => action.payload)
    .do(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD)
    .do(() => this.location.forward());

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store$: Store<fromAuth.State>
  ) {}
}
