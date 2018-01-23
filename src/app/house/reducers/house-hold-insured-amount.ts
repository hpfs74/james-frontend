import { createSelector } from '@ngrx/store';

import * as HouseHoldAmountActions from '../actions/house-hold-insurance-amount';
import { HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';

export type Action = HouseHoldAmountActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  amount: HouseHoldAmountResponse;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  amount: null,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case HouseHoldAmountActions.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case HouseHoldAmountActions.GET_INFO_SUCCESS: {
      const res = action.payload;

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false,
        amount: res
      });
    }

    case HouseHoldAmountActions.GET_INFO_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
        amount: null
      });
    }

    default: {
      return state;
    }
  }
}

export const getAmount = (state: State) => state.amount;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
