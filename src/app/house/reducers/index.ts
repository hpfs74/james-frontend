import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromHouseData from './house-data';
import * as fromHouseHoldAmount from './house-hold-insured-amount';
import * as fromHouseHoldPremium from './house-hold-premium';
import * as fromHouseHoldData from './house-hold-data';
import * as fromPackagePremium from './package-premium';
import { create } from 'domain';

export interface HouseHoldState {
  houseData: fromHouseData.State;
  amount: fromHouseHoldAmount.State;
  premium: fromHouseHoldPremium.State;
  houseHoldData: fromHouseHoldData.State;
  packagePremium: fromPackagePremium.State;
}

export interface State extends fromRoot.State {
  household: HouseHoldState;
}

export const reducers = {
  houseData: fromHouseData.reducer,
  amount: fromHouseHoldAmount.reducer,
  premium: fromHouseHoldPremium.reducer,
  houseHoldData: fromHouseHoldData.reducer,
  packagePremium: fromPackagePremium.reducer
};

export const selectHouseHoldState = createFeatureSelector<HouseHoldState>('household');

/**
 * HouseData Reducers
 */
export const getHouseDataState = createSelector(selectHouseHoldState,
  (state: HouseHoldState) => state.houseData);
export const getHouseDataResult = createSelector(getHouseDataState, fromHouseData.getInfo);
export const getHouseDataLoading = createSelector(getHouseDataState, fromHouseData.getLoading);
export const getHouseDataLoaded = createSelector(getHouseDataState, fromHouseData.getLoaded);
export const getHouseDataError = createSelector(getHouseDataState, fromHouseData.getError);
export const getHouseDataAddress = createSelector(getHouseDataState, fromHouseData.getAddress);


/**
 * HouseHold Amount Reducers
 */
export const getHouseHoldAmountState = createSelector(selectHouseHoldState,
  (state: HouseHoldState) => state.amount);
export const getHouseHoldAmountResult = createSelector(getHouseHoldAmountState, fromHouseHoldAmount.getAmount);
export const getHouseHoldAmountLoading = createSelector(getHouseHoldAmountState, fromHouseHoldAmount.getLoading);
export const getHouseHoldAmountLoaded = createSelector(getHouseHoldAmountState, fromHouseHoldAmount.getLoaded);
export const getHouseHoldAmountError = createSelector(getHouseHoldAmountState, fromHouseHoldAmount.getError);

/**
 * HouseHold Premium Reducers
 */
export const getHouseHoldPremiumState = createSelector(selectHouseHoldState,
  (state: HouseHoldState) => state.premium);
export const getHouseHoldPremiumResult = createSelector(getHouseHoldPremiumState, fromHouseHoldPremium.getPremiums);
export const getHouseHoldPremiumLoading = createSelector(getHouseHoldPremiumState, fromHouseHoldPremium.getLoading);
export const getHouseHoldPremiumLoaded = createSelector(getHouseHoldPremiumState, fromHouseHoldPremium.getLoaded);
export const getHouseHoldPremiumError = createSelector(getHouseHoldPremiumState, fromHouseHoldPremium.getError);

/**
 * HouseHold Data Reducers
 */
export const getHouseHoldDataState = createSelector(selectHouseHoldState,
  (state: HouseHoldState) => state.houseHoldData);
export const getHouseHoldDataInfo = createSelector(getHouseHoldDataState, fromHouseHoldData.getInfo);
export const getHouseHoldDataAdvice = createSelector(getHouseHoldDataState, fromHouseHoldData.getAdviceId);
export const getHouseHoldSelectedAdvice = createSelector(getHouseHoldDataState, fromHouseHoldData.getSelectedAdvice);
export const getHouseHoldNewFlowAdvice = createSelector(getHouseHoldDataState, fromHouseHoldData.getNewFlowAdvice);
export const getHouseHoldNewFlowAdviceContact = createSelector(getHouseHoldDataState, fromHouseHoldData.getNewFlowAdviceContact);
export const getNewFlowAdviceSelectedHouseHoldPremium =
  createSelector(getHouseHoldDataState, fromHouseHoldData.getNewFlowAdviceSelectedHouseHoldPremium);

/** Package premium */
export const getPackagePremiumState = createSelector(selectHouseHoldState,
  (state: HouseHoldState) => state.packagePremium);
export const getPackagePremiumLoading = createSelector(getPackagePremiumState, fromPackagePremium.getLoading);
export const getPackagePremiumLoaded = createSelector(getPackagePremiumState, fromPackagePremium.getLoaded);
export const getPackagePremiumError = createSelector(getPackagePremiumState, fromPackagePremium.getError);
export const getPackagePremiumRequest = createSelector(getPackagePremiumState, fromPackagePremium.getRequest);
export const getPackagePremiumResponse = createSelector(getPackagePremiumState, fromPackagePremium.getResponse);

