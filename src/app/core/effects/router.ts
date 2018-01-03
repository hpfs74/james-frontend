import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as RouterActions from '../actions/router';

import * as layout from '../actions/layout';
import { scrollToY } from '@app/utils/scroll-to-element.utils';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .map((action: RouterActions.Go) => action.payload)
    .do(({ path, query: queryParams, extras }) => {
      scrollToY();
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

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
