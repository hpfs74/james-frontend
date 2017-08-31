import * as auth from '../actions/auth';
import { AuthToken } from '../models/auth';

export interface State {
  loggedIn: boolean;
  token: AuthToken | null;
}

export const initialState: State = {
  loggedIn: false,
  token: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
      };
    }

    case auth.REFRESH_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        token: action.payload
      };
    }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
