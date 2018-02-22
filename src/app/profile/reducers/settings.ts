import { Settings } from '../models/settings';
import * as SettingsActions from '../actions/settings';

export type Action = SettingsActions.All;

export interface State {
  loading: boolean;
  loaded: boolean;
  settings: Settings | {};
}

export const initialState: State = {
  loading: false,
  loaded: false,
  settings: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SettingsActions.UPDATE_SETTINGS_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case SettingsActions.UPDATE_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        settings: Object.assign({}, action.payload)
      });
    }

    default: {
      return state;
    }
  }
}

export const getCurrent = (state: State) => state.settings;
export const getLoading = (state: State) => state.loading;
