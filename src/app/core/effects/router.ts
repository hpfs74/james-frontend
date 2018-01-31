import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { scrollToY } from '@app/utils/scroll-to-element.utils';
import { Action, Store } from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as RouterActions from '@app/core/actions/router';
import * as layout from '@app/core/actions/layout';
import * as carActions from '@app/car/actions/car';
import * as fromRoot from '@app/core/reducers';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .map((action: RouterActions.Go) => action.payload)
    .do(({ path, query: queryParams, extras }) => {
      return this.router.navigate(path, { queryParams, ...extras });
    });

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD)
    .do(() => this.location.forward());

  @Effect()
  navigateModal$ = this.actions$
    .ofType(RouterActions.GO)
    .switchMap(() => Observable.of(new layout.CloseModal()));

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location,
              private store$: Store<fromRoot.State>) {
    this.router.events.subscribe(event => {
      if ( event instanceof NavigationEnd ) {
        scrollToY(0, 1500, 'easeInOutQuint', true);
        this.store$.dispatch(new carActions.ClearErrors());
      }
    });
  }

}
