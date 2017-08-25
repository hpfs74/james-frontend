import { createSelector } from '@ngrx/store';
import * as CompareActions from '../actions/compare';
import { InsuranceAdvice } from './../models/insurance-advice';

export type Action = CompareActions.All;

export interface State {
  status: string;
  insurances: InsuranceAdvice[];
}

export const initialState: State = {
  status: 'init',
  insurances: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CompareActions.LOAD_CAR_COMPARE: {
      return Object.assign({}, state, {
        status: 'loading',
      });
    }

    case CompareActions.LOAD_CAR_COMPARE_SUCCESS: {
      const compareResult = action.payload;

      return Object.assign({}, state, {
        status: 'ready',
        insurances: compareResult
      });
    }

    case CompareActions.LOAD_CAR_COMPARE_FAIL: {
      const compareResult = action.payload;

      return Object.assign({}, state, {
        status: 'error',
        insurances: compareResult
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.status === 'ready';
export const getLoading = (state: State) => state.status === 'loading';
export const getError = (state: State) => state.status === 'error';
export const getCompareResult = (state: State) => state.insurances;
