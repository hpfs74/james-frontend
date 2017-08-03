import { createSelector } from '@ngrx/store';
import { Insurance } from '../models/insurance';
import * as insurances from '../actions/insurances';

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

export function reducer(state = initialState, action: insurances.Actions): State {
  switch (action.type) {
    case insurances.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case insurances.ADD_INSURANCE_SUCCESS:
    case insurances.LOAD_SUCCESS: {
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
