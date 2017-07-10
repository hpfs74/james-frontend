import { createSelector } from 'reselect';
import { Profile } from '../models/profile';
import * as profile from '../actions/profile';

export interface State {
  loading: boolean;
  loaded: boolean;
  profile: Profile | {};
}

export const initialState: State = {
  loading: false,
  loaded: false,
  profile: {}
};

export function reducer(state = initialState, action: profile.Actions): State {
  switch (action.type) {

    case profile.SAVE_PROFILE_REQUEST:
    case profile.UPDATE_ADDRESS_REQUEST:
    case profile.LOAD_PROFILE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case profile.UPDATE_PROFILE: {
      // Patch the store copy with new data
      // WARNING: gets overwritten on a new load action!
      return Object.assign({}, state, {
        profile: Object.assign({}, state.profile, action.payload)
      });
    }

    case profile.UPDATE_ADDRESS_SUCCESS:
    case profile.SAVE_PROFILE_SUCCESS:
    case profile.LOAD_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        profile: Object.assign({}, action.payload)
      });
    }

    default: {
      return state;
    }
  }
}

export const getCurrent = (state: State) => state.profile;
export const getLoading = (state: State) => state.loading;
