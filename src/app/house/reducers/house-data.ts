import { createSelector } from '@ngrx/store';
import * as HouseDataActions from '../actions/house-data';
import { HouseDataResponse } from '@app/house/models/house-data';
import { Address } from '@app/address/models';

export type Action = HouseDataActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  info: HouseDataResponse;
  address?: Address;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  info: null,
  address: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case HouseDataActions.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case HouseDataActions.GET_INFO_SUCCESS: {
      const res = action.payload;

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false,
        info: res
      });
    }

    case HouseDataActions.GET_INFO_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
        info: null,
        address: null
      });
    }

    case HouseDataActions.UPDATE_ADDRESS: {
      const address = action.payload;

      return Object.assign({}, state, {
        address: address
      });
    }

    default: {
      return state;
    }
  }
}

export const getInfo = (state: State) => state.info;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getAddress = (state: State) => state.address;
