import { createSelector } from '@ngrx/store';
import { Car } from '../models/car';
import * as carActions from '../actions/car';

export type Action = carActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  license: string;
  info: Car;
  buyComplete: boolean;
  buyError: boolean;
  buyErrorCode: string;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  license: null,
  info: null,
  buyComplete: false,
  buyError: false,
  buyErrorCode: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case carActions.BUY_REQUEST:
    case carActions.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    }

    case carActions.GET_INFO_SUCCESS: {
      const car = action.payload;

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false,
        license: car.license,
        info: car
      });
    }

    case carActions.GET_INFO_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
        license: null,
        info: null
      });
    }

    case carActions.GET_MELDCODE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case carActions.GET_MELDCODE_SUCCESS: {
      const car = state.info;
      car.meldcode = action.payload.meldcode;
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false,
        license: state.license,
        info: car
      });
    }

    case carActions.GET_MELDCODE_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
        license: state.license,
        info: state.info
      });
    }

    case carActions.BUY_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        buyComplete: true,
        buyError: false,
        buyErrorCode: null
      });
    }

    case carActions.BUY_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        buyComplete: false,
        buyError: true,
        buyErrorCode: action.payload._body ? JSON.parse(action.payload._body).error : null
      });
    }

    case carActions.CLEAR_ERROR: {
      return Object.assign({}, state, {
        error: false,
        buyError: false,
        buyErrorCode: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getInfo = (state: State) => state.info;
export const getMeldcode = (state: State) => state.info.meldcode;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getCarInfo = (state: State) => state.info;
export const getLicense = (state: State) => state.license;
export const getBuyComplete = (state: State) => state.buyComplete;
export const getBuyError = (state: State) => [state.buyError, state.buyErrorCode];
