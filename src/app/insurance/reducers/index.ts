import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromInsurances from './insurances';
import * as fromAdvice from './advice';

export interface InsuranceState {
  insurances: fromInsurances.State;
  advice: fromAdvice.State;
}

export interface State extends fromRoot.State {
  insurance: InsuranceState;
}

export const reducers = {
  insurances: fromInsurances.reducer,
  advice: fromAdvice.reducer
};


export const selectInsuranceState = createFeatureSelector<InsuranceState>('insurance');

/*
 * Insurances Reducers
 */
export const getInsurancesState = createSelector(selectInsuranceState, (state: InsuranceState) => state.insurances);
export const getInsurances = createSelector(getInsurancesState, fromInsurances.getInsurances);

/**
 * Advice Reducers
 * Advice is similar to an insurance object. It is the data from the advice flow that is
 * optionally saved to the profile to support anonymous flow.
 */
export const getAdviceState = createSelector(selectInsuranceState, (state: InsuranceState) => state.advice);
export const getAdvice = createSelector(getAdviceState, fromAdvice.getAdvice);
export const getAdviceIds = createSelector(getAdviceState, fromAdvice.getIds);

export const getSelectedAdviceId = createSelector(getAdviceState, fromAdvice.getSelectedId);
export const getSelectedAdvice = createSelector(getAdviceState, fromAdvice.getSelected);
export const getSelectedInsurance = createSelector(getAdviceState, fromAdvice.getSelectedInsurance);
