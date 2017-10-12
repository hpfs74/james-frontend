import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromCar from './car';
import * as fromCompare from './compare';
import * as fromCoverage from './coverage';

export interface CarState {
  compare: fromCompare.State;
  car: fromCar.State;
  coverage: fromCoverage.State;
}

export interface State extends fromRoot.State {
  'car': CarState;
}

export const reducers = {
  compare: fromCompare.reducer,
  car: fromCar.reducer,
  coverage: fromCoverage.reducer,
};

export const selectCarState = createFeatureSelector<CarState>('car');

/**
 * Car Compare Insurance Reducers
 */
export const getCompareState = createSelector(selectCarState, (state: CarState) => state.compare);
export const getCompareResult = createSelector(getCompareState, fromCompare.getCompareResult);
export const getCompareLoading = createSelector(getCompareState, fromCompare.getLoading);
export const getCompareError = createSelector(getCompareState, fromCompare.getError);
export const getCompareLoaded = createSelector(getCompareState, fromCompare.getLoaded);

/**
 * Car Info Reducers
 */
export const getCarState = createSelector(selectCarState, (state: CarState) => state.car);
export const getCarInfo = createSelector(getCarState, fromCar.getInfo);
export const getCarInfoLoaded = createSelector(getCarState, fromCar.getLoaded);
export const getCarInfoLoading = createSelector(getCarState, fromCar.getLoading);
export const getCarInfoError = createSelector(getCarState, fromCar.getError);
export const getCarLicense = createSelector(getCarState, fromCar.getLicense);
export const getCarBuyComplete = createSelector(getCarState, fromCar.getBuyComplete);
export const getCarBuyError = createSelector(getCarState, fromCar.getBuyError);

/**
 * Car Coverage Reducers
 */
export const getCoverageState = createSelector(selectCarState, (state: CarState) => state.coverage);
export const getCoverage = createSelector(getCoverageState, fromCoverage.getCoverage);
export const getCoverageLoading = createSelector(getCoverageState, fromCoverage.getLoading);
export const GetCoverageActiveLoan = createSelector(getCoverageState, fromCoverage.getActiveLoan);
