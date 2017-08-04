import { createSelector } from '@ngrx/store';
import * as CompareActions from '../actions/compare';
import { InsuranceAdvice } from './../models/insurance-advice';

export type Action = CompareActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  insurances: InsuranceAdvice[];
}

export const initialState: State = {
  loading: false,
  loaded: false,
  insurances: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CompareActions.LOAD_CAR_COMPARE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CompareActions.LOAD_CAR_COMPARE_SUCCESS: {
      const compareResult = action.payload;

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        insurances: compareResult
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getCompareResult = (state: State) => state.insurances;
