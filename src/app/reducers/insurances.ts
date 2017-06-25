import { createSelector } from 'reselect';
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

    case insurances.LOAD_SUCCESS: {
      const insurances = action.payload;

      return {
        loaded: true,
        loading: false,
        insurances: Object.assign({}, state.insurances, insurances)
      };
    }

    case insurances.ADD_INSURANCE_SUCCESS: {
      const insurance = action.payload;

      return {
        loaded: true,
        loading: false,
        insurances: [ ...state.insurances, insurance ]
      };
    }

    // case collection.REMOVE_BOOK_SUCCESS:
    // case collection.ADD_BOOK_FAIL: {
    //   const book = action.payload;

    //   return Object.assign({}, state, {
    //     ids: state.ids.filter(id => id !== book.id)
    //   });
    // }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getInsurances = (state: State) => state.insurances;

//export const getIds = (state: State) => state.ids;
