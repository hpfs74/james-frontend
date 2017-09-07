import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

import { LOGOUT } from '../actions/auth';

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
 */
import { storeFreeze } from 'ngrx-store-freeze';

// TODO: wait for fix https://github.com/codewareio/ngrx-store-freeze/issues/17

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';
import * as fromProfile from './profile';
import * as fromSettings from './settings';
import * as fromLayout from './layout';
import * as fromInsurances from './insurances';
import * as fromAssistant from './assistant';
import * as fromCompare from './compare';
import * as fromAdvice from './advice';
import * as fromCar from './car';
import * as fromCoverage from './coverage';

import { analyticsMetaReducer } from './analytics';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  auth: fromAuth.State; // TODO: move to AuthState
  loginPage: fromLoginPage.State; // TODO: move to AuthState
  profile: fromProfile.State;
  settings: fromSettings.State;
  layout: fromLayout.State;
  insurances: fromInsurances.State;
  assistant: fromAssistant.State;
  compare: fromCompare.State;
  advice: fromAdvice.State;
  car: fromCar.State;
  coverage: fromCoverage.State;
  routerReducer: fromRouter.RouterReducerState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  profile: fromProfile.reducer,
  settings: fromSettings.reducer,
  layout: fromLayout.reducer,
  insurances: fromInsurances.reducer,
  assistant: fromAssistant.reducer,
  compare: fromCompare.reducer,
  advice: fromAdvice.reducer,
  car: fromCar.reducer,
  coverage: fromCoverage.reducer,
  routerReducer: fromRouter.routerReducer
  // routerReducer: analyticsMetaReducer(fromRouter.routerReducer)
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
    return reducer(action.type === LOGOUT ? {
      auth: state.auth,
      loginPage: state.loginPage,
      profile: undefined,
      settings: state.settings,
      layout: state.layout,
      insurances: undefined,
      assistant: state.assistant,
      compare: undefined,
      advice: undefined,
      car: undefined,
      coverage: undefined,
      routerReducer: state.routerReducer
    } : state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger, logout]
: [logout];


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
export const getProfileLoaded = createSelector(getProfileState, fromProfile.getLoaded);

/**
 * Auth Reducers
 */
export const getAuthState = (state: State) => state.auth;
export const getLoggedIn = createSelector(getAuthState, fromAuth.getLoggedIn);
// export const selectAuthState = createFeatureSelector<State>('auth');


export const selectLoginPageState = (state: State) => state.loginPage;
export const getLoginPageError = createSelector(selectLoginPageState, fromLoginPage.getError);
export const getLoginPagePending = createSelector(selectLoginPageState, fromLoginPage.getPending);

/**
 * Settings Reducers
 */
export const getSettingsState = (state: State) => state.settings;
export const getSettings = createSelector(getSettingsState, fromSettings.getCurrent);
export const getSettingsLoading = createSelector(getSettingsState, fromSettings.getLoading);

/*
 * Insurances Reducers
 */
export const getInsurancesState = (state: State) => state.insurances;
export const getInsurances = createSelector(getInsurancesState, fromInsurances.getInsurances);

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
export const getLeftSidenavState = createSelector(getLayoutState, fromLayout.getLeftSidenavState);
export const getRightSidenavState = createSelector(getLayoutState, fromLayout.getRightSidenavState);
export const getOpenedModalNameState = createSelector(getLayoutState, fromLayout.getOpenedModalName);

/**
 * Chat Assistant Reducers
 */
export const getAsisstantState = (state: State) => state.assistant;
export const getAssistantMessageState = createSelector(getAsisstantState, fromAssistant.getMessages);
export const getAssistantConfig = createSelector(getAsisstantState, fromAssistant.getConfig);

/**
 * Compare Insurance Reducers
 */
export const getCompareState = (state: State) => state.compare;
export const getCompareResult = createSelector(getCompareState, fromCompare.getCompareResult);
export const getCompareLoading = createSelector(getCompareState, fromCompare.getLoading);
export const getCompareError = createSelector(getCompareState, fromCompare.getError);
export const getCompareLoaded = createSelector(getCompareState, fromCompare.getLoaded);

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
export const getSelectedInsurance = createSelector(getAdviceState, fromAdvice.getSelectedInsurance);

/**
 * Car Info Reducers
 */
export const getCarState = (state: State) => state.car;
export const getCarInfo = createSelector(getCarState, fromCar.getInfo);
export const getCarInfoLoaded = createSelector(getCarState, fromCar.getLoaded);
export const getCarInfoError = createSelector(getCarState, fromCar.getError);

/**
 * Coverage Reducers
 */
export const getCoverageState = (state: State) => state.coverage;
export const getCoverage = createSelector(getCoverageState, fromCoverage.getCoverage);
export const getCoverageLoading = createSelector(getCoverageState, fromCoverage.getLoading);
