import * as cuid from 'cuid';

import * as PackagePremiumActions from '../actions/package-premium';
import { PackagePremiumResponse, PackagePremiumRequest } from '@app/house/models/package-premium';

export type Action = PackagePremiumActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  request?: PackagePremiumRequest;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: false,
  request: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case PackagePremiumActions.NEW_BUY: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        error: false,
        request: action.payload
      });
    }

    case PackagePremiumActions.NEW_BUY_COMPLETE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: false
      });
    }

    case PackagePremiumActions.NEW_BUY_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
