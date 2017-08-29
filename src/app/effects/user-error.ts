

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as fromRoot from '../reducers';
import * as compare from '../actions/compare';

@Injectable()
export class UserErrorEffects {

// TODO: catch generic app errors here and show them in toaster or bar
// @Effect({ dispatch: false })
// httpErrors$: Observable<any> = this.actions$
//   .ofType(
//     compare.LOAD_CAR_COMPARE_FAIL,
//   ).map(action => action.payload)
//   .switchMap(error => {
//     return of(this.snackBar.open(`There was an error accessing the server: ${error}`, 'OK', { duration: 5000 }));
//   });

  constructor(private action$: Actions, private store$: Store<fromRoot.State>) { }
}

