import { Profile } from '../models/profile';
import * as ProfileActions from '../actions/profile';

export type Action = ProfileActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  profile: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  profile: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case ProfileActions.SAVE_PROFILE_REQUEST:
    case ProfileActions.UPDATE_ADDRESS_REQUEST:
    case ProfileActions.LOAD_PROFILE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case ProfileActions.UPDATE_PROFILE: {
      // Patch the store copy with new data
      // WARNING: gets overwritten on a new load action!
      return Object.assign({}, state, {
        profile: Object.assign({}, state.profile, action.payload)
      });
    }

    case ProfileActions.UPDATE_ADDRESS_SUCCESS:
    case ProfileActions.SAVE_PROFILE_SUCCESS:
    case ProfileActions.LOAD_PROFILE_SUCCESS: {
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
export const getLoaded = (state: State) => state.loaded;
