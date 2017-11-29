import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '@env/environment';

import * as logoutActions from '../auth/actions/auth';

import * as fromAddress from '../address/reducers';
import * as fromInsurance from '../insurance/reducers';
import * as fromCar from '../car/reducers';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 * https://github.com/brandonroberts/ngrx-store-freeze/blob/master/docs/docs.md#router-store-compatibility
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

 /* tslint:disable */
export interface State {}
  // insurances: fromInsurances.State;
  // advice: fromAdvice.State;
/* tslint:enable */

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers: ActionReducerMap<State> = {
  // insurances: fromInsurances.reducer,
  // advice: fromAdvice.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    // console.log('state', state);
    // console.log('action', action);
    return reducer(state, action);
  };
}

export function logout(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state, action) {
    if (action.type === logoutActions.LOGOUT) {
      // reset to initialstate
      state = {
        ...state,
        ...fromAddress.reducers,
        ...fromInsurance.reducers,
        ...fromCar.reducers
      };
    }
    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger, logout] // storeFreeze
: [logout];
