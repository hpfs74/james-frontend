import { createSelector } from 'reselect';
import * as compare from '../actions/compare';
import { InsuranceAdvice } from './../models/insurance-advice';

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

export function reducer(state = initialState, action: compare.Actions): State {
  switch (action.type) {
    case compare.LOAD_CAR_COMPARE: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case compare.LOAD_CAR_COMPARE_SUCCESS: {
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
