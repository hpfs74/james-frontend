import { Insurance } from '../models/insurance';
import * as InsuranceActions from '../actions/insurance';

export type Action = InsuranceActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  insurances: Insurance[];
  purchasedInsurances: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  insurances: [],
  purchasedInsurances: []
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

    case InsuranceActions.GET_PURCHASED_CAR_INSURANCES: {
      return Object.assign({}, state, {
        ...state,
        loaded: false,
        loading: true
      });
    }

    case InsuranceActions.GET_PURCHASED_CAR_INSURANCES_SUCCESS: {
      const insurances = action.payload;

      return Object.assign({}, state, {
        ...state,
        loaded: true,
        loading: false,
        purchasedInsurances: insurances
      });
    }

    case InsuranceActions.GET_PURCHASED_CAR_INSURANCES_FAILURE: {
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
export const getPurchasedInsurances = (state: State) => state.purchasedInsurances;
export const getPurchasedInsurancesLoading = (state: State) => state.loading;
export const getPurchasedInsurancesLoaded = (state: State) => state.loaded;
