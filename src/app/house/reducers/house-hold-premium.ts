import { createSelector } from '@ngrx/store';

import * as HouseHoldPremiumActions from '../actions/house-hold-premium';
import { HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';

export type Action = HouseHoldPremiumActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  premiums: HouseHoldPremiumResponse;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  premiums: null,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case HouseHoldPremiumActions.GET_INFO_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case HouseHoldPremiumActions.GET_INFO_SUCCESS: {
      const res = action.payload;

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false,
        premiums: res
      });
    }

    case HouseHoldPremiumActions.GET_INFO_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true,
        premiums: null
      });
    }

    default: {
      return state;
    }
  }
}

export const getPremiums = (state: State) => state.premiums;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
