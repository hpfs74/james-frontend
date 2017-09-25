import { createSelector } from '@ngrx/store';
import * as CoverageActions from '../actions/coverage';
import { CarCoverageRecommendation } from '../models/coverage';

export type Action = CoverageActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  coverage: CarCoverageRecommendation;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  coverage: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CoverageActions.CAR_COVERAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CoverageActions.CAR_COVERAGE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        coverage: Object.assign({}, state.coverage, action.payload)
      });
    }

    default: {
      return state;
    }
  }
}

export const getCoverage = (state: State) => state.coverage;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
