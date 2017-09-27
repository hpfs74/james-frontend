import * as address from '../actions/address';
import { Address } from '../models';

export type Action = address.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  address: Address;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  address: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case address.GET_ADDRESS_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case address.GET_ADDRESS_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        error: false,
        address: Object.assign({}, state.address, action.payload)
      });
    }

    case address.GET_ADDRESS_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
        address: null
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getAddress = (state: State) => state.address;
export const getAddressFullname = (state: State) => state.address ? state.address.fullname : null;
