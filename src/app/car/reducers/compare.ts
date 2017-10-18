import { createSelector } from '@ngrx/store';
import * as CompareActions from '../actions/compare';
import { InsuranceAdvice } from '../../insurance/models/insurance-advice';

export type Action = CompareActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  insurances: InsuranceAdvice[];
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  insurances: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CompareActions.LOAD_CAR_COMPARE: {
      return Object.assign({}, state, {
        loading: true,
        error: false
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

    case CompareActions.LOAD_CAR_COMPARE_FAILURE: {
      return Object.assign({}, state, {
        error: true
      });
    }

    case CompareActions.RESET_STATE: {
      return Object.assign({}, state, initialState);
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getCompareResult = (state: State) => state.insurances;
