import { Profile } from '../models/profile';
import * as ProfileActions from '../actions/profile';

export type Action = ProfileActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  profile: any; // TODO: change to Profile if profile is more strictly defined
  error?: any;
  deleteStatus ?: boolean;
  deleteLoading?: boolean;
  deleteLoaded?: boolean;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  profile: {},
  error: null,
  deleteStatus: false,
  deleteLoading: false,
  deleteLoaded: false
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
        profile: Object.assign({}, state.profile, action.payload),
        loading: true
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

    case ProfileActions.DELETE_PROFILE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false
      });
    }

    case ProfileActions.DELETE_FAIL_PROFILE: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        error: action.payload.error
      });
    }

    case ProfileActions.DELETE_SUCCESS_PROFILE: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteStatus: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getProfile = (state: State) => state.profile;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getDeleteStatus = (state: State) => state.deleteStatus;
export const getDeleteLoading = (state: State) => state.deleteLoading;
export const getDeleteError = (state: State) => state.error;
