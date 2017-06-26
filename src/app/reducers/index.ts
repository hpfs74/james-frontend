import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromProfile from './profile';
import * as fromLayout from './layout';
import * as fromInsurances from './insurances';
import * as fromAssistant from './assistant';
import * as fromCompare from './compare';
import * as fromAdvice from './advice';
import * as fromCar from './car';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  profile: fromProfile.State;
  layout: fromLayout.State;
  insurances: fromInsurances.State;
  assistant: fromAssistant.State;
  compare: fromCompare.State;
  advice: fromAdvice.State;
  car: fromCar.State;
  router: fromRouter.RouterState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  profile: fromProfile.reducer,
  layout: fromLayout.reducer,
  insurances: fromInsurances.reducer,
  assistant: fromAssistant.reducer,
  compare: fromCompare.reducer,
  advice: fromAdvice.reducer,
  car: fromCar.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */


/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */


/**
 * Profile Reducers
 */
export const getProfileState = (state: State) => state.profile;
export const getProfile = createSelector(getProfileState, fromProfile.getCurrent);
export const getProfileLoading = createSelector(getProfileState, fromProfile.getLoading);
//export const getProfileLoaded= createSelector(getProfileState, fromProfile.getLoaded);

/*
 * Insurances Reducers
 */
export const getInsurancesState = (state: State) => state.insurances;
export const getInsurances = createSelector(getInsurancesState, fromInsurances.getInsurances);

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

/**
 * Chat Assistant Reducers
 */
export const getAsisstantState = (state: State) => state.assistant;
export const getAssistantMessageState = createSelector(getAsisstantState, fromAssistant.getMessages);

/**
 * Compare Insurance Reducers
 */
export const getCompareState = (state: State) => state.compare;
export const getCompareResult = createSelector(getCompareState, fromCompare.getCompareResult);
export const getCompareLoading = createSelector(getCompareState, fromCompare.getLoading);

/**
 * Advice Reducers
 * Advice is similar to an insurance object. It is the data from the advice flow that is
 * optionally saved to the profile to support anonymous flow.
 */
export const getAdviceState = (state: State) => state.advice;
export const getAdvice = createSelector(getAdviceState, fromAdvice.getAdvice);
export const getAdviceIds = createSelector(getAdviceState, fromAdvice.getIds);

export const getSelectedAdviceId = createSelector(getAdviceState, fromAdvice.getSelectedId);
export const getSelectedAdvice = createSelector(getAdviceState, fromAdvice.getSelected);


/**
 * Car Info Reducers
 */
export const getCarState = (state: State) => state.car;
export const getCarInfo = createSelector(getCarState, fromCar.getInfo);
export const getCarInfoLoaded = createSelector(getCarState, fromCar.getLoaded);
