import { createSelector } from '@ngrx/store';
import * as CoverageActions from '../actions/coverage';

export type Action = CoverageActions.All;

export interface State {
  status: string;
  coverage: any; // TODO: add interface when API spec is more consistent
}

export const initialState: State = {
  status: 'init',
  coverage: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case CoverageActions.CAR_COVERAGE_REQUEST: {
      return Object.assign({}, state, {
        status: 'loading'
      });
    }

    case CoverageActions.CAR_COVERAGE_SUCCESS: {
      return Object.assign({}, state, {
        status: 'ready',
        coverage: Object.assign({}, state.coverage, action.payload)
      });
    }

    case CoverageActions.CAR_COVERAGE_FAIL: {
      return Object.assign({}, state, {
        status: 'error',
        coverage: {}
      });
    }

    default: {
      return state;
    }
  }
}

export const getCoverage = (state: State) => state.coverage;
export const getLoaded = (state: State) => state.status === 'ready';
export const getLoading = (state: State) => state.status === 'loading';
export const getError = (state: State) => state.status === 'error';
