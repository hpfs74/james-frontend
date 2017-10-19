import * as registration from '../actions/registration';
import { isNullOrUndefined } from 'util';

export interface State {
  error: string | null;
  loading: boolean;
  registered: boolean;
  resend: boolean;
  resend_loading: boolean;
  resend_error: string | null;
}

export const initialState: State = {

  error: null,
  loading: false,
  registered: false,
  resend: false,
  resend_error: null,
  resend_loading: false
};

export function reducer(state = initialState, action: registration.Actions): State {
  switch (action.type) {
    case registration.REGISTER: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case registration.REGISTER_SUCCESS: {
      return {
        ...state,
        registered: true,
        error: null,
        loading: false,
      };
    }

    case registration.REGISTER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case registration.REGISTER_RESEND_ACTIVATION_EMAIL: {
      return {
        ...state,
        resend_loading: true,
        error: null
      };
    }

    case registration.REGISTER_RESEND_ACTIVATION_EMAIL_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        resend: true,
      };
    }

    case registration.REGISTER_RESEND_ACTIVATION_EMAIL_FAILURE: {
      return {
        ...state,
        resend_error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.loading;
export const getResendError = (state: State) => state.resend_error;
export const getResendPending = (state: State) => state.resend_loading;
