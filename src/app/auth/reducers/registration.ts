import * as registration from '../actions/registration';
import { isNullOrUndefined } from 'util';

export interface State {
  error: string | null;
  loading: boolean;
  registered: boolean;
  resendSuccess: boolean;
  resendLoading: boolean;
  resendError: string | null;
  registrationEmail: string;
}

export const initialState: State = {
  error: null,
  loading: false,
  registered: false,
  resendSuccess: false,
  resendError: null,
  resendLoading: false,
  registrationEmail: null
};

export function reducer(state = initialState, action: registration.Actions): State {
  switch (action.type) {
    case registration.REGISTER: {
      return {
        ...state,
        error: null,
        loading: true,
        registrationEmail: action.registration.emailaddress
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

    case registration.RESET_STATE: {
      return Object.assign({}, state, initialState);
    }

    case registration.RESEND_ACTIVATION_EMAIL: {
      return {
        ...state,
        resendLoading: true,
        error: null
      };
    }

    case registration.RESEND_ACTIVATION_EMAIL_SUCCESS: {
      return {
        ...state,
        error: null,
        resendLoading: false,
        resendSuccess: true,
      };
    }

    case registration.RESEND_ACTIVATION_EMAIL_FAILURE: {
      return {
        ...state,
        resendError: action.payload,
      };
    }

    case registration.RESEND_RESET_STATE: {
      return Object.assign({}, state, initialState);
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.loading;
export const getSuccess = (state: State) => state.registered;
export const getResendError = (state: State) => state.resendError;
export const getResendPending = (state: State) => state.resendLoading;
export const getResendSuccess = (state: State) => state.resendSuccess;
export const getRegistrationEmail = (state: State) => state.registrationEmail;
