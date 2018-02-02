import * as auth from '../actions/auth';
import { AuthToken } from '../models/auth';

export interface State {
  loggedIn: boolean;
  loginExpired: boolean;
  token: AuthToken | null;
  anonymous: boolean;
  passwordChangeLoading: boolean;
  passwordChanged: boolean;
  passwordChangeError: string;
}

export const initialState: State = {
  loggedIn: false,
  loginExpired: false,
  token: null,
  anonymous: false,
  passwordChangeLoading: false,
  passwordChanged: false,
  passwordChangeError: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        loginExpired: false,
        token: action.payload.token,
        anonymous: false
      };
    }

    case auth.REFRESH_SUCCESS: {
      return {
        ...state,
        loginExpired: false,
        token: action.payload
      };
    }

    case auth.LOGIN_EXPIRED:
    case auth.REQUEST_CREDENTIALS: {
      return {
        ...state,
        loginExpired: true
      };
    }

    case auth.LOGOUT: {
      return initialState;
    }

    case auth.ANONYMOUS_START: {
      return {
        ...state,
        anonymous: true
      };
    }

    case auth.NEW_PASSWORD: {
      return {
        ...state,
        passwordChangeLoading: true,
        passwordChanged: false
      };
    }

    case auth.NEW_PASSWORD_ERROR: {
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChanged: false,
        passwordChangeError: action.payload
      };
    }

    case auth.NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChanged: true
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
export const getPasswordChangeLoading = (state: State) => state.passwordChangeLoading;
export const getPasswordChangedStatus = (state: State) => state.passwordChanged;
export const getPasswordChangedError = (state: State) => state.passwordChangeError;
