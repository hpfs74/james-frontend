import { Insurance } from '../models/insurance';
import * as InsuranceActions from '../actions/insurance';

export type Action = InsuranceActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  insurances: Insurance[];
  savedInsurances: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  insurances: [],
  savedInsurances: null
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

    case InsuranceActions.GET_SAVED_CAR_INSURANCES: {
      return Object.assign({}, state, {
        ...state,
        loaded: false,
        loading: true
      });
    }

    case InsuranceActions.GET_SAVED_CAR_INSURANCES_SUCCESS: {
      let insurances = action.payload;

      if (insurances && Object.keys(insurances).length === 0) {
        insurances = null;
      }

      return Object.assign({}, state, {
        ...state,
        loaded: true,
        loading: false,
        savedInsurances: insurances
      });
    }

    case InsuranceActions.GET_SAVED_CAR_INSURANCES_FAILURE: {
      return Object.assign({}, state, {
        ...state,
        loaded: false,
        loading: false
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
export const getSavedInsurances = (state: State) => state.savedInsurances;
export const getSavedCarAdvices = (state: State) => state.savedInsurances.car.insurance_advice;
export const getSavedInsuranceLoading = (state: State) => state.loading;
export const getSavedInsuranceLoaded = (state: State) => state.loaded;
