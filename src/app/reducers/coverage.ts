import { createSelector } from '@ngrx/store';
import * as coverage from '../actions/coverage';

export interface State {
  loading: boolean;
  loaded: boolean;
  coverage: any; // TODO: add interface when API spec is more consistent
}

export const initialState: State = {
  loading: false,
  loaded: false,
  coverage: {}
};

export function reducer(state = initialState, action: coverage.Actions): State {
  switch (action.type) {
    case coverage.CAR_COVERAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case coverage.CAR_COVERAGE_SUCCESS: {
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
