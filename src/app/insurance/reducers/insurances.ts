import { createSelector } from '@ngrx/store';
import { Insurance } from '../models/insurance';
import * as InsuranceActions from '../actions/insurances';

export type Action = InsuranceActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  insurances: Insurance[];
}

export const initialState: State = {
  loading: false,
  loaded: false,
  insurances: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case InsuranceActions.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case InsuranceActions.ADD_INSURANCE_SUCCESS:
    case InsuranceActions.LOAD_SUCCESS: {
      const insurances = action.payload;

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        insurances: [ ...state.insurances, insurances ]
      });

    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getInsurances = (state: State) => state.insurances;
