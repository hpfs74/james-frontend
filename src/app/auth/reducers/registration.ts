import * as registration from '../actions/registration';
import { isNullOrUndefined } from 'util';

export interface State {
  error: string | null;
  loading: boolean;
  registered: boolean;
  resend_success: boolean;
  resend_loading: boolean;
  resend_error: string | null;
  registration_email: string;
}

export const initialState: State = {
  error: null,
  loading: false,
  registered: false,
  resend_success: false,
  resend_error: null,
  resend_loading: false,
  registration_email: null
};

export function reducer(state = initialState, action: registration.Actions): State {
  switch (action.type) {
    case registration.REGISTER: {
      return {
        ...state,
        error: null,
        loading: true,
        registration_email: action.registration.emailaddress
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

    case registration.REGISTER_RESET_STATE: {
      return Object.assign({}, state, initialState);
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
        resend_loading: false,
        resend_success: true,
      };
    }

    case registration.REGISTER_RESEND_ACTIVATION_EMAIL_FAILURE: {
      return {
        ...state,
        resend_error: action.payload,
      };
    }

    case registration.REGISTER_RESEND_RESET_STATE: {
      return Object.assign({}, state, initialState);
    }

    case registration.REGISTER_WITH_ADVICE: {
      return {
        ...state,
        error: null,
        loading: true,
        registration_email: action.registration.emailaddress
      };
    }

    case registration.REGISTER_WITH_ADVICE_SUCCESS: {
      return {
        ...state,
        registered: true,
        error: null,
        loading: false,
      };
    }

    case registration.REGISTER_WITH_ADVICE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.loading;
export const getSuccess = (state: State) => state.registered;
export const getResendError = (state: State) => state.resend_error;
export const getResendPending = (state: State) => state.resend_loading;
export const getResendSuccess = (state: State) => state.resend_success;
export const getRegistrationEmail = (state: State) => state.registration_email;
